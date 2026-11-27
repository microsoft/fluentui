import type { AvatarBaseState } from '@fluentui/react-avatar';

export type { AvatarBaseProps as AvatarProps, AvatarBaseSlots as AvatarSlots } from '@fluentui/react-avatar';

export type AvatarState = AvatarBaseState & {
  root: {
    /**
     * Data attribute set when the avatar is active.
     */
    'data-active'?: string;
    /**
     * Data attribute set when the avatar is inactive.
     */
    'data-inactive'?: string;
  };
};
