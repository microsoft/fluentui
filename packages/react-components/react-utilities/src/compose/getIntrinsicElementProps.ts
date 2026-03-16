import * as React from 'react';
import { getNativeElementProps } from '../utils/getNativeElementProps';
import type { InferredElementRefType, UnknownSlotProps } from './types';
import type { DistributiveOmit } from '../utils/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HTMLAttributes = React.HTMLAttributes<any>;

/**
 * Given an element tagname and user props, filters the props to only allowed props for the given
 * element type.
 *
 * Equivalent to {@link getNativeElementProps}, but more type-safe.
 *
 * @param tagName - The slot's default element type (e.g. 'div')
 * @param props - The component's props object
 * @param excludedPropNames - List of native props to exclude from the returned value
 */
export const getIntrinsicElementProps = <
  Props extends UnknownSlotProps,
  ExcludedPropKeys extends Extract<keyof Props, string> = never,
>(
  tagName: NonNullable<Props['as']>,
  // eslint-disable-next-line @typescript-eslint/no-restricted-types -- in order to not introduce Type Restriction CHANGe which is kinda "breaking change from Types POV", we don't enforce our custom `RefAttributes` in this API, to be compatible with scenarios where non v9 interfaces might be used. This may/will change with React 19
  props: Props & React.RefAttributes<InferredElementRefType<Props>>,
  excludedPropNames?: ExcludedPropKeys[],
): DistributiveOmit<Props, ExcludedPropKeys | Exclude<keyof Props, 'as' | keyof HTMLAttributes>> => {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  return getNativeElementProps<
    DistributiveOmit<Props, Exclude<keyof Props, keyof HTMLAttributes | keyof UnknownSlotProps> | ExcludedPropKeys>
  >(props.as ?? tagName, props, excludedPropNames);
};
