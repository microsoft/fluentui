import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { TestWrapperDecoratorFixedWidth } from '../../utilities';
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

  decorators: [TestWrapperDecoratorFixedWidth],
  parameters: {
    storyWright: {
      steps: new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-DatePicker')
        .snapshot('hover datepicker', { cropTo: '.testWrapper' })
        .click('.ms-DatePicker')
        .hover('.ms-DatePicker')
        .snapshot('click')
        .hover(daySelector)
        .snapshot('hover day')
        .end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof DatePicker>;

export const ShowMonthAsOverlayAndNoGoToToday = () => (
  <Fabric>
    <DatePicker {...commonProps} showGoToToday={false} showMonthPickerAsOverlay={true} />
  </Fabric>
);

ShowMonthAsOverlayAndNoGoToToday.storyName = 'Show Month as Overlay and no Go To Today';
