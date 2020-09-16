// @ts-check

const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const replaceInFile = require('replace-in-file');
const findGitRoot = require('./monorepo/findGitRoot');

const rootDir = findGitRoot();
const packagesDir = path.join(rootDir, 'packages');
const examplesSrc = path.join(packagesDir, 'examples/src');

moveDocFiles();
fixDocPageTypesPaths();
fixDocFilePaths();
fixDemoAppPaths();

/** Move doc files and legacy demo apps to new examples package */
function moveDocFiles() {
  const packages = glob.sync(path.posix.join(packagesDir, '*'));

  for (const packagePath of packages) {
    const packageName = path.basename(packagePath);
    const packageDestRoot = path.join(examplesSrc, packageName);
    const demoAppPath = path.join(packagePath, 'src/demo');

    // exclude certain packages
    if (['examples', 'example-app-base', 'tsx-editor'].includes(packageName)) {
      continue;
    }

    // get all example- and doc- related files
    const docs = glob.sync(path.posix.join(packagePath, 'src/**/{examples,docs,*.doc.tsx,*Page.tsx}'));
    for (const docThing of docs) {
      if (docThing.replace(/\\/g, '/').includes('demo/')) {
        // experiments/src/demo/GettingStartedPage.tsx
        // TODO: move legacy demo apps
        continue;
      }

      // move the files
      const relativePath = path.relative(path.join(packagePath, 'src'), docThing);
      const dest = path.join(packageDestRoot, _transformRelativePath(relativePath));
      console.log(`moving ${path.relative(rootDir, docThing)} to ${path.relative(rootDir, dest)}`);
      fs.moveSync(docThing, dest);
    }

    // Move the demo app if present
    if (fs.existsSync(demoAppPath)) {
      const dest = path.join(packageDestRoot, 'demo');
      console.log(`moving demo app ${path.relative(rootDir, demoAppPath)} to ${path.relative(rootDir, dest)}`);
      fs.moveSync(demoAppPath, dest);
    }
  }
}

/** Replace the DocPage.types relative imports with package imports. */
function fixDocPageTypesPaths() {
  // @ts-ignore types are wrong--they declare a default export, but the js assigns to module.exports
  replaceInFile.sync({
    files: path.posix.join(examplesSrc, '**/*'),
    from: /(\.\.\/)+common\/DocPage\.types/,
    to: 'office-ui-fabric-react/lib/common/DocPage.types',
  });
}

/** Update all references in examples, website, and resources */
function fixDocFilePaths() {
  // (?:@)?\b(?:[\w-]+\/)?               optional scope
  // ([\w-]+)\/                     package name (1)
  // (lib|src)\/                    source type (2)
  // ([\w\/]+\/(?:examples|docs|\w+\.doc|\w+Page)\b)  (3)
  //   [\w\/]+\/                   the rest of the path
  //   (?:examples|docs|\w+\.doc|\w+Page)\b doc path parts
  const docRegex = /(?:@)?\b(?:[\w-]+\/)?([\w-]+)\/(lib|src)\/([\w\/]+\/(?:examples|docs|\w+\.doc|\w+Page)\b)/g;
  // @ts-ignore
  replaceInFile.sync({
    files: [
      path.posix.join(rootDir, 'apps/{fabric-website,fabric-website-resources}/src/**/*'),
      path.posix.join(examplesSrc, '**/*'),
    ],
    from: docRegex,
    to: substr => {
      docRegex.lastIndex = 0;
      if (/\bDocPage|fabric-website/.test(substr)) {
        return substr;
      }
      const match = docRegex.exec(substr);
      const result = path.posix.join('@fluentui/examples', match[2], match[1], _transformRelativePath(match[3]));
      console.log(`updating ${substr} to ${result}`);
      return result;
    },
  });
}

/** Fix component page imports in demo apps */
function fixDemoAppPaths() {
  // @ts-ignore
  replaceInFile.sync({
    files: path.posix.join(examplesSrc, '*/demo/AppDefinition.tsx'),
    // remove "components" or other extra segments which don't exist in the new layout
    from: /'\.\.\/(\w+)/,
    to: "'..",
  });
}

/**
 * Transform the relative path of a doc file to the version which will be used in the new
 * example package. Works with either file paths or import paths.
 * @param {string} origRelativePath File or folder path relative to src in original package
 */
function _transformRelativePath(origRelativePath) {
  const destPathParts = origRelativePath.split(/[\\/]/g);
  // replace root path (a few weird things in experiments are not under these paths)
  if (['components', 'utilities'].includes(destPathParts[0])) {
    destPathParts.shift();
  }

  if (destPathParts[0] === 'pickers') {
    // generic Pickers, PeoplePicker
    // pickers/PeoplePicker/PeoplePicker.doc.tsx => PeoplePicker/PeoplePicker.doc.tsx
    // pickers/Pickers.doc.tsx => Pickers/Pickers.doc.tsx
    destPathParts.shift();
    if (destPathParts.length === 1) {
      destPathParts.unshift('Pickers');
    }
  } else if (['ExtendedPicker', 'FloatingPicker'].includes(destPathParts[0])) {
    // ExtendedPicker/docs => ExtendedPeoplePicker/docs
    // ExtendedPicker/PeoplePicker/ExtendedPeoplePicker.doc.tsx => ExtendedPeoplePicker/ExtendedPeoplePicker.doc.tsx
    // FloatingPicker/PeoplePicker/FloatingPeoplePicker.doc.tsx => FloatingPeoplePicker/FloatingPeoplePicker.doc.tsx
    const pickerName = destPathParts.shift().replace('Picker', '') + 'PeoplePicker';
    if (destPathParts.length > 1) {
      destPathParts.shift();
    }
    destPathParts.unshift(pickerName);
  } else if (destPathParts[0] === 'SelectedItemsList') {
    // SelectedItemsList/examples => SelectedPeopleList/examples
    // SelectedItemsList/SelectedPeopleList/SelectedPeopleList.doc.tsx => SelectedPeopleList/SelectedPeopleList.doc.tsx
    destPathParts.shift();
    // @ts-ignore ts is wrong
    if (destPathParts[0] !== 'SelectedPeopleList') {
      destPathParts.unshift('SelectedPeopleList');
    }
  } else if (destPathParts[0] === 'fluent') {
    // experiments fluent/examplePages/examples
    destPathParts.splice(1, 1);
  }

  let destRelativeDir = destPathParts.join('/');
  // capitalize (utilities/selection and some things from experiments aren't capitalized already;
  // most components should be)
  return destRelativeDir[0].toUpperCase() + destRelativeDir.slice(1);
}

/*
./components/ActivityItem/examples
./components/Announced/examples
./components/Breadcrumb/examples
./components/FloatingPicker/PeoplePicker/examples
./components/pickers/examples
./components/pickers/PeoplePicker/examples
./components/SelectedItemsList/examples
./utilities/selection/examples

./components/ActivityItem/ActivityItem.doc.tsx
./components/Announced/Announced.doc.tsx
./components/Breadcrumb/Breadcrumb.doc.tsx
./components/DetailsList/DetailsList.doc.tsx
./components/ExtendedPicker/PeoplePicker/ExtendedPeoplePicker.doc.tsx
./components/FloatingPicker/PeoplePicker/FloatingPeoplePicker.doc.tsx
./components/pickers/PeoplePicker/PeoplePicker.doc.tsx
./components/pickers/Pickers.doc.tsx
./components/SelectedItemsList/SelectedPeopleList/SelectedPeopleList.doc.tsx
./components/Theme/Theme.doc.tsx
./components/ThemeGenerator/ThemeGenerator.doc.tsx
./utilities/selection/Selection.doc.tsx

./components/ActivityItem/docs
./components/Announced/docs
./components/Announced/docs/Asynchronous
./components/Announced/docs/BulkLongRunning
./components/Announced/docs/QuickActions
./components/Announced/docs/SearchResults
./components/Breadcrumb/docs
./components/Button/docs
./components/Button/docs/new
./components/Checkbox/docs
./components/Checkbox/docs/new
./components/ExtendedPicker/docs
./components/FloatingPicker/PeoplePicker/docs
./components/pickers/docs
./components/pickers/PeoplePicker/docs
./components/SelectedItemsList/docs
./utilities/selection/docs


./components/Button/examples
./components/Button/MenuButton/examples
./components/Button/SplitButton/examples
./components/fluent/examplePages/examples
./components/SelectedItemsList/SelectedPeopleList/examples
./components/signals/examples
./slots/examples
./theming/examples

./components/Button/ButtonPage.tsx
./components/fluent/examplePages/FluentThemePage.tsx
./components/SelectedItemsList/SelectedPeopleList/SelectedPeopleListPage.tsx
./components/signals/SignalsPage.tsx
./slots/SlotsPage.tsx
./theming/ThemingPage.tsx
*/
