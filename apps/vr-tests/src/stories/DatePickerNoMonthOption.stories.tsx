import * as React from 'react';
import { Steps } from 'storywright';
import { StoryWrightDecorator, TestWrapperDecoratorFixedWidth } from '../utilities';
import { Fabric, IDatePickerProps, DatePicker } from '@fluentui/react';

const customDayClass = 'test-dayCell';
const daySelector = `td.${customDayClass}`;
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
  title: 'DatePicker - No Month Option',

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
        .hover(daySelector)
        .snapshot('hover day', { cropTo: '.ms-Layer' })
        .end(),
    ),
  ],
};

export const ShowMonthAsOverlayAndNoGoToToday = () => (
  <Fabric>
    <DatePicker {...commonProps} showGoToToday={false} showMonthPickerAsOverlay={true} />
  </Fabric>
);

ShowMonthAsOverlayAndNoGoToToday.storyName = 'Show Month as Overlay and no Go To Today';

const disabledSteps = new Steps()
  .snapshot('default', { cropTo: '.testWrapper' })
  .hover('.ms-DatePicker')
  .snapshot('hover datepicker', { cropTo: '.testWrapper' })
  .click('.ms-DatePicker')
  .hover('.ms-DatePicker')
  .snapshot('click', { cropTo: '.ms-Layer' })
  .end();

export const WithoutLabel = () => (
  <Fabric>
    <DatePicker {...commonProps} disabled />
  </Fabric>
);
WithoutLabel.parameters = {
  steps: disabledSteps,
};

export const WithLabel = () => (
  <Fabric>
    <DatePicker label="This is my label" {...commonProps} disabled />
  </Fabric>
);
WithLabel.parameters = {
  steps: disabledSteps,
};

export const WithoutValue = () => (
  <Fabric>
    <DatePicker calendarProps={commonProps.calendarProps} label="This is my label" disabled />
  </Fabric>
);
WithoutValue.parameters = {
  steps: disabledSteps,
};
