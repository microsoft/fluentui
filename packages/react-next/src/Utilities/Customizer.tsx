import * as React from 'react';
import { useForceUpdate } from '@uifabric/react-hooks';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import {
  Customizations,
  CustomizerContext,
  mergeCustomizations,
  ICustomizerContext,
} from 'office-ui-fabric-react/lib/Utilities';
import { convertLegacyTheme } from '../Styling/convertLegacyTheme';
import { ICustomizerProps } from '../Utilities';

/**
 * Replacement for Customizer from utilities package. It also provides the theme context.
 *
 * TODO (xgao): deprecate this before shipping react-next.
 * Global theme should be provided using `ThemeProvider`.
 * Scoped style override for a particular component should be done using `compose`.
 */
export const Customizer: React.FunctionComponent<ICustomizerProps> = props => {
  const forceUpdate = useForceUpdate();

  React.useEffect(() => {
    Customizations.observe(forceUpdate);

    return () => Customizations.unobserve(forceUpdate);
  }, []);

  const { contextTransform, children, disableThemeProvider } = props;
  return (
    <CustomizerContext.Consumer>
      {(parentContext: ICustomizerContext) => {
        let newContext = mergeCustomizations(props, parentContext);

        if (contextTransform) {
          newContext = contextTransform(newContext);
        }

        const globalTheme = newContext.customizations.settings.theme;
        const content =
          globalTheme && !disableThemeProvider ? (
            <ThemeProvider theme={convertLegacyTheme(globalTheme)}>{props.children}</ThemeProvider>
          ) : (
            children
          );

        return <CustomizerContext.Provider value={newContext}>{content}</CustomizerContext.Provider>;
      }}
    </CustomizerContext.Consumer>
  );
};
