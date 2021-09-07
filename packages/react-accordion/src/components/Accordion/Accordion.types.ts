import * as React from 'react';
import type { ComponentProps, ComponentState, ObjectShorthandProps } from '@fluentui/react-utilities';
import type { AccordionItemValue } from '../AccordionItem/AccordionItem.types';

export type Dummy = 'dummy';

export type AccordionIndex = number | number[];

export type AccordionToggleEvent<E = HTMLElement> = React.MouseEvent<E> | React.KeyboardEvent<E>;

export type AccordionToggleEventHandler = (event: AccordionToggleEvent, data: AccordionToggleData) => void;

export interface AccordionContextValue {
  navigable: boolean;
  /**
   * The list of opened panels by index
   */
  openItems: AccordionItemValue[];
  /**
   * Callback used by AccordionItem to request a change on it's own opened state
   */
  requestToggle: AccordionToggleEventHandler;
}

export interface AccordionContextValues {
  accordion: AccordionContextValue;
}

export type AccordionSlots = {
  root: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
};

export interface AccordionCommons {
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
}

export interface AccordionToggleData {
  value: AccordionItemValue;
}

export interface AccordionProps extends ComponentProps<AccordionSlots>, Partial<AccordionCommons> {
  /**
   * Controls the state of the panel
   */
  openItems?: AccordionItemValue | AccordionItemValue[];
  /**
   * Default value for the uncontrolled state of the panel
   */
  defaultOpenItems?: AccordionItemValue | AccordionItemValue[];
  onToggle?: AccordionToggleEventHandler;
}

export interface AccordionState extends ComponentState<AccordionSlots>, AccordionCommons, AccordionContextValue {}
