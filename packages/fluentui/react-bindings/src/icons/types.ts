import * as React from 'react';
import { AccessibilityAttributes } from '@fluentui/accessibility';
import { ComponentSlotStyle, ComponentVariablesInput } from '@fluentui/styles';
import { ComponentDesignProp } from '../styles/types';

// copy from @fluentui/react
export type SizeValue = 'smallest' | 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest';

export type SvgIconXSpacing = 'none' | 'before' | 'after' | 'both';

export interface SvgIconProps {
  /** Additional CSS class name(s) to apply.  */
  className?: string;

  design?: ComponentDesignProp;

  /** Additional CSS styles to apply to the component instance.  */
  styles?: ComponentSlotStyle;

  /** Override for theme site variables to allow modifications of component styling via themes. */
  variables?: ComponentVariablesInput;

  /** Alternative text. */
  alt?: string;

  'aria-label'?: AccessibilityAttributes['aria-label'];

  /** SvgIcon can appear with rectangular border. */
  bordered?: boolean;

  /** SvgIcon can appear as circular. */
  circular?: boolean;

  /**
   *  Content for childrenApi
   *  @docSiteIgnore
   */
  children?: SvgIconChildrenFn;

  /** An icon can show it is currently unable to be interacted with. */
  disabled?: boolean;

  /** An icon can provide an outline variant. */
  outline?: boolean;

  /** An icon can be rotated by the degree specified as number. */
  rotate?: number;

  /** Size of the icon. */
  size?: SizeValue;

  /** Adds space to the before, after or on both sides of the icon, or removes the default space around the icon ('none' value) */
  xSpacing?: SvgIconXSpacing;
}

export type SvgIconFuncArg = {
  classes: { [iconSlot: string]: string };
  rtl: boolean;
  props: SvgIconProps;
};

export type SvgIconChildrenFn = (svgIcon: SvgIconFuncArg) => React.ReactNode;

export type SvgIconCreateFnParams = { svg: SvgIconChildrenFn; displayName: string; handledProps?: string[] };
