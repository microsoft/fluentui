import * as React from 'react';
import { Steps } from 'storywright';
import { loadTheme, createTheme, Customizer } from '@fluentui/react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { ThemeProvider } from '@fluentui/react';
import { StoryWrightDecorator, TestWrapperDecorator } from '../utilities';

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

const LoadThemeTestButton: React.FunctionComponent<{
  buttonAs?: React.ElementType;
  buttonProps?: any;
}> = props => {
  const [isThemeCustomized, setIsThemeCustomized] = React.useState(false);

  // toggle between default theme and customized theme
  const onClick = () => {
    if (isThemeCustomized) {
      loadTheme(createTheme({}));
      setIsThemeCustomized(false);
    } else {
      loadTheme({
        semanticColors: { primaryButtonBackground: '#000', primaryButtonBackgroundHovered: '#000' },
      });
      setIsThemeCustomized(true);
    }
  };

  const Root = props.buttonAs || PrimaryButton;

  return (
    <Root className="testLoadTheme" onClick={onClick} {...props.buttonProps}>
      {props.children}
    </Root>
  );
};

const steps = new Steps()
  .snapshot('default', { cropTo: '.testWrapper' })
  .click('.testLoadTheme')
  .snapshot('global theme changed', { cropTo: '.testWrapper' })
  .click('.testLoadTheme') // set default theme back
  .end();

export const UseContextualThemeOverGlobalThemeIfDefined = () => (
  <ThemeProvider>
    <LoadThemeTestButton>Customized contextual theme 1</LoadThemeTestButton>
    <ThemeProvider theme={{ semanticColors: { primaryButtonText: 'yellow' } }}>
      <PrimaryButton>Customized contextual theme 2</PrimaryButton>
    </ThemeProvider>

    <ThemeProvider
      theme={{ semanticColors: { primaryButtonBackground: '#FFF', primaryButtonText: 'green' } }}
    >
      <PrimaryButton>Customized contextual theme 3</PrimaryButton>
    </ThemeProvider>
  </ThemeProvider>
);

UseContextualThemeOverGlobalThemeIfDefined.storyName =
  'Use contextual theme over global theme if defined';
UseContextualThemeOverGlobalThemeIfDefined.parameters = { steps };

export const UseUpdatedGlobalTheme = () => (
  <LoadThemeTestButton>Customized global theme</LoadThemeTestButton>
);

UseUpdatedGlobalTheme.storyName = 'Use updated global theme';
UseUpdatedGlobalTheme.parameters = { steps };

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
