/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecorator, FabricDecoratorTall, runStories } from '../utilities';
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

const DefaultScreenerDecorator = story => (
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

const defaultStories = {
  decorators: [FabricDecorator, DefaultScreenerDecorator],
  stories: {
    'Root': () => <DefaultButton {...baseProps} />,
    'Disabled': () => <DefaultButton {...baseProps} disabled={true} />,
    'Checked': () => <DefaultButton {...baseProps} checked={true} />,
    'Primary': () => <DefaultButton {...baseProps} primary={true} />,
    'Primary Disabled': () => <DefaultButton {...baseProps} primary={true} disabled={true} />,
    'Primary Checked': () => <DefaultButton {...baseProps} primary={true} checked={true} />
  }
};

runStories('Button Default', defaultStories);

const ActionScreenerDecorator = story => (
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

const actionStories = {
  decorators: [FabricDecorator, ActionScreenerDecorator],
  stories: {
    'Root': () => <ActionButton {...baseProps} />,
    'Disabled': () => <ActionButton {...baseProps} disabled={true} />,
    'Checked': () => <ActionButton {...baseProps} checked={true} />
  }
};

runStories('Button Action', actionStories);

const CompoundScreenerDecorator = story => (
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

const compoundStories = {
  decorators: [FabricDecorator, CompoundScreenerDecorator],
  stories: {
    'Root': () => <CompoundButton {...baseProps} />,
    'Disabled': () => <CompoundButton {...baseProps} disabled={true} />,
    'Checked': () => <CompoundButton {...baseProps} checked={true} />,
    'Primary': () => <CompoundButton {...baseProps} primary={true} />,
    'Primary Disabled': () => <CompoundButton {...baseProps} primary={true} disabled={true} />,
    'Primary Checked': () => <CompoundButton {...baseProps} primary={true} checked={true} />
  }
};

runStories('Button Compound', compoundStories);

const CommandDecorator = story => (
  // tslint:disable-next-line:jsx-ban-props
  <div style={{ display: 'flex', alignItems: 'stretch', height: '40px' }}>{story()}</div>
);

const CommandScreenerDecorator = story => (
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

const commandStories = {
  decorators: [CommandDecorator, FabricDecoratorTall, CommandScreenerDecorator],
  stories: {
    'Root': () => <CommandBarButton {...commandProps} />,
    'Disabled': () => <CommandBarButton {...commandProps} disabled={true} />,
    'Checked': () => <CommandBarButton {...commandProps} checked={true} />
  }
};

runStories('Button Command', commandStories);

const SplitScreenerDecorator = story => (
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

const splitStories = {
  decorators: [FabricDecoratorTall, SplitScreenerDecorator],
  stories: {
    'Root': () => <DefaultButton {...commandProps} split={true} />,
    'Disabled': () => <DefaultButton {...commandProps} disabled={true} split={true} />,
    'Checked': () => <DefaultButton {...commandProps} checked={true} split={true} />,
    'Primary': () => <DefaultButton {...commandProps} primary={true} split={true} />,
    'Primary Disabled': () => <DefaultButton {...commandProps} primary={true} disabled={true} split={true} />,
    'Primary Checked': () => <DefaultButton {...commandProps} primary={true} checked={true} split={true} />,
    'Command Split': () => <CommandBarButton {...commandProps} split={true} />
  }
};

runStories('Button Split', splitStories);

const SpecialScreenerDecorator = story => (
  <Screener steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>
);

const specialStories = {
  decorators: [FabricDecorator, SpecialScreenerDecorator],
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

runStories('Button Special Scenarios', specialStories);
