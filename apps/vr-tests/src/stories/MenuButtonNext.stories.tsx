/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { MenuButton } from '@fluentui/react-button';
import { AddIcon } from '@fluentui/react-icons';
import { TeamsTheme } from '@fluentui/react-theme-provider';
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
  .addStory('With icon before content', () => <MenuButton icon="X">Hello, world</MenuButton>);

storiesOf('MenuButton Next - With icon before content', module)
  .addDecorator(FabricDecorator)
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
  .addStory('Default', () => <MenuButton icon="X">Hello, world</MenuButton>)
  .addStory('Primary', () => (
    <MenuButton primary icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Disabled', () => (
    <MenuButton disabled icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Primary Disabled', () => (
    <MenuButton primary disabled icon="X">
      Hello, world
    </MenuButton>
  ));

storiesOf('MenuButton Next - With icon after content', module)
  .addDecorator(FabricDecorator)
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
  .addStory('Default', () => (
    <MenuButton icon="X" iconPosition="after">
      Hello, world
    </MenuButton>
  ))
  .addStory('Primary', () => (
    <MenuButton primary icon="X" iconPosition="after">
      Hello, world
    </MenuButton>
  ))
  .addStory('Disabled', () => (
    <MenuButton disabled icon="X" iconPosition="after">
      Hello, world
    </MenuButton>
  ))
  .addStory('Primary Disabled', () => (
    <MenuButton primary disabled icon="X" iconPosition="after">
      Hello, world
    </MenuButton>
  ));

storiesOf('MenuButton Next - Circular', module)
  .addDecorator(FabricDecorator)
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
  .addStory('Default', () => (
    <MenuButton circular icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Primary', () => (
    <MenuButton circular primary icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Disabled', () => (
    <MenuButton circular disabled icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Primary Disabled', () => (
    <MenuButton circular primary disabled icon="X">
      Hello, world
    </MenuButton>
  ));

storiesOf('MenuButton Next - Icon only', module)
  .addDecorator(FabricDecorator)
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
  .addStory('Default', () => (
    <MenuButton iconOnly icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Primary', () => (
    <MenuButton iconOnly primary icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Disabled', () => (
    <MenuButton iconOnly disabled icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Primary Disabled', () => (
    <MenuButton iconOnly primary disabled icon="X">
      Hello, world
    </MenuButton>
  ));

storiesOf('MenuButton Next - Fluid', module)
  .addDecorator(FabricDecorator)
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
  .addStory('Default', () => (
    <MenuButton fluid icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Primary', () => (
    <MenuButton fluid primary icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Disabled', () => (
    <MenuButton fluid disabled icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Primary Disabled', () => (
    <MenuButton fluid primary disabled icon="X">
      Hello, world
    </MenuButton>
  ));

storiesOf('MenuButton Next - Inverted', module)
  .addDecorator(FabricDecorator)
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
  .addStory('Default', () => (
    <MenuButton inverted icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Primary', () => (
    <MenuButton inverted primary icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Disabled', () => (
    <MenuButton inverted disabled icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Primary Disabled', () => (
    <MenuButton inverted primary disabled icon="X">
      Hello, world
    </MenuButton>
  ));

storiesOf('MenuButton Next - Loading', module)
  .addDecorator(FabricDecorator)
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
  .addStory('Default', () => (
    <MenuButton loading icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Primary', () => (
    <MenuButton loading primary icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Disabled', () => (
    <MenuButton loading disabled icon="X">
      Hello, world
    </MenuButton>
  ))
  .addStory('Primary Disabled', () => (
    <MenuButton loading primary disabled icon="X">
      Hello, world
    </MenuButton>
  ));

storiesOf('MenuButton Next - Sizes', module)
  .addDecorator(FabricDecorator)
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
  .addStory('Smallest', () => (
    <MenuButton icon="X" size="smallest">
      Hello, world
    </MenuButton>
  ))
  .addStory('Smaller', () => (
    <MenuButton icon="X" size="smaller">
      Hello, world
    </MenuButton>
  ))
  .addStory('Small', () => (
    <MenuButton icon="X" size="small">
      Hello, world
    </MenuButton>
  ))
  .addStory('Large', () => (
    <MenuButton icon="X" size="large">
      Hello, world
    </MenuButton>
  ))
  .addStory('Larger', () => (
    <MenuButton icon="X" size="larger">
      Hello, world
    </MenuButton>
  ))
  .addStory('Largest', () => (
    <MenuButton icon="X" size="largest">
      Hello, world
    </MenuButton>
  ));

storiesOf('MenuButton Next - With styled icon from react-icons via tokens', module)
  .addDecorator(FabricDecorator)
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
  .addStory('Default', () => <MenuButton icon={<AddIcon />} tokens={{ iconSize: '40px' }} />)
  .addStory('Primary', () => (
    <MenuButton primary icon={<AddIcon />} tokens={{ iconSize: '40px' }} />
  ))
  .addStory('Disabled', () => (
    <MenuButton disabled icon={<AddIcon />} tokens={{ iconSize: '40px' }} />
  ))
  .addStory('Primary Disabled', () => (
    <MenuButton primary disabled icon={<AddIcon />} tokens={{ iconSize: '40px' }} />
  ));
