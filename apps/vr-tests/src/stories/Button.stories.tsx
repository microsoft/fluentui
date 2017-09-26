/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
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
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('Root', () => (<DefaultButton {...baseProps} />))
  .add('Disabled', () => (<DefaultButton {...baseProps} disabled={ true } />))
  .add('Checked', () => (<DefaultButton {...baseProps} checked={ true } />))
  .add('Primary', () => (<DefaultButton {...baseProps} primary={ true } />))
  .add('Primary Disabled', () => (<DefaultButton {...baseProps} primary={ true } disabled={ true } />))
  .add('Primary Checked', () => (<DefaultButton {...baseProps} primary={ true } checked={ true } />));

storiesOf('Button Action', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('Root', () => (<ActionButton {...baseProps} />))
  .add('Disabled', () => (<ActionButton {...baseProps} disabled={ true } />))
  .add('Checked', () => (<ActionButton {...baseProps} checked={ true } />));

storiesOf('Button Compound', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('Root', () => (<CompoundButton {...baseProps} />))
  .add('Disabled', () => (<CompoundButton {...baseProps} disabled={ true } />))
  .add('Checked', () => (<CompoundButton {...baseProps} checked={ true } />))
  .add('Primary', () => (<CompoundButton {...baseProps} primary={ true } />))
  .add('Primary Disabled', () => (<CompoundButton {...baseProps} primary={ true } disabled={ true } />))
  .add('Primary Checked', () => (<CompoundButton {...baseProps} primary={ true } checked={ true } />));

storiesOf('Button Command', module)
  // tslint:disable-next-line:jsx-ban-props
  .addDecorator(story => <div style={ { display: 'flex', alignItems: 'stretch', height: '40px' } }>{ story() }</div>)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-Button')
        .hover('.ms-Button')
        .snapshot('open', { cropTo: '.testWrapper' })
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('Root', () => (<CommandBarButton {...commandProps} />))
  .add('Disabled', () => (<CommandBarButton {...commandProps} disabled={ true } />))
  .add('Checked', () => (<CommandBarButton {...commandProps} checked={ true } />));

storiesOf('Button Split', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Button:nth-child(1)')
        .snapshot('hover main', { cropTo: '.testWrapper' })
        .hover('.ms-Button:nth-child(2)')
        .snapshot('hover split', { cropTo: '.testWrapper' })
        .click('.ms-Button:nth-child(2)')
        .hover('.ms-Button')
        .snapshot('open', { cropTo: '.testWrapper' })
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('Root', () => (<DefaultButton {...commandProps} split={ true } />))
  .add('Disabled', () => (<DefaultButton {...commandProps} disabled={ true } split={ true } />))
  .add('Checked', () => (<DefaultButton {...commandProps} checked={ true } split={ true } />))
  .add('Primary', () => (<DefaultButton {...commandProps} primary={ true } split={ true } />))
  .add('Primary Disabled', () => (<DefaultButton {...commandProps} primary={ true } disabled={ true } split={ true } />))
  .add('Primary Checked', () => (<DefaultButton {...commandProps} primary={ true } checked={ true } split={ true } />));