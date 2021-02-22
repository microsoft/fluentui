import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';

/**
 * {@docCategory AccordionPanel\}
 */
export interface AccordionPanelProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {}

/**
 * {@docCategory AccordionPanel\}
 */
export interface AccordionPanelState extends AccordionPanelProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
}
