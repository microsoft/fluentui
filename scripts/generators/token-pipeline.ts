import path from 'path';
import * as fs from 'fs-extra';
import * as _ from 'lodash';
import * as yargs from 'yargs';
import { execSync } from 'child_process';

import { findGitRoot } from '@fluentui/scripts-monorepo';
import { createTempDir } from '@fluentui/scripts-projects-test';

const themes = ['light', 'dark', 'teamsDark', 'highContrast'] as const;
const repoRoot = findGitRoot();

const argv = yargs
  .option('design-tokens-repo', {
    describe: 'Instead of cloning microsoft/fluentui-design-tokens use a local copy of the repo',
    type: 'string',
  })
  .version(false)
  .help().argv;

function getGeneratedFiles(tmpDir: string) {
  return [
    {
      src: path.join(tmpDir, 'light/global-colors.ts'), // the same global colors are generated for all theme, just use light
      dest: path.join(repoRoot, 'packages/tokens/src/global/colors.ts'),
    },
    ...themes.map(theme => ({
      src: path.join(tmpDir, `${theme}/alias-colors.ts`),
      dest: path.join(repoRoot, `packages/tokens/src/alias/${theme}Color.ts`),
    })),
  ];
}

function runPipeline(theme: (typeof themes)[number], pipelineDir: string, outDir: string) {
  console.log(`Running pipeline for ${theme} theme`);

  console.log(`Generate tokens for theme`);

  // https://github.com/microsoft/fluentui-token-pipeline
  execSync(
    [
      'npx',
      'transform-tokens',
      '--platform react',
      '--in src/global.json',
      `--in src/${_.kebabCase(theme)}.json`,
      `--out ${outDir}/${theme}`,
    ].join(' '),
    { cwd: pipelineDir },
  );
}

function setupDesignTokensRepo(options: { argv: typeof argv }) {
  const tmpDir = createTempDir('theme');

  if (options.argv['design-tokens-repo']) {
    const pipelineDir = options.argv['design-tokens-repo'];
    console.log(`Using local copy of design-tokens from ${pipelineDir}`);

    return { pipelineDir, tmpDir };
  }

  console.log('Clone design tokens repo');
  // clone repo, install deps
  execSync('git clone --depth 1 https://github.com/microsoft/fluentui-design-tokens.git', {
    cwd: tmpDir,
    stdio: 'inherit',
  });
  const pipelineDir = path.join(tmpDir, 'fluentui-design-tokens');
  console.log('Install dependencies');
  execSync('npm install', { cwd: pipelineDir, stdio: 'inherit' });

  return { pipelineDir, tmpDir };
}

const tokenPipeline = () => {
  const { pipelineDir, tmpDir } = setupDesignTokensRepo({ argv });

  themes.forEach(theme => {
    runPipeline(theme, pipelineDir, tmpDir);
  });

  getGeneratedFiles(tmpDir).forEach(file => {
    console.log(`Copying generated file ${file.src} -> ${file.dest}`);
    fs.copySync(file.src, file.dest, { overwrite: true });
  });

  console.log('Format');
  execSync(`npx prettier --write ${path.join(repoRoot, 'packages/tokens/src')}`);
};

tokenPipeline();
