import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TagContextValues, TagProps, TagSlots, TagState } from '../Tag/index';

export type InteractionTagContextValues = TagContextValues;

export type InteractionTagSlots = Omit<TagSlots, 'root' | 'dismissIcon'> & {
  root: NonNullable<Slot<'div'>>;
  dismissButton?: Slot<'button'>;
  content: NonNullable<Slot<'button'>>;
};

/**
 * InteractionTag Props
 */
export type InteractionTagProps = ComponentProps<Partial<InteractionTagSlots>> & Omit<TagProps, 'root' | 'dismissIcon'>;

/**
 * State used in rendering InteractionTag
 */
export type InteractionTagState = ComponentState<InteractionTagSlots> &
  Omit<TagState, 'components' | 'root' | 'dismissIcon'>;
