import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { ToggleButton } from '@fluentui/react-button';
import { AddIcon } from '@fluentui/react-icons';
import { TeamsTheme } from '@fluentui/storybook/lib/themes/v8/index';
import { withThemeProvider } from '@fluentui/storybook';
import { FabricDecorator, FabricDecoratorFullWidth } from '../utilities';

storiesOf('ToggleButton', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withThemeProvider)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('button')
        .snapshot('checked', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.add('ms-Fabric--isFocusVisible')",
        )
        .executeScript("document.getElementsByTagName('button')[0].focus()")
        .snapshot('focus', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.remove('ms-Fabric--isFocusVisible')",
        )
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => <ToggleButton>Hello, world</ToggleButton>)
  .addStory('Primary', () => <ToggleButton primary>Hello, world</ToggleButton>)
  .addStory('Disabled', () => <ToggleButton disabled>Hello, world</ToggleButton>)
  .addStory('Primary Disabled', () => (
    <ToggleButton primary disabled>
      Hello, world
    </ToggleButton>
  ))
  .addStory('With icon before content', () => <ToggleButton icon="X">Hello, world</ToggleButton>)
  .addStory('With icon after content', () => (
    <ToggleButton icon="X" iconPosition="after">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Circular', () => (
    <ToggleButton circular icon="X">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Size largest', () => (
    <ToggleButton icon="X" size="largest">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Inverted', () => (
    <ToggleButton inverted icon="X">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Icon only', () => (
    <ToggleButton iconOnly icon="X">
      Hello, world
    </ToggleButton>
  ))
  .addStory('With styled icon from react-icons via tokens', () => (
    <ToggleButton icon={<AddIcon />} tokens={{ iconSize: '30px' }} />
  ));

storiesOf('ToggleButton Next - Block', module)
  .addDecorator(FabricDecoratorFullWidth)
  .addDecorator(withThemeProvider)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.add('ms-Fabric--isFocusVisible')",
        )
        .executeScript("document.getElementsByClassName('ms-Button')[0].focus()")
        .snapshot('focus', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.remove('ms-Fabric--isFocusVisible')",
        )
        .hover('button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('button')
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => (
    <ToggleButton block icon="X">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Primary', () => (
    <ToggleButton block primary icon="X">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Disabled', () => (
    <ToggleButton block disabled icon="X">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Primary Disabled', () => (
    <ToggleButton block primary disabled icon="X">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Ghost', () => (
    <ToggleButton block ghost icon="X">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Ghost Disabled', () => (
    <ToggleButton block disabled ghost icon="X">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Transparent', () => (
    <ToggleButton block transparent icon="X">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Transparent Disabled', () => (
    <ToggleButton block disabled transparent icon="X">
      Hello, world
    </ToggleButton>
  ));

storiesOf('ToggleButton Next - Teams Theme', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withThemeProvider({ theme: TeamsTheme }))
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('button')
        .snapshot('clicked', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.add('ms-Fabric--isFocusVisible')",
        )
        .executeScript("document.getElementsByTagName('button')[0].focus()")
        .snapshot('focus', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.remove('ms-Fabric--isFocusVisible')",
        )
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => <ToggleButton>Hello, world</ToggleButton>)
  .addStory('Primary', () => <ToggleButton primary>Hello, world</ToggleButton>)
  .addStory('Disabled', () => <ToggleButton disabled>Hello, world</ToggleButton>)
  .addStory('Primary Disabled', () => (
    <ToggleButton primary disabled>
      Hello, world
    </ToggleButton>
  ))
  .addStory('With icon before content', () => <ToggleButton icon="X">Hello, world</ToggleButton>);
