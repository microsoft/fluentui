import * as React from 'react';
import * as ReactIs from 'react-is';

import { ComposedComponent, ComposeOptions, ComposePreparedOptions, Input } from './types';
import cx from 'classnames';

// tslint:disable-next-line:no-any
export type ClassDictionary = any;

function computeDisplayNames(inputOptions: ComposeOptions, parentOptions: ComposePreparedOptions): string[] {
  if (inputOptions.overrideStyles) {
    return [inputOptions.displayName].filter(Boolean) as string[];
  }

  // To support styles composition we need to properly pick up display names
  return inputOptions.displayName
    ? parentOptions.displayNames.concat(inputOptions.displayName)
    : parentOptions.displayNames;
}

const collectStylesheets = (
  // tslint:disable-next-line:no-any
  slots: { [key: string]: any },
  defaultSheets: string[] = [],
  stylesheets: string[] = [...defaultSheets],
) => {
  if (slots) {
    Object.keys(slots).forEach(slotName => {
      const slot = slots[slotName];

      if (slot && slot.stylesheets) {
        stylesheets = slot.stylesheets.concat(stylesheets);
      }
    });
  }

  return stylesheets.filter(sheet => !!sheet);
};

const mergeClasses = (classes1: ClassDictionary, classes2: ClassDictionary) => {
  const result = { ...classes1 };

  if (classes2) {
    Object.keys(classes2).forEach(name => (result[name] = cx(result[name], classes2[name])));
  }
  console.log(result);
  return result;
};

export const defaultComposeOptions: ComposePreparedOptions = {
  className: process.env.NODE_ENV === 'production' ? '' : 'no-classname-🙉',
  displayName: '',
  displayNames: [],

  mapPropsToStylesPropsChain: [],
  render: () => null,

  handledProps: [] as never[],
  overrideStyles: false,
  slots: {},
  mapPropsToSlotPropsChain: [],
  resolveSlotProps: () => ({}),
};

export function mergeComposeOptions(
  input: Input,
  inputOptions: ComposeOptions,
  parentOptions: ComposePreparedOptions = defaultComposeOptions,
): ComposePreparedOptions {
  const mapPropsToSlotPropsChain = inputOptions.mapPropsToSlotProps
    ? [...parentOptions.mapPropsToSlotPropsChain, inputOptions.mapPropsToSlotProps]
    : parentOptions.mapPropsToSlotPropsChain;

  const resolveSlotProps = <P = {}>(props: P) =>
    mapPropsToSlotPropsChain.reduce<Record<string, object>>((acc, definition) => {
      const nextProps = { ...definition(props) };
      const slots: string[] = [...Object.keys(acc), ...Object.keys(nextProps)];

      const mergedSlotProps: Record<string, object> = {};

      slots.forEach(slot => {
        if (!mergedSlotProps[slot]) {
          mergedSlotProps[slot] = {
            ...acc[slot],
            ...nextProps[slot],
          };
        }
      });

      return mergedSlotProps;
    }, {});

  const mergedSlots = {
    ...parentOptions.slots,
    ...inputOptions.slots,
  };

  let mergedStylesheets: string[] = [];

  if (inputOptions.stylesheet) {
    mergedStylesheets.unshift(inputOptions.stylesheet);
  }

  // tslint:disable-next-line:no-any
  if (parentOptions.stylesheets) {
    // tslint:disable-next-line:no-any
    mergedStylesheets = parentOptions.stylesheets.concat(mergedStylesheets);
  }

  mergedStylesheets = collectStylesheets(mergedSlots, mergedStylesheets);

  // @ts-ignore
  // @ts-ignore
  return {
    className: inputOptions.className || parentOptions.className,
    displayName: inputOptions.displayName || parentOptions.displayName,
    displayNames: computeDisplayNames(inputOptions, parentOptions),

    mapPropsToStylesPropsChain: inputOptions.mapPropsToStylesProps
      ? [...parentOptions.mapPropsToStylesPropsChain, inputOptions.mapPropsToStylesProps]
      : parentOptions.mapPropsToStylesPropsChain,
    render: typeof input === 'function' ? input : parentOptions.render,

    handledProps: [...parentOptions.handledProps, ...((inputOptions.handledProps as never[]) || ([] as never[]))],
    overrideStyles: inputOptions.overrideStyles || false,

    slots: mergedSlots,
    mapPropsToSlotPropsChain,
    resolveSlotProps,

    // @ts-ignore TODO: string or string[]
    stylesheet: [parentOptions.stylesheet, inputOptions.stylesheet],
    stylesheets: mergedStylesheets,
    classes: mergeClasses(parentOptions.classes, inputOptions.classes),
  };
}

/**
 * compose() allows you to pass two inputs:
 * - React.forwardRef + static fluentComposeConfig, i.e. previously composed component
 * - a function
 */
export function wasComposedPreviously<T extends React.ElementType = 'div', P = {}>(
  input: Input<T, P>,
): input is ComposedComponent<P> {
  const isForwardRef: boolean = (input as React.ExoticComponent).$$typeof === ReactIs.ForwardRef;

  return isForwardRef && !!(input as ComposedComponent<P>).fluentComposeConfig;
}
