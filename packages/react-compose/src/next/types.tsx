export const OPTIONS_NAME = '__options';

/**
 * Generic name to any dictionary.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericDictionary = Record<string, any>;

export type ComposedComponent<TProps, TState> = React.ForwardRefExoticComponent<TProps> & {
  [OPTIONS_NAME]: ComposeOptions<TProps, TState>;
  extend: <TNewProps = TProps, TNewState = TState>(
    options: ComposeOptions<TNewProps, TNewState>,
  ) => ComposedComponent<TNewProps, TNewState>;
};

export type ComposeRenderFunction<TProps, TState> = (
  state: TState,
  options: ComposeOptions<TProps, TState>,
) => JSX.Element;

export type ComposeInput<TProps, TState> = ComposedComponent<TProps, TState> | ComposeRenderFunction<TProps, TState>;

export type ComposeHook<TProps, TState> = (props: GenericDictionary, options: ComposeOptions<TProps, TState>) => void;

export type ComposeOptions<TProps, TState> = {
  displayName?: string;

  /**
   * Default props to layer user props on before doing the deep merge.
   */
  defaultProps?: Partial<TProps>;

  /**
   * Defines the initial state to use. Defaults to user props. This provides a hook for the user to alter incoming
   * user input before applying the deep merge, shorthand simplifications, and applying attached hooks.
   */
  initialState?: (props: TProps) => Partial<TState>;

  /**
   * Hooks to be executed. Each hook can directly manipulate the state object.
   */
  useHooks?: ComposeHook<TProps, TState>[];

  /**
   * Shorthand props which should be simplified prior to merging. Shorthand should always be in object notation,
   * rather than literals, JSX, etc, before merging.
   */
  shorthandPropNames?: string[];

  /**
   * The render function to apply. This can be provided via options in component recomposition scenarios.
   */
  render?: ComposeRenderFunction<TProps, TState>;
};

export interface ComponentProps extends GenericDictionary {
  as?: React.ElementType;
  ref?: React.Ref<HTMLElement>;
  className?: string;
}

//
// Slot Prop / Shorthand types
//

export type ShorthandRenderFunction<TProps> = (Component: React.ElementType<TProps>, props: TProps) => React.ReactNode;

export type ShorthandProps<TProps extends ComponentProps = {}> =
  | React.ReactChild
  | React.ReactNodeArray
  | React.ReactPortal
  | boolean
  | number
  | null
  | undefined
  | (TProps &
      ComponentProps & {
        children?: TProps['children'] | ShorthandRenderFunction<TProps>;
      });
