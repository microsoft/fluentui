/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import {
  Actionable,
  ActionButton,
  Button,
  IButtonProps,
  CommandBarButton,
  CompoundButton,
  DefaultButton,
  IconButton,
  MenuButton,
  IMenuButtonProps,
  MessageBarButton,
  PrimaryButton,
  SplitButton
} from '@uifabric/experiments';
import { Stack, Text } from 'office-ui-fabric-react';

const baseProps: IButtonProps = {
  icon: 'AddFriend',
  content: 'Button'
};

const menuProps: IMenuButtonProps = {
  content: 'Button',
  menu: {
    items: [
      {
        key: 'a',
        name: 'Item a'
      },
      {
        key: 'b',
        name: 'Item b'
      }
    ]
  }
};

storiesOf('Button', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Button')
        .snapshot('hovered', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => <Button {...baseProps} />, { rtl: true })
  .addStory('Disabled', () => <Button disabled {...baseProps} />)
  .addStory('Primary', () => <Button primary {...baseProps} />, { rtl: true })
  .addStory('Primary Disabled', () => <Button primary disabled {...baseProps} />)
  .addStory(
    'Multiline',
    () => (
      <Button icon="Share">
        <Stack as="span" horizontalAlign="start" tokens={{ padding: '8px 0px' }}>
          <Text>Compound multiline button</Text>
          <Text variant="medium">Caption</Text>
        </Stack>
      </Button>
    ),
    { rtl: true }
  );

storiesOf('Button - Circular', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Button')
        .snapshot('hovered', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => <Button circular icon="AddFriend" />)
  .addStory('Disabled', () => <Button circular disabled icon="AddFriend" />)
  .addStory('Primary', () => <Button circular primary icon="AddFriend" />)
  .addStory('Primary Disabled', () => <Button circular primary disabled icon="AddFriend" />);

storiesOf('MenuButton', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-MenuButton')
        .snapshot('hovered', { cropTo: '.testWrapper' })
        .mouseDown('.ms-MenuButton')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => <MenuButton {...menuProps} />, { rtl: true })
  .addStory('Disabled', () => <MenuButton disabled {...menuProps} />)
  .addStory('Primary', () => <MenuButton primary {...menuProps} />, { rtl: true })
  .addStory('Primary Disabled', () => <MenuButton primary disabled {...menuProps} />);

storiesOf('SplitButton', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Button')
        .snapshot('button hovered', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('button pressed', { cropTo: '.testWrapper' })
        .mouseUp('.ms-Button')
        .hover('.ms-MenuButton')
        .snapshot('menu button hovered', { cropTo: '.testWrapper' })
        .mouseDown('.ms-MenuButton')
        .snapshot('menu button pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => <SplitButton {...menuProps} />, { rtl: true })
  .addStory('Disabled', () => <SplitButton disabled {...menuProps} />)
  .addStory('Primary', () => <SplitButton primary {...menuProps} />, { rtl: true })
  .addStory('Primary Disabled', () => <SplitButton primary disabled {...menuProps} />);

storiesOf('DefaultButton', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Button')
        .snapshot('hovered', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => <DefaultButton {...baseProps} />, { rtl: true })
  .addStory('Disabled', () => <DefaultButton disabled {...baseProps} />);

storiesOf('PrimaryButton', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Button')
        .snapshot('hovered', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => <PrimaryButton {...baseProps} />, { rtl: true })
  .addStory('Disabled', () => <PrimaryButton disabled {...baseProps} />);

storiesOf('Actionable', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Actionable')
        .snapshot('hovered', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Actionable')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => <Actionable>Button</Actionable>)
  .addStory('Disabled', () => <Actionable disabled>Button</Actionable>);

storiesOf('ActionButton', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Button')
        .snapshot('hovered', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => <ActionButton {...baseProps} />, { rtl: true })
  .addStory('Disabled', () => <ActionButton disabled {...baseProps} />);

storiesOf('CommandBarButton', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Button')
        .snapshot('hovered', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => <CommandBarButton {...baseProps} />, { rtl: true })
  .addStory('Disabled', () => <CommandBarButton disabled {...baseProps} />);

storiesOf('CompoundButton', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Button')
        .snapshot('hovered', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => <CompoundButton content="Button" secondaryText="Caption" />, {
    rtl: true
  })
  .addStory('Disabled', () => <CompoundButton disabled content="Button" secondaryText="Caption" />)
  .addStory('Primary', () => <CompoundButton primary content="Button" secondaryText="Caption" />, {
    rtl: true
  })
  .addStory('Primary Disabled', () => (
    <CompoundButton primary disabled content="Button" secondaryText="Caption" />
  ));

storiesOf('IconButton', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Button')
        .snapshot('hovered', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => <IconButton icon="Emoji2" />, { rtl: true })
  .addStory('Disabled', () => <IconButton disabled icon="Emoji2" />);

storiesOf('MessageBarButton', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Button')
        .snapshot('hovered', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default', () => <MessageBarButton {...baseProps} />, { rtl: true })
  .addStory('Disabled', () => <MessageBarButton disabled {...baseProps} />)
  .addStory('Primary', () => <MessageBarButton primary {...baseProps} />, { rtl: true })
  .addStory('Primary Disabled', () => <MessageBarButton primary disabled {...baseProps} />);
