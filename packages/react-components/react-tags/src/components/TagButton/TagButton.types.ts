import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TagContextValues, TagProps, TagSlots, TagState } from '../Tag/index';

export type TagButtonContextValues = TagContextValues;

export type TagButtonSlots = Omit<TagSlots, 'root' | 'dismissIcon'> & {
  root: NonNullable<Slot<'div'>>;
  dismissButton?: Slot<'button'>;
  content: NonNullable<Slot<'button'>>;
};

/**
 * TagButton Props
 */
export type TagButtonProps = ComponentProps<Partial<TagButtonSlots>> & Omit<TagProps, 'root' | 'dismissIcon'>;

/**
 * State used in rendering TagButton
 */
export type TagButtonState = ComponentState<TagButtonSlots> & Omit<TagState, 'components' | 'root' | 'dismissIcon'>;
