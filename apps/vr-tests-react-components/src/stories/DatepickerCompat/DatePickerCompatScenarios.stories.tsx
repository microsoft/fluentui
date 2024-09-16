import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps, StoryWright } from 'storywright';
import { DatePicker as DatePickerBase } from '@fluentui/react-datepicker-compat';
import type { DatePickerProps } from '@fluentui/react-datepicker-compat';
import { Field } from '@fluentui/react-field';
import { TestWrapperDecorator } from '../../utilities';

const DatePicker = (props: DatePickerProps & { renderRelativeElement?: boolean }) => {
  const today = new Date('3/15/2023');
  const { renderRelativeElement, ...restProps } = props;
  return (
    <div style={{ width: '500px', height: '330px', padding: '10px' }}>
      <DatePickerBase value={today} today={today} {...restProps} />
      {renderRelativeElement && <input style={{ position: 'relative', display: 'block', width: '100%' }} />}
    </div>
  );
};

export default {
  title: 'DatePicker Compat',
  component: DatePicker,
  decorators: [
    TestWrapperDecorator,
    story => (
      <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
    ),
  ],
} satisfies Meta<typeof DatePicker>;

export const Required = () => (
  <Field label="Select a date" required>
    <DatePicker />
  </Field>
);

export const WithLabel = () => (
  <Field label="Select a date">
    <DatePicker />
  </Field>
);

WithLabel.storyName = 'With label';

export const WhenRenderingInlineItShouldNotRenderBehindRelativelyPositionedElements = () => (
  <Field label="Select a date">
    <DatePicker open inlinePopup renderRelativeElement />
  </Field>
);

WhenRenderingInlineItShouldNotRenderBehindRelativelyPositionedElements.storyName =
  'when rendering inline, it should not render behind relatively positioned elements';
