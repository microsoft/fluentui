import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { ProgressBar as FluentProgressBar } from './progress-bar.js';
import { ProgressBarShape, ProgressBarThickness, ProgressBarValidationState } from './progress-bar.options.js';
import './define.js';

type ProgressStoryArgs = Args & FluentProgressBar;
type ProgressStoryMeta = Meta<ProgressStoryArgs>;

const storyTemplate = html<ProgressStoryArgs>`
  <fluent-progress-bar
    thickness=${x => x.thickness}
    shape=${x => x.shape}
    max=${x => x.max}
    aria-valuemax=${x => x.max}
    aria-valuenow=${x => x.value}
    value=${x => x.value}
    validation-state=${x => x.validationState}
  ></fluent-progress-bar>
`;

export default {
  title: 'Components/ProgressBar',
  args: {
    max: 100,
    value: 15,
    thickness: 'medium',
    shape: 'rounded',
    validationState: null,
  },
  argTypes: {
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
      options: Object.values(ProgressBarThickness),
      defaultValue: 'medium',
    },
    shape: {
      options: Object.values(ProgressBarShape),
      control: {
        type: 'select',
      },
      defaultValue: 'rounded',
    },
    validationState: {
      options: Object.values(ProgressBarValidationState),
      control: {
        type: 'select',
      },
      defaultValue: null,
    },
  },
} as ProgressStoryMeta;

export const Progress = renderComponent(storyTemplate).bind({});

export const ProgressIndeterminate = renderComponent(html<ProgressStoryArgs>`
  <fluent-progress-bar title="Indeterminate Bar" aria-label="Indeterminate progress bar"></fluent-progress-bar>
`);
