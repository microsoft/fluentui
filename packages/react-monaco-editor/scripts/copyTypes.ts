import { copyTask, expandSourcePath } from '@fluentui/scripts-tasks';
import * as fs from 'fs';
import * as path from 'path';

// Copy react.d.ts and other .d.ts files it references to the dist folder,
// so we can more easily load them into the editor later.
export function copyTypes() {
  const packagesToResolve = ['@fluentui/react', '@fluentui/react-hooks', '@fluentui/example-data'];
  const resolvedPackages: string[] = [];
  const pathsToCopy: string[] = [];

  let pkg: string | undefined;
  while ((pkg = packagesToResolve.shift())) {
    const [, packageNameWithoutScope] = pkg.match(/^@fluentui\/([\w-]+)/) as RegExpMatchArray;
    const dtsPath = expandSourcePath(`${pkg}/dist/${packageNameWithoutScope}.d.ts`) as string;

    resolvedPackages.push(pkg);

    if (fs.existsSync(dtsPath)) {
      // copy this .d.ts
      pathsToCopy.push(dtsPath);

      // add any other @fluentui packages it references for processing
      // (ignore React imports and other imports)
      const dtsContents = fs.readFileSync(dtsPath).toString();
      const importRegex = /(?:import|export) .*? from ['"](@fluentui\/[\w-]+)/gm;
      let importMatch: RegExpExecArray | null;
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
    // Copy these to a subfolder of dist so we can load them with require.context() even if
    // devServer.writeToDisk=true in the webpack config (the webpack output is also written to dist,
    // so doing require.context() on the root of dist causes an infinite loop in watch mode))
    dest: path.join(process.cwd(), 'dist/types'),
  });
}
