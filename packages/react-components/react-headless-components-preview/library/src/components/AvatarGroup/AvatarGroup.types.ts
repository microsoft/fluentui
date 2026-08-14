import type { AvatarGroupBaseState } from '@fluentui/react-avatar';

export type {
  AvatarGroupContextValue,
  AvatarGroupContextValues,
  AvatarGroupSlots,
  AvatarGroupBaseProps as AvatarGroupProps,
} from '@fluentui/react-avatar';

export type AvatarGroupState = AvatarGroupBaseState & {
  root: {
    'data-layout'?: AvatarGroupBaseState['layout'];
  };
};
