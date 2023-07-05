import { assertSlots } from './assertSlots';
import { slot } from './slot';
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
      slotA: slot(props.slotA, { elementType: 'div' }),
    };
    expect(() => assertSlots<TestSlots>(state)).not.toThrow();
  });
  it('should throw if a slot is not declared with the `slot` function', () => {
    const state: TestState = {
      components: {
        slotA: 'div',
        slotB: 'div',
        slotC: 'div',
      },
      slotA: {},
    };
    expect(() => assertSlots<TestSlots>(state)).toThrow();
  });
  it('should throw if a state.components.SLOT_NAME is not equivalent to the slot elementType', () => {
    const props: TestProps = { slotA: 'hello' };
    const state: TestState = {
      components: {
        slotA: 'a',
        slotB: 'div',
        slotC: 'div',
      },
      slotA: slot(props.slotA, { elementType: 'div' }),
    };
    expect(() => assertSlots<TestSlots>(state)).toThrow();
  });
});
