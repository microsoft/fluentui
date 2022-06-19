import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DialogTitleSlots = {
  root: Slot<'div'>;
};

/**
 * DialogTitle Props
 */
export type DialogTitleProps = ComponentProps<DialogTitleSlots> & {};

/**
 * State used in rendering DialogTitle
 */
export type DialogTitleState = ComponentState<DialogTitleSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from DialogTitleProps.
// & Required<Pick<DialogTitleProps, 'propName'>>
