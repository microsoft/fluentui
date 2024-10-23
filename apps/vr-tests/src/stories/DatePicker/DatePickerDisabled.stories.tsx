import * as React from 'react';
import { Steps } from 'storywright';
import { StoryWrightDecorator, TestWrapperDecoratorFixedWidth } from '../../utilities';
import { Fabric, IDatePickerProps, DatePicker } from '@fluentui/react';

const customDayClass = 'test-dayCell';
const customMonthClass = 'test-monthOption';

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

export default {
  title: 'DatePicker - Disabled',

  decorators: [
    TestWrapperDecoratorFixedWidth,
    StoryWrightDecorator(
      new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-DatePicker')
        .snapshot('hover datepicker', { cropTo: '.testWrapper' })
        .click('.ms-DatePicker')
        .hover('.ms-DatePicker')
        .snapshot('click', { cropTo: '.ms-Layer' })
        .end(),
    ),
  ],
};

export const WithoutLabel = () => (
  <Fabric>
    <DatePicker {...commonProps} disabled />
  </Fabric>
);

export const WithLabel = () => (
  <Fabric>
    <DatePicker label="This is my label" {...commonProps} disabled />
  </Fabric>
);

export const WithoutValue = () => (
  <Fabric>
    <DatePicker calendarProps={commonProps.calendarProps} label="This is my label" disabled />
  </Fabric>
);
