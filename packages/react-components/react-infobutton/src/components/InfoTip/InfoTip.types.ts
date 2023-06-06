import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type InfoTipSlots = {
  root: Slot<'div'>;
};

/**
 * InfoTip Props
 */
export type InfoTipProps = ComponentProps<InfoTipSlots> & {};

/**
 * State used in rendering InfoTip
 */
export type InfoTipState = ComponentState<InfoTipSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from InfoTipProps.
// & Required<Pick<InfoTipProps, 'propName'>>
