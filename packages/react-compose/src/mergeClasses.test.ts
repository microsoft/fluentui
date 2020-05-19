import { mergeClasses } from './mergeClasses';

describe('mergeClasses', () => {
  it('can merge classes', () => {
    expect(mergeClasses({ root: 'a b c', foo: 'd e' }, { root: 'x y z', foo: 'f g' }, { root: 'm' })).toEqual({
      root: 'a b c x y z m',
      foo: 'd e f g',
    });
  });

  it('can handle no input ', () => {
    expect(mergeClasses()).toEqual({});
  });

  it('can handle falsey values', () => {
    expect(
      mergeClasses({ root: 'a b c', foo: 'd e' }, undefined, { root: 'x y z', foo: 'f g' }, { root: 'm' }),
    ).toEqual({
      root: 'a b c x y z m',
      foo: 'd e f g',
    });
  });
});
