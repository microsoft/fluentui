import type { AvatarGroupBaseProps, AvatarGroupBaseState } from '@fluentui/react-avatar';

export type { AvatarGroupContextValue, AvatarGroupContextValues, AvatarGroupSlots } from '@fluentui/react-avatar';

export type AvatarGroupProps = AvatarGroupBaseProps;

export type AvatarGroupState = AvatarGroupBaseState & {
  root: {
    'data-layout'?: AvatarGroupBaseState['layout'];
  };
};
