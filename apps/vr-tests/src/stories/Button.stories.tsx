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
};

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
};

storiesOf('Button Default', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Steps()
        .hover('.ms-Button')
        .snapshot('hover')
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('default', () => (<DefaultButton {...baseProps} />))
  .add('default disabled', () => (<DefaultButton {...baseProps} disabled={ true } />))
  .add('default checked', () => (<DefaultButton {...baseProps} checked={ true } />))
  .add('primary', () => (<DefaultButton {...baseProps} primary={ true } />))
  .add('primary disabled', () => (<DefaultButton {...baseProps} primary={ true } disabled={ true } />))
  .add('primary checked', () => (<DefaultButton {...baseProps} primary={ true } checked={ true } />));

storiesOf('Button with placeholder', module)
  .addDecorator(FabricDecorator)
  .add('primary with placeholder', () => (
    <div>
      <DefaultButton {...baseProps} iconProps={ { iconName: '', hasPlaceHolder: true } } primary={ true } />
      <br />
      <DefaultButton {...baseProps} iconProps={ { iconName: 'Add', hasPlaceHolder: true } } primary={ true } />
    </div>
  ));

storiesOf('Button Action', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Steps()
        .hover('.ms-Button')
        .snapshot('hover')
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('action', () => (<ActionButton {...baseProps} />))
  .add('action disabled', () => (<ActionButton {...baseProps} disabled={ true } />))
  .add('action checked', () => (<ActionButton {...baseProps} checked={ true } />));

storiesOf('Button Compound', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Steps()
        .hover('.ms-Button')
        .snapshot('hover')
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('Compound', () => (<CompoundButton {...baseProps} />))
  .add('Compound disabled', () => (<CompoundButton {...baseProps} disabled={ true } />))
  .add('Compound checked', () => (<CompoundButton {...baseProps} checked={ true } />))
  .add('Compound Primary', () => (<CompoundButton {...baseProps} primary={ true } />))
  .add('Compound Primary disabled', () => (<CompoundButton {...baseProps} primary={ true } disabled={ true } />))
  .add('Compound Primary checked', () => (<CompoundButton {...baseProps} primary={ true } checked={ true } />));

storiesOf('Button Command', module)
  // tslint:disable-next-line:jsx-ban-props
  .addDecorator(story => <div style={ { display: 'flex', alignItems: 'stretch', height: '40px' } }>{ story() }</div>)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Steps()
        .hover('.ms-Button')
        .snapshot('hover')
        .click('.ms-Button')
        .hover('.ms-Button')
        .snapshot('open')
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('Command', () => (<CommandBarButton {...commandProps} />))
  .add('Command disabled', () => (<CommandBarButton {...commandProps} disabled={ true } />))
  .add('Command checked', () => (<CommandBarButton {...commandProps} checked={ true } />));

storiesOf('Button Split', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Steps()
        .hover('.ms-Button:nth-child(1)')
        .snapshot('hover main')
        .hover('.ms-Button:nth-child(2)')
        .snapshot('hover split')
        .click('.ms-Button:nth-child(2)')
        .hover('.ms-Button')
        .snapshot('open')
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('default', () => (<DefaultButton {...commandProps} split={ true } />))
  .add('default disabled', () => (<DefaultButton {...commandProps} disabled={ true } split={ true } />))
  .add('default checked', () => (<DefaultButton {...commandProps} checked={ true } split={ true } />))
  .add('primary', () => (<DefaultButton {...commandProps} primary={ true } split={ true } />))
  .add('primary disabled', () => (<DefaultButton {...commandProps} primary={ true } disabled={ true } split={ true } />))
  .add('primary checked', () => (<DefaultButton {...commandProps} primary={ true } checked={ true } split={ true } />));