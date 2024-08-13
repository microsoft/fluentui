import * as React from 'react';
import { SLOT_ELEMENT_TYPE_SYMBOL } from './constants';
import { isSlot } from './isSlot';
import { ComponentState, ExtractSlotProps, SlotComponentType, SlotPropsRecord } from './types';
import * as slot from './slot';

type SlotComponents<Slots extends SlotPropsRecord> = {
  [K in keyof Slots]: SlotComponentType<ExtractSlotProps<Slots[K]>>;
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
      // this means a slot is being declared without using, slot.always or slot.optional or even resolveShorthand on the state hook,
      // but the render method is using the new `assertSlots` method. That scenario can be solved by simply updating the slot element with the proper element type
      // FIXME: this slot will still fail to support child render function scenario
      if (!isSlot(slotElement)) {
        typedState[slotName as keyof ComponentState<Slots>] = slot.always(slotElement, {
          elementType: typedState.components[slotName] as React.ComponentType<{}>,
        }) as ComponentState<Slots>[keyof ComponentState<Slots>];
        // eslint-disable-next-line no-console
        console.warn(/** #__DE-INDENT__ */ `
          @fluentui/react-utilities [${assertSlots.name}]:
          "state.${slotName}" is not a slot!
          Be sure to create slots properly by using "slot.always" or "slot.optional".
        `);
      } else {
        // This means a slot is being declared by using resolveShorthand on the state hook,
        // but the render method is using the new `assertSlots` method. That scenario can be solved by simply updating the slot element with the proper element type
        const { [SLOT_ELEMENT_TYPE_SYMBOL]: elementType } = slotElement;
        if (elementType !== typedState.components[slotName]) {
          slotElement[SLOT_ELEMENT_TYPE_SYMBOL] = typedState.components[slotName] as React.ComponentType<{}>;
          // eslint-disable-next-line no-console
          console.warn(/** #__DE-INDENT__ */ `
            @fluentui/react-utilities [${assertSlots.name}]:
            "state.${slotName}" element type differs from "state.components.${slotName}",
            ${elementType} !== ${typedState.components[slotName]}.
            Be sure to create slots properly by using "slot.always" or "slot.optional" with the correct elementType.
          `);
        }
      }
    }
  }
}
