/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { ToggleButton } from '@fluentui/react-button';
import { AddIcon } from '@fluentui/react-icons';
import { TeamsTheme } from '@fluentui/react-theme-provider';
import { withThemeProvider } from '@fluentui/storybook';
import { FabricDecorator } from '../utilities';

storiesOf('ToggleButton Next', module)
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

storiesOf('ToggleButton Next - With icon before content', module)
  .addDecorator(FabricDecorator)
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
  .addStory('Default', () => <ToggleButton icon="X">Hello, world</ToggleButton>)
  .addStory('Primary', () => (
    <ToggleButton primary icon="X">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Disabled', () => (
    <ToggleButton disabled icon="X">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Primary Disabled', () => (
    <ToggleButton primary disabled icon="X">
      Hello, world
    </ToggleButton>
  ));

storiesOf('ToggleButton Next - With icon after content', module)
  .addDecorator(FabricDecorator)
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
  .addStory('Default', () => (
    <ToggleButton icon="X" iconPosition="after">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Primary', () => (
    <ToggleButton primary icon="X" iconPosition="after">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Disabled', () => (
    <ToggleButton disabled icon="X" iconPosition="after">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Primary Disabled', () => (
    <ToggleButton primary disabled icon="X" iconPosition="after">
      Hello, world
    </ToggleButton>
  ));

storiesOf('ToggleButton Next - Circular', module)
  .addDecorator(FabricDecorator)
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
  .addStory('Default', () => (
    <ToggleButton circular icon="X">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Primary', () => (
    <ToggleButton circular primary icon="X">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Disabled', () => (
    <ToggleButton circular disabled icon="X">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Primary Disabled', () => (
    <ToggleButton circular primary disabled icon="X">
      Hello, world
    </ToggleButton>
  ));

storiesOf('ToggleButton Next - Icon only', module)
  .addDecorator(FabricDecorator)
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
  .addStory('Default', () => (
    <ToggleButton iconOnly icon="X">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Primary', () => (
    <ToggleButton iconOnly primary icon="X">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Disabled', () => (
    <ToggleButton iconOnly disabled icon="X">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Primary Disabled', () => (
    <ToggleButton iconOnly primary disabled icon="X">
      Hello, world
    </ToggleButton>
  ));

storiesOf('ToggleButton Next - Fluid', module)
  .addDecorator(FabricDecorator)
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
  .addStory('Default', () => (
    <ToggleButton fluid icon="X">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Primary', () => (
    <ToggleButton fluid primary icon="X">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Disabled', () => (
    <ToggleButton fluid disabled icon="X">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Primary Disabled', () => (
    <ToggleButton fluid primary disabled icon="X">
      Hello, world
    </ToggleButton>
  ));

storiesOf('ToggleButton Next - Inverted', module)
  .addDecorator(FabricDecorator)
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
  .addStory('Default', () => (
    <ToggleButton inverted icon="X">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Primary', () => (
    <ToggleButton inverted primary icon="X">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Disabled', () => (
    <ToggleButton inverted disabled icon="X">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Primary Disabled', () => (
    <ToggleButton inverted primary disabled icon="X">
      Hello, world
    </ToggleButton>
  ));

storiesOf('ToggleButton Next - Loading', module)
  .addDecorator(FabricDecorator)
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
  .addStory('Default', () => (
    <ToggleButton loading icon="X">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Primary', () => (
    <ToggleButton loading primary icon="X">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Disabled', () => (
    <ToggleButton loading disabled icon="X">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Primary Disabled', () => (
    <ToggleButton loading primary disabled icon="X">
      Hello, world
    </ToggleButton>
  ));

storiesOf('ToggleButton Next - Sizes', module)
  .addDecorator(FabricDecorator)
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
  .addStory('Smallest', () => (
    <ToggleButton icon="X" size="smallest">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Smaller', () => (
    <ToggleButton icon="X" size="smaller">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Small', () => (
    <ToggleButton icon="X" size="small">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Large', () => (
    <ToggleButton icon="X" size="large">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Larger', () => (
    <ToggleButton icon="X" size="larger">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Largest', () => (
    <ToggleButton icon="X" size="largest">
      Hello, world
    </ToggleButton>
  ));

storiesOf('ToggleButton Next - With styled icon from react-icons via tokens', module)
  .addDecorator(FabricDecorator)
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
  .addStory('Default', () => <ToggleButton icon={<AddIcon />} tokens={{ iconSize: '40px' }} />)
  .addStory('Primary', () => (
    <ToggleButton primary icon={<AddIcon />} tokens={{ iconSize: '40px' }} />
  ))
  .addStory('Disabled', () => (
    <ToggleButton disabled icon={<AddIcon />} tokens={{ iconSize: '40px' }} />
  ))
  .addStory('Primary Disabled', () => (
    <ToggleButton primary disabled icon={<AddIcon />} tokens={{ iconSize: '40px' }} />
  ));
