import type { AccordionItemState as AccordionItemBaseState } from '@fluentui/react-accordion';

export type {
  AccordionItemProps,
  AccordionItemSlots,
  AccordionItemContextValues as AccordionItemContextValues,
} from '@fluentui/react-accordion';

export type AccordionItemState = AccordionItemBaseState & {
  root: {
    /**
     * Present when the accordion item is disabled; omitted when enabled.
     */
    'data-disabled'?: string;
    /**
     * Present when the accordion item is open; omitted when the accordion item is closed.
     */
    'data-open'?: string;
  };
};
