import * as React from 'react';
import {
  labelAttributes,
  audioAttributes,
  videoAttributes,
  olAttributes,
  liAttributes,
  anchorAttributes,
  buttonAttributes,
  inputAttributes,
  textAreaAttributes,
  selectAttributes,
  optionAttributes,
  tableAttributes,
  trAttributes,
  thAttributes,
  tdAttributes,
  colGroupAttributes,
  colAttributes,
  formAttributes,
  iframeAttributes,
  imgAttributes,
} from './htmlElementAttributeSets';
import { htmlElementProperties } from '@uifabric/utilities';

/**
 * Gets native supported props for an html element provided the allowance set. Use one of the property
 * sets defined (divAttributes, buttonPropertes, etc) to filter out supported properties from a given
 * props set. Note that all data- and aria- prefixed attributes will be allowed.
 * NOTE: getNativeProps should always be applied first when adding props to a react component. The
 * non-native props should be applied second. This will prevent getNativeProps from overriding your custom props.
 * For example, if props passed to getNativeProps has an onClick function and getNativeProps is added to
 * the component after an onClick function is added, then the getNativeProps onClick will override it.
 *
 * @public
 * @param props - The unfiltered input props
 * @param allowedPropsNames-  The array of allowed propnames.
 * @returns The filtered props
 */
export function getNativeProps<T extends Record<string, any>>(
  props: {},
  allowedPropNames: Set<string>,
  excludedPropNames?: Set<string>,
): T {
  // It'd be great to properly type this while allowing 'aria-` and 'data-' attributes like TypeScript does for
  // JSX attributes, but that ability is hardcoded into the TS compiler with no analog in TypeScript typings.
  // Then we'd be able to enforce props extends native props (including aria- and data- attributes), and then
  // return native props.
  // We should be able to do this once this PR is merged: https://github.com/microsoft/TypeScript/pull/26797
  // tslint:disable-next-line:no-any
  const nativeProps: Record<string, any> = {};

  Object.keys(props).forEach(key => {
    if (allowedPropNames.has(key) && (!excludedPropNames || !excludedPropNames?.has(key))) {
      // tslint:disable-next-line:no-any
      nativeProps[key] = (props as any)[key];
    }
  });

  return nativeProps as T;
}

const nativeElementMap: Record<string, Set<string>> = {
  label: labelAttributes,
  audio: audioAttributes,
  video: videoAttributes,
  ol: olAttributes,
  li: liAttributes,
  a: anchorAttributes,
  button: buttonAttributes,
  input: inputAttributes,
  textarea: textAreaAttributes,
  select: selectAttributes,
  option: optionAttributes,
  table: tableAttributes,
  tr: trAttributes,
  th: thAttributes,
  td: tdAttributes,
  colGroup: colGroupAttributes,
  col: colAttributes,
  form: formAttributes,
  iframe: iframeAttributes,
  img: imgAttributes,
};

/**
 * Given an element tagname and user props, filters the props to only allowed props for the given
 * element type.
 * @param tagName - Tag name (e.g. "div")
 * @param props - Props object
 * @param excludedPropNames - List of props to disallow
 */
// tslint:disable-next-line:no-any
export function getNativeElementProps<TAttributes extends React.HTMLAttributes<any>>(
  tagName: keyof React.ReactHTML,
  props: {},
  excludedPropNames?: Set<string>,
): TAttributes {
  const allowedPropNames = (tagName && nativeElementMap[tagName]) || htmlElementProperties;

  return getNativeProps(props, allowedPropNames, excludedPropNames);
}
