import type * as React from 'react';

/**
 * Cross React Major Version compatible Intrinsic Element Keys
 */
type JSXIntrinsicElementKeys = Exclude<React.ElementType, React.ComponentType>
/**
 * Cross React Major Version compatible IntrinsicElement Dictionary
 */
type JSXIntrinsicElements = { [K in JSXIntrinsicElementKeys]: React.ComponentProps<K> };

export namespace JSX {
  type ElementType = string | React.JSXElementConstructor<any>;
  interface Element extends React.ReactElement<any, any> {}
  interface ElementClass extends React.Component<any> {
    render(): React.ReactNode;
  }
  interface ElementAttributesProperty { props : {} }
  interface ElementChildrenAttribute  { children: {} }
  interface IntrinsicAttributes extends React.Attributes {}
  interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> {}
  interface IntrinsicElements extends JSXIntrinsicElements {}
}
