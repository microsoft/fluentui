import type { AccordionBaseState } from '@fluentui/react-accordion';

export type {
  AccordionSlots,
  AccordionContextValue,
  AccordionContextValues,
  AccordionBaseProps as AccordionProps,
} from '@fluentui/react-accordion';

export type AccordionState = AccordionBaseState & {
  root: {
    /**
     * Data attribute set when every item in the accordion can be collapsed.
     */
    'data-collapsible'?: string;
    /**
     * Data attribute set to indicate whether the accordion allows multiple items to be expanded at once.
     */
    'data-multiple'?: string;
  };
};
