import { resolvePositioningShorthand } from './resolvePositioningShorthand';

describe('resolvePositioningShorthand', () => {
  it('resolves string shorthands', () => {
    expect(resolvePositioningShorthand('below-start')).toEqual({
      align: 'start',
      position: 'below',
    });
  });

  it('returns object shorthands unchanged', () => {
    const positioning = { align: 'top', position: 'after' } as const;

    expect(resolvePositioningShorthand(positioning)).toBe(positioning);
  });

  it('resolves nullish values to an empty object', () => {
    expect(resolvePositioningShorthand(undefined)).toEqual({});
    expect(resolvePositioningShorthand(null)).toEqual({});
  });
});
