import * as React from 'react';

interface IAsAsyncState<TProps> {
  component?: React.ComponentType<TProps> | undefined;
  error?: Error;
  placeholder?: JSX.Element;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

/**
 * If possible, use a WeakMap to maintain a cache of loaded components.
 * This can be used to synchronously render components that have already been loaded,
 * rather than having to wait for at least one async tick.
 */
const syncModuleCache =
  typeof WeakMap !== 'undefined'
    ? new WeakMap<() => Promise<any>, React.ComponentType<any>>() // tslint:disable-line:no-any
    : undefined;

/**
 * Represents the surface of a module which has a default export.
 */
export interface IModuleWithDefault<T> {
  default: T;
}

export interface IAsAsyncProps {
  /**
   * A placeholder to render while the component loads.
   */
  placeholder?: JSX.Element;
  /**
   * A callback to be invoked when the component has loaded and rendered.
   */
  onLoad?: () => void;
  /**
   * A callback to be invoked when the component has failed to load.
   */
  onError?: (error: Error) => void;
}

/**
 * Produces a component which internally loads the target component before first mount.
 * The component passes all props through to the loaded component.
 *
 * This overload accepts a module with a default export for the component.
 */
export function asAsync<TProps, TOwnProps = IAsAsyncProps>(
  load: () => Promise<{ default: React.ComponentType<TProps> }>,
  mapAsyncProps?: (props: TOwnProps) => IAsAsyncProps
): React.ComponentType<TProps & TOwnProps>;
/**
 * Produces a component which internally loads the target component before first mount.
 * The component passes all props through to the loaded component.
 *
 * This overload accepts a component directly.
 */
export function asAsync<TProps, TOwnProps = IAsAsyncProps>(
  load: () => Promise<React.ComponentType<TProps>>,
  mapAsyncProps?: (props: TOwnProps) => IAsAsyncProps
): React.ComponentType<TProps & TOwnProps>;
/**
 * Implementation of asAsync.
 */
export function asAsync<TProps, TOwnProps = IAsAsyncProps>(
  load: () => Promise<React.ComponentType<TProps> | IModuleWithDefault<React.ComponentType<TProps>>>,
  mapAsyncProps?: (props: TOwnProps) => IAsAsyncProps
): React.ComponentType<TProps & TOwnProps> {
  class Async extends React.PureComponent<TProps & TOwnProps, IAsAsyncState<TProps>> {
    private _isDisposed?: boolean;

    constructor(props: TProps & TOwnProps) {
      super(props);

      this.state = {
        ...(mapAsyncProps ? mapAsyncProps(this.props as Readonly<TOwnProps>) : defaultMapAsyncProps(this.props)),
        ...(syncModuleCache && syncModuleCache.has(load)
          ? {
              component: syncModuleCache.get(load)
            }
          : {})
      };
    }

    public async componentWillMount(): Promise<void> {
      // Resolve the component during this lifecycle method so
      // if the promise resolves synchronously, setState does not trigger another update.
      try {
        const component = getModuleDefaultOrModule(await load());

        if (this._isDisposed) {
          return;
        }

        if (syncModuleCache) {
          syncModuleCache.set(load, component);
        }

        this.setState({
          component: component
        });
      } catch (e) {
        if (this._isDisposed) {
          return;
        }

        this.setState({
          error: e instanceof Error ? e : new Error(`${e}`)
        });
      }
    }

    public componentWillReceiveProps(nextProps: Readonly<TProps & TOwnProps>): void {
      this.setState({
        ...(mapAsyncProps ? mapAsyncProps(nextProps as Readonly<TOwnProps>) : defaultMapAsyncProps(nextProps))
      });
    }

    public render(): JSX.Element | null {
      const { component: Component, placeholder = null } = this.state;

      return Component ? <Component {...this.props} /> : placeholder;
    }

    public componentDidUpdate(previousProps: IAsAsyncProps, previousState: IAsAsyncState<TProps>): void {
      const { error, onLoad, onError, component } = this.state;

      if (!previousState.component && component) {
        if (onLoad) {
          onLoad();
        }
      }

      if (!previousState.error && error) {
        if (onError) {
          onError(error);
        }
      }
    }

    public componentWillUnmount(): void {
      this._isDisposed = true;
    }
  }

  return Async;
}

function defaultMapAsyncProps(props: IAsAsyncProps): IAsAsyncProps {
  const { placeholder, onLoad, onError } = props;

  return {
    placeholder,
    onLoad,
    onError
  };
}

/**
 * For a given type, gets the default export from a module, or gets the whole module if there is no
 * default export.
 */
export function getModuleDefaultOrModule<T>(valueOrModuleWithDefault: T | IModuleWithDefault<T>): T {
  return (valueOrModuleWithDefault as IModuleWithDefault<T>).default || valueOrModuleWithDefault;
}
