import * as fs from 'fs-extra';
import { IOptions as GlobOptions } from 'glob';
import _ from 'lodash';
import * as path from 'path';
import { sync as replaceInFileSync, ReplaceResult } from 'replace-in-file';
import { findGitRoot, git } from 'workspace-tools';

const { runPrettier, prettierExtensions } = require('./prettier/prettier-helpers');

const gitRoot = findGitRoot(process.cwd());

interface ComponentPaths {
  pkg: string;
  component: string;
  newComponent: string;
  pkgSrc: string;
  pkgComponents: string;
  pkgNext: string;
  internalSrc: string;
  internalComponent: string;
  exampleSrc: string;
  pkgExamples: string;
  pkgExamplesNext: string;
  reactExamples: string;
}

const getChangedFiles = (results: ReplaceResult[]) => results.filter(res => res.hasChanged).map(res => res.file);

function moveContents(srcDir: string, destDir: string) {
  fs.readdirSync(srcDir).forEach(f => fs.moveSync(path.join(srcDir, f), path.join(destDir, f)));
}

function stageAndCommit(patterns: string[], message: string) {
  git(['add', ...patterns], { cwd: gitRoot });
  // run with --no-verify to avoid lint errors on moves
  const result = git(['commit', '-m', message, '--no-verify'], { cwd: gitRoot });
  if (!result.success) {
    console.error(result.stdout);
    console.error(result.stderr);
    process.exit(1);
  }
}

function updatePackage(paths: ComponentPaths) {
  const {
    pkg,
    component,
    newComponent,
    pkgSrc,
    pkgComponents,
    pkgNext,
    internalSrc,
    internalComponent,
    pkgExamples,
    pkgExamplesNext,
    reactExamples,
  } = paths;

  // move component code
  fs.moveSync(path.join(pkgComponents, component), internalComponent, { overwrite: true });
  // move utils
  const compUtils = path.join(pkgSrc, 'utilities');
  if (fs.existsSync(compUtils)) {
    fs.moveSync(compUtils, path.join(internalComponent, 'utilities'));
  }

  // move next version (structure varies)
  let nextPath = path.join(pkgNext, 'components', newComponent);
  if (!fs.existsSync(nextPath)) {
    nextPath = pkgNext;
  }
  fs.moveSync(nextPath, path.join(pkgComponents, newComponent));
  // move re-export of next version
  if (newComponent !== component) {
    const nextRoot = path.join(pkgNext, `${newComponent}.ts`);
    if (fs.existsSync(nextRoot)) {
      fs.moveSync(nextRoot, path.join(pkgSrc, `${newComponent}.ts`));
    }
    fs.removeSync(path.join(pkgSrc, `${component}.ts`));
  }
  // delete next folder/file
  fs.removeSync(pkgNext);
  fs.removeSync(path.join(pkgSrc, 'next.ts'));

  // move example code
  fs.moveSync(path.join(pkgExamples, component), path.join(reactExamples, component));
  // move example snapshots
  const pkgSnapshots = path.join(pkgExamples, '__snapshots__');
  if (fs.existsSync(pkgSnapshots)) {
    moveContents(pkgSnapshots, path.join(reactExamples, '__snapshots__'));
    fs.rmdirSync(pkgSnapshots);
  }
  // move next examples
  if (fs.existsSync(pkgExamplesNext)) {
    nextPath = path.join(pkgExamplesNext, newComponent);
    if (!fs.existsSync(nextPath)) {
      nextPath = pkgExamplesNext;
    }
    fs.moveSync(nextPath, path.join(pkgExamples, newComponent));
    fs.removeSync(pkgExamplesNext);
  }

  console.log('\nCommitting the file moves only');
  stageAndCommit([pkgSrc, internalSrc, pkgExamples, reactExamples], `Move ${component} from ${pkg} to react-internal`);
}

function updateReferences(components: ComponentPaths[]): string[] {
  const results: ReplaceResult[] = [];
  const glob: GlobOptions = {
    cwd: gitRoot,
  };

  const allComponents = components.map(c => c.component);
  const allPackages = components.map(c => c.pkg);

  // remove deps on new packages where not needed
  results.push(
    ...replaceInFileSync({
      files: 'packages/{api-docs,react}/package.json',
      from: new RegExp(`"(${allPackages.join('|')})": .*\\r?\\n`, 'g'),
      to: '',
      glob,
    }),
  );

  // in moved components, replace react-internal refs with relative paths
  // (replacing all with ../.. happens to work for now)
  results.push(
    ...replaceInFileSync({
      files: `packages/react-internal/src/components/{${allComponents.join(',')}}/*`,
      from: new RegExp('@fluentui/react-internal/lib', 'g'),
      to: '../..',
      glob,
    }),
  );

  // fix refs to component package in react
  const pkgRefRegex = new RegExp(`'@fluentui/(${allPackages.join('|')}).*?'`);
  results.push(
    ...replaceInFileSync({
      files: `packages/react/src/**/*.{ts,tsx}`,
      from: new RegExp(pkgRefRegex.source, 'g'),
      to: substr => {
        const pkg = substr.match(pkgRefRegex)![1];
        const component = components.find(c => c.pkg === pkg)!.component;
        return `'@fluentui/react-internal/lib/${component}'`;
      },
      glob,
    }),
  );

  // fix refs to package name in examples
  results.push(
    ...replaceInFileSync({
      files: `packages/react-examples/src/react/{${allComponents.join(',')}}/*.Example.tsx`,
      from: new RegExp(pkgRefRegex.source, 'g'),
      to: substr => {
        const pkg = substr.match(pkgRefRegex)![1];
        const component = components.find(c => c.pkg === pkg)!.component;
        return `'@fluentui/react/lib/${component}'`;
      },
      glob,
    }),
  );

  // fix refs to package name in doc.tsx (turns out the only references are to paths like
  // packages/react-examples/src/react-foo/... so a literal find/replace is fine)
  results.push(
    ...replaceInFileSync({
      files: `packages/react-examples/src/react/{${allComponents.join(',')}}/*.doc.tsx`,
      from: new RegExp(allPackages.join('|'), 'g'),
      to: 'react',
      glob,
    }),
  );

  // replace react-foo/lib/next refs in next examples
  results.push(
    ...replaceInFileSync({
      files: `packages/react-examples/src/{${allPackages.join(',')}}/**/*`,
      from: new RegExp(`'@fluentui/(${allPackages.join('|')})/lib/next.*?'`),
      to: `'@fluentui/$1'`,
      glob,
    }),
  );

  return getChangedFiles(results);
}

async function runPrettierForFiles(modifiedFiles: string[]) {
  // Only run prettier on supported extensions (note: the slice() is because extname returns
  // .extension but prettierExtensions doesn't include the leading . )
  const filesToFormat = modifiedFiles.filter(f => prettierExtensions.includes(path.extname(f).slice(1)));
  if (filesToFormat.length) {
    console.log('\nRunning prettier on changed files...');
    await runPrettier(filesToFormat, true, true);
  }
}

async function run() {
  const components = [
    ['react-checkbox', 'Checkbox'],
    ['react-link', 'Link'],
    ['react-slider', 'Slider'],
    ['react-tabs', 'Pivot', 'Tabs'],
    ['react-toggle', 'Toggle'],
  ].map(
    ([pkg, component, newComponent = component]): ComponentPaths => {
      const pkgSrc = path.join(gitRoot, 'packages', pkg, 'src');
      const internalSrc = path.join(gitRoot, 'packages/react-internal/src');
      const exampleSrc = path.join(gitRoot, 'packages/react-examples/src');
      const pkgExamples = path.join(exampleSrc, pkg);
      return {
        pkg,
        component,
        newComponent,
        pkgSrc,
        pkgComponents: path.join(pkgSrc, 'components'),
        pkgNext: path.join(pkgSrc, 'next'),
        internalSrc,
        internalComponent: path.join(internalSrc, 'components', component),
        exampleSrc,
        pkgExamples,
        pkgExamplesNext: path.join(pkgExamples, 'next'),
        reactExamples: path.join(exampleSrc, 'react'),
      };
    },
  );

  components.forEach(updatePackage);

  const changedFiles = updateReferences(components);

  await runPrettierForFiles(changedFiles);
}

run().catch(err => {
  console.error(err);
});

/*

pkg="react-link"
comp="Link"
pkgSrc="packages/$pkg/src"
intSrc="packages/react-internal/src"
exampleSrc="packages/react-examples/src"
pkgEx="$exampleSrc/$pkg"
reactEx="$exampleSrc/react"

mv "$pkgSrc/components/$comp" "$intSrc/components/$comp"

if [ -d "$pkgSrc/next/components" ]; then
  mv "$pkgSrc/next/components/*" "$pkgSrc/components/"
else
  mkdir -p "$pkgSrc/components"
  mv "$pkgSrc/next" "$pkgSrc/components/$comp"
fi

rm -f $pkgSrc/next.ts
rm -rf $pkgSrc/next

if [ -d "$pkgEx/$comp" ]; then
  mv "$pkgEx/$comp" "$reactEx/$comp"

  pkgExSnap="$pkgEx/__snapshots__"
  if [ -d "$pkgExSnap" ]; then
    mv $pkgExSnap/* "$reactEx/__snapshots__"
    rm -rf $pkgExSnap
  fi

  pkgExNext="$pkgEx/next"
  if [ -d "$pkgExNext/$comp" ]; then
    pkgExNext="$pkgExNext/$comp"
  fi
  if [ -d "$pkgExNext" ]; then
    mv "$pkgExNext" "$pkgEx"
    rm -rf $pkgExNext
  fi
fi

# remove comp pkg react-internal dep if possible
# if needed, replace old comp re-export in index.ts (name change)
# run a build

*/
