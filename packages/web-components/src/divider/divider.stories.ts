import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { DividerRole, TabsOrientation } from '@microsoft/fast-foundation';
import { renderComponent } from '../__test__/helpers.js';
import type { Divider as FluentDivider } from './divider.js';
import { DividerAlignContent, DividerAppearance } from './divider.options.js';
import './define.js';

type DividerStoryArgs = Args & FluentDivider;
type DividerStoryMeta = Meta<DividerStoryArgs>;

const storyTemplate = html<DividerStoryArgs>`
  <dcs-divider
    dividerAlignContent=${x => x.dividerAlignContent}
    dividerAppearance=${x => x.dividerAppearance}
    dividerRole=${x => x.role}
    inset=${x => x.inset}
    orientation=${x => x.orientation}
  >
    ${x => x.content}
  </dcs-divider>
`;

export default {
  title: 'Components/Divider',
  args: {
    content: 'Text',
    dividerAlignContent: 'start',
    dividerAppearance: 'brand',
    dividerRole: 'presentation',
    inset: true,
    orientation: 'vertical',
  },
  argTypes: {
    dividerAlignment: {
      options: Object.keys(DividerAlignContent),
      control: {
        type: 'select',
      },
    },
    dividerAppearance: {
      options: Object.keys(DividerAppearance),
      control: {
        type: 'select',
      },
    },
    dividerRole: {
      options: Object.keys(DividerRole),
      control: {
        type: 'select',
      },
    },
    inset: {
      control: 'boolean',
    },
    orientation: {
      options: Object.keys(TabsOrientation),
      control: {
        type: 'select',
      },
    },
  },
} as DividerStoryMeta;

export const Divider = renderComponent(storyTemplate).bind({});
