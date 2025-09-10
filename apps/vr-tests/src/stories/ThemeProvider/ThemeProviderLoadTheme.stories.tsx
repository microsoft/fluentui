import * as React from 'react';
import { Steps } from 'storywright';
import { loadTheme, createTheme } from '@fluentui/react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { ThemeProvider } from '@fluentui/react';
import { StoryWrightDecorator, TestWrapperDecorator } from '../../utilities';

export default {
  title: 'ThemeProvider with loadTheme',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(
      new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('.testLoadTheme')
        .snapshot('global theme changed', { cropTo: '.testWrapper' })
        .click('.testLoadTheme') // set default theme back
        .end(),
    ),
  ],
};

const LoadThemeTestButton: React.FunctionComponent<{
  children?: React.ReactNode;
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

export const UseUpdatedGlobalTheme = () => (
  <LoadThemeTestButton>Customized global theme</LoadThemeTestButton>
);

UseUpdatedGlobalTheme.storyName = 'Use updated global theme';
