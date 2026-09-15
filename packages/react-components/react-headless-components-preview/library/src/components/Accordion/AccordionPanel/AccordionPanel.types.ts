import type { AccordionPanelBaseState } from '@fluentui/react-accordion';

export type { AccordionPanelSlots, AccordionPanelBaseProps as AccordionPanelProps } from '@fluentui/react-accordion';

export type AccordionPanelState = AccordionPanelBaseState & {
  root: {
    /**
     * Present when the accordion panel is open; omitted when the accordion panel is closed.
     */
    'data-open'?: string;
  };
};
