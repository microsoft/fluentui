import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';

/**
 * {@docCategoryAccordionPanel} */
export interface AccordionPanelProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {}

/**
 * {@docCategoryAccordionPanel} */
export interface AccordionPanelState extends AccordionPanelProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
  /**
   * Internal open state, provided by context
   */
  open: boolean;
}
