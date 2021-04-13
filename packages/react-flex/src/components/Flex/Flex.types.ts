import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import {
  FlexDirectionProperty,
  JustifyContentProperty,
  AlignItemsProperty,
  MarginProperty,
  GlobalsNumber,
} from 'csstype';

/**
 * {@docCategory Flex }
 */
export interface FlexProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  direction?: FlexDirectionProperty;

  horizontalAlign?: JustifyContentProperty | AlignItemsProperty;

  verticalAlign?: JustifyContentProperty | AlignItemsProperty;

  gap?: MarginProperty<string | number>;

  wrap?: boolean;

  grow?: GlobalsNumber;

  shrink?: GlobalsNumber;

  inline?: boolean;
}

/**
 * {@docCategory Flex }
 */

export type FlexState = ComponentState<React.Ref<HTMLElement>, FlexProps>;
