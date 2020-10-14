import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorFixedWidth } from '../utilities';
import { Fabric } from '@fluentui/react';
import { Calendar } from '@uifabric/date-time/lib/components/Calendar';

const date = new Date(2010, 1, 12);
storiesOf('Calendar', module)
  .addDecorator(FabricDecoratorFixedWidth)
  .addDecorator(story => (
    <Screener steps={new Screener.Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </Screener>
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
    <Screener steps={new Screener.Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </Screener>
  ))
  .addStory('Show Month as Overlay and no Go To Today', () => (
    <Fabric>
      <Calendar value={date} showGoToToday={false} showMonthPickerAsOverlay={true} />
    </Fabric>
  ));
