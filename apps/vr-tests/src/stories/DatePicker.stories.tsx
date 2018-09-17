/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecoratorFixedWidth, runStories } from '../utilities';
import { DatePicker } from 'office-ui-fabric-react';

const date = new Date(2010, 1, 12);

const DefaultScreenerDecorator = story => (
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
);

const defaultStories = [
  {
    decorators: [FabricDecoratorFixedWidth, DefaultScreenerDecorator],
    stories: {
      'Root': () => <DatePicker value={date} />,
      'Placeholder': () => <DatePicker value={date} placeholder="Enter date" />,
      'Allow text input': () => <DatePicker value={date} allowTextInput />,
      'Required': () => <DatePicker value={date} isRequired />,
      'Underlined': () => <DatePicker value={date} underlined />,
      'Underlined and Required': () => <DatePicker value={date} underlined isRequired />
    }
  }
];

const NoMonthScreenerDecorator = story => (
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
);

const noMonthStories = [
  {
    decorators: [FabricDecoratorFixedWidth, NoMonthScreenerDecorator],
    stories: {
      'Show Month as Overlay and no Go To Today': () => (
        <DatePicker value={date} showGoToToday={false} showMonthPickerAsOverlay={true} />
      )
    }
  }
];

runStories('DatePicker', defaultStories);
runStories('DatePicker - No Month Option', noMonthStories);
