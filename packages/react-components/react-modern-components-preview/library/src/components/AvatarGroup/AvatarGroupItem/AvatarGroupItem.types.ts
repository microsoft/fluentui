import type {
  AvatarGroupItemProps as AvatarGroupItemBaseProps,
  AvatarGroupItemState as AvatarGroupItemBaseState,
} from '@fluentui/react-headless-components-preview/avatar-group';
import type { AvatarSize } from '../../Avatar/Avatar.types';

export type { AvatarGroupItemSlots } from '@fluentui/react-headless-components-preview/avatar-group';

export type AvatarGroupItemProps = AvatarGroupItemBaseProps;

export type AvatarGroupItemState = AvatarGroupItemBaseState & {
  size: AvatarSize;
  root: AvatarGroupItemBaseState['root'] & {
    'data-layout'?: AvatarGroupItemBaseState['layout'];
    'data-overflow-item'?: '';
    'data-size': `${AvatarSize}`;
  };
};
