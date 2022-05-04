import path from 'path';
import * as fs from 'fs-extra';
import * as _ from 'lodash';

import { findGitRoot } from './monorepo';
import execSync from './exec-sync';
import { createTempDir } from './projects-test';

const themes = ['light', 'dark', 'teamsDark', 'highContrast'] as const;
const repoRoot = findGitRoot();

function getGeneratedFiles(tmpDir: string) {
  return [
    {
      src: path.join(tmpDir, 'light/react/global-colors.ts'), // the same global colors are generated for all theme, just use light
      dest: path.join(repoRoot, 'packages/react-components/react-theme/src/global/colors.ts'),
    },
    ...themes.map(theme => ({
      src: path.join(tmpDir, `${theme}/react/alias-colors.ts`),
      dest: path.join(repoRoot, `packages/react-components/react-theme/src/alias/${theme}Color.ts`),
    })),
  ];
}

function runPipeline(theme: typeof themes[number], pipelineDir: string, outDir: string) {
  console.log(`Running pipeline for ${theme} theme`);

  // https://github.com/microsoft/fluentui-token-pipeline
  execSync(
    `npx transform-tokens --in src/global.json --in src/${_.kebabCase(theme)}.json --out ${outDir}/${theme}`,
    `Generate tokens for theme:${theme}`,
    pipelineDir,
  );
}

export const tokenPipeline = () => {
  const tmpDir = createTempDir('theme');

  execSync(
    'git clone --depth 1 https://github.com/microsoft/fluentui-design-tokens.git',
    'Clone design tokens repo',
    tmpDir,
  );
  execSync('npm install', 'Install dependencies', path.join(tmpDir, 'fluentui-design-tokens'));

  themes.forEach(theme => {
    runPipeline(theme, path.join(tmpDir, 'fluentui-design-tokens'), tmpDir);
  });

  getGeneratedFiles(tmpDir).forEach(file => {
    console.log(`Copying generated file ${file.src} -> ${file.dest}`);
    fs.copySync(file.src, file.dest, { overwrite: true });
  });

  execSync(`npx prettier --write ${path.join(repoRoot, 'packages/react-components/react-theme/src')}`, 'Prettier');
};

tokenPipeline();
