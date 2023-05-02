import { DialogTitleProps, DialogTitleSlots } from '@fluentui/react-dialog';
import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';

export type DrawerHeaderTitleSlots = DialogTitleSlots;

/**
 * DrawerHeaderTitle Props
 */
export type DrawerHeaderTitleProps = ComponentProps<DrawerHeaderTitleSlots> & {};

/**
 * State used in rendering DrawerHeaderTitle
 */
export type DrawerHeaderTitleState = ComponentState<DrawerHeaderTitleSlots> & {
  title: DialogTitleProps;
};
