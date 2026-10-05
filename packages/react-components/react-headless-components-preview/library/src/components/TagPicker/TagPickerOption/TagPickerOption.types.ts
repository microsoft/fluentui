import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { OptionSlots, OptionState } from '../../Dropdown/Option';
import type * as React from 'react';

// Only the root slot is surfaced in TagPickerOptionSlots.
// checkIcon (the other OptionSlots member) is an internal rendering detail managed by
// useOption / useOptionBase_unstable; exposing it here would force every consumer to
// supply it, and it is not part of the upstream TagPickerOption public API.
export type TagPickerOptionSlots = Pick<OptionSlots, 'root'> & {
  /**
   * Media rendered before the option's text content (e.g. an avatar or icon).
   */
  media?: Slot<'div'>;
  /**
   * Secondary text rendered after the option's text content.
   */
  secondaryContent?: Slot<'span'>;
};

/**
 * TagPickerOption Props
 *
 * Uses ComponentProps<TagPickerOptionSlots> so all public slots and root attributes are
 * represented by the component's own slot contract.
 */
export type TagPickerOptionProps = ComponentProps<TagPickerOptionSlots> & {
  /**
   * Unique string value for this option, used to track selection state.
   */
  value: string;
  /**
   * Sets an option to the `disabled` state.
   * Disabled options cannot be selected, but are still keyboard navigable.
   */
  disabled?: boolean;
} & (
    | {
        /**
         * An optional override for the string value of the option's display text,
         * defaulting to the option's child content.
         */
        text?: string;
        children: string;
      }
    | {
        /**
         * The string value of the option's display text when its children are not a string.
         */
        text: string;
        children?: React.ReactNode;
      }
  );

/**
 * State used in rendering the headless TagPickerOption.
 * OptionState is retained (rather than the narrower upstream state) so that
 * disabled/selected/checkIcon rendering from useOption is available at render time.
 */
export type TagPickerOptionState = OptionState & ComponentState<TagPickerOptionSlots>;
