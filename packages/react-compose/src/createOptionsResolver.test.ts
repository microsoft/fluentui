import { createOptionsResolver } from './createOptionsResolver';
import { defaultComposeOptions } from './mergeComposeOptions';

const nullRenderer = () => null;

describe('createOptionsResolver', () => {
  const defaultResolve = createOptionsResolver(defaultComposeOptions);
  const defaultSlots = { slots: { root: nullRenderer, foo: nullRenderer, bar: nullRenderer } };
  const defaultResolveWithSlots = createOptionsResolver({
    ...defaultComposeOptions,
    ...defaultSlots,
    classes: [{ root: 'root' }, () => ({ foo: 'foo' }), { bar: 'bar', baz: 'baz' }],
  });

  it('can pass through default options', () => {
    expect(defaultResolve({})).toEqual({
      state: {},
      slots: {},
      slotProps: {},
    });
  });

  it('can resolve "as" prop', () => {
    const state = { as: 'button' };

    expect(defaultResolve(state)).toEqual({
      state,
      slots: {
        root: 'button',
      },
      slotProps: {},
    });
  });

  // it('can mix unrecognized props onto the root', () => {
  //   expect(defaultResolve({ 'data-foo': 'foo' })).toEqual({
  //     state: {},
  //     slots: {},
  //     slotProps: {
  //       root: {
  //         'data-foo': 'foo',
  //       },
  //     },
  //   });
  // });

  it('can resolve classes and mix them onto the slot props', () => {
    expect(defaultResolveWithSlots({ className: 'cn' })).toEqual({
      state: { className: 'cn' },
      slots: { root: nullRenderer, foo: nullRenderer, bar: nullRenderer },
      slotProps: {
        root: { className: 'root cn' },
        foo: { className: 'foo' },
        bar: { className: 'bar' },
      },
    });
  });

  it('can resolve 2 sets of classes', () => {
    const resolve = createOptionsResolver({
      ...defaultComposeOptions,
      ...defaultSlots,
      classes: [
        { root: 'root', foo: 'foo' },
        { bar: 'bar', baz: 'baz' },
      ],
    });

    expect(resolve({})).toEqual({
      state: {},
      slots: { root: nullRenderer, foo: nullRenderer, bar: nullRenderer },
      slotProps: {
        root: { className: 'root' },
        foo: { className: 'foo' },
        bar: { className: 'bar' },
      },
    });
  });

  it('can resolve class functions', () => {
    let resultedState = undefined;
    const expectedState = {};

    const resolve = createOptionsResolver({
      ...defaultComposeOptions,
      slots: { root: nullRenderer, foo: nullRenderer, bar: nullRenderer },
      classes: [() => ({ root: 'root', foo: 'foo' }), {}, { bar: 'bar', baz: 'baz' }, state => (resultedState = state)],
    });

    expect(resolve(expectedState)).toEqual({
      state: {},
      slots: { root: nullRenderer, foo: nullRenderer, bar: nullRenderer },
      slotProps: {
        root: { className: 'root' },
        foo: { className: 'foo' },
        bar: { className: 'bar' },
      },
    });
    expect(resultedState).toBe(expectedState);
  });

  it('can resolve slot props', () => {
    expect(defaultResolve);
  });
});
