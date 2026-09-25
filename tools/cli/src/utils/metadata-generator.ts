import type {
  GeneratorOptions,
  GeneratorResult,
  MetadataGenerator,
  WrittenMetadataArtifacts,
} from '@fluentui/api-metadata';

type WriteGeneratedMetadata = (
  result: Pick<GeneratorResult, 'index' | 'records'>,
  outputDirectory: string,
) => WrittenMetadataArtifacts;

export function loadMetadataGenerator(): {
  generateApiMetadata: MetadataGenerator['generate'];
  writeGeneratedMetadata: WriteGeneratedMetadata;
} {
  return require('@fluentui/api-metadata/generator') as {
    generateApiMetadata: MetadataGenerator['generate'];
    writeGeneratedMetadata: WriteGeneratedMetadata;
  };
}
