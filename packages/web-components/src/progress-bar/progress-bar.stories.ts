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
    aria-label="fluent-progress-bar-default"
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

//
// Attribute stories
//

export const Max = renderComponent(html<ProgressStoryArgs>`
  <div>
    <p>
      <code>3 of 10</code>
      <fluent-progress-bar
        aria-label="progressbar-max-10"
        value="3"
        aria-valuenow="3"
        max="10"
        aria-valuemax="10"
      ></fluent-progress-bar>
    </p>
    <p>
      <code>3 o 5</code>
      <fluent-progress-bar
        aria-label="progressbar-max-5"
        value="3"
        aria-valuenow="3"
        max="5"
        aria-valuemax="5"
      ></fluent-progress-bar>
    </p>
  </div>
`);

export const Value = renderComponent(html<ProgressStoryArgs>`
  <div>
    <code>0</code><fluent-progress-bar value="0" aria-valuenow="0"></fluent-progress-bar>
    <code>25</code>
    <fluent-progress-bar value="25" aria-valuenow="25" aria-label="progressbar-value-25"></fluent-progress-bar>
    <code>50</code>
    <fluent-progress-bar value="50" aria-valuenow="50" aria-label="progressbar-value-50"></fluent-progress-bar>
    <code>75</code>
    <fluent-progress-bar value="75" aria-valuenow="75" aria-label="progressbar-value-75"></fluent-progress-bar>
    <code>100</code>
    <fluent-progress-bar value="100" aria-valuenow="100" aria-label="progressbar-value-100"></fluent-progress-bar>
  </div>
`);

export const Thickness = renderComponent(html<ProgressStoryArgs>`
  <div>
    <p>
      <code>medium</code>
      <fluent-progress-bar thickness="medium" aria-label="progressbar-thickness-medium"></fluent-progress-bar>
    </p>
    <p>
      <code>large</code>
      <fluent-progress-bar thickness="large" aria-label="progressbar-thickness-large"></fluent-progress-bar>
    </p>
  </div>
`);

export const Shape = renderComponent(html<ProgressStoryArgs>`
  <div>
    <p>
      <code>rounded</code>
      <fluent-progress-bar
        shape="rounded"
        thickness="large"
        aria-label="progressbar-shape-rounded"
      ></fluent-progress-bar>
    </p>
    <p>
      <code>square</code>
      <fluent-progress-bar shape="square" thickness="large" aria-label="progressbar-shape-square"></fluent-progress-bar>
    </p>
  </div>
`);

export const ValidationState = renderComponent(html<ProgressStoryArgs>`
  <div>
    <p>
      <code>success</code>
      <fluent-progress-bar validation-state="success" aria-label="progressbar-validation-success"></fluent-progress-bar>
    </p>
    <p>
      <code>warning</code>
      <fluent-progress-bar validation-state="warning" aria-label="progressbar-validation-warning"></fluent-progress-bar>
    </p>
    <p>
      <code>error</code>
      <fluent-progress-bar validation-state="error" aria-label="progressbar-validation-error"></fluent-progress-bar>
    </p>
  </div>
`);
