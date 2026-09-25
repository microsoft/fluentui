import type { ProjectConfiguration } from '@nx/devkit';

export interface ApiMetadataConfig {
  system?: string;
  entrypoints?: string[];
  rolloutPartialReasons?: string[];
}

export function readApiMetadataConfig(project: ProjectConfiguration): ApiMetadataConfig | undefined {
  const value = (project.metadata as { apiMetadata?: boolean | ApiMetadataConfig } | undefined)?.apiMetadata;

  if (value === true) {
    return {};
  }
  if (!value) {
    return undefined;
  }

  return {
    ...(value.system ? { system: value.system } : null),
    ...(value.entrypoints ? { entrypoints: [...new Set(value.entrypoints)].sort() } : null),
    ...(value.rolloutPartialReasons
      ? { rolloutPartialReasons: [...new Set(value.rolloutPartialReasons)].sort() }
      : null),
  };
}
