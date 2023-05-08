import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { Avatar } from '@fluentui/react-avatar';

export type TagSlots = {
  root: NonNullable<Slot<'div'>>;
  content?: Slot<'span'>;
  avatar?: Slot<typeof Avatar>;
  icon?: Slot<'span'>;
  primaryText?: Slot<'span'>;
  secondaryText?: Slot<'span'>;
  dismissButton?: NonNullable<Slot<'button'>>;
};

/**
 * Tag Props
 */
export type TagProps = ComponentProps<TagSlots> & {
  size?: 'extra-small' | 'small' | 'medium';
  shape?: 'rounded' | 'circular';
  appearance?: 'filled-darker' | 'filled-lighter' | 'tint' | 'outline';
  disabled?: boolean;
  checked?: boolean;
  dismissable?: boolean;
};

/**
 * State used in rendering Tag
 */
export type TagState = ComponentState<TagSlots> &
  Required<Pick<TagProps, 'appearance' | 'checked' | 'disabled' | 'dismissable' | 'shape' | 'size'>>;
