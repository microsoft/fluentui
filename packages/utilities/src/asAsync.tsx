/**
 * asAsync - a HOC for async loading components.
 *
 * Usage:
 *
 * const AsyncDialog = asAsync({
 *   load: () => import('Dialog').then(result => result.default),
 *   placeholder: () => <div>I am a placeholder</div>
 * });
 *
 * React.render(domElement, <AsyncDialog { ...dialogProps } />);
 */

import * as React from 'react';

export interface IAsAsyncOptions<TProps> {
  /**
   * Callback which returns a promise resolving an object which exports the component.
   */
  load: () => Promise<React.ReactType<TProps>>;

  /**
   * An optional JSX rendering for placeholder content.
   */
  placeholder?: React.ReactType;

  /**
   * Callback executed when async loading is complete.
   */
  onLoad?: () => void;

  /**
   * Callback when async loading fails.
   */
  onError?: (error: Error) => void;
}

/**
 * If possible, use a WeakMap to maintain a cache of loaded components.
 * This can be used to synchronously render components that have already been loaded,
 * rather than having to wait for at least one async tick.
 */
const _syncModuleCache =
  typeof WeakMap !== 'undefined'
    ? // tslint:disable-next-line:no-any
      new WeakMap<() => Promise<React.ReactType<any>>, React.ReactType<any> | undefined>()
    : undefined;

/**
 * Produces a component which internally loads the target component before first mount.
 * The component passes all props through to the loaded component.
 *
 * This overload accepts a module with a default export for the component.
 */
export function asAsync<TProps>(options: IAsAsyncOptions<TProps>): React.ComponentType<TProps> {
  class Async extends React.Component<TProps & { forwardedRef: React.Ref<TProps> }, { Component?: React.ReactType<TProps> }> {
    public state = {
      Component: _syncModuleCache ? _syncModuleCache.get(options.load) : undefined
    };

    public render(): JSX.Element | null {
      const { forwardedRef } = this.props;
      const { Component } = this.state;
      const Placeholder = options.placeholder;

      return Component ? <Component ref={forwardedRef} {...this.props} /> : Placeholder ? <Placeholder /> : null;
    }

    public componentDidMount(): void {
      let { Component } = this.state;

      if (!Component) {
        options
          .load()
          .then((LoadedComponent: React.ReactType<TProps>) => {
            if (LoadedComponent) {
              // Cache component for future reference.
              _syncModuleCache && _syncModuleCache.set(options.load, LoadedComponent);

              // Set state.
              this.setState(
                {
                  Component: LoadedComponent
                },
                options.onLoad
              );
            }
          })
          .catch(options.onError);
      }
    }
  }

  return React.forwardRef((props: TProps, ref: React.Ref<TProps>) => <Async {...props} forwardedRef={ref} />);
}
