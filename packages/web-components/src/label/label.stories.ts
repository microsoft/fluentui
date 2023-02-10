import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../__test__/helpers.js';
import type { Label as FluentLabel } from './label.js';
import './define.js';

type LabelStoryArgs = Args & FluentLabel;
type LabelStoryMeta = Meta<LabelStoryArgs>;

const storyTemplate = html<LabelStoryArgs>` <fluent-label for="abc" form="def">Label</fluent-label> `;

export default {
  title: 'Components/Label',
  args: {
    required: false,
    size: 'medium',
    weight: 'regular',
  },
  argTypes: {
    required: {
      control: 'boolean',
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: {
        type: 'select',
      },
    },
    weight: {
      options: ['regular', 'semibold'],
      control: {
        type: 'select',
      },
    },
  },
} as LabelStoryMeta;

export const Label = renderComponent(storyTemplate).bind({});
