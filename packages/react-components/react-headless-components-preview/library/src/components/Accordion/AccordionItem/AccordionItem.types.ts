import type {
  AccordionItemSlots as AccordionItemBaseSlots,
  AccordionItemProps as AccordionItemBaseProps,
  AccordionItemContextValues as AccordionItemBaseContextValues,
  AccordionItemState as AccordionItemBaseState,
} from '@fluentui/react-accordion';

export type AccordionItemSlots = AccordionItemBaseSlots;

export type AccordionItemProps = AccordionItemBaseProps;

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

export type AccordionItemContextValues = AccordionItemBaseContextValues;
