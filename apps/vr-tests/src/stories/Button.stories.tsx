/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator, FabricDecoratorTall } from '../utilities';
import {
  DefaultButton,
  ActionButton,
  CompoundButton,
  IButtonProps,
  CommandBarButton
} from 'office-ui-fabric-react';

const baseProps: IButtonProps = {
  iconProps: {
    iconName: 'AddFriend'
  },
  children: 'Button',
  secondaryText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
};

const commandProps: IButtonProps = {
  iconProps: { iconName: 'Add' },
  text: 'Create account',
  onClick: () => alert('Clicked'),
  menuProps: {
    items: [
      {
        key: 'emailMessage',
        text: 'Email message',
        iconProps: {
          iconName: 'Mail'
        }
      },
      {
        key: 'calendarEvent',
        text: 'Calendar event',
        iconProps: {
          iconName: 'Calendar'
        }
      }
    ]
  }
};

storiesOf('Button Default', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Root', () => <DefaultButton {...baseProps} />, { rtl: true })
  .addStory('Disabled', () => <DefaultButton {...baseProps} disabled={true} />)
  .addStory('Checked', () => <DefaultButton {...baseProps} checked={true} />)
  .addStory('Primary', () => <DefaultButton {...baseProps} primary={true} />)
  .addStory('Primary Disabled', () => (
    <DefaultButton {...baseProps} primary={true} disabled={true} />
  ))
  .addStory('Primary Checked', () => (
    <DefaultButton {...baseProps} primary={true} checked={true} />
  ));

storiesOf('Button Action', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Root', () => <ActionButton {...baseProps} />, { rtl: true })
  .addStory('Disabled', () => <ActionButton {...baseProps} disabled={true} />)
  .addStory('Checked', () => <ActionButton {...baseProps} checked={true} />);

storiesOf('Button Compound', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Root', () => <CompoundButton {...baseProps} />, { rtl: true })
  .addStory('Disabled', () => <CompoundButton {...baseProps} disabled={true} />)
  .addStory('Checked', () => <CompoundButton {...baseProps} checked={true} />)
  .addStory('Primary', () => <CompoundButton {...baseProps} primary={true} />)
  .addStory('Primary Disabled', () => (
    <CompoundButton {...baseProps} primary={true} disabled={true} />
  ))
  .addStory('Primary Checked', () => (
    <CompoundButton {...baseProps} primary={true} checked={true} />
  ));

storiesOf('Button Command', module)
  .addDecorator(story => (
    <div style={{ display: 'flex', alignItems: 'stretch', height: '40px' }}>{story()}</div>
  ))
  .addDecorator(FabricDecoratorTall)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .click('.ms-Button')
        .hover('.ms-Button')
        .snapshot('open', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Root', () => <CommandBarButton {...commandProps} />, { rtl: true })
  .addStory('Disabled', () => <CommandBarButton {...commandProps} disabled={true} />)
  .addStory('Checked', () => <CommandBarButton {...commandProps} checked={true} />);

storiesOf('Button Split', module)
  .addDecorator(FabricDecoratorTall)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Button:nth-child(1)')
        .snapshot('hover main', { cropTo: '.testWrapper' })
        .hover('.ms-Button:nth-child(2)')
        .snapshot('hover split', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button:nth-child(1)')
        .snapshot('pressed main', { cropTo: '.testWrapper' })
        .hover('.ms-Button') // reset mouseDown
        .mouseUp('.ms-Button:nth-child(2)')
        .mouseDown('.ms-Button:nth-child(2)')
        .snapshot('pressed split', { cropTo: '.testWrapper' })
        .click('.ms-Button:nth-child(2)')
        .hover('.ms-Button') // move mouse to make click work
        .snapshot('open', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Root', () => <DefaultButton {...commandProps} split={true} />, { rtl: true })
  .addStory('Disabled', () => <DefaultButton {...commandProps} disabled={true} split={true} />)
  .addStory('Checked', () => <DefaultButton {...commandProps} checked={true} split={true} />)
  .addStory('Primary', () => <DefaultButton {...commandProps} primary={true} split={true} />)
  .addStory('Primary Disabled', () => (
    <DefaultButton {...commandProps} primary={true} disabled={true} split={true} />
  ))
  .addStory('Primary Checked', () => (
    <DefaultButton {...commandProps} primary={true} checked={true} split={true} />
  ))
  .addStory('Command Split', () => <CommandBarButton {...commandProps} split={true} />);

storiesOf('Button Special Scenarios', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </Screener>
  ))

  .addStory('primary with placeholder', () => (
    <div>
      <DefaultButton {...baseProps} iconProps={{ iconName: '' }} primary={true} />
      <br />
      <DefaultButton {...baseProps} iconProps={{ iconName: 'Add' }} primary={true} />
    </div>
  ))
  .addStory('no flex shrink', () => (
    <div style={{ width: '300px' }}>
      <DefaultButton
        {...baseProps}
        iconProps={{ iconName: 'Add' }}
        menuIconProps={{}}
        styles={{ root: { width: '100%' } }}
      />
      <DefaultButton
        {...baseProps}
        text="This is a much longer string of text in a constrained space"
        iconProps={{ iconName: 'Add' }}
        menuIconProps={{}}
        styles={{ root: { width: '100%' } }}
      />
    </div>
  ));
