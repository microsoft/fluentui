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
  .addStory('With icon before content', () => <SplitButton icon="X">Hello, world</SplitButton>);

storiesOf('SplitButton Next - With icon before content', module)
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
  .addStory('Default', () => <SplitButton icon="X">Hello, world</SplitButton>)
  .addStory('Primary', () => (
    <SplitButton primary icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Disabled', () => (
    <SplitButton disabled icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Primary Disabled', () => (
    <SplitButton primary disabled icon="X">
      Hello, world
    </SplitButton>
  ));

storiesOf('SplitButton Next - With icon after content', module)
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
    <SplitButton icon="X" iconPosition="after">
      Hello, world
    </SplitButton>
  ))
  .addStory('Primary', () => (
    <SplitButton primary icon="X" iconPosition="after">
      Hello, world
    </SplitButton>
  ))
  .addStory('Disabled', () => (
    <SplitButton disabled icon="X" iconPosition="after">
      Hello, world
    </SplitButton>
  ))
  .addStory('Primary Disabled', () => (
    <SplitButton primary disabled icon="X" iconPosition="after">
      Hello, world
    </SplitButton>
  ));

storiesOf('SplitButton Next - Circular', module)
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
    <SplitButton circular icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Primary', () => (
    <SplitButton circular primary icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Disabled', () => (
    <SplitButton circular disabled icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Primary Disabled', () => (
    <SplitButton circular primary disabled icon="X">
      Hello, world
    </SplitButton>
  ));

storiesOf('SplitButton Next - Icon only', module)
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
    <SplitButton iconOnly icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Primary', () => (
    <SplitButton iconOnly primary icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Disabled', () => (
    <SplitButton iconOnly disabled icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Primary Disabled', () => (
    <SplitButton iconOnly primary disabled icon="X">
      Hello, world
    </SplitButton>
  ));

storiesOf('SplitButton Next - Fluid', module)
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
    <SplitButton fluid icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Primary', () => (
    <SplitButton fluid primary icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Disabled', () => (
    <SplitButton fluid disabled icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Primary Disabled', () => (
    <SplitButton fluid primary disabled icon="X">
      Hello, world
    </SplitButton>
  ));

storiesOf('SplitButton Next - Inverted', module)
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
    <SplitButton inverted icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Primary', () => (
    <SplitButton inverted primary icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Disabled', () => (
    <SplitButton inverted disabled icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Primary Disabled', () => (
    <SplitButton inverted primary disabled icon="X">
      Hello, world
    </SplitButton>
  ));

storiesOf('SplitButton Next - Loading', module)
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
    <SplitButton loading icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Primary', () => (
    <SplitButton loading primary icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Disabled', () => (
    <SplitButton loading disabled icon="X">
      Hello, world
    </SplitButton>
  ))
  .addStory('Primary Disabled', () => (
    <SplitButton loading primary disabled icon="X">
      Hello, world
    </SplitButton>
  ));

storiesOf('SplitButton Next - Sizes', module)
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
    <SplitButton icon="X" size="smallest">
      Hello, world
    </SplitButton>
  ))
  .addStory('Smaller', () => (
    <SplitButton icon="X" size="smaller">
      Hello, world
    </SplitButton>
  ))
  .addStory('Small', () => (
    <SplitButton icon="X" size="small">
      Hello, world
    </SplitButton>
  ))
  .addStory('Large', () => (
    <SplitButton icon="X" size="large">
      Hello, world
    </SplitButton>
  ))
  .addStory('Larger', () => (
    <SplitButton icon="X" size="larger">
      Hello, world
    </SplitButton>
  ))
  .addStory('Largest', () => (
    <SplitButton icon="X" size="largest">
      Hello, world
    </SplitButton>
  ));

storiesOf('SplitButton Next - With styled icon from react-icons via tokens', module)
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
  .addStory('Default', () => <SplitButton icon={<AddIcon />} tokens={{ iconSize: '40px' }} />)
  .addStory('Primary', () => (
    <SplitButton primary icon={<AddIcon />} tokens={{ iconSize: '40px' }} />
  ))
  .addStory('Disabled', () => (
    <SplitButton disabled icon={<AddIcon />} tokens={{ iconSize: '40px' }} />
  ))
  .addStory('Primary Disabled', () => (
    <SplitButton primary disabled icon={<AddIcon />} tokens={{ iconSize: '40px' }} />
  ));
