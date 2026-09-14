// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import webpackBundler from 'monosize-bundler-webpack';
import gitStorage from 'monosize-storage-git';

/**
 * Single source of truth for the bundle-size report artifact name and path.
 *
 * `monosize-storage-git` reads the base report from a GitHub Actions artifact by
 * matching this exact name, but it does NOT control the `actions/upload-artifact`
 * step that produces it — so these values must be consumed by the workflow instead
 * of being duplicated there. See `.github/scripts/monosize-report-artifact-meta.mjs`.
 */
export const reportArtifactName = 'monosize-bundle-size-report';
export const reportOutputPath = 'dist/bundle-size-report.json';

/** @type {import('monosize').MonoSizeConfig} */
const config = {
  repository: 'https://github.com/microsoft/fluentui',
  storage: gitStorage({
    owner: 'microsoft',
    repo: 'fluentui',
    workflowFileName: 'bundle-size-base.yml',
    outputPath: reportOutputPath,
    artifactName: reportArtifactName,
  }),
  bundler: webpackBundler(config => {
    config.externals = config.externals ?? {};
    config.externals = {
      react: 'React',
      'react/jsx-runtime': 'jsxRuntime',
      'react-dom': 'ReactDOM',
      'react/compiler-runtime': 'ReactCompilerRuntime',
    };
    // ESM-first packages emit bare subpath imports (e.g. `use-sync-external-store/shim`) that lack
    // a file extension. Once measured packages are `type: module`, webpack treats their `lib/` as
    // ESM and enforces fully-specified imports; disable that so legacy CJS deps still resolve.
    config.module = config.module ?? {};
    config.module.rules = config.module.rules ?? [];
    config.module.rules.push({ test: /\.[cm]?js$/, resolve: { fullySpecified: false } });
    return config;
  }),
  reportResolvers: {
    packageName: async packageRoot => {
      const packageJson = await fs.promises.readFile(path.join(packageRoot, 'package.json'), 'utf-8');
      const json = JSON.parse(packageJson);
      return json.name.replace('@fluentui/', '');
    },
  },
};

export default config;
