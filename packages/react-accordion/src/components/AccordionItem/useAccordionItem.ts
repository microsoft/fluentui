import * as React from 'react';
import {
  makeMergeProps,
  resolveShorthandProps,
  useControllableValue,
  useId,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { AccordionItemContext, AccordionItemProps, AccordionItemState } from './AccordionItem.types';

/**
 * Consts listing which props are shorthand props.
 */
export const accordionItemShorthandProps = [];

const mergeProps = makeMergeProps<AccordionItemState>({ deepMerge: accordionItemShorthandProps });

/**
 * Returns the props and state required to render the component
 * @param props AccordionItem properties
 * @param ref reference to root HTMLElement of AccordionItem
 * @param defaultProps default values for the properties of AccordionItem
 */
export const useAccordionItem = (
  props: AccordionItemProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: AccordionItemProps,
): AccordionItemState => {
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
    },
    defaultProps,
    resolveShorthandProps(props, accordionItemShorthandProps),
  );
  state.context = useStateToContext(state);
  return state;
};

function useStateToContext({ defaultOpen = false, open, onToggle }: AccordionItemProps) {
  const headingId = useId('accordion-item-heading-');
  const panelId = useId('accordion-item-panel-');
  const [internalOpen, setInternalOpen] = useControllableValue(open, defaultOpen, onToggle);
  const onAccordionHeaderClick = React.useCallback(
    (ev: React.MouseEvent<HTMLElement>) => setInternalOpen(curr => !curr, ev),
    [setInternalOpen],
  );
  const context = React.useMemo<AccordionItemContext>(
    () => ({
      headingId,
      panelId,
      open: internalOpen ?? false,
      onAccordionHeaderClick,
    }),
    [headingId, panelId, internalOpen, onAccordionHeaderClick],
  );
  return context;
}
