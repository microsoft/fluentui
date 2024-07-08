import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type AppNodeSlots = {
  root: Slot<'div'>;
};

/**
 * AppNode Props
 */
export type AppNodeProps = ComponentProps<AppNodeSlots> & {};

/**
 * State used in rendering AppNode
 */
export type AppNodeState = ComponentState<AppNodeSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from AppNodeProps.
// & Required<Pick<AppNodeProps, 'propName'>>
