import type { MetadataCapabilities, MetadataCompleteness, MetadataSchemaVersion } from './types';

export const API_METADATA_SCHEMA_VERSION: MetadataSchemaVersion = Object.freeze({
  major: 1,
  revision: 5,
});

export const API_METADATA_SCHEMA_ID = 'https://aka.ms/fluentui/api-metadata/v1' as const;

export const API_METADATA_DEFAULT_BOUNDS = Object.freeze({
  maxArrayLength: 10_000,
  maxBytes: 16 * 1024 * 1024,
  maxDepth: 64,
  maxDiagnostics: 1_000,
  maxObjectKeys: 256,
  maxRecords: 2_000,
  maxReferenceSpans: 10_000,
  maxRoutes: 50_000,
  maxStringLength: 1_000_000,
  maxSymbolsPerRecord: 10_000,
  maxTotalNodes: 1_000_000,
});

export const API_METADATA_CAPABILITIES_NONE: MetadataCapabilities = Object.freeze({
  api: Object.freeze({ status: 'unsupported', reasons: ['not generated'] }),
  effectiveTypes: Object.freeze({ status: 'unsupported', reasons: ['not generated'] }),
  guidance: Object.freeze({ status: 'unsupported', reasons: ['not generated'] }),
  search: Object.freeze({ status: 'unsupported', reasons: ['not generated'] }),
});

export const API_METADATA_COMPLETENESS_NONE: MetadataCompleteness = Object.freeze({
  api: Object.freeze({ status: 'unavailable', reasons: ['not generated'] }),
  guidance: Object.freeze({ status: 'unavailable', reasons: ['not generated'] }),
  search: Object.freeze({ status: 'unavailable', reasons: ['not generated'] }),
});
