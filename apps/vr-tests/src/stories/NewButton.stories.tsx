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
  .add('Default', () => <Button {...baseProps} />, { rtl: true })
  .add('Disabled', () => <Button disabled {...baseProps} />)
  .add('Primary', () => <Button primary {...baseProps} />, { rtl: true })
  .add('Primary Disabled', () => <Button primary disabled {...baseProps} />)
  .add(
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
  .add('Default', () => <Button circular icon="AddFriend" />)
  .add('Disabled', () => <Button circular disabled icon="AddFriend" />)
  .add('Primary', () => <Button circular primary icon="AddFriend" />)
  .add('Primary Disabled', () => <Button circular primary disabled icon="AddFriend" />);

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
  .add('Default', () => <MenuButton {...menuProps} />, { rtl: true })
  .add('Disabled', () => <MenuButton disabled {...menuProps} />)
  .add('Primary', () => <MenuButton primary {...menuProps} />, { rtl: true })
  .add('Primary Disabled', () => <MenuButton primary disabled {...menuProps} />);

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
  .add('Default', () => <SplitButton {...menuProps} />, { rtl: true })
  .add('Disabled', () => <SplitButton disabled {...menuProps} />)
  .add('Primary', () => <SplitButton primary {...menuProps} />, { rtl: true })
  .add('Primary Disabled', () => <SplitButton primary disabled {...menuProps} />);

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
  .add('Default', () => <DefaultButton {...baseProps} />, { rtl: true })
  .add('Disabled', () => <DefaultButton disabled {...baseProps} />);

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
  .add('Default', () => <PrimaryButton {...baseProps} />, { rtl: true })
  .add('Disabled', () => <PrimaryButton disabled {...baseProps} />);

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
  .add('Default', () => <Actionable>Button</Actionable>)
  .add('Disabled', () => <Actionable disabled>Button</Actionable>);

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
  .add('Default', () => <ActionButton {...baseProps} />, { rtl: true })
  .add('Disabled', () => <ActionButton disabled {...baseProps} />);

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
  .add('Default', () => <CommandBarButton {...baseProps} />, { rtl: true })
  .add('Disabled', () => <CommandBarButton disabled {...baseProps} />);

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
  .add('Default', () => <CompoundButton content="Button" secondaryText="Caption" />, {
    rtl: true
  })
  .add('Disabled', () => <CompoundButton disabled content="Button" secondaryText="Caption" />)
  .add('Primary', () => <CompoundButton primary content="Button" secondaryText="Caption" />, {
    rtl: true
  })
  .add('Primary Disabled', () => (
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
  .add('Default', () => <IconButton icon="Emoji2" />, { rtl: true })
  .add('Disabled', () => <IconButton disabled icon="Emoji2" />);

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
  .add('Default', () => <MessageBarButton {...baseProps} />, { rtl: true })
  .add('Disabled', () => <MessageBarButton disabled {...baseProps} />)
  .add('Primary', () => <MessageBarButton primary {...baseProps} />, { rtl: true })
  .add('Primary Disabled', () => <MessageBarButton primary disabled {...baseProps} />);
