import type { AvatarGroupItemBaseProps } from '@fluentui/react-avatar';

export type { AvatarGroupItemSlots, AvatarGroupItemBaseState as AvatarGroupItemState } from '@fluentui/react-avatar';

/**
 * TODO: Update the AvatarGroupItemProps to extend from AvatarGroupItemBaseProps once the color and idForColor props are removed from the base props.
 */
export type AvatarGroupItemProps = Omit<AvatarGroupItemBaseProps, 'color' | 'idForColor'>;
