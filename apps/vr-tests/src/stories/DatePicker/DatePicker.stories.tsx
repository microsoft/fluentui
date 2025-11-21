import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { getStoryVariant, RTL, TestWrapperDecoratorFixedWidth } from '../../utilities';
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

export default {
  title: 'DatePicker',

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
        .hover(monthSelector)
        .snapshot('hover month')
        .end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof DatePicker>;

export const Root = () => (
  <Fabric>
    <DatePicker {...commonProps} />
  </Fabric>
);

export const RootRTL = getStoryVariant(Root, RTL);

export const Placeholder = () => (
  <Fabric>
    <DatePicker {...commonProps} placeholder="Enter date" />
  </Fabric>
);

export const AllowTextInput = () => (
  <Fabric>
    <DatePicker {...commonProps} allowTextInput />
  </Fabric>
);

AllowTextInput.storyName = 'Allow text input';

export const Required = () => (
  <Fabric>
    <DatePicker {...commonProps} isRequired />
  </Fabric>
);

export const Underlined = () => (
  <Fabric>
    <DatePicker {...commonProps} underlined />
  </Fabric>
);

export const UnderlinedAndRequired = () => (
  <Fabric>
    <DatePicker {...commonProps} underlined isRequired />
  </Fabric>
);

UnderlinedAndRequired.storyName = 'Underlined and Required';
