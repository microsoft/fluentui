import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TagContextValues, TagProps, TagSlots } from '../Tag/index';
import { AvatarSize, AvatarShape } from '@fluentui/react-avatar';
import { ARIAButtonSlotProps } from '../../../../react-aria/src/index';

export type TagButtonContextValues = TagContextValues;

export type TagButtonSlots = Omit<TagSlots, 'root' | 'dismissIcon' | 'content'> & {
  root: NonNullable<Slot<'div'>>;
  dismissButton?: Slot<'button'>;
  content: NonNullable<ARIAButtonSlotProps<'div'>>;
};

// TODO amber common props type shared between Tag and TagButton
/**
 * TagButton Props
 */
export type TagButtonProps = ComponentProps<Partial<TagButtonSlots>> & {
  appearance?: 'filled-darker' | 'filled-lighter' | 'tint' | 'outline';
  // TODO implement tag checked state
  // checked?: boolean;
  disabled?: boolean;
  dismissible?: boolean;
  shape?: 'rounded' | 'circular';
  size?: 'extra-small' | 'small' | 'medium';
};

/**
 * State used in rendering TagButton
 */
export type TagButtonState = ComponentState<TagButtonSlots> &
  Required<
    Pick<TagProps, 'appearance' | 'disabled' | 'dismissible' | 'shape' | 'size'> & {
      avatarSize: AvatarSize | undefined;
      avatarShape: AvatarShape | undefined;
    }
  >;
