/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from './index';
import { DefaultButton, ActionButton, CompoundButton, IButtonProps, CommandBarButton } from 'office-ui-fabric-react';

const baseProps: IButtonProps = {
  iconProps: {
    iconName: 'AddFriend'
  },
  children: 'Butjon',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
}

const commandProps: IButtonProps = {
  'iconProps': { iconName: 'Add' },
  'text': 'Create account',
  'onClick': () => alert('Clicked'),
  'menuProps': {
    items: [
      {
        key: 'emailMessage',
        name: 'Email message',
        icon: 'Mail'
      },
      {
        key: 'calendarEvent',
        name: 'Calendar event',
        icon: 'Calendar'
      }
    ]
  }
}

storiesOf('Button Default', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener steps={ new Steps()
      .hover('.ms-Button')
      .snapshot('hover')
      .end()
    }>
      { story() }
    </Screener>
  ))
  .add('default', () => (<DefaultButton {...baseProps} ></DefaultButton>))
  .add('default disabled', () => (<DefaultButton {...baseProps} disabled></DefaultButton>))
  .add('default checked', () => (<DefaultButton {...baseProps} checked></DefaultButton>))
  .add('primary', () => (<DefaultButton {...baseProps} primary></DefaultButton>))
  .add('primary disabled', () => (<DefaultButton {...baseProps} primary disabled></DefaultButton>))
  .add('primary checked', () => (<DefaultButton {...baseProps} primary checked></DefaultButton>))

storiesOf('Button Action', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener steps={ new Steps()
      .hover('.ms-Button')
      .snapshot('hover')
      .end()
    }>
      { story() }
    </Screener>
  ))
  .add('action', () => (<ActionButton {...baseProps} ></ActionButton>))
  .add('action disabled', () => (<ActionButton {...baseProps} disabled></ActionButton>))
  .add('action checked', () => (<ActionButton {...baseProps} checked></ActionButton>))


storiesOf('Button Compound', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener steps={ new Steps()
      .hover('.ms-Button')
      .snapshot('hover')
      .end()
    }>
      { story() }
    </Screener>
  ))
  .add('Compound', () => (<CompoundButton {...baseProps} ></CompoundButton>))
  .add('Compound disabled', () => (<CompoundButton {...baseProps} disabled></CompoundButton>))
  .add('Compound checked', () => (<CompoundButton {...baseProps} checked></CompoundButton>))
  .add('Compound Primary', () => (<CompoundButton {...baseProps} primary></CompoundButton>))
  .add('Compound Primary disabled', () => (<CompoundButton {...baseProps} primary disabled></CompoundButton>))
  .add('Compound Primary checked', () => (<CompoundButton {...baseProps} primary checked></CompoundButton>))

storiesOf('Button Command', module)
  .addDecorator(story => <div style={ { display: 'flex', alignItems: 'stretch', height: '40px' } }>{ story() }</div>)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener steps={ new Steps()
      .hover('.ms-Button')
      .snapshot('hover')
      .click('.ms-Button')
      .hover('.ms-Button')
      .snapshot('open')
      .end()
    }>
      { story() }
    </Screener>
  ))
  .add('Command', () => (<CommandBarButton {...commandProps} ></CommandBarButton>))
  .add('Command disabled', () => (<CommandBarButton {...commandProps} disabled></CommandBarButton>))
  .add('Command checked', () => (<CommandBarButton {...commandProps} checked></CommandBarButton>))

storiesOf('Button Split', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener steps={ new Steps()
      .hover('.ms-Button:nth-child(1)')
      .snapshot('hover main')
      .hover('.ms-Button:nth-child(2)')
      .snapshot('hover split')
      .click('.ms-Button:nth-child(2)')
      .hover('.ms-Button')
      .snapshot('open')
      .end()
    }>
      { story() }
    </Screener>
  ))
  .add('default', () => (<DefaultButton {...commandProps} split={ true }></DefaultButton>))
  .add('default disabled', () => (<DefaultButton {...commandProps} disabled split={ true }></DefaultButton>))
  .add('default checked', () => (<DefaultButton {...commandProps} checked split={ true }></DefaultButton>))
  .add('primary', () => (<DefaultButton {...commandProps} primary split={ true }></DefaultButton>))
  .add('primary disabled', () => (<DefaultButton {...commandProps} primary disabled split={ true }></DefaultButton>))
  .add('primary checked', () => (<DefaultButton {...commandProps} primary checked split={ true }></DefaultButton>))