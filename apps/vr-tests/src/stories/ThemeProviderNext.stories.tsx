import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
// TODO: restore back to ThemeProvider from @fluentui/react-theme-provider
import { ThemeProvider } from '@fluentui/react-theme-provider/lib/compat/index';
import { Button } from '@fluentui/react-button';
import { FabricDecorator } from '../utilities/index';

storiesOf('ThemeProvider (react-theme-provider)', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener steps={new Screener.Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </Screener>
  ))
  .addStory('Default theme', () => (
    <ThemeProvider>
      <Button primary>Default theme</Button>
    </ThemeProvider>
  ))
  .addStory('Customized theme', () => (
    <ThemeProvider
      theme={{
        semanticColors: {
          primaryButtonBackground: '#000',
        },
      }}
    >
      <Button primary>Customized theme</Button>
    </ThemeProvider>
  ))
  .addStory('Customized theme - nested ThemeProvider', () => (
    <ThemeProvider
      theme={{
        semanticColors: {
          primaryButtonBackground: '#000',
        },
      }}
    >
      <Button primary>Customized theme 1</Button>
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
        <Button primary>Customized theme 2</Button>
      </ThemeProvider>
    </ThemeProvider>
  ))
  .addStory('Use variants on new button', () => (
    <ThemeProvider
      theme={{
        components: {
          Button: {
            variants: {
              root: {
                background: 'yellow',
              },
            },
          },
        },
      }}
    >
      <Button>New Button customized with tokens</Button>

      <ThemeProvider
        theme={{
          components: {
            Button: {
              variants: {
                root: {
                  background: 'green',
                },
              },
            },
          },
        }}
      >
        <Button>Nested</Button>
      </ThemeProvider>
    </ThemeProvider>
  ))
  .addStory('Use compat theme on new button', () => (
    <ThemeProvider
      theme={{
        semanticColors: { buttonBackground: 'yellow' },
      }}
    >
      <Button>New Button customized with compat theme</Button>

      <ThemeProvider
        theme={{
          semanticColors: { buttonBackground: 'green' },
        }}
      >
        <Button>Nested</Button>
      </ThemeProvider>
    </ThemeProvider>
  ));
