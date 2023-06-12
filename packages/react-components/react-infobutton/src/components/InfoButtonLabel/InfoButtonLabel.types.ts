import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type InfoButtonLabelSlots = {
  root: Slot<'div'>;
};

/**
 * InfoButtonLabel Props
 */
export type InfoButtonLabelProps = ComponentProps<InfoButtonLabelSlots> & {};

/**
 * State used in rendering InfoButtonLabel
 */
export type InfoButtonLabelState = ComponentState<InfoButtonLabelSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from InfoButtonLabelProps.
// & Required<Pick<InfoButtonLabelProps, 'propName'>>
