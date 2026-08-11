import { resolvePositioningShorthand } from './resolvePositioningShorthand';

describe('resolvePositioningShorthand', () => {
  it('resolves string shorthands', () => {
    expect(resolvePositioningShorthand('below-start')).toEqual({
      position: 'below',
      align: 'start',
    });
    expect(resolvePositioningShorthand('before-bottom')).toEqual({
      position: 'before',
      align: 'bottom',
    });
  });

  it('returns object shorthands unchanged', () => {
    const positioning = { position: 'after', align: 'top' } as const;

    expect(resolvePositioningShorthand(positioning)).toBe(positioning);
  });

  it('resolves an empty value to an empty object', () => {
    expect(resolvePositioningShorthand(undefined)).toEqual({});
    expect(resolvePositioningShorthand(null)).toEqual({});
  });
});
