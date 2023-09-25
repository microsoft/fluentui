import * as React from 'react';
import type { ISvgIconProps } from './SvgIcon.types';

export type SvgIconFuncArg<TProps = ISvgIconProps> = {
  classes: { [iconSlot: string]: string }; // renamed from classes
  // rtl: boolean; // how do we support this?
  props: TProps;
};

export type SvgIconChildrenFn<TProps = ISvgIconProps> = (svgIcon: SvgIconFuncArg<TProps>) => React.ReactNode;

export type SvgIconCreateFnParams<TProps> = {
  svg: SvgIconChildrenFn<TProps & ISvgIconProps>;
  displayName: string;
  // handledProps?: (keyof TProps)[];
};

export type SvgIconFuncWithRootArg<TProps = ISvgIconProps> = {
  classes: { [iconSlot: string]: string }; // renamed from classes
  // rtl: boolean; // how do we support this?
  props: TProps;
  processedRootProps: React.HTMLAttributes<HTMLElement>;
};

export type SvgIconChildrenFnWithRoot<TProps = ISvgIconProps> = (
  svgIcon: SvgIconFuncWithRootArg<TProps>,
) => React.ReactElement;

export type SvgIconCreateFnWithRootParams<TProps> = {
  children: SvgIconChildrenFnWithRoot<TProps & ISvgIconProps>;
  displayName: string;
  // handledProps?: (keyof TProps)[];
};
