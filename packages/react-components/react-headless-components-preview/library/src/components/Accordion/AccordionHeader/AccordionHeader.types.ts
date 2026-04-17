import type {
  AccordionHeaderSlots as AccordionHeaderBaseSlots,
  AccordionHeaderBaseProps,
  AccordionHeaderContextValues as AccordionHeaderBaseContextValues,
  AccordionHeaderBaseState,
} from '@fluentui/react-accordion';

export type AccordionHeaderSlots = AccordionHeaderBaseSlots;

export type AccordionHeaderProps = AccordionHeaderBaseProps;

export type AccordionHeaderState = AccordionHeaderBaseState & {
  root: {
    /**
     * Data attribute set when the accordion item is open.
     */
    'data-open'?: string;

    /**
     * Data attribute set when the accordion header is disabled.
     */
    'data-disabled'?: string;

    /**
     * Data attribute reflecting the expand icon position. Value is 'start' or 'end'.
     */
    'data-expand-icon-position'?: string;
  };
};

export type AccordionHeaderContextValues = AccordionHeaderBaseContextValues;
