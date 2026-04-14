import type {
  AccordionPanelSlots as AccordionPanelBaseSlots,
  AccordionPanelBaseProps,
  AccordionPanelBaseState,
} from '@fluentui/react-accordion';

export type AccordionPanelSlots = AccordionPanelBaseSlots;

export type AccordionPanelProps = AccordionPanelBaseProps;

export type AccordionPanelState = AccordionPanelBaseState & {
  root: {
    /**
     * Data attribute set when the accordion panel is open.
     */
    'data-open'?: string;
  };
};
