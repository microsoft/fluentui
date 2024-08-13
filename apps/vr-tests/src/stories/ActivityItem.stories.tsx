import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { ActivityItem, Icon } from '@fluentui/react';

import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecorator } from '../utilities';

export default {
  title: 'ActivityItem',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
} satisfies Meta<typeof ActivityItem>;

export const Root = () => (
  <ActivityItem
    activityIcon={<Icon iconName="Message" />}
    activityDescription={<span>description text</span>}
    comments={<span>comment text</span>}
    timeStamp="timeStamp text"
  />
);

export const RootRTL = getStoryVariant(Root, RTL);

export const Personas = () => (
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
);

export const PersonasRTL = getStoryVariant(Personas, RTL);

export const Compact = () => (
  <ActivityItem
    activityIcon={<Icon iconName="Message" />}
    isCompact={true}
    activityDescription={<span>description text</span>}
    comments={<span>comment text</span>}
    timeStamp="timeStamp text"
  />
);

export const CompactPersonas = () => (
  <ActivityItem
    activityPersonas={[{ imageInitials: 'AB' }, { imageInitials: 'CD' }, { imageInitials: 'EF' }]}
    isCompact={true}
    activityDescription={<span>description text</span>}
    comments={<span>comment text</span>}
    timeStamp="timeStamp text"
  />
);
CompactPersonas.storyName = 'CompactPersonas';
