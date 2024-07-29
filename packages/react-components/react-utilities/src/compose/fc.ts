import * as React from 'react';
import { FunctionComponent } from '../utils/types';

/**
 * @public
 *
 * A method used to declare a function component that has plug properties.
 * It works similar to the `ReactTypes.forwardRef` method, but without breaking `ref` type into a separate argument, as doing so would cause reconciliation issues for unions.
 *
 * **Note:** _In React v19 New function components will no longer need `forwardRef`. In future versions they will deprecate and remove forwardRef. {@link https://react.dev/blog/2024/04/25/react-19#ref-as-a-prop | ref as a prop}_.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fc<Fn extends FunctionComponent<any>>(fn: Fn): Fn {
  const component: FunctionComponent<{}> = React.forwardRef<unknown, React.RefAttributes<unknown>>((props, ref) =>
    fn(process.env.NODE_ENV === 'development' ? Object.freeze<{}>({ ...props, ref }) : ((props.ref = ref), props)),
  );
  return component as Fn;
}
