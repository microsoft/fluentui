import { ComposedComponent, Input } from './types';

/**
 * compose() allows you to pass two inputs:
 * - React.forwardRef + static fluentComposeConfig, i.e. previously composed component
 * - a function
 */
export function wasComposedPreviously<T extends React.ElementType = 'div', P = {}>(
  input: Input<T, P>,
): input is ComposedComponent<P> {
  return !!(input as ComposedComponent<P>).fluentComposeConfig;
}
