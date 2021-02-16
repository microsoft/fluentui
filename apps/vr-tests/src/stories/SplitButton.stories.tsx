import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { SplitButton } from '@fluentui/react-button';
import { AddIcon } from '@fluentui/react-icons-mdl2';
import { ThemeProvider } from '@fluentui/react-theme-provider/lib/compat/index';
import { TeamsTheme } from '@fluentui/storybook/lib/themes/v8/index';
import { withCompatThemeProvider } from '@fluentui/storybook';
import { FabricDecorator, FabricDecoratorFullWidth } from '../utilities/index';

storiesOf('SplitButton', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withCompatThemeProvider)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.add('ms-Fabric--isFocusVisible')",
        )
        .executeScript("document.getElementsByTagName('button')[0].focus()")
        .snapshot('focus', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.remove('ms-Fabric--isFocusVisible')",
        )
        .hover('.ms-SplitButton-button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.ms-SplitButton-button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('.ms-SplitButton-button')
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => <SplitButton>Hello, world</SplitButton>)
  .addStory('Primary', () => <SplitButton primary>Hello, world</SplitButton>)
  .addStory('Disabled', () => <SplitButton disabled>Hello, world</SplitButton>)
  .addStory('Primary Disabled', () => (
    <SplitButton primary disabled>
      Hello, world
    </SplitButton>
  ))
  .addStory('With icon before content', () => <SplitButton icon="X">Hello, world</SplitButton>)
  .addStory('With icon after content', () => (
    <SplitButton icon="X" iconPosition="after">
      Hello, world
    </SplitButton>
  ))
  .addStory('Circular', () => (
    <SplitButton circular icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Size largest', () => (
    <SplitButton icon="X" size="largest">
      Hello, world
    </SplitButton>
  ))
  .addStory('Inverted', () => (
    <SplitButton inverted icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Icon only', () => (
    <SplitButton iconOnly icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('With styled icon from react-icons via tokens', () => (
    <SplitButton icon={<AddIcon />} tokens={{ iconSize: '30px' }} />
  ))
  .addStory('Customized divider styles', () => (
    <ThemeProvider theme={{ tokens: { button: { dividerLength: '30px' } } }}>
      <SplitButton>Hello, world</SplitButton>
    </ThemeProvider>
  ));

storiesOf('SplitButton Next - Block', module)
  .addDecorator(FabricDecoratorFullWidth)
  .addDecorator(withCompatThemeProvider)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.add('ms-Fabric--isFocusVisible')",
        )
        .executeScript("document.getElementsByTagName('button')[0].focus()")
        .snapshot('focus', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.remove('ms-Fabric--isFocusVisible')",
        )
        .hover('.ms-SplitButton-button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.ms-SplitButton-button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('.ms-SplitButton-button')
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => (
    <SplitButton block icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Primary', () => (
    <SplitButton block primary icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Disabled', () => (
    <SplitButton block disabled icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Primary Disabled', () => (
    <SplitButton block primary disabled icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Ghost', () => (
    <SplitButton block ghost icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Ghost Disabled', () => (
    <SplitButton block disabled ghost icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Transparent', () => (
    <SplitButton block transparent icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Transparent Disabled', () => (
    <SplitButton block disabled transparent icon="X">
      Hello, world
    </SplitButton>
  ));

storiesOf('SplitButton Next - Teams Theme', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withCompatThemeProvider({ theme: TeamsTheme }))
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.add('ms-Fabric--isFocusVisible')",
        )
        .executeScript("document.getElementsByTagName('button')[0].focus()")
        .snapshot('focus', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.remove('ms-Fabric--isFocusVisible')",
        )
        .hover('.ms-SplitButton-button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.ms-SplitButton-button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('.ms-SplitButton-button')
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => <SplitButton>Hello, world</SplitButton>)
  .addStory('Primary', () => <SplitButton primary>Hello, world</SplitButton>)
  .addStory('Disabled', () => <SplitButton disabled>Hello, world</SplitButton>)
  .addStory('Primary Disabled', () => (
    <SplitButton primary disabled>
      Hello, world
    </SplitButton>
  ))
  .addStory('With icon before content', () => <SplitButton icon="X">Hello, world</SplitButton>)
  .addStory('With icon after content', () => (
    <SplitButton icon="X" iconPosition="after">
      Hello, world
    </SplitButton>
  ))
  .addStory('Circular', () => (
    <SplitButton circular icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Size largest', () => (
    <SplitButton icon="X" size="largest">
      Hello, world
    </SplitButton>
  ))
  .addStory('Inverted', () => (
    <SplitButton inverted icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Block', () => (
    <SplitButton block icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Icon only', () => (
    <SplitButton iconOnly icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('With styled icon from react-icons via tokens', () => (
    <SplitButton icon={<AddIcon />} tokens={{ iconSize: '30px' }} />
  ));
