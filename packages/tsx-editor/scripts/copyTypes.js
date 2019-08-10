// @ts-check

const { just } = require('@uifabric/build');
const { copyTask } = just;
const { expandSourcePath } = require('@uifabric/build/tasks/copy');
const fs = require('fs');
const path = require('path');

// Copy office-ui-fabric-react.d.ts and our other .d.ts files it references to the dist folder,
// so we can more easily load them into the editor later.
module.exports = function copyTypes() {
  const packagesToResolve = ['office-ui-fabric-react'];
  const resolvedPackages = [];
  const pathsToCopy = [];

  while (packagesToResolve.length) {
    const package = packagesToResolve.shift();
    resolvedPackages.push(package);

    const packageMatch = package.match(/^(@uifabric\/)?([\w-]+)/);
    const dtsPath = expandSourcePath(`${package}/dist/${packageMatch[2]}.d.ts`);

    if (fs.existsSync(dtsPath)) {
      // copy this .d.ts
      pathsToCopy.push(dtsPath);

      // add any other @uifabric packages it references for processing (ignore React imports and other imports)
      const dtsContents = fs.readFileSync(dtsPath).toString();
      const importRegex = /import .*? from '(@uifabric\/[\w-]+)/gm;
      let importMatch;
      while ((importMatch = importRegex.exec(dtsContents))) {
        const packageName = importMatch[1];
        if (packageName && !packagesToResolve.includes(packageName) && !resolvedPackages.includes(packageName)) {
          packagesToResolve.push(packageName);
        }
      }
    }
  }

  return copyTask({
    paths: pathsToCopy,
    dest: path.join(process.cwd(), 'dist')
  });
};
