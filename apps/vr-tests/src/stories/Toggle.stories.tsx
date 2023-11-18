import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import { IToggleProps, Toggle } from '@fluentui/react';

const baseProps: IToggleProps = {
  label: 'Toggle label',
  onText: 'On',
  offText: 'Off',
};

storiesOf('Toggle', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </StoryWright>
  ))
  .addStory('Checked', () => <Toggle {...baseProps} defaultChecked={true} />, { includeRtl: true })
  .addStory('Unchecked', () => <Toggle {...baseProps} defaultChecked={false} />, {
    includeRtl: true,
  })
  .addStory('Disabled checked', () => (
    <Toggle {...baseProps} defaultChecked={true} disabled={true} />
  ))
  .addStory('Disabled unchecked', () => (
    <Toggle {...baseProps} defaultChecked={false} disabled={true} />
  ))
  .addStory('With inline label', () => (
    <Toggle {...baseProps} defaultChecked={true} disabled={false} inlineLabel={true} />
  ))
  .addStory('With inline label (JSX Element)', () => (
    <Toggle
      label={<p>Toggle label</p>}
      onText="On"
      offText="Off"
      defaultChecked={true}
      disabled={false}
      inlineLabel={true}
    />
  ))
  .addStory('With inline label disabled', () => (
    <Toggle {...baseProps} defaultChecked={true} disabled={true} inlineLabel={true} />
  ))
  .addStory('With inline label and without onText and offText', () => (
    <Toggle label={'Toggle label'} defaultChecked={true} disabled={false} inlineLabel={true} />
  ))
  .addStory('With inline label (JSX Element) and without onText and offText', () => (
    <Toggle label={<p>Toggle label</p>} defaultChecked={true} disabled={false} inlineLabel={true} />
  ))
  .addStory('With inline label disabled and without onText and offText', () => (
    <Toggle label={'Toggle label'} defaultChecked={true} disabled={true} inlineLabel={true} />
  ));
