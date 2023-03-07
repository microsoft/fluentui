import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type InfoLabelSlots = {
  root: Slot<'div'>;
};

/**
 * InfoLabel Props
 */
export type InfoLabelProps = ComponentProps<InfoLabelSlots> & {};

/**
 * State used in rendering InfoLabel
 */
export type InfoLabelState = ComponentState<InfoLabelSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from InfoLabelProps.
// & Required<Pick<InfoLabelProps, 'propName'>>
