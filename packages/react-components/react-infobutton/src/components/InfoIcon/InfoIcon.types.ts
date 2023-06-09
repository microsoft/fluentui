import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type InfoIconSlots = {
  root: Slot<'div'>;
};

/**
 * InfoIcon Props
 */
export type InfoIconProps = ComponentProps<InfoIconSlots> & {};

/**
 * State used in rendering InfoIcon
 */
export type InfoIconState = ComponentState<InfoIconSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from InfoIconProps.
// & Required<Pick<InfoIconProps, 'propName'>>
