import type { AccordionHeaderBaseState } from '@fluentui/react-accordion';

export type {
  AccordionHeaderSlots,
  AccordionHeaderBaseProps as AccordionHeaderProps,
  AccordionHeaderContextValues,
} from '@fluentui/react-accordion';

export type AccordionHeaderState = AccordionHeaderBaseState & {
  root: {
    /**
     * Present when the accordion item is open; omitted when the accordion item is closed.
     */
    'data-open'?: string;

    /**
     * Present when the accordion header is disabled; omitted when enabled.
     */
    'data-disabled'?: string;

    /**
     * Data attribute reflecting the expand icon position. Value is 'start' or 'end'.
     */
    'data-expand-icon-position'?: string;
  };
};
