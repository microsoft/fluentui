import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';

/**
 * {@docCategory Flex }
 */
export interface FlexProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  // TODO Add props and slots here
}

/**
 * {@docCategory Flex }
 */
export interface FlexState extends FlexProps {
  /**
   * Ref to the root slot
   */
  ref: React.RefObject<HTMLElement>;
}
