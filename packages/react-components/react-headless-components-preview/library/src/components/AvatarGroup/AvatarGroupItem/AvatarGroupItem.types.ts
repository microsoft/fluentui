import type { AvatarGroupItemBaseProps, AvatarGroupItemBaseState } from '@fluentui/react-avatar';

export type { AvatarGroupItemSlots } from '@fluentui/react-avatar';

export type AvatarGroupItemState = AvatarGroupItemBaseState & {
  root: {
    /**
     * Data attribute set when the item is rendered inside the AvatarGroupPopover overflow list.
     */
    'data-overflow-item'?: string;
  };
};

/**
 * TODO: Update the AvatarGroupItemProps to extend from AvatarGroupItemBaseProps once the color and idForColor props are removed from the base props.
 */
export type AvatarGroupItemProps = Omit<AvatarGroupItemBaseProps, 'color' | 'idForColor'>;
