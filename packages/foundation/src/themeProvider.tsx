import * as React from 'react';

export interface IThemeProviderProps<TScheme> {
  scheme: TScheme;
}

// TODO: typing this interface doesn't ensure type safety against Customizer props in 2.8.x but it is left
//        here in anticipation of future type safety. (type safety was verified working in 3.1.1)
export interface ICustomizerProps<TContext> {
  /**
   * Optional transform function for context. Any implementations should take care to return context without
   * mutating it.
   */
  contextPlugin?: (context: Readonly<TContext>) => TContext;
}

export interface IThemeProviders<TContext, TTheme, TScheme, TCustomizerProps extends ICustomizerProps<TContext>> {
  /**
   * A provider that applies the given scheme to the given context and returns the resutling context. This provider
   * should automatically handle falling back to theme data from the global store (outside of context) if applicable.
   */
  getSchemedContext: (scheme: TScheme, context: TContext) => TContext;

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
): React.StatelessComponent<IThemeProviderProps<TScheme>> {
  const { CustomizerComponent: Customizer } = providers;
  const result: React.StatelessComponent<IThemeProviderProps<TScheme>> = (props: IThemeProviderProps<TScheme>) => {
    const { scheme, ...rest } = props;

    // tslint:disable-next-line:typedef
    const contextPlugin: ICustomizerProps<TContext>['contextPlugin'] = context => {
      return providers.getSchemedContext(scheme, context);
    };

    return <Customizer {...rest} contextPlugin={contextPlugin} />;
  };
  return result;
}
