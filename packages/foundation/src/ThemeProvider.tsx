import * as React from 'react';

export interface IThemeProviderProps<TScheme, TTheme> {
  scheme?: TScheme;
  theme?: TTheme;
}

// TODO: typing this interface doesn't ensure type safety against Customizer props in 2.8.x but it is left
//        here in anticipation of future type safety. (type safety was verified working in 3.1.1)
export interface ICustomizerProps<TContext> {
  /**
   * Optional transform function for context. Any implementations should take care to return context without
   * mutating it.
   */
  contextTransform?: (context: Readonly<TContext>) => TContext;
}

export interface IThemeProviders<TContext, TTheme, TScheme, TCustomizerProps extends ICustomizerProps<TContext>> {
  /**
   * A provider that applies the given scheme to the given context and returns the resutling context. This provider
   * should automatically handle falling back to theme data from the global store (outside of context) if applicable.
   */
  getThemedContext: (context: TContext, scheme?: TScheme, theme?: TTheme) => TContext;

  /**
   * A customizer component that supplies the underlying implementation for themeProvider.
   */
  CustomizerComponent: React.ComponentType<TCustomizerProps>;
}

/**
 * Theme provider is a simplified version of Customizer that activates the appropriate theme data
 * for a given scheme name.
 *
 * @param providers - Injected providers for accessing theme data and providing it via a Customizer component.
 */
export function themeProvider<TContext, TTheme, TScheme, TCustomizerProps extends ICustomizerProps<TContext>>(
  providers: IThemeProviders<TContext, TTheme, TScheme, TCustomizerProps>
): React.StatelessComponent<IThemeProviderProps<TScheme, TTheme>> {
  const { CustomizerComponent: Customizer } = providers;
  const result: React.StatelessComponent<IThemeProviderProps<TScheme, TTheme>> = (props: IThemeProviderProps<TScheme, TTheme>) => {
    const { scheme, theme, ...rest } = props;

    // TODO: consider merging implementation with theme-proto, which only stores a reference / scheme name to theme in context
    //        and uses quick global store accessor to trigger change by passing in theme object as child and triggering re-render.
    //        (perf benefits need verification)
    // tslint:disable-next-line:typedef
    const contextTransform: ICustomizerProps<TContext>['contextTransform'] = context => {
      return providers.getThemedContext(context, scheme, theme);
    };

    return <Customizer {...rest} contextTransform={contextTransform} />;
  };
  return result;
}
