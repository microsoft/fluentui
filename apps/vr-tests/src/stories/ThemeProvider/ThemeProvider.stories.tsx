import * as React from 'react';
import { Steps } from 'storywright';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { ThemeProvider } from '@fluentui/react';
import { StoryWrightDecorator, TestWrapperDecorator } from '../../utilities';

export default {
  title: 'ThemeProvider',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
};

export const DefaultTheme = () => <PrimaryButton>Default theme</PrimaryButton>;

DefaultTheme.storyName = 'Default theme';

export const CustomizedTheme = () => (
  <ThemeProvider
    theme={{
      semanticColors: {
        primaryButtonBackground: '#000',
      },
    }}
  >
    <PrimaryButton>Customized theme</PrimaryButton>
  </ThemeProvider>
);

CustomizedTheme.storyName = 'Customized theme';

export const CustomizedThemeNestedThemeProvider = () => (
  <ThemeProvider
    theme={{
      semanticColors: {
        primaryButtonBackground: '#000',
      },
    }}
  >
    <PrimaryButton>Customized theme 1</PrimaryButton>
    <ThemeProvider
      theme={{
        palette: {
          themePrimary: '#FFF',
        },
        semanticColors: {
          primaryButtonText: '#000',
        },
      }}
    >
      <PrimaryButton>Customized theme 2</PrimaryButton>
    </ThemeProvider>
  </ThemeProvider>
);

CustomizedThemeNestedThemeProvider.storyName = 'Customized theme - nested ThemeProvider';

export const CustomizedStyles = () => (
  <ThemeProvider
    theme={{ components: { PrimaryButton: { styles: { root: { background: '#000' } } } } }}
  >
    <PrimaryButton>Customized styles</PrimaryButton>
  </ThemeProvider>
);

CustomizedStyles.storyName = 'Customized styles';
