import type { AvatarBaseState } from '@fluentui/react-avatar';

export type { AvatarBaseProps as AvatarProps, AvatarBaseSlots as AvatarSlots } from '@fluentui/react-avatar';

export type AvatarState = AvatarBaseState & {
  root: {
    /**
     * Data attribute set when the avatar is active or inactive.
     */
    'data-active'?: string;
  };
};
