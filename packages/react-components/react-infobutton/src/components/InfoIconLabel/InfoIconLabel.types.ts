import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type InfoIconLabelSlots = {
  root: Slot<'div'>;
};

/**
 * InfoIconLabel Props
 */
export type InfoIconLabelProps = ComponentProps<InfoIconLabelSlots> & {};

/**
 * State used in rendering InfoIconLabel
 */
export type InfoIconLabelState = ComponentState<InfoIconLabelSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from InfoIconLabelProps.
// & Required<Pick<InfoIconLabelProps, 'propName'>>
