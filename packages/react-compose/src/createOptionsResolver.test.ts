import { createOptionsResolver } from './createOptionsResolver';
import { defaultComposeOptions } from './mergeComposeOptions';

const nullRenderer = () => null;

describe('createOptionsResolver', () => {
  const defaultResolve = createOptionsResolver(defaultComposeOptions);
  const selfSlot = { __self: defaultComposeOptions.slots.__self };

  const defaultSlots = {
    slots: {
      ...selfSlot,
      root: nullRenderer,
      foo: nullRenderer,
      bar: nullRenderer,
    },
  };
  const defaultResolveWithSlots = createOptionsResolver({
    ...defaultComposeOptions,
    ...defaultSlots,
    classes: [{ root: 'root' }, () => ({ foo: 'foo' }), { bar: 'bar', baz: 'baz' }],
  });

  it('can pass through default options', () => {
    expect(defaultResolve({})).toEqual({
      state: {},
      slots: { ...selfSlot, root: 'div' },
      slotProps: {
        root: {},
      },
    });
  });

  it('can resolve "as" prop', () => {
    const state = { as: 'button' };

    expect(defaultResolve(state)).toEqual({
      state,
      slots: {
        ...selfSlot,
        root: 'button',
      },
      slotProps: {
        root: {},
      },
    });
  });

  it('can mix unrecognized props onto the root', () => {
    expect(defaultResolve({ 'data-foo': 'foo' })).toEqual({
      slots: { ...selfSlot, root: 'div' },
      state: {
        'data-foo': 'foo',
      },
      slotProps: {
        root: {
          'data-foo': 'foo',
        },
      },
    });
  });

  it('can resolve classes and mix them onto the slot props', () => {
    expect(defaultResolveWithSlots({ className: 'cn' })).toEqual({
      ...defaultSlots,
      state: { className: 'cn' },
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
      slots: { ...selfSlot, root: nullRenderer, foo: nullRenderer, bar: nullRenderer },
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
      ...defaultSlots,
      classes: [() => ({ root: 'root', foo: 'foo' }), {}, { bar: 'bar', baz: 'baz' }, state => (resultedState = state)],
    });

    expect(resolve(expectedState)).toEqual({
      state: {},
      slots: { ...selfSlot, root: nullRenderer, foo: nullRenderer, bar: nullRenderer },
      slotProps: {
        root: { className: 'root' },
        foo: { className: 'foo' },
        bar: { className: 'bar' },
      },
    });
    expect(resultedState).toBe(expectedState);
  });

  // it('can resolve slot props', () => {
  //   expect(defaultResolve);
  // });
});
