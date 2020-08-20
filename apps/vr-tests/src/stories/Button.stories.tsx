/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator, FabricDecoratorTall } from '../utilities';
import {
  ActionButton,
  CompoundButton,
  IButtonProps,
  CommandBarButton,
  Icon,
} from 'office-ui-fabric-react';
import { Button, SplitButton, ButtonProps } from '@fluentui/react-button';
import { withThemeProvider } from '@fluentui/storybook';

const baseProps: IButtonProps = {
  iconProps: {
    iconName: 'AddFriend',
  },
  children: 'Button',
  secondaryText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
};

const newButtonBaseProps: ButtonProps = {
  icon: <Icon {...baseProps.iconProps} />,
  children: 'Button',
  secondaryText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
};

const commandProps: IButtonProps = {
  iconProps: { iconName: 'Add' },
  text: 'Create account',
  // eslint-disable-next-line no-alert
  onClick: () => alert('Clicked'),
  menuProps: {
    items: [
      {
        key: 'emailMessage',
        text: 'Email message',
        iconProps: {
          iconName: 'Mail',
        },
      },
      {
        key: 'calendarEvent',
        text: 'Calendar event',
        iconProps: {
          iconName: 'Calendar',
        },
      },
    ],
  },
};

storiesOf('Button Default', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withThemeProvider)
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
  .addStory('Root', () => <Button {...newButtonBaseProps} />, { rtl: true })
  .addStory('Disabled', () => <Button {...newButtonBaseProps} disabled={true} />)
  .addStory('Checked', () => <Button {...newButtonBaseProps} checked={true} />)
  .addStory('Primary', () => <Button {...newButtonBaseProps} primary={true} />)
  .addStory('Primary Disabled', () => (
    <Button {...newButtonBaseProps} primary={true} disabled={true} />
  ))
  .addStory('Primary Checked', () => (
    <Button {...newButtonBaseProps} primary={true} checked={true} />
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
  .addDecorator(withThemeProvider)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Button:nth-child(1)')
        .snapshot('hover main', { cropTo: '.testWrapper' })
        .hover('.ms-Button:nth-child(2)')
        .snapshot('hover split', { cropTo: '.testWrapper' })
        // .mouseDown('.ms-Button:nth-child(1)')
        // .snapshot('pressed main', { cropTo: '.testWrapper' })
        // .hover('.ms-Button') // reset mouseDown
        // .mouseUp('.ms-Button:nth-child(2)')
        // .mouseDown('.ms-Button:nth-child(2)')
        // .snapshot('pressed split', { cropTo: '.testWrapper' })
        // .click('.ms-Button:nth-child(2)')
        // .hover('.ms-Button') // move mouse to make click work
        // .snapshot('open', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory(
    'Root',
    () => (
      <SplitButton
        icon={<Icon iconName="Add" />}
        menu={commandProps.menuProps}
        onClick={commandProps.onClick}
      >
        {commandProps.text}
      </SplitButton>
    ),
    { rtl: true },
  )
  .addStory('Disabled', () => (
    <SplitButton
      icon={<Icon iconName="Add" />}
      menu={commandProps.menuProps}
      onClick={commandProps.onClick}
      disabled
    >
      {commandProps.text}
    </SplitButton>
  ))
  // NOT WORKING
  .addStory('Default with Primary Action Disabled', () => (
    <SplitButton
      icon={<Icon iconName="Add" />}
      menu={commandProps.menuProps}
      onClick={commandProps.onClick}
      disabled
    >
      {commandProps.text}
    </SplitButton>
  ))

  // NOT WORKING
  .addStory('Checked', () => (
    <SplitButton
      icon={<Icon iconName="Add" />}
      menu={commandProps.menuProps}
      onClick={commandProps.onClick}
      disabled
    >
      {commandProps.text}
    </SplitButton>
  ))
  .addStory('Primary', () => (
    <SplitButton
      icon={<Icon iconName="Add" />}
      menu={commandProps.menuProps}
      onClick={commandProps.onClick}
      primary
    >
      {commandProps.text}
    </SplitButton>
  ))
  .addStory('Primary Disabled', () => (
    <SplitButton
      icon={<Icon iconName="Add" />}
      menu={commandProps.menuProps}
      onClick={commandProps.onClick}
      disabled
      primary
    >
      {commandProps.text}
    </SplitButton>
  ))

  // NOT WORKING
  .addStory('Primary with Primary Action Disabled', () => (
    <SplitButton
      icon={<Icon iconName="Add" />}
      menu={commandProps.menuProps}
      onClick={commandProps.onClick}
      primary
      disabled
    >
      {commandProps.text}
    </SplitButton>
  ))

  // NOT WORKING
  .addStory('Primary Checked', () => (
    <SplitButton
      icon={<Icon iconName="Add" />}
      menu={commandProps.menuProps}
      onClick={commandProps.onClick}
      primary
    >
      {commandProps.text}
    </SplitButton>
  ))
  .addStory('Command Split', () => <CommandBarButton {...commandProps} split={true} />);

storiesOf('Button Special Scenarios', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withThemeProvider)
  .addDecorator(story => (
    <Screener steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </Screener>
  ))

  .addStory('primary with placeholder', () => (
    <div>
      <Button {...newButtonBaseProps} primary={true} />
      <br />
      <Button {...newButtonBaseProps} icon={<Icon iconName="Add" />} primary={true} />
    </div>
  ))
  .addStory('no flex shrink', () => (
    <div style={{ width: '300px' }}>
      <Button
        {...newButtonBaseProps}
        icon={<Icon iconName="Add" />}
        menuIconProps={{}}
        styles={{ root: { width: '100%' } }}
      />
      <Button
        {...newButtonBaseProps}
        text="This is a much longer string of text in a constrained space"
        icon={<Icon iconName="Add" />}
        menuIconProps={{}}
        styles={{ root: { width: '100%' } }}
      />
    </div>
  ));

storiesOf('IconButton Scenarios', module)
  .addDecorator(FabricDecorator)
  .addDecorator(withThemeProvider)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('icon', { cropTo: '.testWrapper' })
        .hover('.ms-Button')
        .snapshot('hover icon', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))

  .addStory('normal icon button', () => (
    <div>
      <Button iconOnly icon={<Icon iconName="Globe" />} primary={true} />
    </div>
  ))
  .addStory('icon button with menu', () => (
    <div>
      <Button
        iconOnly
        icon={<Icon iconName="Globe" />}
        primary={true}
        menuProps={{
          items: [
            { key: 'a', text: 'Item 1' },
            { key: 'b', text: 'Item 2' },
          ],
        }}
      />
    </div>
  ));
