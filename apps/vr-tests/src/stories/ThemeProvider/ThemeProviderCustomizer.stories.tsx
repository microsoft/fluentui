import * as React from 'react';
import { Steps } from 'storywright';
import { createTheme, Customizer } from '@fluentui/react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { ThemeProvider } from '@fluentui/react';
import { StoryWrightDecorator, TestWrapperDecorator } from '../../utilities';

export default {
  title: 'ThemeProvider with Customizer',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
};

export const CustomizerWrapsThemeProvider = () => (
  <Customizer
    settings={{
      theme: createTheme({
        semanticColors: { primaryButtonBackground: '#FFF', primaryButtonText: 'red' },
      }),
    }}
  >
    <PrimaryButton>Customized by Customizer</PrimaryButton>

    <ThemeProvider
      theme={{
        semanticColors: {
          primaryButtonBackground: '#000',
        },
      }}
    >
      <PrimaryButton>Customized by ThemeProvider</PrimaryButton>
    </ThemeProvider>
  </Customizer>
);

CustomizerWrapsThemeProvider.storyName = 'Customizer wraps ThemeProvider';

export const ThemeProviderWrapsCustomizer = () => (
  <ThemeProvider
    theme={{
      semanticColors: {
        primaryButtonBackground: '#FFF',
        primaryButtonText: 'red',
      },
    }}
  >
    <PrimaryButton>Customized by ThemeProvider</PrimaryButton>
    <Customizer
      settings={{
        theme: createTheme({
          semanticColors: { primaryButtonBackground: '#000' },
        }),
      }}
    >
      <PrimaryButton>Customized by Customizer</PrimaryButton>
    </Customizer>
  </ThemeProvider>
);

ThemeProviderWrapsCustomizer.storyName = 'ThemeProvider wraps Customizer';
