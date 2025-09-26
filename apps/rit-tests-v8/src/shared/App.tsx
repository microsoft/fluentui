import * as React from 'react';
import { ThemeProvider, DefaultButton, PartialTheme, getTheme } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { ContextualMenuExample } from './components';

// This app is here as a simple sandbox to render v8 controls inside of an React 18 environment.

export const App = () => {
  const { palette } = getTheme();

  const lightTheme: PartialTheme = {
    semanticColors: {
      bodyBackground: palette.white,
      bodyText: palette.black,
      menuBackground: palette.white,
    },
  };

  const darkTheme: PartialTheme = {
    semanticColors: {
      bodyBackground: palette.black,
      bodyText: palette.white,
      menuBackground: palette.black,
    },
  };
  const [isLight, { toggle: toggleIsLight }] = useBoolean(true);

  const ToggleButton: React.FunctionComponent = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore typing error caused by monorepo being on @types/react version 17 and this app being on react 18.
    // Seems to be caused by certain v8 components (like Button) still being class components.
    // Error goes away when monorepo is migrated to react 18 types OR when @fluentui/react increases peer dependency
    // range to include react 18.
    return <DefaultButton onClick={toggleIsLight}>Toggle theme</DefaultButton>;
  };

  return (
    <ThemeProvider style={{ padding: '8px' }} theme={isLight ? lightTheme : darkTheme}>
      <ToggleButton />
      <ContextualMenuExample />
    </ThemeProvider>
  );
};
