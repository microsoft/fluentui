import * as React from 'react';
import { ComponentProps, Descendant } from '@fluentui/react-utilities';

export interface DropdownListProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Callback when checked items change for value with a name
   *
   * @param name - the name of the value
   * @param checkedItems - the items for this value that are checked
   */
  onCheckedValueChange?: (e: React.MouseEvent | React.KeyboardEvent, name: string, checkedItems: string[]) => void;

  /**
   * Map of all checked values
   */
  checkedValues?: Record<string, string[]>;

  /**
   * Default values to be checked on mount
   */
  defaultCheckedValues?: Record<string, string[]>;
}

export interface DropdownListState extends DropdownListProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;

  activeIndex: number;
  setActiveIndex: (update: React.SetStateAction<number>) => void;

  /**
   * Internal Context used by AccordionHeader and AccordionPanel communication
   */
  descendants: DropdownDescendant[];
  /**
   * Internal Context used by Accordion and AccordionItem communication
   */
  setDescendants: React.Dispatch<React.SetStateAction<DropdownDescendant[]>>;
}

export interface DropdownDescendant<ElementType = HTMLElement> extends Descendant<ElementType> {
  id: string;
}
