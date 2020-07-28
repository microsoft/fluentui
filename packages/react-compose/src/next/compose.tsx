import * as React from 'react';
import { ComposeOptions, ComposedComponent, ComposeInput, OPTIONS_NAME } from './types';
import { mergeComposeOptions } from './mergeComposeOptions';
import { mergeObjects } from './mergeObjects';
import { applyHooks } from './applyHooks';
import { simplifyShorthand } from './simplifyShorthand';

export function compose<TProps, TState = TProps>(
  render: ComposeInput<TProps, TState>,
  options: ComposeOptions<TProps, TState>,
) {
  const composeOptions = mergeComposeOptions(render, options);

  const Result: ComposedComponent<TProps, TState> = React.forwardRef<HTMLElement, TProps>(
    (props: TProps, ref: React.Ref<HTMLElement>) =>
      composeOptions.render!(
        // get the state by applying the component's hooks.
        applyHooks(
          // create draft state.
          mergeObjects(
            // start draft state with ref.
            { ref },

            // merge default props.
            composeOptions.defaultProps,

            // merge along the user props, with simplified shorthand.
            simplifyShorthand(
              composeOptions.initialState ? composeOptions.initialState(props) : props,
              composeOptions.shorthandPropNames,
            ),
          ),
          composeOptions,
        ),
        composeOptions,
      ),
  ) as ComposedComponent<TProps, TState>;

  // Assign statics.
  Result.displayName = composeOptions.displayName;
  Result[OPTIONS_NAME] = composeOptions;

  Result.extend = function extend<TNewProps = TProps, TNewState = TState>(
    extendOptions: ComposeOptions<TNewProps, TNewState>,
  ) {
    return compose<TNewProps, TNewState>(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Result as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      extendOptions as any,
    ) as ComposedComponent<TNewProps, TNewState>;
  };

  return Result;
}
