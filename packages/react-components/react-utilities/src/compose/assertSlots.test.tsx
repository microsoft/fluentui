import { assertSlots } from './assertSlots';
import { SLOT_ELEMENT_TYPE_SYMBOL } from './constants';
import * as slot from './slot';
import { ComponentProps, ComponentState, Slot } from './types';

type TestSlots = {
  slotA?: Slot<'div', 'a'>;
  slotB?: Slot<'div'>;
  slotC?: Slot<'div'>;
};

type TestProps = ComponentProps<TestSlots> & {
  notASlot?: string;
  alsoNotASlot?: number;
};
type TestState = ComponentState<TestSlots>;

describe('assertSlots', () => {
  it('should not throw if all slots are properly declared', () => {
    const props: TestProps = { slotA: 'hello' };
    const state: TestState = {
      components: {
        slotA: 'div',
        slotB: 'div',
        slotC: 'div',
      },
      slotA: slot.optional(props.slotA, { elementType: 'div' }),
    };
    expect(() => assertSlots<TestSlots>(state)).not.toThrow();
  });
  it('should not throw if a slot is not declared with the `slot` function', () => {
    const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();
    const state: TestState = {
      components: {
        slotA: 'div',
        slotB: 'div',
        slotC: 'div',
      },
      slotA: {},
    };
    expect(() => assertSlots<TestSlots>(state)).not.toThrow();
    expect(state.slotA).toEqual({ [SLOT_ELEMENT_TYPE_SYMBOL]: 'div' });
    expect(consoleWarnMock).toHaveBeenCalledTimes(1);
    consoleWarnMock.mockRestore();
  });
  it('should not throw if a state.components.SLOT_NAME is not equivalent to the slot elementType', () => {
    const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();
    const props: TestProps = { slotA: 'hello' };
    const state: TestState = {
      components: {
        slotA: 'a',
        slotB: 'div',
        slotC: 'div',
      },
      slotA: slot.optional(props.slotA, { elementType: 'div' }),
    };
    expect(() => assertSlots<TestSlots>(state)).not.toThrow();
    expect(state.slotA).toEqual({ children: 'hello', [SLOT_ELEMENT_TYPE_SYMBOL]: 'a' });
    expect(consoleWarnMock).toHaveBeenCalledTimes(1);
    consoleWarnMock.mockRestore();
  });
});
