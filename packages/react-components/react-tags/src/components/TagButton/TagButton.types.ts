import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { Avatar } from '@fluentui/react-avatar';

export type TagButtonSlots = {
  root: NonNullable<Slot<'div'>>;
  contentButton?: Slot<'button'>;
  avatar?: Slot<typeof Avatar>;
  icon?: Slot<'span'>;
  primaryText?: Slot<'span'>;
  secondaryText?: Slot<'span'>;
  dismissButton?: NonNullable<Slot<'button'>>;
};

/**
 * TagButton Props
 */
export type TagButtonProps = ComponentProps<TagButtonSlots> & {
  size?: 'extra-small' | 'small' | 'medium';
  shape?: 'rounded' | 'circular';
  appearance?: 'filled-darker' | 'filled-lighter' | 'tint' | 'outline';
  disabled?: boolean;
  checked?: boolean;
  dismissable?: boolean;
};

/**
 * State used in rendering TagButton
 */
export type TagButtonState = ComponentState<TagButtonSlots> &
  Required<Pick<TagButtonProps, 'appearance' | 'checked' | 'disabled' | 'dismissable' | 'shape' | 'size'>>;
