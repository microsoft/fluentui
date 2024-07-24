import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type AppItemSlots = {
  root: Slot<'div'>;
};

/**
 * AppItem Props
 */
export type AppItemProps = ComponentProps<AppItemSlots> & {};

/**
 * State used in rendering AppItem
 */
export type AppItemState = ComponentState<AppItemSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from AppItemProps.
// & Required<Pick<AppItemProps, 'propName'>>
