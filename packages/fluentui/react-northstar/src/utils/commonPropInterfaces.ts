import { ComponentDesignProp } from '@fluentui/react-bindings';
import { ComponentSlotStyle, ComponentVariablesInput } from '@fluentui/styles';
import * as React from 'react';
import { ReactChildren } from '../types';

export interface StyledComponentProps<P = any, V = any> {
  /** Additional CSS styles to apply to the component instance.  */
  styles?: ComponentSlotStyle<P, V>;

  /** Override for theme site variables to allow modifications of component styling via themes. */
  variables?: ComponentVariablesInput;
}

export interface UIComponentProps<P = any, V = any> extends StyledComponentProps<P, V> {
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
