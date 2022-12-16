/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorFixedWidth } from '../utilities';
import { Fabric } from 'office-ui-fabric-react';
import { Calendar } from '@uifabric/date-time/lib/components/Calendar';

const date = new Date(2010, 1, 12);
storiesOf('Calendar', module)
  .addDecorator(FabricDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </StoryWright>
  ))
  .addStory(
    'Root',
    () => (
      <Fabric>
        <Calendar value={date} />
      </Fabric>
    ),
    { rtl: true },
  );

storiesOf('Calendar - No Month Option', module)
  .addDecorator(FabricDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </StoryWright>
  ))
  .addStory('Show Month as Overlay and no Go To Today', () => (
    <Fabric>
      <Calendar value={date} showGoToToday={false} showMonthPickerAsOverlay={true} />
    </Fabric>
  ));
