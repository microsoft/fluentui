import { formatFiles, generateFiles, joinPathFragments, readJson, updateJson, type Tree } from '@nx/devkit';
import * as path from 'node:path';

import { getProjectConfig } from '../../utils';
import type { PackageJson, TsConfig } from '../../types';
import type { AddExportSubpathGeneratorSchema } from './schema';

export default async function addExportSubpathGenerator(tree: Tree, schema: AddExportSubpathGeneratorSchema) {
  const { project, subpath, enableApiReport = false } = schema;
  const sourceEntrypoint = schema.sourceEntrypoint ?? `${subpath}/index.ts`;

  const { projectConfig, paths } = getProjectConfig(tree, { packageName: project });

  // ── 1. Derive paths ──────────────────────────────────────────────────────────

  const primaryApiExtractorPath = joinPathFragments(paths.configRoot, 'api-extractor.json');
  const subpathApiExtractorPath = joinPathFragments(paths.configRoot, `api-extractor.${subpath}.json`);

  if (!tree.exists(primaryApiExtractorPath)) {
    throw new Error(
      `Cannot find primary api-extractor.json at "${primaryApiExtractorPath}". ` +
        `Make sure the project has already been set up with generate-api.`,
    );
  }

  if (tree.exists(subpathApiExtractorPath)) {
    throw new Error(
      `Sub-path config already exists at "${subpathApiExtractorPath}". ` +
        `If you want to regenerate it, delete the file first.`,
    );
  }

  // ── 2. Derive mainEntryPointFilePath from the primary config ─────────────────

  const primaryConfig = readJson<{ mainEntryPointFilePath?: string }>(tree, primaryApiExtractorPath);
  const primaryMainEntry = primaryConfig.mainEntryPointFilePath;

  if (!primaryMainEntry) {
    throw new Error(
      `"mainEntryPointFilePath" is not set in "${primaryApiExtractorPath}". ` +
        `The primary api-extractor.json must declare this field.`,
    );
  }

  // Replace the terminal index.d.ts segment with the sub-path entrypoint:
  // e.g. "...library/src/index.d.ts" → "...library/src/utils/index.d.ts"
  // sourceEntrypoint may be "utils/index.ts" — convert .ts → .d.ts
  const sourceDtsRelative = sourceEntrypoint.replace(/\.tsx?$/, '.d.ts');
  const newMainEntry = primaryMainEntry.replace(/\/src\/index\.d\.ts$/, `/src/${sourceDtsRelative}`);

  if (newMainEntry === primaryMainEntry) {
    throw new Error(
      `Could not derive new mainEntryPointFilePath from "${primaryMainEntry}". ` +
        `Expected the primary config to end with "/src/index.d.ts".`,
    );
  }

  // ── 3. Derive dtsRollup output path ──────────────────────────────────────────

  // The output will be dist/{subpath}/index.d.ts
  // e.g. <projectFolder>/dist/utils/index.d.ts
  const dtsOutputPath = `<projectFolder>/dist/${subpath}/index.d.ts`;

  // ── 4. Write config/api-extractor.{subpath}.json ────────────────────────────

  const subpathConfig: Record<string, unknown> = {
    $schema: 'https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json',
    extends: '@fluentui/scripts-api-extractor/api-extractor.common.v-next.json',
    mainEntryPointFilePath: newMainEntry,
    apiReport: {
      enabled: enableApiReport,
      ...(enableApiReport ? { reportFileName: `<unscopedPackageName>.${subpath}` } : {}),
    },
    dtsRollup: {
      enabled: true,
      untrimmedFilePath: dtsOutputPath,
    },
  };

  tree.write(subpathApiExtractorPath, JSON.stringify(subpathConfig, null, 2) + '\n');

  // ── 5. Create src/{subpath}/index.ts stub if it doesn't exist ────────────────

  const sourceEntrypointPath = joinPathFragments(paths.sourceRoot, sourceEntrypoint);
  if (!tree.exists(sourceEntrypointPath)) {
    tree.write(sourceEntrypointPath, `// TODO: add exports for the "${subpath}" sub-path\n`);
  }

  // ── 6. Derive the JS module output paths from existing main export ─────────────

  const packageJson = readJson<PackageJson>(tree, paths.packageJson);
  const mainExport = typeof packageJson.exports?.['.'] === 'object' ? packageJson.exports['.'] : null;

  // Derive default JS paths based on the main entry (replace lib/index.js → lib/{subpath}/index.js)
  const deriveJsPath = (base: string | undefined) => {
    if (!base || typeof base !== 'string') return undefined;
    return base.replace(/\/index\.js$/, `/${subpath}/index.js`);
  };

  const newExportEntry: PackageJson['exports'][string] = {
    types: `./dist/${subpath}/index.d.ts`,
    node: deriveJsPath(mainExport?.node) ?? `./lib-commonjs/${subpath}/index.js`,
    import: deriveJsPath(mainExport?.import) ?? `./lib/${subpath}/index.js`,
    require: deriveJsPath(mainExport?.require) ?? `./lib-commonjs/${subpath}/index.js`,
  };

  // ── 7. Update package.json exports + files ────────────────────────────────────

  updateJson<PackageJson>(tree, paths.packageJson, json => {
    json.exports = json.exports ?? {};

    // Insert the new sub-path entry before "./package.json"
    const updatedExports: PackageJson['exports'] = {};
    let inserted = false;
    for (const [key, value] of Object.entries(json.exports)) {
      if (key === './package.json' && !inserted) {
        updatedExports[`./${subpath}`] = newExportEntry;
        inserted = true;
      }
      updatedExports[key] = value;
    }
    if (!inserted) {
      updatedExports[`./${subpath}`] = newExportEntry;
    }
    json.exports = updatedExports;

    // Update files to include the new dist output
    const dtsGlob = `dist/${subpath}/*.d.ts`;
    if (!json.files?.includes(dtsGlob)) {
      json.files = [...(json.files ?? []), dtsGlob];
    }

    return json;
  });

  await formatFiles(tree);
}
