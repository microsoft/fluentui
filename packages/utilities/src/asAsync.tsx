/**
 * asAsync - a HOC for async loading components.
 *
 * Usage:
 *
 * const AsyncDialog = asAsync({
 *   load: () => import('Dialog').then(result => result.default),
 * });
 *
 * React.render(domElement, <AsyncDialog asyncPlaceholder={ () => <Spinner/> } { ...dialogProps } />);
 *
 * Note the `asyncPlaceholder` prop will be respected when rendering the async component and it hasn't
 * been loaded yet.
 */

import * as React from 'react';

export interface IAsAsyncOptions<TProps> {
  /**
   * Callback which returns a promise resolving an object which exports the component.
   */
  load: () => Promise<React.ReactType<TProps>>;

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
export function asAsync<TProps>(
  options: IAsAsyncOptions<TProps>
): React.ForwardRefExoticComponent<React.PropsWithoutRef<TProps & { asyncPlaceholder?: React.ReactType }>> {
  class Async extends React.Component<
    TProps & {
      asyncPlaceholder?: React.ReactType;
      forwardedRef: React.Ref<TProps>;
    },
    { Component?: React.ReactType<TProps> }
  > {
    public state = {
      Component: _syncModuleCache ? (_syncModuleCache.get(options.load) as React.ReactType<TProps>) : undefined
    };

    public render(): JSX.Element | null {
      // Typescript issue: the rest can't be pulled without the any cast, as TypeScript fails with rest on generics.
      // tslint:disable-next-line:no-any
      const { forwardedRef, asyncPlaceholder: Placeholder, ...rest } = this.props as any;
      const { Component } = this.state;
      return Component ? React.createElement(Component, { ...rest, ref: forwardedRef }) : Placeholder ? <Placeholder /> : null;
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
  return React.forwardRef((props: TProps & { asyncPlaceholder?: React.ReactType }, ref: React.Ref<TProps>) => (
    <Async {...props} forwardedRef={ref} />
  ));
}
