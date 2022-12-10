import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { loadTheme, createTheme, Customizer } from '@fluentui/react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { ThemeProvider } from '@fluentui/react';
import { TestWrapperDecorator } from '../utilities/index';

storiesOf('ThemeProvider', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </StoryWright>
  ))
  .addStory('Default theme', () => <PrimaryButton>Default theme</PrimaryButton>)
  .addStory('Customized theme', () => (
    <ThemeProvider
      theme={{
        semanticColors: {
          primaryButtonBackground: '#000',
        },
      }}
    >
      <PrimaryButton>Customized theme</PrimaryButton>
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
  ))
  .addStory('Customized styles', () => (
    <ThemeProvider
      theme={{ components: { PrimaryButton: { styles: { root: { background: '#000' } } } } }}
    >
      <PrimaryButton>Customized styles</PrimaryButton>
    </ThemeProvider>
  ));

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

storiesOf('ThemeProvider with loadTheme', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('.testLoadTheme')
        .snapshot('global theme changed', { cropTo: '.testWrapper' })
        .click('.testLoadTheme') // set default theme back
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Use contextual theme over global theme if defined', () => (
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
  ))
  .addStory('Use updated global theme', () => (
    <LoadThemeTestButton>Customized global theme</LoadThemeTestButton>
  ));

storiesOf('ThemeProvider with Customizer', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </StoryWright>
  ))
  .addStory('Customizer wraps ThemeProvider', () => (
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
  ))
  .addStory('ThemeProvider wraps Customizer', () => (
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
  ));
