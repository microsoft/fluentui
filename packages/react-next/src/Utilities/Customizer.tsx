import * as React from 'react';
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
 * Customizer should be replaceable by ThemeProvider and compose.
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

        const content = disableThemeProvider ? (
          children
        ) : (
          <ThemeProvider theme={convertLegacyTheme(newContext.customizations.settings.theme)}>
            {props.children}
          </ThemeProvider>
        );

        return <CustomizerContext.Provider value={newContext}>{content}</CustomizerContext.Provider>;
      }}
    </CustomizerContext.Consumer>
  );
};

function useForceUpdate(): () => void {
  const [, setValue] = React.useState(0);
  return () => setValue(value => ++value);
}
