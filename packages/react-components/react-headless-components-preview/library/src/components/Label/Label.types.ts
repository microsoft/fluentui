import type { LabelSlots as LabelBaseSlots, LabelBaseProps, LabelBaseState } from '@fluentui/react-label';

/**
 * Label component slots
 */
export type LabelSlots = LabelBaseSlots;

/**
 * Label component props
 */
export type LabelProps = LabelBaseProps;

/**
 * Label component state
 */
export type LabelState = LabelBaseState & {
  root: {
    /**
     * Data attribute set when the label is disabled.
     */
    'data-disabled'?: string;
  };
};
