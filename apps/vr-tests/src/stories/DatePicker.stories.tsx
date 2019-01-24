/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorFixedWidth } from '../utilities';
import { Fabric, DatePicker } from 'office-ui-fabric-react';

const date = new Date(2010, 1, 12);
storiesOf('DatePicker', module)
  .addDecorator(FabricDecoratorFixedWidth)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-DatePicker')
        .snapshot('hover datepicker', { cropTo: '.testWrapper' })
        .click('.ms-DatePicker')
        .hover('.ms-DatePicker')
        .snapshot('click', { cropTo: '.ms-Layer' })
        .hover('.ms-DatePicker-day')
        .snapshot('hover day', { cropTo: '.ms-Layer' })
        .hover('.ms-DatePicker-monthOption')
        .snapshot('hover month', { cropTo: '.ms-Layer' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory(
    'Root',
    () => (
      <Fabric>
        <DatePicker value={date} />
      </Fabric>
    ),
    { rtl: true }
  )
  .addStory('Placeholder', () => (
    <Fabric>
      <DatePicker value={date} placeholder="Enter date" />
    </Fabric>
  ))
  .addStory('Allow text input', () => (
    <Fabric>
      <DatePicker value={date} allowTextInput />
    </Fabric>
  ))
  .addStory('Required', () => (
    <Fabric>
      <DatePicker value={date} isRequired />
    </Fabric>
  ))
  .addStory('Underlined', () => (
    <Fabric>
      <DatePicker value={date} underlined />
    </Fabric>
  ))
  .addStory('Underlined and Required', () => (
    <Fabric>
      <DatePicker value={date} underlined isRequired />
    </Fabric>
  ));

storiesOf('DatePicker - No Month Option', module)
  .addDecorator(FabricDecoratorFixedWidth)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-DatePicker')
        .snapshot('hover datepicker', { cropTo: '.testWrapper' })
        .click('.ms-DatePicker')
        .hover('.ms-DatePicker')
        .snapshot('click', { cropTo: '.ms-Layer' })
        .hover('.ms-DatePicker-day')
        .snapshot('hover day', { cropTo: '.ms-Layer' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Show Month as Overlay and no Go To Today', () => (
    <Fabric>
      <DatePicker value={date} showGoToToday={false} showMonthPickerAsOverlay={true} />
    </Fabric>
  ));
