import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import { ActivityItem, Icon } from '@fluentui/react';

storiesOf('ActivityItem', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>,
  )
  .addStory(
    'Root',
    () => (
      <ActivityItem
        activityIcon={<Icon iconName="Message" />}
        activityDescription={<span>description text</span>}
        comments={<span>comment text</span>}
        timeStamp="timeStamp text"
      />
    ),
    { includeRtl: true },
  )
  .addStory(
    'Personas',
    () => (
      <ActivityItem
        activityPersonas={[
          { imageInitials: 'AB' },
          { imageInitials: 'CD' },
          { imageInitials: 'EF' },
          { imageInitials: 'GH' },
        ]}
        activityDescription={<span>description text</span>}
        comments={<span>comment text</span>}
        timeStamp="timeStamp text"
      />
    ),
    { includeRtl: true },
  )
  .addStory('Compact', () => (
    <ActivityItem
      activityIcon={<Icon iconName="Message" />}
      isCompact={true}
      activityDescription={<span>description text</span>}
      comments={<span>comment text</span>}
      timeStamp="timeStamp text"
    />
  ))
  .addStory('CompactPersonas', () => (
    <ActivityItem
      activityPersonas={[{ imageInitials: 'AB' }, { imageInitials: 'CD' }, { imageInitials: 'EF' }]}
      isCompact={true}
      activityDescription={<span>description text</span>}
      comments={<span>comment text</span>}
      timeStamp="timeStamp text"
    />
  ));
