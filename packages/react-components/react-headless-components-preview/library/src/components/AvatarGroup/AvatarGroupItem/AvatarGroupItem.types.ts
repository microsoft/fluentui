import type { AvatarGroupItemBaseProps, AvatarGroupItemBaseState } from '@fluentui/react-avatar';

export type { AvatarGroupItemSlots } from '@fluentui/react-avatar';

export type AvatarGroupItemState = AvatarGroupItemBaseState & {
  root: { 'data-overflow-item'?: string };
};

/**
 * TODO: Update the AvatarGroupItemProps to extend from AvatarGroupItemBaseProps once the color and idForColor props are removed from the base props.
 */
export type AvatarGroupItemProps = Omit<AvatarGroupItemBaseProps, 'color' | 'idForColor'>;
