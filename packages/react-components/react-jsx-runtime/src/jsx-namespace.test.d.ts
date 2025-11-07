// needed to augment the JSX namespace for test where directly `createElement` from './createElement' is used, as we are not importing from @fluentui/react-jsx-runtime
// NOTE: this will augment all test files !
import type * as React from 'react';

/**
 * Cross React Major Version compatible Intrinsic Element Keys
 */
type JSXIntrinsicElementKeys = Exclude<React.ElementType, React.ComponentType>;
/**
 * Cross React Major Version compatible IntrinsicElement Dictionary
 */
type JSXIntrinsicElements = { [K in JSXIntrinsicElementKeys]: React.ComponentProps<K> };

declare global {
  namespace JSX {
    interface IntrinsicElements extends JSXIntrinsicElements {}
  }
}
