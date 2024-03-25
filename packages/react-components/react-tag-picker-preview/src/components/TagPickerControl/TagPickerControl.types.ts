import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TagPickerContextValue } from '../../contexts/TagPickerContext';

export type TagPickerControlSlots = {
  root: Slot<'div'>;
};

/**
 * PickerControl Props
 */
export type TagPickerControlProps = ComponentProps<TagPickerControlSlots>;

/**
 * State used in rendering PickerControl
 */
export type TagPickerControlState = ComponentState<TagPickerControlSlots> &
  Pick<TagPickerContextValue, 'size' | 'appearance' | 'disabled'>;
