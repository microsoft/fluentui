import { mergeProps } from '@fluentui/react-bindings';
import { defaultComposeOptions } from '../../src/compose/consts';

describe('mergeProps', () => {
  const selfSlot = { __self: defaultComposeOptions.slots.__self };

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
            _state => {
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
});
