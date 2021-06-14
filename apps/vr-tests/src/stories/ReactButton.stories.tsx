import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { Button, CompoundButton, ToggleButton, MenuButton } from '@fluentui/react-button';

import { FluentProviderDecorator, FabricDecorator } from '../utilities/index';

storiesOf('react-button Button', module)
  .addDecorator(FabricDecorator)
  .addDecorator(FluentProviderDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
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
  .addStory('Default', () => <Button>Hello, world</Button>)
  .addStory('Circular', () => <Button circular>Hello, world</Button>)
  .addStory('Primary', () => <Button primary>Hello, world</Button>)
  .addStory('Subtle', () => <Button subtle>Hello, world</Button>)
  .addStory('Transparent', () => <Button transparent>Hello, world</Button>)
  .addStory('Disabled', () => <Button disabled>Hello, world</Button>)
  .addStory('Primary Disabled', () => (
    <Button primary disabled>
      Hello, world
    </Button>
  ))
  .addStory('Subtle Disabled', () => (
    <Button subtle disabled>
      Hello, world
    </Button>
  ))
  .addStory('Transparent Disabled', () => (
    <Button transparent disabled>
      Hello, world
    </Button>
  ))
  .addStory('Size small', () => (
    <Button icon="X" size="small">
      Hello, world
    </Button>
  ))
  .addStory('Size large', () => (
    <Button icon="X" size="large">
      Hello, world
    </Button>
  ))
  .addStory('With icon before content', () => <Button icon="X">Hello, world</Button>)
  .addStory('With icon after content', () => (
    <Button icon="X" iconPosition="after">
      Hello, world
    </Button>
  ))
  .addStory('Icon only', () => <Button icon="X" />)
  .addStory('Circular and icon only', () => <Button circular icon="X" />);

storiesOf('react-button CompoundButton', module)
  .addDecorator(FabricDecorator)
  .addDecorator(FluentProviderDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
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
    <CompoundButton secondaryContent="This is some secondary text">Hello, world</CompoundButton>
  ))
  .addStory('Circular', () => (
    <CompoundButton circular secondaryContent="This is some secondary text">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Primary', () => (
    <CompoundButton secondaryContent="This is some secondary text" primary>
      Hello, world
    </CompoundButton>
  ))
  .addStory('Subtle', () => (
    <CompoundButton secondaryContent="This is some secondary text" subtle>
      Hello, world
    </CompoundButton>
  ))
  .addStory('Transparent', () => (
    <CompoundButton secondaryContent="This is some secondary text" transparent>
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
  .addStory('Subtle Disabled', () => (
    <CompoundButton secondaryContent="This is some secondary text" subtle disabled>
      Hello, world
    </CompoundButton>
  ))
  .addStory('Transparent Disabled', () => (
    <CompoundButton secondaryContent="This is some secondary text" transparent disabled>
      Hello, world
    </CompoundButton>
  ))
  .addStory('Size small', () => (
    <CompoundButton secondaryContent="This is some secondary text" icon="X" size="small">
      Hello, world
    </CompoundButton>
  ))
  .addStory('Size large', () => (
    <CompoundButton secondaryContent="This is some secondary text" icon="X" size="large">
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
  .addStory('Icon only', () => <CompoundButton icon="X" />)
  .addStory('Circular and icon only', () => <CompoundButton circular icon="X" />);

storiesOf('react-button ToggleButton', module)
  .addDecorator(FabricDecorator)
  .addDecorator(FluentProviderDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
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
  .addStory('Default', () => <ToggleButton>Hello, world</ToggleButton>)
  .addStory('Circular', () => <ToggleButton circular>Hello, world</ToggleButton>)
  .addStory('Primary', () => <ToggleButton primary>Hello, world</ToggleButton>)
  .addStory('Subtle', () => <ToggleButton subtle>Hello, world</ToggleButton>)
  .addStory('Transparent', () => <ToggleButton transparent>Hello, world</ToggleButton>)
  .addStory('Disabled', () => <ToggleButton disabled>Hello, world</ToggleButton>)
  .addStory('Primary Disabled', () => (
    <ToggleButton primary disabled>
      Hello, world
    </ToggleButton>
  ))
  .addStory('Subtle Disabled', () => (
    <ToggleButton subtle disabled>
      Hello, world
    </ToggleButton>
  ))
  .addStory('Transparent Disabled', () => (
    <ToggleButton transparent disabled>
      Hello, world
    </ToggleButton>
  ))
  .addStory('Size small', () => (
    <ToggleButton icon="X" size="small">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Size large', () => (
    <ToggleButton icon="X" size="large">
      Hello, world
    </ToggleButton>
  ))
  .addStory('With icon before content', () => <ToggleButton icon="X">Hello, world</ToggleButton>)
  .addStory('With icon after content', () => (
    <ToggleButton icon="X" iconPosition="after">
      Hello, world
    </ToggleButton>
  ))
  .addStory('Icon only', () => <ToggleButton icon="X" />)
  .addStory('Circular and icon only', () => <ToggleButton circular icon="X" />)
  .addStory('Checked', () => (
    <ToggleButton icon="X" checked>
      Hello, world
    </ToggleButton>
  ))
  .addStory('Primary Checked', () => (
    <ToggleButton icon="X" primary checked>
      Hello, world
    </ToggleButton>
  ))
  .addStory('Subtle Checked', () => (
    <ToggleButton icon="X" subtle checked>
      Hello, world
    </ToggleButton>
  ))
  .addStory('Transparent Checked', () => (
    <ToggleButton icon="X" transparent checked>
      Hello, world
    </ToggleButton>
  ));

storiesOf('react-button MenuButton', module)
  .addDecorator(FabricDecorator)
  .addDecorator(FluentProviderDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
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
  .addStory('Default', () => <MenuButton>Hello, world</MenuButton>)
  .addStory('Circular', () => <MenuButton circular>Hello, world</MenuButton>)
  .addStory('Primary', () => <MenuButton primary>Hello, world</MenuButton>)
  .addStory('Subtle', () => <MenuButton subtle>Hello, world</MenuButton>)
  .addStory('Transparent', () => <MenuButton transparent>Hello, world</MenuButton>)
  .addStory('Disabled', () => <MenuButton disabled>Hello, world</MenuButton>)
  .addStory('Primary Disabled', () => (
    <MenuButton primary disabled>
      Hello, world
    </MenuButton>
  ))
  .addStory('Subtle Disabled', () => (
    <MenuButton subtle disabled>
      Hello, world
    </MenuButton>
  ))
  .addStory('Transparent Disabled', () => (
    <MenuButton transparent disabled>
      Hello, world
    </MenuButton>
  ))
  .addStory('Size small', () => (
    <MenuButton icon="X" size="small">
      Hello, world
    </MenuButton>
  ))
  .addStory('Size large', () => (
    <MenuButton icon="X" size="large">
      Hello, world
    </MenuButton>
  ))
  .addStory('With icon', () => <MenuButton icon="X">Hello, world</MenuButton>)
  .addStory('Icon only', () => <MenuButton icon="X" />)
  .addStory('Circular and icon only', () => <MenuButton circular icon="X" />);
