import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator, TestWrapperDecoratorTall } from '../utilities/index';
import {
  DefaultButton,
  ActionButton,
  CompoundButton,
  IconButton,
  IButtonProps,
  CommandBarButton,
} from '@fluentui/react/lib/Button';

const baseProps: IButtonProps = {
  iconProps: {
    iconName: 'AddFriend',
  },
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

storiesOf('Button (compat)', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Root', () => <DefaultButton {...baseProps} />, { includeRtl: true })
  .addStory('Disabled', () => <DefaultButton {...baseProps} disabled={true} />)
  .addStory('Checked', () => <DefaultButton {...baseProps} checked={true} />)
  .addStory('Primary', () => <DefaultButton {...baseProps} primary={true} />)
  .addStory('Primary Disabled', () => (
    <DefaultButton {...baseProps} primary={true} disabled={true} />
  ))
  .addStory('Primary Checked', () => <DefaultButton {...baseProps} primary={true} checked={true} />)
  .addStory('Primary Anchor', () => (
    <DefaultButton primary href="http://www.bing.com">
      Button
    </DefaultButton>
  ))
  .addStory('No Icon', () => <DefaultButton>Button</DefaultButton>)
  .addStory('Icon Only', () => <DefaultButton iconProps={baseProps.iconProps} />);

storiesOf('Button Action (compat)', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Root', () => <ActionButton {...baseProps} />, { includeRtl: true })
  .addStory('Disabled', () => <ActionButton {...baseProps} disabled={true} />)
  .addStory('Checked', () => <ActionButton {...baseProps} checked={true} />)
  .addStory('No Icon', () => <ActionButton>Button</ActionButton>)
  .addStory('Icon Only', () => <ActionButton iconProps={baseProps.iconProps} />);

storiesOf('Button Compound (compat)', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Root', () => <CompoundButton {...baseProps} />, { includeRtl: true })
  .addStory('Disabled', () => <CompoundButton {...baseProps} disabled={true} />)
  .addStory('Checked', () => <CompoundButton {...baseProps} checked={true} />)
  .addStory('Primary', () => <CompoundButton {...baseProps} primary={true} />)
  .addStory('Primary Disabled', () => (
    <CompoundButton {...baseProps} primary={true} disabled={true} />
  ))
  .addStory('Primary Checked', () => (
    <CompoundButton {...baseProps} primary={true} checked={true} />
  ))
  .addStory('No Icon', () => <CompoundButton {...baseProps} iconProps={undefined} />);

storiesOf('Button Command (compat)', module)
  .addDecorator(story => (
    <div style={{ display: 'flex', alignItems: 'stretch', height: '40px' }}>{story()}</div>
  ))
  .addDecorator(TestWrapperDecoratorTall)
  .addDecorator(story => (
    <StoryWright
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
    </StoryWright>
  ))
  .addStory('Root', () => <CommandBarButton {...commandProps} />, { includeRtl: true })
  .addStory('Disabled', () => <CommandBarButton {...commandProps} disabled={true} />)
  .addStory('Checked', () => <CommandBarButton {...commandProps} checked={true} />);

storiesOf('Button Split (compat)', module)
  .addDecorator(TestWrapperDecoratorTall)
  .addDecorator(story => (
    <StoryWright
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
    </StoryWright>
  ))
  .addStory('Root', () => <DefaultButton {...commandProps} split={true} />, { includeRtl: true })
  .addStory('Disabled', () => <DefaultButton {...commandProps} disabled={true} split={true} />)
  .addStory('Default with Primary Action Disabled', () => (
    <DefaultButton {...commandProps} primaryDisabled={true} split={true} />
  ))
  .addStory('Checked', () => <DefaultButton {...commandProps} checked={true} split={true} />)
  .addStory('Primary', () => <DefaultButton {...commandProps} primary={true} split={true} />)
  .addStory('Primary Disabled', () => (
    <DefaultButton {...commandProps} primary={true} disabled={true} split={true} />
  ))
  .addStory('Primary with Primary Action Disabled', () => (
    <DefaultButton {...commandProps} primaryDisabled={true} primary={true} split={true} />
  ))
  .addStory('Primary Checked', () => (
    <DefaultButton {...commandProps} primary={true} checked={true} split={true} />
  ))
  .addStory('Command Split', () => <CommandBarButton {...commandProps} split={true} />);

storiesOf('Button Special Scenarios (compat)', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </StoryWright>
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

storiesOf('IconButton Scenarios (compat)', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('icon', { cropTo: '.testWrapper' })
        .hover('.ms-Button')
        .snapshot('hover icon', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>
  ))

  .addStory('normal icon button', () => (
    <div>
      <IconButton iconProps={{ iconName: 'Globe' }} primary={true} />
    </div>
  ))
  .addStory('icon button with menu', () => (
    <div>
      <IconButton
        iconProps={{ iconName: 'Globe' }}
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
