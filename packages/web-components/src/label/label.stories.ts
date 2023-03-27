import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Label as FluentLabel } from './label.js';
import './define.js';

type LabelStoryArgs = Args & FluentLabel;
type LabelStoryMeta = Meta<LabelStoryArgs>;

const storyTemplate = html<LabelStoryArgs>`
  <fluent-label
    for="abc"
    form="def"
    weight="${x => x.weight}"
    size="${x => x.size}"
    ?required="${x => x.required}"
    ?disabled="${x => x.disabled}"
    >Label</fluent-label
  >
`;

export default {
  title: 'Components/Label',
  args: {
    required: false,
    size: 'medium',
    weight: 'regular',
  },
  argTypes: {
    required: {
      description: 'Sets required field styling',
      table: {
        defaultValue: { summary: false },
      },
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    disabled: {
      description: 'Sets disabled styling',
      table: {
        defaultValue: { summary: false },
      },
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    size: {
      description: 'Sets label font size',
      table: {
        defaultValue: { summary: 'medium' },
      },
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
      defaultValue: 'medium',
    },
    weight: {
      description: 'Sets label font weight',
      table: {
        defaultValue: { summary: 'regular' },
      },
      control: {
        type: 'select',
        options: ['regular', 'semibold'],
      },
      defaultValue: 'regular',
    },
  },
} as LabelStoryMeta;

export const Label = renderComponent(storyTemplate).bind({});

export const LabelSizes = renderComponent(html<LabelStoryArgs>`
  <div style="display: flex; flex-direction: row; justify-content: space-around; align-items: center; gap: 10px;">
    <fluent-label size="small">Small Label</fluent-label>
    <fluent-label size="medium">Medium Label</fluent-label>
    <fluent-label size="large">Large Label</fluent-label>
  </div>
`);

export const LabelWeights = renderComponent(html<LabelStoryArgs>`
  <div style="display: flex; flex-direction: row; justify-content: space-around; align-items: center; gap: 10px;">
    <fluent-label weight="regular">Regular Label</fluent-label>
    <fluent-label weight="semibold">Semibold Label</fluent-label>
  </div>
`);

export const RequiredLabel = renderComponent(html<LabelStoryArgs>`
  <fluent-label required="true">Required Label</fluent-label>
`);

export const DisabledLabel = renderComponent(html<LabelStoryArgs>`
  <fluent-label disabled="true">Disabled Label</fluent-label>
`);
