import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utils';

export interface AccordionProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {}

export interface AccordionState extends AccordionProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
}
