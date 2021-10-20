import * as React from 'react';
import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';
import type { AccordionItemValue } from '../AccordionItem/AccordionItem.types';

export type AccordionIndex = number | number[];

export type AccordionToggleEvent<E = HTMLElement> = React.MouseEvent<E> | React.KeyboardEvent<E>;

export type AccordionToggleEventHandler = (event: AccordionToggleEvent, data: AccordionToggleData) => void;

export type AccordionCommons = {
  /**
   * Indicates if keyboard navigation is available
   */
  navigable: boolean;
  /**
   * Indicates if Accordion support multiple Panels opened at the same time
   */
  multiple: boolean;
  /**
   * Indicates if Accordion support multiple Panels closed at the same time
   */
  collapsible: boolean;
};

export type AccordionContextValue = Omit<AccordionCommons, 'multiple'> & {
  /**
   * The list of opened panels by index
   */
  openItems: AccordionItemValue[];
  /**
   * Callback used by AccordionItem to request a change on it's own opened state
   * Should be used to toggle AccordionItem
   */
  requestToggle: (event: AccordionToggleEvent, data: AccordionToggleData) => void;
};

export type AccordionContextValues = {
  accordion: AccordionContextValue;
};

export type AccordionSlots = {
  root: IntrinsicShorthandProps<'div'>;
};

export type AccordionToggleData = {
  value: AccordionItemValue;
};

export type AccordionProps = ComponentProps<AccordionSlots> &
  Partial<AccordionCommons> & {
    /**
     * Controls the state of the panel
     */
    openItems?: AccordionItemValue | AccordionItemValue[];
    /**
     * Default value for the uncontrolled state of the panel
     */
    defaultOpenItems?: AccordionItemValue | AccordionItemValue[];
    onToggle?: AccordionToggleEventHandler;
  };

export type AccordionState = ComponentState<AccordionSlots> & AccordionCommons & AccordionContextValue;
