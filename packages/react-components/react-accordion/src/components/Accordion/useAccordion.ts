import * as React from 'react';
import { getIntrinsicElementProps, useControllableState, useEventCallback, slot } from '@fluentui/react-utilities';
import type { AccordionProps, AccordionState } from './Accordion.types';
import type { AccordionItemValue } from '../AccordionItem/AccordionItem.types';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { AccordionRequestToggleData } from '../../contexts/accordion';

/**
 * Returns the props and state required to render the component
 * @param props - Accordion properties
 * @param ref - reference to root HTMLElement of Accordion
 */
export const useAccordion_unstable = <Value = AccordionItemValue>(
  props: AccordionProps<Value>,
  ref: React.Ref<HTMLElement>,
): AccordionState<Value> => {
  const {
    openItems: controlledOpenItems,
    defaultOpenItems,
    multiple = false,
    collapsible = false,
    onToggle,
    // eslint-disable-next-line deprecation/deprecation
    navigation,
  } = props;
  const [openItems, setOpenItems] = useControllableState({
    state: React.useMemo(() => normalizeValues(controlledOpenItems), [controlledOpenItems]),
    defaultState: defaultOpenItems && (() => initializeUncontrolledOpenItems({ defaultOpenItems, multiple })),
    initialState: [],
  });

  /** FIXME: deprecated will be removed after navigation prop is removed */
  const arrowNavigationProps = useArrowNavigationGroup({
    circular: navigation === 'circular',
    tabbable: true,
  });

  const requestToggle = useEventCallback((data: AccordionRequestToggleData<Value>) => {
    const nextOpenItems = updateOpenItems(data.value, openItems, multiple, collapsible);
    onToggle?.(data.event, { value: data.value, openItems: nextOpenItems });
    setOpenItems(nextOpenItems);
  });

  return {
    collapsible,
    multiple,
    navigation,
    openItems,
    requestToggle,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ...props,
        // eslint-disable-next-line deprecation/deprecation
        ...(navigation ? arrowNavigationProps : undefined),
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: ref as React.Ref<HTMLDivElement>,
      }),
      { elementType: 'div' },
    ),
  };
};

/**
 * Initial value for the uncontrolled case of the list of open indexes
 */
function initializeUncontrolledOpenItems<Value = AccordionItemValue>({
  defaultOpenItems,
  multiple,
}: Pick<AccordionProps<Value>, 'defaultOpenItems' | 'multiple'>): Value[] {
  if (defaultOpenItems !== undefined) {
    if (Array.isArray(defaultOpenItems)) {
      return multiple ? defaultOpenItems : [defaultOpenItems[0]];
    }
    return [defaultOpenItems];
  }
  return [];
}

/**
 * Updates the list of open indexes based on an index that changes
 * @param value - the index that will change
 * @param previousOpenItems - list of current open indexes
 * @param multiple - if Accordion support multiple Panels opened at the same time
 * @param collapsible - if Accordion support multiple Panels closed at the same time
 */
function updateOpenItems<Value = AccordionItemValue>(
  value: Value,
  previousOpenItems: Value[],
  multiple: boolean,
  collapsible: boolean,
) {
  if (multiple) {
    if (previousOpenItems.includes(value)) {
      if (previousOpenItems.length > 1 || collapsible) {
        return previousOpenItems.filter(i => i !== value);
      }
    } else {
      return [...previousOpenItems, value].sort();
    }
  } else {
    return previousOpenItems[0] === value && collapsible ? [] : [value];
  }
  return previousOpenItems;
}

/**
 * Normalizes Accordion index into an array of indexes
 */
function normalizeValues<Value = AccordionItemValue>(index?: Value | Value[]): Value[] | undefined {
  if (index === undefined) {
    return undefined;
  }
  return Array.isArray(index) ? index : [index];
}
