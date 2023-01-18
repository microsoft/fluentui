import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../__test__/helpers.js';
import type { Divider as FluentDivider } from './divider.js';
import { AlignContent, Appearance } from './divider.options.js';
import './define';

type DividerStoryArgs = Args & FluentDivider;
type DividerStoryMeta = Meta<DividerStoryArgs>;

const storyTemplate = html<DividerStoryArgs>`
  <dcs-divider role="presentation" orientation="vertical" alignContent="start" appearance="brand" inset="true">
    <span slot="content">Custom</span>
  </dcs-divider>

  <dcs-divider>
    <span slot="content">Default</span>
  </dcs-divider>
`;

export default {
  title: 'Components/Divider',
  args: {
    content: 'Text',
  },
  argTypes: {
    align: {
      options: Object.keys(AlignContent),
      control: {
        type: 'select',
      },
    },
    appearance: {
      options: Object.keys(Appearance),
      control: {
        type: 'select',
      },
    },
  },
} as DividerStoryMeta;

export const Divider = renderComponent(storyTemplate).bind({});
