/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { CompoundButton } from '@fluentui/react-button';
import { AddIcon } from '@fluentui/react-icons';
import { withThemeProvider } from '@fluentui/storybook';
import { FabricDecorator, FabricDecoratorFullWidth } from '../utilities';

storiesOf('CompoundButton Next', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withThemeProvider)
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
  .addStory('Default', () => <CompoundButton>Hello, world</CompoundButton>)
  .addStory('Primary', () => <CompoundButton primary>Hello, world</CompoundButton>)
  .addStory('Disabled', () => <CompoundButton disabled>Hello, world</CompoundButton>)
  .addStory('Ghost', () => <CompoundButton ghost>Hello, world</CompoundButton>)
  .addStory('Ghost Disabled', () => (
    <CompoundButton disabled ghost>
      Hello, world
    </CompoundButton>
  ))
  .addStory('Primary Disabled', () => (
    <CompoundButton primary disabled>
      Hello, world
    </CompoundButton>
  ));

storiesOf('CompoundButton Next - With icon before content', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withThemeProvider)
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
  .addStory('Default', () => <CompoundButton icon="X">Hello, world</CompoundButton>)
  .addStory('Primary', () => (
    <CompoundButton primary icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Disabled', () => (
    <CompoundButton disabled icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Ghost', () => (
    <CompoundButton ghost icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Ghost Disabled', () => (
    <CompoundButton disabled ghost icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Primary Disabled', () => (
    <CompoundButton primary disabled icon="X">
      Hello, world
    </CompoundButton>
  ));

storiesOf('CompoundButton Next - With icon after content', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withThemeProvider)
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
    <CompoundButton icon="X" iconPosition="after">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Primary', () => (
    <CompoundButton primary icon="X" iconPosition="after">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Disabled', () => (
    <CompoundButton disabled icon="X" iconPosition="after">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Ghost', () => (
    <CompoundButton ghost icon="X" iconPosition="after">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Ghost Disabled', () => (
    <CompoundButton disabled ghost icon="X" iconPosition="after">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Primary Disabled', () => (
    <CompoundButton primary disabled icon="X" iconPosition="after">
      Hello, world
    </CompoundButton>
  ));

storiesOf('CompoundButton Next - Circular', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withThemeProvider)
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
    <CompoundButton circular icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Primary', () => (
    <CompoundButton circular primary icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Disabled', () => (
    <CompoundButton circular disabled icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Ghost', () => (
    <CompoundButton circular ghost icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Ghost Disabled', () => (
    <CompoundButton circular disabled ghost icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Primary Disabled', () => (
    <CompoundButton circular primary disabled icon="X">
      Hello, world
    </CompoundButton>
  ));

storiesOf('CompoundButton Next - Icon only', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withThemeProvider)
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
    <CompoundButton iconOnly icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Primary', () => (
    <CompoundButton iconOnly primary icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Disabled', () => (
    <CompoundButton iconOnly disabled icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Ghost', () => (
    <CompoundButton iconOnly ghost icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Ghost Disabled', () => (
    <CompoundButton iconOnly disabled ghost icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Primary Disabled', () => (
    <CompoundButton iconOnly primary disabled icon="X">
      Hello, world
    </CompoundButton>
  ));

storiesOf('CompoundButton Next - Fluid', module)
  .addDecorator(FabricDecoratorFullWidth)
  .addDecorator(withThemeProvider)
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
    <CompoundButton fluid icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Primary', () => (
    <CompoundButton fluid primary icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Disabled', () => (
    <CompoundButton fluid disabled icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Ghost', () => (
    <CompoundButton fluid ghost icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Ghost Disabled', () => (
    <CompoundButton fluid disabled ghost icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Primary Disabled', () => (
    <CompoundButton fluid primary disabled icon="X">
      Hello, world
    </CompoundButton>
  ));

storiesOf('CompoundButton Next - Inverted', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withThemeProvider)
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
    <CompoundButton inverted icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Primary', () => (
    <CompoundButton inverted primary icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Disabled', () => (
    <CompoundButton inverted disabled icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Ghost', () => (
    <CompoundButton inverted ghost icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Ghost Disabled', () => (
    <CompoundButton inverted disabled ghost icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Primary Disabled', () => (
    <CompoundButton inverted primary disabled icon="X">
      Hello, world
    </CompoundButton>
  ));

storiesOf('CompoundButton Next - Loading', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withThemeProvider)
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
    <CompoundButton loading icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Primary', () => (
    <CompoundButton loading primary icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Disabled', () => (
    <CompoundButton loading disabled icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Ghost', () => (
    <CompoundButton loading ghost icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Ghost Disabled', () => (
    <CompoundButton loading disabled ghost icon="X">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Primary Disabled', () => (
    <CompoundButton loading primary disabled icon="X">
      Hello, world
    </CompoundButton>
  ));

storiesOf('CompoundButton Next - Sizes', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withThemeProvider)
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
  .addStory('Smallest', () => (
    <CompoundButton icon="X" size="smallest">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Smaller', () => (
    <CompoundButton icon="X" size="smaller">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Small', () => (
    <CompoundButton icon="X" size="small">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Large', () => (
    <CompoundButton icon="X" size="large">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Larger', () => (
    <CompoundButton icon="X" size="larger">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Largest', () => (
    <CompoundButton icon="X" size="largest">
      Hello, world
    </CompoundButton>
  ));

storiesOf('CompoundButton Next - With styled icon from react-icons via tokens', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withThemeProvider)
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
  .addStory('Default', () => <CompoundButton icon={<AddIcon />} tokens={{ iconSize: '40px' }} />)
  .addStory('Primary', () => (
    <CompoundButton primary icon={<AddIcon />} tokens={{ iconSize: '40px' }} />
  ))
  .addStory('Disabled', () => (
    <CompoundButton disabled icon={<AddIcon />} tokens={{ iconSize: '40px' }} />
  ))
  .addStory('Ghost', () => (
    <CompoundButton ghost icon={<AddIcon />} tokens={{ iconSize: '40px' }} />
  ))
  .addStory('Ghost Disabled', () => (
    <CompoundButton disabled ghost icon={<AddIcon />} tokens={{ iconSize: '40px' }} />
  ))
  .addStory('Primary Disabled', () => (
    <CompoundButton primary disabled icon={<AddIcon />} tokens={{ iconSize: '40px' }} />
  ));
