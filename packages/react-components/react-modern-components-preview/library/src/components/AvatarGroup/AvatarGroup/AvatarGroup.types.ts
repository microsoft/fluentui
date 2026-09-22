import type {
  AvatarGroupProps as AvatarGroupBaseProps,
  AvatarGroupState as AvatarGroupBaseState,
} from '@fluentui/react-headless-components-preview/avatar-group';
import type { AvatarSize } from '../../Avatar/Avatar.types';

export type {
  AvatarGroupContextValue,
  AvatarGroupContextValues,
  AvatarGroupSlots,
} from '@fluentui/react-headless-components-preview/avatar-group';

export type AvatarGroupProps = AvatarGroupBaseProps & {
  /** @default 32 */
  size?: AvatarSize;
};

export type AvatarGroupState = AvatarGroupBaseState & {
  size: AvatarSize;
  root: AvatarGroupBaseState['root'] & {
    'data-layout'?: AvatarGroupBaseState['layout'];
    'data-size': `${AvatarSize}`;
  };
};
