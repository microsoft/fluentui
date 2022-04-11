import path from 'path';
import * as fs from 'fs-extra';
import * as _ from 'lodash';

import { runPrettierForFolder } from '../prettier/prettier-helpers';
const findGitRoot = require('../monorepo/findGitRoot');
import execSync from '../exec-sync';
import { createTempDir } from '../projects-test';

const themes = <const>['light', 'dark', 'teamsDark', 'highContrast'];
type ArrayValues<T> = T extends readonly [infer Head, ...infer Rest] ? Head | ArrayValues<Rest> : never;

function getGeneratedFiles(tmpDir: string, repoRoot: string) {
  return [
    {
      src: path.join(tmpDir, 'light/react/global-colors.ts'), // the same global colors are generated for all theme, just use light
      dest: path.join(repoRoot, 'packages/react-theme/src/global/colors.ts'),
    },
    ...themes.map(theme => ({
      src: path.join(tmpDir, `${theme}/react/alias-colors.ts`),
      dest: path.join(repoRoot, `packages/react-theme/src/alias/${theme}Color.ts`),
    })),
  ];
}

function runPipeline(theme: ArrayValues<typeof themes>, pipelineDir: string, outDir: string) {
  console.log(`npx transform-tokens --in src/global.json --in src/${_.kebabCase(theme)}.json --out ${outDir}/${theme}`);
  execSync(
    `npx transform-tokens --in src/global.json --in src/${_.kebabCase(theme)}.json --out ${outDir}/${theme}`,
    'Generate tokens',
    pipelineDir,
  );
}

export const tokenPipeline = () => {
  const repoRoot = findGitRoot();

  const tmpDir = createTempDir('theme');

  execSync('git clone https://github.com/microsoft/fluentui-design-tokens.git', 'Clone design tokens repo', tmpDir);
  execSync('npm install', 'Install dependencies', path.join(tmpDir, 'fluentui-design-tokens'));

  themes.forEach(theme => {
    runPipeline(theme, path.join(tmpDir, 'fluentui-design-tokens'), tmpDir);
  });

  getGeneratedFiles(tmpDir, repoRoot).forEach(f => {
    console.log(`Copying generated file ${f.src} -> ${f.dest}`);
    fs.copySync(f.src, f.dest, { overwrite: true });
  });

  runPrettierForFolder(path.join(repoRoot, 'packages/react-theme'));
};
