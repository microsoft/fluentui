/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { SplitButton } from '@fluentui/react-button';
import { AddIcon } from '@fluentui/react-icons';
import { TeamsTheme } from '@fluentui/react-theme-provider';
import { withThemeProvider } from '@fluentui/storybook';
import { FabricDecorator } from '../utilities';

storiesOf('SplitButton Next', module)
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
  .addStory('Fluid', () => (
    <SplitButton fluid icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Icon only', () => (
    <SplitButton iconOnly icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('With styled icon from react-icons via tokens', () => (
    <SplitButton icon={<AddIcon />} tokens={{ iconSize: '40px' }} />
  ));

storiesOf('SplitButton Next - Teams Theme', module)
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
  .addStory('Fluid', () => (
    <SplitButton fluid icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Icon only', () => (
    <SplitButton iconOnly icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('With styled icon from react-icons via tokens', () => (
    <SplitButton icon={<AddIcon />} tokens={{ iconSize: '40px' }} />
  ));
