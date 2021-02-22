import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';

/**
 * {@docCategory Accordion\}
 */
export interface AccordionProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {}

/**
 * {@docCategory Accordion\}
 */
export interface AccordionState extends AccordionProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
}
