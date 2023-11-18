import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import { Spinner, SpinnerSize } from '@fluentui/react';

storiesOf('Spinner', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </StoryWright>
  ))
  .addStory('Extra small', () => <Spinner size={SpinnerSize.xSmall} />)
  .addStory('Small', () => <Spinner size={SpinnerSize.small} />)
  .addStory('Medium', () => <Spinner size={SpinnerSize.medium} />)
  .addStory('Large', () => <Spinner size={SpinnerSize.large} />)
  .addStory('Label', () => (
    <Spinner
      styles={{ label: { fontFamily: 'Segoe UI', fontSize: '14px' } }}
      size={SpinnerSize.medium}
      label="Spinner label"
    />
  ))
  .addStory('Label at top', () => (
    <Spinner
      styles={{ label: { fontFamily: 'Segoe UI', fontSize: '14px' } }}
      size={SpinnerSize.medium}
      label="Spinner label"
      labelPosition="top"
    />
  ))
  .addStory('Label on the right', () => (
    <Spinner
      styles={{ label: { fontFamily: 'Segoe UI', fontSize: '14px' } }}
      size={SpinnerSize.medium}
      label="Spinner label"
      labelPosition="right"
    />
  ))
  .addStory('Label on the left', () => (
    <Spinner
      styles={{ label: { fontFamily: 'Segoe UI', fontSize: '14px' } }}
      size={SpinnerSize.medium}
      label="Spinner label"
      labelPosition="left"
    />
  ));
