/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { CompoundButton } from '@fluentui/react-button';
import { AddIcon } from '@fluentui/react-icons';
import { withThemeProvider } from '@fluentui/storybook';
import { FabricDecorator } from '../utilities';

storiesOf('CompoundButton Next', module)
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
  .addStory('Default', () => (
    <CompoundButton secondaryContent="This is some secondary text">Hello, world</CompoundButton>
  ))
  .addStory('Primary', () => (
    <CompoundButton secondaryContent="This is some secondary text" primary>
      Hello, world
    </CompoundButton>
  ))
  .addStory('Disabled', () => (
    <CompoundButton secondaryContent="This is some secondary text" disabled>
      Hello, world
    </CompoundButton>
  ))
  .addStory('Primary Disabled', () => (
    <CompoundButton secondaryContent="This is some secondary text" primary disabled>
      Hello, world
    </CompoundButton>
  ))
  .addStory('With icon before content', () => (
    <CompoundButton secondaryContent="This is some secondary text" icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('With icon after content', () => (
    <CompoundButton secondaryContent="This is some secondary text" icon="X" iconPosition="after">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Circular', () => (
    <CompoundButton secondaryContent="This is some secondary text" circular icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Size largest', () => (
    <CompoundButton secondaryContent="This is some secondary text" icon="X" size="largest">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Inverted', () => (
    <CompoundButton secondaryContent="This is some secondary text" inverted icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Fluid', () => (
    <CompoundButton secondaryContent="This is some secondary text" fluid icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Icon only', () => (
    <CompoundButton secondaryContent="This is some secondary text" iconOnly icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('With styled icon from react-icons via tokens', () => (
    <CompoundButton
      secondaryContent="This is some secondary text"
      icon={<AddIcon />}
      tokens={{ iconSize: '40px' }}
    />
  ));

storiesOf('CompoundButton Next - Teams Theme', module)
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
  .addStory('Default', () => (
    <CompoundButton secondaryContent="This is some secondary text">Hello, world</CompoundButton>
  ))
  .addStory('Primary', () => (
    <CompoundButton secondaryContent="This is some secondary text" primary>
      Hello, world
    </CompoundButton>
  ))
  .addStory('Disabled', () => (
    <CompoundButton secondaryContent="This is some secondary text" disabled>
      Hello, world
    </CompoundButton>
  ))
  .addStory('Primary Disabled', () => (
    <CompoundButton secondaryContent="This is some secondary text" primary disabled>
      Hello, world
    </CompoundButton>
  ))
  .addStory('With icon before content', () => (
    <CompoundButton secondaryContent="This is some secondary text" icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('With icon after content', () => (
    <CompoundButton secondaryContent="This is some secondary text" icon="X" iconPosition="after">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Circular', () => (
    <CompoundButton secondaryContent="This is some secondary text" circular icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Size largest', () => (
    <CompoundButton secondaryContent="This is some secondary text" icon="X" size="largest">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Inverted', () => (
    <CompoundButton secondaryContent="This is some secondary text" inverted icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Fluid', () => (
    <CompoundButton secondaryContent="This is some secondary text" fluid icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Icon only', () => (
    <CompoundButton secondaryContent="This is some secondary text" iconOnly icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('With styled icon from react-icons via tokens', () => (
    <CompoundButton
      secondaryContent="This is some secondary text"
      icon={<AddIcon />}
      tokens={{ iconSize: '40px' }}
    />
  ));
