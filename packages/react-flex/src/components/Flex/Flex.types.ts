import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import { FlexDirectionProperty, JustifyContentProperty } from 'csstype';

/**
 * {@docCategory Flex }
 */
export interface FlexProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  direction?: FlexDirectionProperty;

  horizontalAlign?: JustifyContentProperty;
}

/**
 * {@docCategory Flex }
 */

export type FlexState = ComponentState<React.Ref<HTMLElement>, FlexProps>;
