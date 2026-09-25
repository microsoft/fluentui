import { rm } from 'node:fs/promises';
import { join } from 'node:path';

import type { ExecutorContext, ProjectConfiguration } from '@nx/devkit';

import type { ApiMetadataConfig } from '../../../api-metadata';
import { assetGlobsToFiles, copyAssets } from '../../build/lib/assets';
import { copyCjsTypesForPackage } from '../../build/lib/cjs-extension';
import type { BuildExecutorSchema } from '../../build/schema';

interface GeneratedMetadata {
  index: object;
  records: object[];
  diagnostics: Array<{ code: string; severity: string; message: string; path?: string }>;
}

interface ApiMetadataGeneratorModule {
  assertApiMetadataPublishable(result: GeneratedMetadata): void;
  generateApiMetadata(options: {
    packageRoot: string;
    system?: string;
    entrypoints?: string[];
  }): Promise<GeneratedMetadata>;
  markApiMetadataRolloutPartial(result: GeneratedMetadata, reasons: readonly string[]): GeneratedMetadata;
  writeGeneratedMetadata(result: GeneratedMetadata, outputDirectory: string): unknown;
}

export async function finalizeApiMetadata(
  config: ApiMetadataConfig,
  context: ExecutorContext,
  options: { declarationsFinalized: boolean },
): Promise<boolean> {
  const project = context.projectsConfigurations!.projects[context.projectName!];
  const packageRoot = join(context.root, project.root);

  if (!options.declarationsFinalized) {
    if (!(await copyStandaloneDeclarationAssets(project, context))) {
      return false;
    }
    await copyCjsTypesForPackage(packageRoot);
  }

  const { assertApiMetadataPublishable, generateApiMetadata, markApiMetadataRolloutPartial, writeGeneratedMetadata } =
    loadApiMetadataGenerator();
  let result = await generateApiMetadata({
    packageRoot,
    ...(config.system ? { system: config.system } : null),
    ...(config.entrypoints ? { entrypoints: config.entrypoints } : null),
  });
  result = markApiMetadataRolloutPartial(result, config.rolloutPartialReasons ?? []);
  assertApiMetadataPublishable(result);

  const outputDirectory = join(packageRoot, 'dist/metadata');
  await rm(outputDirectory, { recursive: true, force: true });
  writeGeneratedMetadata(result, outputDirectory);
  return true;
}

function loadApiMetadataGenerator(): ApiMetadataGeneratorModule {
  const entryPoint = '@fluentui/api-metadata/generator';
  return require(entryPoint) as ApiMetadataGeneratorModule;
}

async function copyStandaloneDeclarationAssets(
  project: ProjectConfiguration,
  context: ExecutorContext,
): Promise<boolean> {
  const buildOptions = project.targets?.build?.options as Partial<BuildExecutorSchema> | undefined;
  const declarationAssets = (buildOptions?.assets ?? []).filter(asset => {
    if (typeof asset === 'string') {
      return /\.d\.(?:c|m)?ts(?:__tmpl__)?$/.test(asset);
    }
    return /\.d\.(?:c|m)?ts(?:__tmpl__)?$/.test(asset.glob);
  });

  if (declarationAssets.length === 0) {
    return true;
  }

  const outputPathRoot = buildOptions?.outputPathRoot ?? project.root;
  return copyAssets(assetGlobsToFiles(declarationAssets, context.root, outputPathRoot));
}
