import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorFixedWidth } from '../utilities/index';
import { Fabric, IDatePickerProps, DatePicker } from '@fluentui/react';

const customDayClass = 'test-dayCell';
const daySelector = `td.${customDayClass}`;
const customMonthClass = 'test-monthOption';
const monthSelector = `.${customMonthClass}`;

const date = new Date(2010, 1, 12);
const commonProps: Partial<IDatePickerProps> = {
  value: date,
  calendarProps: {
    calendarDayProps: {
      styles: {
        dayCell: customDayClass,
      },
    },
    calendarMonthProps: {
      styles: {
        itemButton: customMonthClass,
      },
    },
  },
};

storiesOf('DatePicker', module)
  .addDecorator(FabricDecoratorFixedWidth)
  .addDecorator((story) => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-DatePicker')
        .snapshot('hover datepicker', { cropTo: '.testWrapper' })
        .click('.ms-DatePicker')
        .hover('.ms-DatePicker')
        .snapshot('click', { cropTo: '.ms-Layer' })
        .hover(daySelector)
        .snapshot('hover day', { cropTo: '.ms-Layer' })
        .hover(monthSelector)
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
        <DatePicker {...commonProps} />
      </Fabric>
    ),
    { rtl: true },
  )
  .addStory('Placeholder', () => (
    <Fabric>
      <DatePicker {...commonProps} placeholder="Enter date" />
    </Fabric>
  ))
  .addStory('Allow text input', () => (
    <Fabric>
      <DatePicker {...commonProps} allowTextInput />
    </Fabric>
  ))
  .addStory('Required', () => (
    <Fabric>
      <DatePicker {...commonProps} isRequired />
    </Fabric>
  ))
  .addStory('Underlined', () => (
    <Fabric>
      <DatePicker {...commonProps} underlined />
    </Fabric>
  ))
  .addStory('Underlined and Required', () => (
    <Fabric>
      <DatePicker {...commonProps} underlined isRequired />
    </Fabric>
  ));

storiesOf('DatePicker - No Month Option', module)
  .addDecorator(FabricDecoratorFixedWidth)
  .addDecorator((story) => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-DatePicker')
        .snapshot('hover datepicker', { cropTo: '.testWrapper' })
        .click('.ms-DatePicker')
        .hover('.ms-DatePicker')
        .snapshot('click', { cropTo: '.ms-Layer' })
        .hover(daySelector)
        .snapshot('hover day', { cropTo: '.ms-Layer' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Show Month as Overlay and no Go To Today', () => (
    <Fabric>
      <DatePicker {...commonProps} showGoToToday={false} showMonthPickerAsOverlay={true} />
    </Fabric>
  ));

storiesOf('DatePicker - Disabled', module)
  .addDecorator(FabricDecoratorFixedWidth)
  .addDecorator((story) => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-DatePicker')
        .snapshot('hover datepicker', { cropTo: '.testWrapper' })
        .click('.ms-DatePicker')
        .hover('.ms-DatePicker')
        .snapshot('click', { cropTo: '.ms-Layer' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Without Label', () => (
    <Fabric>
      <DatePicker {...commonProps} disabled />
    </Fabric>
  ))
  .addStory('With Label', () => (
    <Fabric>
      <DatePicker label="This is my label" {...commonProps} disabled />
    </Fabric>
  ))
  .addStory('Without Value', () => (
    <Fabric>
      <DatePicker calendarProps={commonProps.calendarProps} label="This is my label" disabled />
    </Fabric>
  ));
