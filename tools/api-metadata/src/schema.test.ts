import {
  API_METADATA_CAPABILITIES_NONE,
  API_METADATA_COMPLETENESS_NONE,
  API_METADATA_DEFAULT_BOUNDS,
  API_METADATA_SCHEMA_VERSION,
} from './schema';

describe('metadata schema constants', () => {
  it('advertises schema major 1 and conservative empty capabilities', () => {
    expect(API_METADATA_SCHEMA_VERSION).toEqual({ major: 1, revision: 5 });
    expect(API_METADATA_CAPABILITIES_NONE).toEqual({
      api: { status: 'unsupported', reasons: ['not generated'] },
      effectiveTypes: { status: 'unsupported', reasons: ['not generated'] },
      guidance: { status: 'unsupported', reasons: ['not generated'] },
      search: { status: 'unsupported', reasons: ['not generated'] },
    });
    expect(API_METADATA_COMPLETENESS_NONE.api.status).toBe('unavailable');
    expect(API_METADATA_DEFAULT_BOUNDS.maxDepth).toBeGreaterThan(0);
  });
});
