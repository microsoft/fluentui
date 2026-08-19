import type { AccordionBaseProps, AccordionBaseState } from '@fluentui/react-accordion';

export type { AccordionSlots, AccordionContextValues } from '@fluentui/react-accordion';

export type AccordionProps = AccordionBaseProps;

export type AccordionState = AccordionBaseState & {
  root: {
    /**
     * Present when the accordion allows all items to be collapsed; omitted when one item must remain open.
     */
    'data-collapsible'?: string;
    /**
     * Present when the accordion allows multiple items to be expanded at once; omitted when only one item may be expanded.
     */
    'data-multiple'?: string;
  };
};
