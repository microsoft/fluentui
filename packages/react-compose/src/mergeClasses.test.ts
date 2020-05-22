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

  // it('can merge class functions', () => {
  //   type ExampleState = { foo: string; bar: string };
  //   const result = mergeClasses(
  //     (state: ExampleState) => ({ root: 'a', foo: state.foo }),
  //     (state: ExampleState) => ({ root: 'b', bar: state.bar }),
  //   );

  //   expect(result).toBeTruthy();
  //   expect(result({ foo: 'foo', bar: 'bar' })).toEqual({ root: 'a b', foo: 'foo', bar: 'bar' });
  // });

  it('can merge an object and a function', () => {});

  it('can merge a function and an object', () => {});

  it('can merge mixed content', () => {});
});
