import { createContext, ContextSelector, useContextSelector } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import { AccordionItemValue } from '../AccordionItem';
import { AccordionToggleData, AccordionToggleEvent } from '../Accordion';

export type AccordionRequestToggleData<Value = AccordionItemValue> = { event: AccordionToggleEvent } & Pick<
  AccordionToggleData<Value>,
  'value'
>;

export type AccordionContextValue<Value = AccordionItemValue> = {
  /**
   * The list of opened panels by index
   */
  openItems: AccordionItemValue[];
  /**
   * Callback used by AccordionItem to request a change on it's own opened state
   * Should be used to toggle AccordionItem
   */
  requestToggle: (data: AccordionRequestToggleData<Value>) => void;
  collapsible: boolean;
  multiple: boolean;
  navigation: 'linear' | 'circular' | undefined;
};

const AccordionContext = createContext<AccordionContextValue | undefined>(undefined) as Context<AccordionContextValue>;

const accordionContextDefaultValue: AccordionContextValue = {
  openItems: [],
  collapsible: false,
  multiple: false,
  navigation: undefined,
  requestToggle() {
    /* noop */
  },
};

export const { Provider: AccordionProvider } = AccordionContext;
export const useAccordionContext_unstable = <T>(selector: ContextSelector<AccordionContextValue, T>): T =>
  useContextSelector(AccordionContext, (ctx = accordionContextDefaultValue) => selector(ctx));
