/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Button } from '@fluentui/react-button';

storiesOf('Button Next', module)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => <Button>Hello, world</Button>)
  .addStory('Primary', () => <Button primary>Hello, world</Button>)
  .addStory('Disabled', () => <Button disabled>Hello, world</Button>)
  .addStory('Primary Disabled', () => (
    <Button primary disabled>
      Hello, world
    </Button>
  ));

storiesOf('Button Next - With icon before content', module)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => <Button icon="X">Hello, world</Button>)
  .addStory('Primary', () => (
    <Button primary icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Disabled', () => (
    <Button disabled icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Primary Disabled', () => (
    <Button primary disabled icon="X">
      Hello, world
    </Button>
  ));

storiesOf('Button Next - With icon after content', module)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => (
    <Button icon="X" iconPosition="after">
      Hello, world
    </Button>
  ))
  .addStory('Primary', () => (
    <Button primary icon="X" iconPosition="after">
      Hello, world
    </Button>
  ))
  .addStory('Disabled', () => (
    <Button disabled icon="X" iconPosition="after">
      Hello, world
    </Button>
  ))
  .addStory('Primary Disabled', () => (
    <Button primary disabled icon="X" iconPosition="after">
      Hello, world
    </Button>
  ));

storiesOf('Button Next - Circular', module)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => (
    <Button circular icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Primary', () => (
    <Button circular primary icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Disabled', () => (
    <Button circular disabled icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Primary Disabled', () => (
    <Button circular primary disabled icon="X">
      Hello, world
    </Button>
  ));

storiesOf('Button Next - Icon only', module)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => (
    <Button iconOnly icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Primary', () => (
    <Button iconOnly primary icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Disabled', () => (
    <Button iconOnly disabled icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Primary Disabled', () => (
    <Button iconOnly primary disabled icon="X">
      Hello, world
    </Button>
  ));

storiesOf('Button Next - Fluid', module)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => (
    <Button fluid icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Primary', () => (
    <Button fluid primary icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Disabled', () => (
    <Button fluid disabled icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Primary Disabled', () => (
    <Button fluid primary disabled icon="X">
      Hello, world
    </Button>
  ));

storiesOf('Button Next - Inverted', module)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => (
    <Button inverted icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Primary', () => (
    <Button inverted primary icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Disabled', () => (
    <Button inverted disabled icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Primary Disabled', () => (
    <Button inverted primary disabled icon="X">
      Hello, world
    </Button>
  ));

storiesOf('Button Next - Loading', module)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => (
    <Button loading icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Primary', () => (
    <Button loading primary icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Disabled', () => (
    <Button loading disabled icon="X">
      Hello, world
    </Button>
  ))
  .addStory('Primary Disabled', () => (
    <Button loading primary disabled icon="X">
      Hello, world
    </Button>
  ));

storiesOf('Button Next - Sizes', module)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Smallest', () => (
    <Button icon="X" size="smallest">
      Hello, world
    </Button>
  ))
  .addStory('Smaller', () => (
    <Button icon="X" size="smaller">
      Hello, world
    </Button>
  ))
  .addStory('Small', () => (
    <Button icon="X" size="small">
      Hello, world
    </Button>
  ))
  .addStory('Large', () => (
    <Button icon="X" size="large">
      Hello, world
    </Button>
  ))
  .addStory('Larger', () => (
    <Button icon="X" size="larger">
      Hello, world
    </Button>
  ))
  .addStory('Largest', () => (
    <Button icon="X" size="largest">
      Hello, world
    </Button>
  ));
