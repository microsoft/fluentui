import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TagPickerContextValue } from '../../contexts/TagPickerContext';
import { ComboboxSlots } from '@fluentui/react-combobox';

export type TagPickerControlSlots = {
  root: Slot<'div'>;
  secondaryAction: Slot<'span'>;
} & Pick<ComboboxSlots, 'expandIcon'>;

/**
 * PickerControl Props
 */
export type TagPickerControlProps = ComponentProps<Partial<TagPickerControlSlots>>;

/**
 * State used in rendering PickerControl
 */
export type TagPickerControlState = ComponentState<TagPickerControlSlots> &
  Pick<TagPickerContextValue, 'size' | 'appearance' | 'disabled'>;
