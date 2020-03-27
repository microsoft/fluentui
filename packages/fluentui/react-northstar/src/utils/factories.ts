import { mergeStyles } from '@fluentui/styles';
import cx from 'classnames';
import * as _ from 'lodash';
import * as React from 'react';

import {
  ShorthandValue,
  PropsOf,
  ShorthandRenderCallback,
  ShorthandRenderFunction,
  ShorthandRenderer,
  ShorthandRenderProp,
} from '../types';
import { UIComponentProps } from '../utils/commonPropInterfaces';

type HTMLTag = 'iframe' | 'img' | 'input';
type ShorthandProp = 'children' | 'src' | 'type';

interface CreateShorthandOptions<P> {
  /** Default props object */
  defaultProps?: () => Partial<P>;

  /** Override props object or function (called with regular props) */
  overrideProps?: Partial<P> | ((props: P) => Partial<P>);

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

// ============================================================
// Factories
// ============================================================

/** A more robust React.createElement. It can create elements from primitive values. */
export function createShorthand<P>({
  allowsJSX,
  Component,
  mappedProp,
  mappedArrayProp,
  valueOrRenderCallback,
  options = {},
}: {
  Component: React.ElementType;
  allowsJSX?: boolean;
  mappedProp?: string;
  mappedArrayProp?: string;
  valueOrRenderCallback?: ShorthandValue<P> | ShorthandRenderCallback<P>;
  options?: CreateShorthandOptions<P>;
}): React.ReactElement<P> | null | undefined {
  const valIsRenderFunction =
    typeof valueOrRenderCallback === 'function' && !React.isValidElement(valueOrRenderCallback);
  if (valIsRenderFunction) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(
        [
          '@fluentui/react-northstar:',
          'The usage of render callback is deprecated and will be removed soon. Please use render props for shorthands instead.',
          'See: https://microsoft.github.io/fluent-ui-react/shorthand-props',
        ].join(' '),
      );
    }

    return createShorthandFromRenderCallback({
      allowsJSX,
      Component,
      renderCallback: valueOrRenderCallback as ShorthandRenderCallback<P>,
      mappedProp,
      mappedArrayProp,
      options,
    });
  }

  return createShorthandFromValue({
    allowsJSX,
    Component,
    mappedProp,
    mappedArrayProp,
    value: valueOrRenderCallback as ShorthandValue<P>,
    options,
  });
}

export type ShorthandFactory<P> = (
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
export function createShorthandFactory<TStringElement extends keyof JSX.IntrinsicElements, P>(config: {
  /** A ReactClass or string */
  Component: TStringElement;
  /** A function that maps a primitive value to the Component props */
  mappedProp?: keyof PropsOf<TStringElement>;
  /** A function that maps an array value to the Component props */
  mappedArrayProp?: keyof PropsOf<TStringElement>;
  /** Indicates if factory supports React Elements */
  allowsJSX?: boolean;
}): ShorthandFactory<P>;
export function createShorthandFactory<TFunctionComponent extends React.FunctionComponent, P>(config: {
  Component: TFunctionComponent;
  mappedProp?: keyof PropsOf<TFunctionComponent>;
  mappedArrayProp?: keyof PropsOf<TFunctionComponent>;
  allowsJSX?: boolean;
}): ShorthandFactory<P>;
export function createShorthandFactory<TInstance extends React.Component, P>(config: {
  Component: { new (...args: any[]): TInstance };
  mappedProp?: keyof PropsOf<TInstance>;
  mappedArrayProp?: keyof PropsOf<TInstance>;
  allowsJSX?: boolean;
}): ShorthandFactory<P>;
export function createShorthandFactory<P>({ Component, mappedProp, mappedArrayProp, allowsJSX }) {
  if (typeof Component !== 'function' && typeof Component !== 'string') {
    throw new Error('createShorthandFactory() Component must be a string or function.');
  }

  return (val, options: CreateShorthandOptions<P>) =>
    createShorthand({
      Component,
      mappedProp,
      mappedArrayProp,
      allowsJSX,
      valueOrRenderCallback: val,
      options,
    });
}

// ============================================================
// Private Utils
// ============================================================

function createShorthandFromValue<
  P extends UIComponentProps & {
    as?: React.ElementType;
    children?: P['children'] | ShorthandRenderProp<P>;
    key?: React.Key;
    style?: React.CSSProperties;
  }
>({
  Component,
  mappedProp,
  mappedArrayProp,
  value,
  options,
  allowsJSX = true,
}: {
  Component: React.ElementType;
  mappedProp?: string;
  mappedArrayProp?: string;
  allowsJSX?: boolean;
  value?: ShorthandValue<P>;
  options?: CreateShorthandOptions<P>;
}) {
  if (typeof Component !== 'function' && typeof Component !== 'string') {
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
  const defaultProps: Partial<P> = options.defaultProps ? options.defaultProps() : ({} as P);

  // User's props
  const usersProps: P = (valIsReactElement && ({} as P)) || (valIsPropsObject && (value as P)) || ({} as P);

  // Override props
  const overrideProps: P =
    typeof options.overrideProps === 'function'
      ? (options.overrideProps({ ...defaultProps, ...usersProps }) as P)
      : (options.overrideProps as P) || ({} as P);

  // Merge props
  const props: P = { ...defaultProps, ...usersProps, ...overrideProps };

  const mappedHTMLProps = mappedProps[(overrideProps.as as HTMLTag) || (defaultProps.as as HTMLTag)];

  // Map prop for primitive value
  if (valIsPrimitive || valIsReactElement) {
    props[mappedHTMLProps || mappedProp || 'children'] = value;
  }

  // Map prop for array value
  if (valIsArray) {
    props[mappedHTMLProps || mappedArrayProp || 'children'] = value;
  }

  // Merge className
  if (defaultProps.className || overrideProps.className || usersProps.className) {
    const mergedClassesNames = cx(defaultProps.className, overrideProps.className, usersProps.className);
    props.className = _.uniq(mergedClassesNames.split(' ')).join(' ');
  }

  // Merge style
  if (defaultProps.style || overrideProps.style || usersProps.style) {
    props.style = { ...defaultProps.style, ...usersProps.style, ...overrideProps.style };
  }

  // Merge styles
  if (defaultProps.styles || overrideProps.styles || usersProps.styles) {
    props.styles = mergeStyles(defaultProps.styles, usersProps.styles, overrideProps.styles);
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
  // @ts-ignore
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

function createShorthandFromRenderCallback<P>({
  Component,
  renderCallback,
  mappedProp,
  mappedArrayProp,
  allowsJSX,
  options,
}: {
  Component: React.ReactType;
  renderCallback: ShorthandRenderCallback<P>;
  mappedProp?: string;
  mappedArrayProp?: string;
  allowsJSX?: boolean;
  options?: CreateShorthandOptions<P>;
}) {
  const render: ShorthandRenderer<P> = (shorthandValue, renderTree) => {
    return createShorthandFromValue({
      Component,
      mappedProp,
      mappedArrayProp,
      allowsJSX,
      value: shorthandValue,
      options: {
        ...options,
        ...(renderTree && { render: renderTree }),
      },
    });
  };

  return renderCallback(render);
}
