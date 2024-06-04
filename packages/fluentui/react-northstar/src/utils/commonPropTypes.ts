import { ComponentSlotStyle, ComponentVariablesInput } from '@fluentui/styles';
import { ComponentDesignProp } from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { ReactChildren } from '../types';

export interface StyledComponentProps<P extends {} = any, V extends {} = any> {
  /** Additional CSS styles to apply to the component instance.  */
  styles?: ComponentSlotStyle<P, V>;

  /** Override for theme site variables to allow modifications of component styling via themes. */
  variables?: ComponentVariablesInput;
}

export interface UIComponentProps<P extends {} = any, V extends {} = any> extends StyledComponentProps<P, V> {
  /** Additional CSS class name(s) to apply.  */
  className?: string;
  design?: ComponentDesignProp;
}

export type SizeValue = 'smallest' | 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest';

export type AlignValue = 'start' | 'end' | 'center' | 'justify';

export interface ColorComponentProps<TColor = string> {
  /** A component can have a color. */
  color?: TColor;
}

export interface ContentComponentProps<TContent = React.ReactNode> {
  /** Shorthand for primary content. */
  content?: TContent;
}

export interface ChildrenComponentProps<TChildren = ReactChildren> {
  /**
   *  Content for childrenApi
   *  @docSiteIgnore
   */
  children?: TChildren;
}

export interface CreateCommonConfig {
  accessibility?: boolean;
  children?: boolean | 'node' | 'element';
  as?: boolean;
  className?: boolean;
  color?: boolean;
  content?: boolean | 'node' | 'shorthand';
  styled?: boolean;
}

export const commonPropTypes = {
  createCommon: (config: CreateCommonConfig = {}) => {
    const {
      accessibility = true,
      as = true,
      children = 'node',
      className = true,
      color = false,
      content = 'node',
      styled = true,
    } = config;
    return {
      ...(accessibility && {
        accessibility: customPropTypes.accessibility,
      }),
      ...(as && {
        as: PropTypes.elementType,
      }),
      ...(children && {
        children: children === 'element' ? PropTypes.element : PropTypes.node,
      }),
      ...(className && {
        className: PropTypes.string,
      }),
      ...(color && {
        color: PropTypes.string,
      }),
      ...(content && {
        content: content === 'shorthand' ? customPropTypes.itemShorthand : customPropTypes.nodeContent,
      }),
      ...(styled && {
        styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
        variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
        design: customPropTypes.design,
      }),
    };
  },
};
