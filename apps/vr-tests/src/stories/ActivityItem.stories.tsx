/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { ActivityItem, Icon } from 'office-ui-fabric-react';

storiesOf('ActivityItem', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
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
    { rtl: true }
  )
  .addStory(
    'Personas',
    () => (
      <ActivityItem
        activityPersonas={[
          { imageInitials: 'AB' },
          { imageInitials: 'CD' },
          { imageInitials: 'EF' },
          { imageInitials: 'GH' }
        ]}
        activityDescription={<span>description text</span>}
        comments={<span>comment text</span>}
        timeStamp="timeStamp text"
      />
    ),
    { rtl: true }
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
