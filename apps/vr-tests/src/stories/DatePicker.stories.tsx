/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorFixedWidth } from '../utilities';
import { DatePicker } from 'office-ui-fabric-react';

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
  .addStory('Root', () => (
    <DatePicker
      value={date}
    />
  ), { rtl: true })
  .addStory('Placeholder', () => (
    <DatePicker
      value={date}
      placeholder="Enter date"
    />
  ))
  .addStory('Allow text input', () => (
    <DatePicker
      value={date}
      allowTextInput
    />
  ))
  .addStory('Required', () => (
    <DatePicker
      value={date}
      isRequired
    />
  ))
  .addStory('Underlined', () => (
    <DatePicker
      value={date}
      underlined
    />
  ))
  .addStory('Underlined and Required', () => (
    <DatePicker
      value={date}
      underlined
      isRequired
    />
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
    <DatePicker value={date} showGoToToday={false} showMonthPickerAsOverlay={true} />
  ));
