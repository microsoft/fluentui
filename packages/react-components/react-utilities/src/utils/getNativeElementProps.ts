import * as React from 'react';
import type { IntrisicElementProps } from '../compose';

import {
  labelProperties,
  audioProperties,
  videoProperties,
  olProperties,
  liProperties,
  anchorProperties,
  buttonProperties,
  inputProperties,
  textAreaProperties,
  selectProperties,
  optionProperties,
  tableProperties,
  trProperties,
  thProperties,
  tdProperties,
  colGroupProperties,
  colProperties,
  fieldsetProperties,
  formProperties,
  iframeProperties,
  imgProperties,
  htmlElementProperties,
  getNativeProps,
  timeProperties,
} from './properties';

const nativeElementMap = {
  label: labelProperties,
  audio: audioProperties,
  video: videoProperties,
  ol: olProperties,
  li: liProperties,
  a: anchorProperties,
  button: buttonProperties,
  input: inputProperties,
  textarea: textAreaProperties,
  select: selectProperties,
  option: optionProperties,
  table: tableProperties,
  tr: trProperties,
  th: thProperties,
  td: tdProperties,
  colGroup: colGroupProperties,
  col: colProperties,
  fieldset: fieldsetProperties,
  form: formProperties,
  iframe: iframeProperties,
  img: imgProperties,
  time: timeProperties,
};
type NativeElementMap = typeof nativeElementMap;

/**
 * AsTagNames - can single string or union of strings
 */
type NativeElemProps<AsTagNames extends keyof JSX.IntrinsicElements> = {
  [As in AsTagNames]: { as?: As } & IntrisicElementProps<As>;
}[AsTagNames];

/**
 * Given an element tagname and user props, filters the props to only allowed props for the given
 * element type.
 * @param tagName - Tag name (e.g. "div")
 * @param props - Props object
 * @param excludedPropNames - List of props to disallow
 */
export function getNativeElementProps<
  Tag extends keyof JSX.IntrinsicElements,
  Props extends Record<string, unknown>,
  ExcludedPropKeys extends Extract<keyof Props, string> = never
>(tagName: Tag, props: Props, excludedPropNames?: ExcludedPropKeys[]): Omit<NativeElemProps<Tag>, ExcludedPropKeys> {
  const allowedPropNames = nativeElementMap[tagName as keyof NativeElementMap] || htmlElementProperties;

  /**
   * extends object dictionary with `as` to avoid adding it to nativeElementMap and htmlElementProperties
   */
  type ExtendedAllowedPropNames = typeof allowedPropNames & { as: 1 };

  (allowedPropNames as ExtendedAllowedPropNames).as = 1;

  return getNativeProps(props, allowedPropNames, excludedPropNames) as Omit<NativeElemProps<Tag>, ExcludedPropKeys>;
}

/**
 * Splits the native props into ones that go to the `root` slot, and ones that go to the primary slot.
 *
 * This function is only for use with components that have a primary slot other than `root`.
 * Most components should use {@link getNativeElementProps} for their root slot if it is the primary slot.
 *
 * @returns An object containing the native props for the `root` and primary slots.
 */
export const getPartitionedNativeProps = <
  Tag extends keyof JSX.IntrinsicElements,
  Props extends Record<string, unknown> & Pick<React.HTMLAttributes<HTMLElement>, 'style' | 'className'>,
  ExcludedPropKeys extends Extract<keyof Props, string> = never
>({
  primarySlotTagName,
  props,
  excludedPropNames,
}: {
  /** The primary slot's element type (e.g. 'div') */
  primarySlotTagName: Tag;

  /** The component's props object */
  props: Props;

  /** List of native props to exclude from the returned value */
  excludedPropNames?: ExcludedPropKeys[];
}) => {
  return {
    root: { style: props.style, className: props.className },
    primary: getNativeElementProps(primarySlotTagName, props, [
      ...(excludedPropNames || []),
      'style',
      'className',
    ] as ExcludedPropKeys[]),
  };
};
