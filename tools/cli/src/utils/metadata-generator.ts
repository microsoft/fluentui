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
  const generator = () =>
    require('@fluentui/api-metadata/generator') as {
      generateApiMetadata: MetadataGenerator['generate'];
      writeGeneratedMetadata: WriteGeneratedMetadata;
    };
  return {
    writeGeneratedMetadata: (result, outputDirectory) => generator().writeGeneratedMetadata(result, outputDirectory),
    generateApiMetadata: options => {
      const { generateWithDeclarationCache } = require('./declaration-cache') as {
        generateWithDeclarationCache(
          options: GeneratorOptions,
          generate: MetadataGenerator['generate'],
        ): Promise<GeneratorResult>;
      };
      return generateWithDeclarationCache(options, request => generator().generateApiMetadata(request));
    },
  };
}
