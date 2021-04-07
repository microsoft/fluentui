import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';
import { FlexDirectionProperty, JustifyContentProperty } from 'csstype';

/**
 * {@docCategory Flex }
 */
export interface FlexProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  direction?: FlexDirectionProperty;

  horizontalAlign?: JustifyContentProperty;

  children: React.ReactElement | React.ReactElement[];
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
