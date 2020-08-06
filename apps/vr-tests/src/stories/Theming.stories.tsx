import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { loadTheme, createTheme } from 'office-ui-fabric-react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { FabricDecorator } from '../utilities';

storiesOf('ThemeProvider', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener steps={new Screener.Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </Screener>
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
          semanticColors: {
            primaryButtonBackground: '#FFF',
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

const LoadThemeTestButton: React.FunctionComponent<{}> = props => {
  const [isThemeCustomized, setIsThemeCustomized] = React.useState(false);

  // toggle between default theme and customized theme
  const onClick = () => {
    if (isThemeCustomized) {
      loadTheme(createTheme({}));
      setIsThemeCustomized(false);
    } else {
      loadTheme({ semanticColors: { primaryButtonBackground: '#000' } });
      setIsThemeCustomized(true);
    }
  };

  return (
    <PrimaryButton className="testLoadTheme" onClick={onClick}>
      {props.children}
    </PrimaryButton>
  );
};

storiesOf('loadTheme', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('.testLoadTheme')
        .snapshot('loadTheme', { cropTo: '.testWrapper' })
        .click('.testLoadTheme') // set default theme back
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Use contextual theme over global theme if defined', () => (
    <ThemeProvider>
      <LoadThemeTestButton>Customized contextual theme</LoadThemeTestButton>
    </ThemeProvider>
  ))
  .addStory('Use updated global theme', () => (
    <LoadThemeTestButton>Customized global theme</LoadThemeTestButton>
  ));
