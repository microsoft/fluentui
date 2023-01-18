import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../__test__/helpers.js';
import './define.js';

type SpinnerStoryArgs = Args;
type SpinnerStoryMeta = Meta<SpinnerStoryArgs>;

const storyTemplate = html<SpinnerStoryArgs>`
  <fluent-spinner appearance=${x => x.appearance} size=${x => x.size}></fluent-spinner>
`;

export default {
  title: 'Web Components/Spinner',
  argTypes: {
    appearance: {
      description: 'The appearance of the spinner',
      table: {
        defaultValue: { summary: 'primary' },
      },
      control: {
        type: 'select',
        options: ['primary', 'inverted'],
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
        options: ['tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large', 'huge'],
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
