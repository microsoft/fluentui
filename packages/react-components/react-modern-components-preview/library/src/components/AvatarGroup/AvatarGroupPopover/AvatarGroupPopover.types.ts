import type {
  AvatarGroupPopoverProps as AvatarGroupPopoverBaseProps,
  AvatarGroupPopoverState as AvatarGroupPopoverBaseState,
} from '@fluentui/react-headless-components-preview/avatar-group';
import type { AvatarSize } from '../../Avatar/Avatar.types';

export type {
  AvatarGroupPopoverPopoverProps,
  AvatarGroupPopoverSlots,
} from '@fluentui/react-headless-components-preview/avatar-group';

export type AvatarGroupPopoverProps = AvatarGroupPopoverBaseProps;

export type AvatarGroupPopoverState = AvatarGroupPopoverBaseState & {
  size: AvatarSize;
  triggerButton: AvatarGroupPopoverBaseState['triggerButton'] & {
    'data-indicator': AvatarGroupPopoverBaseState['indicator'];
    'data-layout'?: AvatarGroupPopoverBaseState['layout'];
    'data-open'?: '';
    'data-size': `${AvatarSize}`;
  };
};
