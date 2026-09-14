import { html } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import { getStorybookHelpers } from '../../.storybook/wc-toolkit-helpers.js';
import type { ProgressBar as FluentProgressBar } from './progress-bar.js';
import { ProgressBarShape, ProgressBarThickness, ProgressBarValidationState } from './progress-bar.options.js';

type Story = StoryObj<FluentProgressBar>;
const { argTypes } = getStorybookHelpers<FluentProgressBar>('fluent-progress-bar');

const storyTemplate = html<StoryArgs<FluentProgressBar>>`
  <fluent-progress-bar
    thickness="${story => story.thickness}"
    shape="${story => story.shape}"
    max="${story => story.max}"
    min="${story => story.min}"
    value="${story => story.value}"
    validation-state="${story => story.validationState}"
  ></fluent-progress-bar>
`;

const withText = html`
  <fluent-progress-bar
    thickness="${story => story.thickness}"
    shape="${story => story.shape}"
    max="${story => story.max}"
    min="${story => story.min}"
    value="${story => story.value}"
    validation-state="${story => story.validationState}"
    aria-describedby="${story => story.messageid}"
  ></fluent-progress-bar>
  <div id="${story => story.messageid}">${story => story.message}</div>
`;

export default {
  title: 'Components/ProgressBar',
  render: renderComponent(storyTemplate),
  argTypes,
} as Meta<FluentProgressBar>;

export const Default: Story = {};

export const Value: Story = {
  args: {
    value: 15,
  },
};

export const MinMax: Story = {
  name: 'Min/Max',
  args: {
    max: 9,
    min: 3,
    value: 5,
  },
};

export const LargeThickness: Story = {
  args: {
    thickness: 'large',
  },
};

export const SquareShape: Story = {
  args: {
    shape: 'square',
  },
};

export const SuccessValidationState: Story = {
  render: renderComponent(withText),
  args: {
    message: 'Success ProgressBar',
    messageid: 'success',
    validationState: 'success',
    value: 75,
  },
};

export const WarningValidationState: Story = {
  render: renderComponent(withText),
  args: {
    message: 'Warning ProgressBar',
    validationState: 'warning',
    value: 50,
  },
};

export const ErrorValidationState: Story = {
  render: renderComponent(withText),
  args: {
    message: 'Error ProgressBar',
    validationState: 'error',
    value: 25,
  },
};
