import type { AccordionPanelBaseState } from '@fluentui/react-accordion';

export type { AccordionPanelSlots, AccordionPanelBaseProps as AccordionPanelProps } from '@fluentui/react-accordion';

export type AccordionPanelState = AccordionPanelBaseState & {
  root: {
    /**
     * Data attribute set when the accordion panel is open.
     */
    'data-open'?: string;
  };
};
