import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import { Flipper } from './flipper.js';
import { FlipperSize } from './flipper.options.js';
import './define.js';

type FlipperStoryArgs = Args & Flipper;

const template = html<Flipper>`
  <fluent-flipper
    ?disabled="${x => x.disabled}"
    ?inline="${x => x.inline}"
    direction="${x => x.direction}"
    size="${x => x.size}"
    aria-hidden="false"
  ></fluent-flipper>
`;

export default {
  title: 'Components/Flipper',
  component: 'flipper',
  args: {
    direction: 'next',
    disabled: false,
    inline: false,
    size: FlipperSize.medium,
  },
  argTypes: {
    direction: {
      options: ['next', 'previous'],
      control: 'select',
    },
    size: {
      options: FlipperSize,
      control: 'select',
    },
  },
} as Meta<Flipper>;

export const Primary = renderComponent(template).bind({});

export const Size = renderComponent(html<FlipperStoryArgs>`
  <fluent-flipper direction="previous"></fluent-flipper>
  <fluent-flipper></fluent-flipper>
  <fluent-flipper size="large" direction="previous"></fluent-flipper>
  <fluent-flipper size="large"></fluent-flipper>
`);

export const Inline = renderComponent(html<FlipperStoryArgs>`
  <fluent-flipper inline direction="previous"></fluent-flipper>
  <fluent-flipper inline></fluent-flipper>
  <fluent-flipper inline size="large" direction="previous"></fluent-flipper>
  <fluent-flipper inline size="large"></fluent-flipper>
`);
