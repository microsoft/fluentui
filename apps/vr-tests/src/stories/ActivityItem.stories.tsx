/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import { FabricDecorator, TestWrapperDecorator, runStories } from '../utilities';
import { ActivityItem, IActivityItemProps, Icon } from 'office-ui-fabric-react';

const activityItemStories = {
  decorators: [FabricDecorator, TestWrapperDecorator],
  stories: {
    'Root': () => (
      <ActivityItem
        activityIcon={<Icon iconName={'Message'} />}
        activityDescription={<span>description text</span>}
        comments={<span>comment text</span>}
        timeStamp={'timeStamp text'}
      />
    ),
    'Personas': () => (
      <ActivityItem
        activityPersonas={[
          { imageInitials: 'AB' },
          { imageInitials: 'CD' },
          { imageInitials: 'EF' },
          { imageInitials: 'GH' }
        ]}
        activityDescription={<span>description text</span>}
        comments={<span>comment text</span>}
        timeStamp={'timeStamp text'}
      />
    ),
    'Compact': () => (
      <ActivityItem
        activityIcon={<Icon iconName={'Message'} />}
        isCompact={true}
        activityDescription={<span>description text</span>}
        comments={<span>comment text</span>}
        timeStamp={'timeStamp text'}
      />
    ),
    'CompactPersonas': () => (
      <ActivityItem
        activityPersonas={[
          { imageInitials: 'AB' },
          { imageInitials: 'CD' },
          { imageInitials: 'EF' }
        ]}
        isCompact={true}
        activityDescription={<span>description text</span>}
        comments={<span>comment text</span>}
        timeStamp={'timeStamp text'}
      />
    )
  }
};

runStories('ActivityItem', activityItemStories);