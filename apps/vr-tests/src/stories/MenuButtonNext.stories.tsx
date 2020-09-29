/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { MenuButton } from '@fluentui/react-button';
import { AddIcon } from '@fluentui/react-icons';
import { TeamsTheme } from '@fluentui/storybook/lib/themes/v8/index';
import { withThemeProvider } from '@fluentui/storybook';
import { FabricDecorator } from '../utilities';

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
  .addStory('Fluid', () => (
    <MenuButton fluid icon="X">
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
  .addStory('Fluid', () => (
    <MenuButton fluid icon="X">
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
