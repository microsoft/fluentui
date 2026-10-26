import type { AccordionItemState as AccordionItemBaseState } from '@fluentui/react-accordion';

export type {
  AccordionItemProps,
  AccordionItemSlots,
  AccordionItemContextValues as AccordionItemContextValues,
} from '@fluentui/react-accordion';

export type AccordionItemState = AccordionItemBaseState & {
  root: {
    /**
     * Data attribute set to indicate whether the accordion item is disabled.
     */
    'data-disabled'?: string;
    /**
     * Data attribute set to indicate whether the accordion item is open.
     */
    'data-open'?: string;
  };
};
