import { mergeStyles } from '@fluentui/styles';
import { ComponentWithAs, ComposePreparedOptions, ShorthandConfig } from '@fluentui/react-bindings';
import cx from 'classnames';
import * as _ from 'lodash';
import * as React from 'react';
import * as ReactIs from 'react-is';

import { ShorthandValue, Props, PropsOf, ShorthandRenderFunction } from '../types';

type HTMLTag = 'iframe' | 'img' | 'input';
type ShorthandProp = 'children' | 'src' | 'type';

interface CreateShorthandOptions<P extends {}> {
  /** Default props object */
  defaultProps?: () => Partial<Props<P>>;

  /** Override props object or function (called with regular props) */
  overrideProps?: Partial<Props<P>> | ((props: P) => Partial<Props<P>>);

  /** Whether or not automatic key generation is allowed */
  generateKey?: boolean;

  /** Override the default render implementation. */
  render?: ShorthandRenderFunction<P>;
}

// It's only necessary to map props that don't use 'children' as value ('children' is the default)
const mappedProps: { [key in HTMLTag]: ShorthandProp } = {
  iframe: 'src',
  img: 'src',
  input: 'type',
};

export type ShorthandFactory<P extends {}> = (
  value: ShorthandValue<P>,
  options?: CreateShorthandOptions<P>,
) => React.ReactElement | null | undefined;

// ============================================================
// Factory Creators
// ============================================================

/**
 * @param config - Options passed to factory
 * @returns A shorthand factory function waiting for `val` and `defaultProps`.
 */
export function createShorthandFactory<TStringElement extends keyof JSX.IntrinsicElements, P extends {}>(config: {
  /** A ReactClass or string */
  Component: TStringElement;
  /** A function that maps a primitive value to the Component props */
  mappedProp?: keyof PropsOf<TStringElement>;
  /** A function that maps an array value to the Component props */
  mappedArrayProp?: keyof PropsOf<TStringElement>;
  /** Indicates if factory supports React Elements */
  allowsJSX?: boolean;
}): ShorthandFactory<P>;
export function createShorthandFactory<TFunctionComponent extends React.FunctionComponent, P extends {}>(config: {
  Component: TFunctionComponent;
  mappedProp?: keyof PropsOf<TFunctionComponent>;
  mappedArrayProp?: keyof PropsOf<TFunctionComponent>;
  allowsJSX?: boolean;
}): ShorthandFactory<P>;
export function createShorthandFactory<TInstance extends React.Component, P extends {}>(config: {
  Component: { new (...args: any[]): TInstance };
  mappedProp?: keyof PropsOf<TInstance>;
  mappedArrayProp?: keyof PropsOf<TInstance>;
  allowsJSX?: boolean;
}): ShorthandFactory<P>;
export function createShorthandFactory<P>({ Component, mappedProp, mappedArrayProp, allowsJSX }) {
  if (!ReactIs.isValidElementType(Component)) {
    throw new Error('createShorthandFactory() Component must be a string or function.');
  }

  return (value, options: CreateShorthandOptions<P>) =>
    createShorthandInternal({
      allowsJSX,
      Component,
      mappedProp,
      mappedArrayProp,
      value,
      options,
    });
}

// ============================================================
// Factories
// ============================================================

export function createShorthandInternal<P extends {}>({
  Component,
  mappedProp,
  mappedArrayProp,
  value,
  options = {},
  allowsJSX = true,
}: {
  Component: React.ElementType<P>;
  mappedProp?: string;
  mappedArrayProp?: string;
  allowsJSX?: boolean;
  value?: ShorthandValue<P>;
  options?: CreateShorthandOptions<P>;
}) {
  if (!ReactIs.isValidElementType(Component)) {
    throw new Error('createShorthand() Component must be a string or function.');
  }

  // short circuit noop values
  const valIsNoop = _.isNil(value) || typeof value === 'boolean';
  if (valIsNoop && !options.render) return null;

  const valIsPrimitive = typeof value === 'string' || typeof value === 'number';
  const valIsPropsObject = _.isPlainObject(value);
  const valIsArray = _.isArray(value);
  const valIsReactElement = React.isValidElement(value);

  // unhandled type warning
  if (process.env.NODE_ENV !== 'production') {
    const displayName = typeof Component === 'string' ? Component : Component.displayName;

    if (!valIsPrimitive && !valIsPropsObject && !valIsArray && !valIsReactElement && !valIsNoop) {
      /* eslint-disable-next-line no-console */
      console.error(
        [
          `The shorthand prop for "${displayName}" component was passed a JSX element but this slot only supports string|number|object|array|ReactElements.`,
          ' Use null|undefined|boolean for none.',
          ` Received: ${value}`,
        ].join(''),
      );
    }

    if (!allowsJSX && valIsReactElement) {
      /* eslint-disable-next-line no-console */
      console.error(
        [
          `The shorthand prop for "${displayName}" component was passed a JSX element but this slot only supports string|number|object|array.`,
          ' Use null|undefined|boolean for none.',
          ` Received: ${value}`,
        ].join(''),
      );
    }
  }

  // ----------------------------------------
  // Build up props
  // ----------------------------------------
  const defaultProps = options.defaultProps ? options.defaultProps() || ({} as Props<P>) : ({} as Props<P>);

  // User's props
  const usersProps =
    (valIsReactElement && ({} as Props<P>)) || (valIsPropsObject && (value as Props<P>)) || ({} as Props<P>);

  // Override props
  const overrideProps: Props<P> =
    typeof options.overrideProps === 'function'
      ? (options.overrideProps({ ...defaultProps, ...usersProps }) as Props<P>)
      : (options.overrideProps as Props<P>) || ({} as Props<P>);

  // Merge props
  const props: Props<P> = { ...defaultProps, ...usersProps, ...overrideProps };

  const mappedHTMLProps = mappedProps[overrideProps.as || defaultProps.as];

  // Map prop for primitive value
  if (valIsPrimitive || valIsReactElement) {
    (props as any)[mappedHTMLProps || mappedProp || 'children'] = value;
  }

  // Map prop for array value
  if (valIsArray) {
    (props as any)[mappedHTMLProps || mappedArrayProp || 'children'] = value;
  }

  // Merge className
  if (defaultProps.className || overrideProps.className || usersProps.className) {
    const mergedClassesNames = cx(defaultProps.className, overrideProps.className, usersProps.className);
    (props as any).className = _.uniq(mergedClassesNames.split(' ')).join(' ');
  }

  // Merge style
  if (defaultProps.style || overrideProps.style || usersProps.style) {
    (props as any).style = { ...defaultProps.style, ...usersProps.style, ...overrideProps.style };
  }

  // Merge styles
  if (defaultProps.styles || overrideProps.styles || usersProps.styles) {
    (props as any).styles = mergeStyles(defaultProps.styles, usersProps.styles, overrideProps.styles);
  }

  // ----------------------------------------
  // Get key
  // ----------------------------------------
  const { generateKey = true } = options;

  // Use key or generate key
  if (generateKey && _.isNil(props.key)) {
    if (valIsPrimitive) {
      // use string/number shorthand values as the key
      (props as any).key = value;
    }

    if (valIsReactElement) {
      // use the key from React Element
      const elementKey = (value as React.ReactElement).key;
      // <div /> - key is not passed as will be `null`
      // <div key={null} /> - key is passed as `null` and will be stringified
      const isNullKey = elementKey === null;

      if (!isNullKey) {
        (props as any).key = elementKey;
      }
    }
  }

  // Remove the kind prop from the props object
  delete props.kind;

  // ----------------------------------------
  // Create Element
  // ----------------------------------------
  const { render } = options;
  if (render) {
    return render(Component, props);
  }

  if (typeof props.children === 'function') {
    return props.children(Component, { ...props, children: undefined });
  }

  if (!allowsJSX && valIsReactElement) {
    return null;
  }

  // Create ReactElements from built up props
  if (valIsPrimitive || valIsPropsObject || valIsArray || valIsReactElement) {
    return React.createElement(Component, props);
  }

  return null;
}

export function createShorthand<TFunctionComponent extends React.FunctionComponent>(
  Component: TFunctionComponent & {
    shorthandConfig?: ShorthandConfig<PropsOf<TFunctionComponent>>;
    fluentComposeConfig?: ComposePreparedOptions<PropsOf<TFunctionComponent>>;
  },
  value?: ShorthandValue<PropsOf<TFunctionComponent>>,
  options?: CreateShorthandOptions<PropsOf<TFunctionComponent>>,
): React.ReactElement;
export function createShorthand<TInstance extends React.Component>(
  Component: { new (...args: any[]): TInstance } & {
    shorthandConfig?: ShorthandConfig<PropsOf<TInstance>>;
    fluentComposeConfig?: ComposePreparedOptions<PropsOf<TInstance>>;
  },
  value?: ShorthandValue<PropsOf<TInstance>>,
  options?: CreateShorthandOptions<PropsOf<TInstance>>,
): React.ReactElement;
export function createShorthand<E extends keyof JSX.IntrinsicElements, P extends {}>(
  Component: ComponentWithAs<E, P> & {
    shorthandConfig?: ShorthandConfig<P>;
    fluentComposeConfig?: ComposePreparedOptions<P>;
  },
  value?: ShorthandValue<P>,
  options?: CreateShorthandOptions<P>,
): React.ReactElement;
export function createShorthand<TElementType extends React.ElementType>(
  Component: TElementType & {
    shorthandConfig?: ShorthandConfig<PropsOf<TElementType>>;
    fluentComposeConfig?: ComposePreparedOptions<PropsOf<TElementType>>;
  },
  value?: ShorthandValue<PropsOf<TElementType>>,
  options?: CreateShorthandOptions<PropsOf<TElementType>>,
): React.ReactElement;
export function createShorthand<P>(Component, value?, options?) {
  const {
    mappedProp = 'children',
    allowsJSX = true,
    mappedArrayProp,
  } = Component.shorthandConfig || Component.fluentComposeConfig?.shorthandConfig || {};

  return createShorthandInternal<P>({
    Component,
    mappedProp,
    allowsJSX,
    mappedArrayProp,
    value,
    options: options || {},
  });
}
