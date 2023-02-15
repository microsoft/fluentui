import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.js';
import { SpinnerAppearance, SpinnerSize } from './spinner.options.js';
import './define.js';

type SpinnerStoryArgs = Args;
type SpinnerStoryMeta = Meta<SpinnerStoryArgs>;

const storyTemplate = html<SpinnerStoryArgs>`
  <fluent-spinner appearance=${x => x.appearance} size=${x => x.size}></fluent-spinner>
`;

export default {
  title: 'Components/Spinner',
  argTypes: {
    appearance: {
      description: 'The appearance of the spinner',
      table: {
        defaultValue: { summary: 'primary' },
      },
      control: {
        type: 'select',
        options: Object.values(SpinnerAppearance),
      },
      defaultValue: 'primary',
    },
    size: {
      description: 'The size of the spinner',
      table: {
        defaultValue: { summary: 'medium' },
      },
      control: {
        type: 'select',
        options: Object.values(SpinnerSize),
      },
      defaultValue: 'medium',
    },
  },
  parameters: {
    status: {
      type: 'experimental',
    },
  },
} as SpinnerStoryMeta;

export const Spinner = renderComponent(storyTemplate).bind({});

export const SpinnerInverted = renderComponent(html<SpinnerStoryArgs>`
  <div style="background-color: #0f6cbd; padding: 20px;">
    <fluent-spinner appearance="inverted" size="medium"></fluent-spinner>
  </div>
`);
