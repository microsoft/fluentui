import { normalizeFeature, parseFeatureToken, pickBrowsers, splitCsv } from './generate';

type AllFeatures = Parameters<typeof normalizeFeature>[2];

jest.mock('web-features', () => ({ features: {} }));

describe('parseFeatureToken', () => {
  it('parses a plain top-level key', () => {
    expect(parseFeatureToken('popover')).toEqual({
      id: 'popover',
      groupKey: 'popover',
      compatKey: null,
      representativeCompatKey: null,
    });
  });

  it('parses a key with a representative compat key', () => {
    expect(parseFeatureToken('anchor-positioning=css.properties.anchor-name')).toEqual({
      id: 'anchor-positioning',
      groupKey: 'anchor-positioning',
      compatKey: null,
      representativeCompatKey: 'css.properties.anchor-name',
    });
  });

  it('parses a sub-feature (id=group::compatKey)', () => {
    expect(parseFeatureToken('anchor-name=anchor-positioning::css.properties.anchor-name')).toEqual({
      id: 'anchor-name',
      groupKey: 'anchor-positioning',
      compatKey: 'css.properties.anchor-name',
      representativeCompatKey: null,
    });
  });
});

describe('splitCsv', () => {
  it('splits, trims, and drops empty items', () => {
    expect(splitCsv(' a, b ,, c ')).toEqual(['a', 'b', 'c']);
    expect(splitCsv('')).toEqual([]);
  });
});

describe('pickBrowsers', () => {
  it('maps requested browsers and uses null for missing ones', () => {
    expect(pickBrowsers({ chrome: '116', firefox: '125' }, ['chrome', 'edge', 'firefox', 'safari'])).toEqual({
      chrome: '116',
      edge: null,
      firefox: '125',
      safari: null,
    });
  });

  it('returns all null when support is undefined', () => {
    expect(pickBrowsers(undefined, ['chrome', 'safari'])).toEqual({ chrome: null, safari: null });
  });
});

describe('normalizeFeature', () => {
  const browsers = ['chrome', 'edge', 'firefox', 'safari'];

  /* eslint-disable @typescript-eslint/naming-convention -- snake_case mirrors the web-features JSON shape */
  const allFeatures = {
    popover: {
      name: 'Popover',
      status: {
        baseline: 'low',
        baseline_low_date: '2025-01-27',
        support: { chrome: '116', edge: '116', firefox: '125', safari: '17' },
      },
    },
    dialog: {
      name: '<dialog>',
      status: {
        baseline: 'high',
        baseline_low_date: '2022-03-14',
        baseline_high_date: '2024-09-14',
        support: { chrome: '37', edge: '79', firefox: '98', safari: '15.4' },
      },
    },
    'anchor-positioning': {
      name: 'Anchor positioning',
      status: {
        baseline: false,
        support: {},
        by_compat_key: {
          'css.properties.anchor-name': {
            baseline: 'low',
            baseline_low_date: '2026-01-13',
            support: { chrome: '125', firefox: '147' },
          },
        },
      },
    },
    focusgroup: { name: 'focusgroup', status: { baseline: false, support: {} } },
  } as unknown as AllFeatures;
  /* eslint-enable @typescript-eslint/naming-convention */

  it('normalizes a top-level feature with aggregate support', () => {
    expect(normalizeFeature(parseFeatureToken('popover'), browsers, allFeatures)).toMatchObject({
      key: 'popover',
      name: 'Popover',
      baseline: 'low',
      baselineLowDate: '2025-01-27',
      baselineHighDate: null,
      partial: false,
      representativeBaseline: null,
      representativeBaselineLowDate: null,
      support: { chrome: '116', edge: '116', firefox: '125', safari: '17' },
    });
  });

  it('carries both baseline dates for a widely available feature', () => {
    expect(normalizeFeature(parseFeatureToken('dialog'), browsers, allFeatures)).toMatchObject({
      baseline: 'high',
      baselineLowDate: '2022-03-14',
      baselineHighDate: '2024-09-14',
    });
  });

  it('falls back to the representative compat key when the group is not Baseline', () => {
    expect(
      normalizeFeature(parseFeatureToken('anchor-positioning=css.properties.anchor-name'), browsers, allFeatures),
    ).toMatchObject({
      key: 'anchor-positioning',
      baseline: false,
      partial: true,
      representativeBaseline: 'low',
      representativeBaselineLowDate: '2026-01-13',
      support: { chrome: '125', edge: null, firefox: '147', safari: null },
    });
  });

  it('emits a sub-feature compat key as its own entry', () => {
    expect(
      normalizeFeature(
        parseFeatureToken('anchor-name=anchor-positioning::css.properties.anchor-name'),
        browsers,
        allFeatures,
      ),
    ).toMatchObject({
      key: 'anchor-name',
      name: 'anchor-name',
      baseline: 'low',
      baselineLowDate: '2026-01-13',
      partial: false,
      support: { chrome: '125', edge: null, firefox: '147', safari: null },
    });
  });

  it('keeps an empty support map for a feature with no native support', () => {
    const result = normalizeFeature(parseFeatureToken('focusgroup'), browsers, allFeatures);
    expect(result.baseline).toBe(false);
    expect(result.partial).toBe(false);
    expect(result.support).toEqual({ chrome: null, edge: null, firefox: null, safari: null });
  });

  it('throws for an unknown feature key', () => {
    expect(() => normalizeFeature(parseFeatureToken('nope'), browsers, allFeatures)).toThrow(/no feature "nope"/);
  });

  it('throws for a missing representative compat key', () => {
    expect(() =>
      normalizeFeature(parseFeatureToken('anchor-positioning=css.properties.missing'), browsers, allFeatures),
    ).toThrow(/Representative compat key/);
  });

  it('throws for a missing sub-feature compat key', () => {
    expect(() =>
      normalizeFeature(parseFeatureToken('x=anchor-positioning::css.properties.missing'), browsers, allFeatures),
    ).toThrow(/Compat key "css.properties.missing"/);
  });
});
