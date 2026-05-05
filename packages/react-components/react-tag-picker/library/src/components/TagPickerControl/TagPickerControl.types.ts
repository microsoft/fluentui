import type { ComponentProps, ComponentState, ExtractSlotProps, Slot } from '@fluentui/react-utilities';
import type { TagPickerContextValue } from '../../contexts/TagPickerContext';
import type { ComboboxSlots } from '@fluentui/react-combobox';
import type * as React from 'react';

export type TagPickerControlSlots = {
  root: Slot<ExtractSlotProps<Slot<'div'> & { style?: TagPickerControlCSSProperties }>>;
  /**
   * A secondary action should be a button-like element to be rendered right after
   * the trigger responsible for opening/closing the tag picker popover.
   */
  secondaryAction: Slot<'span'>;
} & Pick<ComboboxSlots, 'expandIcon'>;

export type TagPickerControlInternalSlots = {
  aside?: NonNullable<Slot<'span'>>;
};

export type TagPickerControlCSSProperties = React.CSSProperties & {
  '--fui-TagPickerControl-aside-width'?: string | number;
};

/**
 * PickerControl Props
 */
export type TagPickerControlProps = ComponentProps<Partial<TagPickerControlSlots>>;

/**
 * State used in rendering PickerControl
 */
export type TagPickerControlState = ComponentState<TagPickerControlSlots & TagPickerControlInternalSlots> &
  Pick<TagPickerContextValue, 'size' | 'appearance' | 'disabled'> & {
    invalid: boolean;
  };

/**
 * TagPickerControl Base Props - same as TagPickerControlProps (no design-only own props)
 */
export type TagPickerControlBaseProps = TagPickerControlProps;

/**
 * TagPickerControl Base State - omits design-only state sourced from context
 */
export type TagPickerControlBaseState = Omit<TagPickerControlState, 'size' | 'appearance'>;
