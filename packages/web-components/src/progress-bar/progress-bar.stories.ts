import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../__test__/helpers.js';
import type { ProgressBar as FluentProgressBar } from './progress-bar.js';
import { ProgressBarShape, ProgressBarThickness, ProgressBarValidationState } from './progress-bar.options.js';
import './define.js';

type ProgressStoryArgs = Args & FluentProgressBar;
type ProgressStoryMeta = Meta<ProgressStoryArgs>;

const storyTemplate = html<ProgressStoryArgs>`
  <fluent-progress-bar
    ?paused=${x => x.paused}
    thickness=${x => x.thickness}
    shape=${x => x.shape}
    min=${x => x.min}
    max=${x => x.max}
    aria-valuemin=${x => x.min}
    aria-valuemax=${x => x.max}
    aria-valuenow=${x => x.value}
    validation-state=${x => x.validationState}
    aria-label="Progress bar"
  ></fluent-progress-bar>
`;

export default {
  title: 'Components/ProgressBar',
  args: {
    min: 0,
    max: 100,
    value: 15,
    thickness: 'medium',
    shape: 'rounded',
    paused: false,
    validationState: '',
  },
  argTypes: {
    min: {
      control: 'number',
      defaultValue: 0,
    },
    max: {
      control: 'number',
      defaultValue: 100,
    },
    value: {
      control: 'number',
      defaultValue: 15,
    },
    thickness: {
      control: {
        type: 'select',
      },
      options: Object.keys(ProgressBarThickness),
      defaultValue: 'medium',
    },
    shape: {
      options: Object.keys(ProgressBarShape),
      control: {
        type: 'select',
      },
      defaultValue: 'rounded',
    },
    paused: {
      control: 'boolean',
      defaultValue: false,
    },
    validationState: {
      options: Object.keys(ProgressBarValidationState),
      control: {
        type: 'select',
      },
      defaultValue: '',
    },
  },
} as ProgressStoryMeta;

export const Progress = renderComponent(storyTemplate).bind({});

export const ProgressIndeterminate = renderComponent(html<ProgressStoryArgs>`
  <fluent-progress-bar title="Indeterminate Bar" aria-label="Indeterminate progress bar"></fluent-progress-bar>
`);
