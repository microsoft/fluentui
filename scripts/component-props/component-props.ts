import * as path from 'path';
import * as fs from 'fs';
import * as ts from 'typescript';
import * as glob from 'glob';

import { findGitRoot, getAllPackageInfo } from '../monorepo/index';

import { withCompilerOptions } from '../gulp/plugins/util/docgen';

const gitRoot = findGitRoot();
const packages = Object.values(getAllPackageInfo()).filter(pkg => pkg.packageJson.version[0] === '9');

function run() {
  const compilerOptions = getCompilerOptions(path.join(gitRoot, 'tsconfig.base.json'));

  const parser = withCompilerOptions(compilerOptions, {
    // Props need to be filtered since react-docgen shows all the props including inherited
    // native props or React built-in props. (Check for both @types/react and react/index.d.ts
    // because there may be some variation in which format is used.)
    propFilter: prop => !/@types[\\/]react[\\/]|\breact[\\/]index\.d\.ts$/.test(prop.parent?.fileName || ''),
  });

  const packageNames = packages.map(pkg => path.basename(pkg.packageJson.name));
  const components = glob
    .sync(path.join(gitRoot, 'packages', `{${packageNames.join(',')}}/src/**/*.{ts,tsx}`))
    .filter(file => {
      file = path.posix.normalize(file);
      return (
        /\/([A-Z]\w+)\/\1\.tsx?$/.test(file) &&
        // don't analyze contexts
        !/Context\.tsx?$/.test(file) &&
        // only analyze Text component in react-text package
        (!file.includes('react-text') || file.includes('/Text.ts'))
      );
    });
  console.log(components.join('\n'));

  const program = ts.createProgram(components, compilerOptions);

  const docs = parser.parseWithProgramProvider(components, () => program);
  const output = path.join(gitRoot, 'components.json');
  fs.writeFileSync(output, JSON.stringify(docs, null, 2));
  console.log('Wrote', output);
}

function getCompilerOptions(tsconfigPath: string) {
  const basePath = path.dirname(tsconfigPath);
  const { config, error } = ts.readConfigFile(tsconfigPath, filename => fs.readFileSync(filename, 'utf8'));

  if (error !== undefined) {
    const errorText =
      `Cannot load custom tsconfig.json from provided path: ${tsconfigPath}, ` +
      `with error code: ${error.code}, message: ${error.messageText}`;
    throw new Error(errorText);
  }

  const { options, errors } = ts.parseJsonConfigFileContent(config, ts.sys, basePath, {}, tsconfigPath);

  if (errors && errors.length) {
    throw errors[0];
  }

  return options;
}

run();
