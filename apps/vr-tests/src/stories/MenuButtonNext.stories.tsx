/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { MenuButton } from '@fluentui/react-button';
import { AddIcon } from '@fluentui/react-icons';
import { TeamsTheme } from '@fluentui/storybook/lib/themes/v8/index';
import { withThemeProvider } from '@fluentui/storybook';
import { FabricDecorator, FabricDecoratorFullWidth } from '../utilities';

storiesOf('MenuButton Next', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withThemeProvider)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
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
  .addStory('Default', () => <MenuButton>Hello, world</MenuButton>)
  .addStory('Primary', () => <MenuButton primary>Hello, world</MenuButton>)
  .addStory('Disabled', () => <MenuButton disabled>Hello, world</MenuButton>)
  .addStory('Primary Disabled', () => (
    <MenuButton primary disabled>
      Hello, world
    </MenuButton>
  ))
  .addStory('With icon before content', () => <MenuButton icon="X">Hello, world</MenuButton>)
  .addStory('With icon after content', () => (
    <MenuButton icon="X" iconPosition="after">
      Hello, world
    </MenuButton>
  ))
  .addStory('Circular', () => (
    <MenuButton circular icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Size largest', () => (
    <MenuButton icon="X" size="largest">
      Hello, world
    </MenuButton>
  ))
  .addStory('Inverted', () => (
    <MenuButton inverted icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Icon only', () => (
    <MenuButton iconOnly icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('With styled icon from react-icons via tokens', () => (
    <MenuButton icon={<AddIcon />} tokens={{ iconSize: '30px' }} />
  ));

storiesOf('MenuButton Next - Block', module)
  .addDecorator(FabricDecoratorFullWidth)
  .addDecorator(withThemeProvider)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.add('ms-Fabric--isFocusVisible')",
        )
        .executeScript("document.getElementsByClassName('ms-Button-root')[0].focus()")
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
    <MenuButton block icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Primary', () => (
    <MenuButton block primary icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Disabled', () => (
    <MenuButton block disabled icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Primary Disabled', () => (
    <MenuButton block primary disabled icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Ghost', () => (
    <MenuButton block ghost icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Ghost Disabled', () => (
    <MenuButton block disabled ghost icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Transparent', () => (
    <MenuButton block transparent icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Transparent Disabled', () => (
    <MenuButton block disabled transparent icon="X">
      Hello, world
    </MenuButton>
  ));

storiesOf('MenuButton Next - Teams Theme', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withThemeProvider({ theme: TeamsTheme }))
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
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
  .addStory('Default', () => <MenuButton>Hello, world</MenuButton>)
  .addStory('Primary', () => <MenuButton primary>Hello, world</MenuButton>)
  .addStory('Disabled', () => <MenuButton disabled>Hello, world</MenuButton>)
  .addStory('Primary Disabled', () => (
    <MenuButton primary disabled>
      Hello, world
    </MenuButton>
  ))
  .addStory('With icon before content', () => <MenuButton icon="X">Hello, world</MenuButton>)
  .addStory('With icon after content', () => (
    <MenuButton icon="X" iconPosition="after">
      Hello, world
    </MenuButton>
  ))
  .addStory('Circular', () => (
    <MenuButton circular icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Size largest', () => (
    <MenuButton icon="X" size="largest">
      Hello, world
    </MenuButton>
  ))
  .addStory('Inverted', () => (
    <MenuButton inverted icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Block', () => (
    <MenuButton block icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Icon only', () => (
    <MenuButton iconOnly icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('With styled icon from react-icons via tokens', () => (
    <MenuButton icon={<AddIcon />} tokens={{ iconSize: '30px' }} />
  ));
