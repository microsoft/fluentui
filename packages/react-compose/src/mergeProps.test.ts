import { mergeProps } from './mergeProps';
import { defaultComposeOptions } from './defaultComposeOptions';
import { ComposePreparedOptions } from './types';

const nullRenderer = () => null;

describe('mergeProps', () => {
  const selfSlot = { __self: defaultComposeOptions.slots.__self };

  const defaultSlots = {
    slots: {
      ...selfSlot,
      root: nullRenderer,
      foo: nullRenderer,
      bar: nullRenderer,
    },
  };
  const defaultOptionsWithSlots: ComposePreparedOptions = {
    ...defaultComposeOptions,
    ...defaultSlots,
    classes: [{ root: 'root' }, () => ({ foo: 'foo' }), { bar: 'bar', baz: 'baz' }],
  };

  it('can pass through default options', () => {
    expect(mergeProps({}, defaultComposeOptions)).toEqual({
      state: {},
      slots: { ...selfSlot, root: 'div' },
      slotProps: {
        root: {},
      },
    });
  });

  it('can pass through default slot props', () => {
    expect(
      mergeProps<{ id: string }>(
        { id: 'abc' },
        {
          ...defaultComposeOptions,
          handledProps: ['id'],
          slotProps: [
            state => {
              return {
                slot1: { id: 'not this one' },
              };
            },
            state => {
              return {
                slot1: { id: state.id },
              };
            },
          ],
        },
      ),
    ).toEqual({
      state: { id: 'abc' },
      slots: { ...selfSlot, root: 'div' },
      slotProps: {
        root: {},
        slot1: { id: 'abc' },
      },
    });
  });

  it('can resolve "as" prop', () => {
    const state = { as: 'button' };

    expect(mergeProps(state, defaultComposeOptions)).toEqual({
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
    expect(mergeProps({ 'data-foo': 'foo' }, defaultComposeOptions)).toEqual({
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
    expect(mergeProps({ className: 'cn' }, defaultOptionsWithSlots)).toEqual({
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
    expect(
      mergeProps(
        {},
        {
          ...defaultComposeOptions,
          ...defaultSlots,
          classes: [
            { root: 'root', foo: 'foo' },
            { bar: 'bar', baz: 'baz' },
          ],
        },
      ),
    ).toEqual({
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

    expect(
      mergeProps(expectedState, {
        ...defaultComposeOptions,
        ...defaultSlots,
        classes: [
          () => ({ root: 'root', foo: 'foo' }),
          {},
          { bar: 'bar', baz: 'baz' },
          state => (resultedState = state),
        ],
      }),
    ).toEqual({
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
});
