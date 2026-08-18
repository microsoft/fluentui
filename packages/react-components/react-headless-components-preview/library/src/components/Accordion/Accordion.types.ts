import type { AccordionBaseProps, AccordionBaseState } from '@fluentui/react-accordion';

export type { AccordionSlots, AccordionContextValues } from '@fluentui/react-accordion';

export type AccordionProps = AccordionBaseProps;

export type AccordionState = AccordionBaseState & {
  root: {
    /**
     * Data attribute set to indicate whether the accordion allows multiple items to be expanded at once.
     */
    'data-collapsible'?: string;
    /**
     * Data attribute set to indicate whether the accordion allows multiple items to be expanded at once.
     */
    'data-multiple'?: string;
  };
};
