import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { AvatarSize, AvatarShape } from '@fluentui/react-avatar';
import { TagSlots } from '../Tag/index';
import { InteractionTagContextValue } from '../../contexts/interactionTagContext';

export type PrimaryContextValues = {
  avatar: {
    size?: AvatarSize;
    shape?: AvatarShape;
  };
};

export type PrimarySlots = Omit<TagSlots, 'root' | 'dismissIcon'> & {
  root: NonNullable<Slot<'button'>>;
};

/**
 * Primary Props
 */
export type PrimaryProps = ComponentProps<Partial<PrimarySlots>>;

/**
 * State used in rendering Primary
 */
export type PrimaryState = ComponentState<PrimarySlots> &
  Required<Pick<InteractionTagContextValue, 'shape' | 'size' | 'appearance' | 'disabled' | 'hasSecondary'>> & {
    avatarSize: AvatarSize | undefined;
    avatarShape: AvatarShape | undefined;
  };
