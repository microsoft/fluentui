import * as React from 'react';
import { ComponentProps, ComponentState, Descendants, SetDescendant } from '@fluentui/react-utilities';

export type AccordionIndex = number | number[];

export type AccordionToggleEvent<E = HTMLElement> = React.MouseEvent<E> | React.KeyboardEvent<E>;

export type AccordionToggleEventHandler = (event: AccordionToggleEvent, data: AccordionToggleData) => void;

export interface AccordionContextValue {
  navigable: boolean;
  /**
   * The list of opened panels by index
   */
  openItems: number[];
  /**
   * Callback used by AccordionItem to request a change on it's own opened state
   */
  requestToggle: AccordionToggleEventHandler;
}

export type AccordionSlots = {};

export interface AccordionCommons extends React.HTMLAttributes<HTMLElement> {
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
  index: number;
}

export interface AccordionProps extends ComponentProps<AccordionSlots>, Partial<AccordionCommons> {
  /**
   * Controls the state of the panel
   */
  index?: AccordionIndex;
  /**
   * Default value for the uncontrolled state of the panel
   */
  defaultIndex?: AccordionIndex;
  onToggle?: AccordionToggleEventHandler;
}

export interface AccordionState extends ComponentState<AccordionSlots>, AccordionCommons, AccordionContextValue {
  /**
   * Ref to the root slot
   */
  ref: React.Ref<HTMLElement>;
  descendants: Descendants;
  setDescendant: SetDescendant;
}
