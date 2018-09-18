/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecorator, FabricDecoratorTall, TestWrapperDecorator, runStories } from '../utilities';
import { DefaultButton, ActionButton, CompoundButton, IButtonProps, CommandBarButton } from 'office-ui-fabric-react';

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

const DefaultButtonDecorator = story => (
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
);

const defaultButtonStories = {
  decorators: [FabricDecorator, DefaultButtonDecorator],
  stories: {
    'Root': () => <DefaultButton {...baseProps} />,
    'Disabled': () => <DefaultButton {...baseProps} disabled />,
    'Checked': () => <DefaultButton {...baseProps} checked />,
    'Primary': () => <DefaultButton {...baseProps} primary />,
    'Primary Disabled': () => <DefaultButton {...baseProps} primary disabled />,
    'Primary Checked': () => <DefaultButton {...baseProps} primary checked />
  }
};

runStories('Button Default', defaultButtonStories);

const ActionButtonDecorator = story => (
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
);

const actionButtonStories = {
  decorators: [FabricDecorator, ActionButtonDecorator],
  stories: {
    'Root': () => <ActionButton {...baseProps} />,
    'Disabled': () => <ActionButton {...baseProps} disabled />,
    'Checked': () => <ActionButton {...baseProps} checked />
  }
};

runStories('Button Action', actionButtonStories);

const CompoundButtonDecorator = story => (
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
);

const compoundButtonStories = {
  decorators: [FabricDecorator, CompoundButtonDecorator],
  stories: {
    'Root': () => <CompoundButton {...baseProps} />,
    'Disabled': () => <CompoundButton {...baseProps} disabled />,
    'Checked': () => <CompoundButton {...baseProps} checked />,
    'Primary': () => <CompoundButton {...baseProps} primary />,
    'Primary Disabled': () => <CompoundButton {...baseProps} primary disabled />,
    'Primary Checked': () => <CompoundButton {...baseProps} primary checked />
  }
};

runStories('Button Compound', compoundButtonStories);

const CommandButtonDivDecorator = story => (
  // tslint:disable-next-line:jsx-ban-props
  <div style={{ display: 'flex', alignItems: 'stretch', height: '40px' }}>{story()}</div>
);

const CommandButtonDecorator = story => (
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
);

const commandButtonStories = {
  decorators: [CommandButtonDivDecorator, FabricDecoratorTall, CommandButtonDecorator],
  stories: {
    'Root': () => <CommandBarButton {...commandProps} />,
    'Disabled': () => <CommandBarButton {...commandProps} disabled />,
    'Checked': () => <CommandBarButton {...commandProps} checked />
  }
};

runStories('Button Command', commandButtonStories);

const SplitButtonDecorator = story => (
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
);

const splitButtonStories = {
  decorators: [FabricDecoratorTall, SplitButtonDecorator],
  stories: {
    'Root': () => <DefaultButton {...commandProps} split />,
    'Disabled': () => <DefaultButton {...commandProps} disabled split />,
    'Checked': () => <DefaultButton {...commandProps} checked split />,
    'Primary': () => <DefaultButton {...commandProps} primary split />,
    'Primary Disabled': () => <DefaultButton {...commandProps} primary disabled split />,
    'Primary Checked': () => <DefaultButton {...commandProps} primary checked split />,
    'Command Split': () => <CommandBarButton {...commandProps} split />
  }
};

runStories('Button Split', splitButtonStories);

const specialButtonStories = {
  decorators: [FabricDecorator, TestWrapperDecorator],
  stories: {
    'primary with placeholder': () => (
      <div>
        <DefaultButton {...baseProps} iconProps={{ iconName: '' }} primary={true} />
        <br />
        <DefaultButton {...baseProps} iconProps={{ iconName: 'Add' }} primary={true} />
      </div>
    ),
    'no flex shrink': () => (
      // tslint:disable-next-line:jsx-ban-props
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
    )
  }
};

runStories('Button Special Scenarios', specialButtonStories);
