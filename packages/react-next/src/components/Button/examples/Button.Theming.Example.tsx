import * as React from 'react';
import { PrimaryButton, DefaultButton } from '@fluentui/react-next/lib/compat/Button';
import { Button } from '@fluentui/react-button';
import { Stack } from '@fluentui/react-next/lib/Stack';
import { loadTheme, FontSizes, IPartialTheme } from '@fluentui/react-next/lib/Styling';
import { ThemeProvider } from '@fluentui/react-theme-provider';
// import { Customizer } from '@fluentui/react-next/lib/Utilities';

// Used to add spacing between example checkboxes
const stackTokens = { childrenGap: 10 };

const customizedTheme: IPartialTheme = {
  semanticColors: { primaryButtonBackground: 'papayawhip', primaryButtonText: 'pink' },
};

// TODO (xgao): Remove. This example is temporary for testing backward compatibility.
export const ButtonThemingExample: React.FunctionComponent = () => {
  // const loadCustomizedTheme = () => loadTheme({ fonts: { medium: { fontSize: FontSizes.xLarge } } });

  return (
    <Stack tokens={stackTokens}>
      <Button primary>Default Theme</Button>

      <ThemeProvider theme={customizedTheme}>
        <Button primary>With ThemeProvider settings theme</Button>
      </ThemeProvider>

      {/* <ThemeProvider theme={{ DefaultButton: { styles: { root: { background: 'yellow' } } } }}>
        <Button>With ThemeProvider scopedSettings Component styles</DefaultButton>
      </ThemeProvider>

      <ThemeProvider theme={{ DefaultButton: { theme: customizedTheme } }}>
        <Button>
          With ThemeProvider scopedSettings Component theme (not really a supported scenario)
        </Button>
      </ThemeProvider> */}
    </Stack>
  );
};

export const CompatButtonThemingExample: React.FunctionComponent = () => {
  const loadCustomizedTheme = () => loadTheme({ fonts: { medium: { fontSize: FontSizes.xLarge } } });

  return (
    <Stack tokens={stackTokens}>
      <PrimaryButton>Default Theme</PrimaryButton>

      <ThemeProvider theme={customizedTheme}>
        <PrimaryButton>With ThemeProvider settings theme</PrimaryButton>
      </ThemeProvider>

      <ThemeProvider theme={{ components: { DefaultButton: { styles: { root: { background: 'yellow' } } } } }}>
        <DefaultButton>With ThemeProvider scopedSettings Component styles</DefaultButton>
      </ThemeProvider>
      {/*
      <ThemeProvider theme={{ DefaultButton: { theme: customizedTheme } }}>
        <DefaultButton>With ThemeProvider scopedSettings Component theme (NOT supported)</DefaultButton>
      </ThemeProvider> */}

      {/* eslint-disable-next-line react/jsx-no-bind */}
      <DefaultButton onClick={loadCustomizedTheme}>Test loadTheme</DefaultButton>
    </Stack>
  );
};
