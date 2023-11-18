import * as React from 'react';
import { getNativeElementProps } from '../utils/getNativeElementProps';
import type { InferredElementRefType, UnknownSlotProps } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HTMLAttributes = React.HTMLAttributes<any>;

/**
 * Given an element tagname and user props, filters the props to only allowed props for the given
 * element type.
 *
 * Equivalent to {@link getNativeElementProps}, but more type-safe.
 */
export const getIntrinsicElementProps = <
  Props extends UnknownSlotProps,
  ExcludedPropKeys extends Extract<keyof Props, string> = never,
>(
  /** The slot's default element type (e.g. 'div') */
  tagName: NonNullable<Props['as']>,
  /** The component's props object */
  props: Props & React.RefAttributes<InferredElementRefType<Props>>,
  /** List of native props to exclude from the returned value */
  excludedPropNames?: ExcludedPropKeys[],
) => {
  // eslint-disable-next-line deprecation/deprecation
  return getNativeElementProps<
    OmitWithoutExpanding<Props, Exclude<keyof Props, keyof HTMLAttributes | keyof UnknownSlotProps> | ExcludedPropKeys>
  >(props.as ?? tagName, props, excludedPropNames);
};

/**
 * helper type that avoids the expansion of unions while inferring it,
 * should work exactly the same as Omit
 */
type OmitWithoutExpanding<P, K extends string | number | symbol> = P extends unknown ? Omit<P, K> : P;
