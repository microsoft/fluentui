import { SLOT_COMPONENT_METADATA_SYMBOL } from './constants';
import { isSlot } from './isSlot';
import { slot } from './slot';
import { ComponentState, ExtractSlotProps, SlotComponent, SlotPropsRecord } from './types';

type SlotComponents<Slots extends SlotPropsRecord> = {
  [K in keyof Slots]: SlotComponent<ExtractSlotProps<Slots[K]>>;
};

/**
 * @internal
 * Assertion method to ensure state slots properties are properly declared.
 * A properly declared slot must be declared by using the `slot` method.
 *
 * @example
 * ```tsx
 * export const renderInput_unstable = (state: InputState) => {
    assertSlots<InputSlots>(state);
    return (
      <state.root>
        {state.contentBefore && <state.contentBefore />}
        <state.input />
        {state.contentAfter && <state.contentAfter />}
      </state.root>
    );
  };
 * ```
 */
export function assertSlots<Slots extends SlotPropsRecord>(state: unknown): asserts state is SlotComponents<Slots> {
  /**
   * This verification is not necessary in production
   * as we're verifying static properties that will not change between environments
   */
  if (process.env.NODE_ENV !== 'production') {
    const typedState = state as ComponentState<Slots>;
    for (const slotName of Object.keys(typedState.components)) {
      const slotElement = typedState[slotName];
      if (slotElement === undefined) {
        continue;
      }
      if (!isSlot(slotElement)) {
        throw new Error(
          `${assertSlots.name} error: state.${slotName} is not a slot.\n` +
            `Be sure to create slots properly by using ${slot.name}`,
        );
      } else {
        const metadata = slotElement[SLOT_COMPONENT_METADATA_SYMBOL];
        if (metadata.elementType !== typedState.components[slotName]) {
          throw new TypeError(
            `${assertSlots.name} error: state.${slotName} element type differs from state.components.${slotName}, ${metadata.elementType} !== ${typedState.components[slotName]}. \n` +
              `Be sure to create slots properly by using ${slot.name} with the correct elementType`,
          );
        }
      }
    }
  }
}
