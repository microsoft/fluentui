import * as React from 'react';
import { AccessibilityAttributes } from '@fluentui/accessibility';
import { ComponentSlotStyle, ComponentVariablesInput } from '@fluentui/styles';
import { ComponentDesignProp } from '../styles/types';

// copy from @fluentui/react
export type SvgIconSizeValue = 'smallest' | 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest';

export type SvgIconXSpacing = 'none' | 'before' | 'after' | 'both';

export interface SvgIconProps {
  /** Alternative text. */
  alt?: string;

  'aria-label'?: AccessibilityAttributes['aria-label'];

  /** SvgIcon can appear with rectangular border. */
  bordered?: boolean;

  /** Additional CSS class name(s) to apply.  */
  className?: string;

  /** SvgIcon can appear as circular. */
  circular?: boolean;

  /**
   *  Content for childrenApi
   *  @docSiteIgnore
   */
  children?: SvgIconChildrenFn;

  design?: ComponentDesignProp;

  /** An icon can show it is currently unable to be interacted with. */
  disabled?: boolean;

  /** An icon can provide an outline variant. */
  outline?: boolean;

  /** An icon can be rotated by the degree specified as number. */
  rotate?: number;

  /** Size of the icon. */
  size?: SvgIconSizeValue;

  /** Additional CSS styles to apply to the component instance.  */
  styles?: ComponentSlotStyle;

  /** Override for theme site variables to allow modifications of component styling via themes. */
  variables?: ComponentVariablesInput;

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

type ValueOf<TFirst, TSecond, TKey extends keyof (TFirst & TSecond)> = TKey extends keyof TFirst
  ? TFirst[TKey]
  : TKey extends keyof TSecond
  ? TSecond[TKey]
  : {};

type Extended<TFirst, TSecond> = { [K in keyof (TFirst & TSecond)]: ValueOf<TFirst, TSecond, K> };

type HoistedStaticPropsOf<T> = Exclude<keyof T, keyof React.ComponentType | 'prototype'> | 'displayName';

type Intersect<First extends string | number | symbol, Second extends string | number | symbol> = {
  [K in First]: K extends Second ? K : never;
}[First];

type PickProps<T, Props extends string | number | symbol> = {
  [K in Intersect<Props, keyof T>]: T[K];
};

export const withSafeTypeForSpan = <
  TComponentType extends React.ComponentType,
  TProps,
  TAs extends keyof JSX.IntrinsicElements = 'span'
>(
  componentType: TComponentType,
) => {
  function overloadedComponentType(x: Extended<TProps, JSX.IntrinsicElements[TAs]>): JSX.Element;
  function overloadedComponentType(): never {
    throw new Error('Defines unreachable execution scenario');
  }

  return (componentType as any) as typeof overloadedComponentType &
    PickProps<TComponentType, HoistedStaticPropsOf<TComponentType>>;
};
