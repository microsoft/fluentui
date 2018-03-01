
import * as React from 'react';

interface IAsAsyncState<TProps> {
  component?: React.ComponentType<TProps> | undefined;
  error?: Error;
  placeholder?: JSX.Element;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

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
  load: () => Promise<{ default: React.ComponentType<TProps>; }>,
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
 * Implementatio of asAsync.
 */
export function asAsync<TProps, TOwnProps = IAsAsyncProps>(
  load: () => Promise<React.ComponentType<TProps> | IModuleWithDefault<React.ComponentType<TProps>>>,
  mapAsyncProps?: (props: TOwnProps) => IAsAsyncProps
): React.ComponentType<TProps & TOwnProps> {
  class Async extends React.Component<TProps & TOwnProps, IAsAsyncState<TProps>> {
    constructor(props: TProps & TOwnProps) {
      super(props);

      this.state = {
        ...(mapAsyncProps ? mapAsyncProps(this.props as Readonly<TOwnProps>) : defaultMapAsyncProps(this.props))
      };
    }

    public async componentWillMount(): Promise<void> {
      // Resolve the component during this lifecycle method so
      // if the promise resolves synchronously, setState does not trigger another update.
      try {
        this.setState({
          component: getModuleDefaultOrModule(await load())
        });
      } catch (e) {
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
      const {
        component: Component,
        placeholder = null
      } = this.state;

      return Component ?
        (
          <Component { ...this.props } />
        ) :
        placeholder;
    }

    public componentDidUpdate(previousProps: IAsAsyncProps, previousState: IAsAsyncState<TProps>): void {
      const {
        error,
        onLoad,
        onError
      } = this.state;

      if (!previousState.component && this.state.component) {
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
  }

  return Async;
}

function defaultMapAsyncProps(props: IAsAsyncProps): IAsAsyncProps {
  const {
    placeholder,
    onLoad,
    onError
  } = props;

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
