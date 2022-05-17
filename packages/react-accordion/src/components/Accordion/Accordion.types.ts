import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { AccordionItemValue } from '../AccordionItem/AccordionItem.types';

export type AccordionIndex = number | number[];

export type AccordionToggleEvent<E = HTMLElement> = React.MouseEvent<E> | React.KeyboardEvent<E>;

export type AccordionToggleEventHandler = (event: AccordionToggleEvent, data: AccordionToggleData) => void;

export type AccordionContextValue = Required<Pick<AccordionProps, 'collapsible'>> &
  Pick<AccordionProps, 'navigation'> & {
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
  root: Slot<'div'>;
};

export type AccordionToggleData = {
  value: AccordionItemValue;
};

export type AccordionProps = ComponentProps<AccordionSlots> & {
  /**
   * Default value for the uncontrolled state of the panel
   */
  defaultOpenItems?: AccordionItemValue | AccordionItemValue[];

  /**
   * Indicates if Accordion support multiple Panels closed at the same time
   */
  collapsible?: boolean;

  /**
   * Indicates if Accordion support multiple Panels opened at the same time
   */
  multiple?: boolean;

  /**
   * Indicates if keyboard navigation is available and gives two options,
   * linear or circular navigation
   */
  navigation?: 'linear' | 'circular';

  onToggle?: AccordionToggleEventHandler;

  /**
   * Controls the state of the panel
   */
  openItems?: AccordionItemValue | AccordionItemValue[];
};

export type AccordionState = ComponentState<AccordionSlots> & AccordionContextValue;
