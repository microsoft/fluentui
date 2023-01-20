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
  <fluent-divider
    alignContent=${x => x.alignContent}
    appearance=${x => x.appearance}
    dividerRole=${x => x.role}
    ?inset=${x => x.inset}
    orientation=${x => x.orientation}
  >
    ${x => x.content}
  </fluent-divider>
`;

export default {
  title: 'Components/Divider',
  args: {
    content: 'Text',
    alignContent: 'center',
    appearance: 'brand',
    dividerRole: 'presentation',
    inset: false,
    orientation: 'horizontal',
  },
  argTypes: {
    alignContent: {
      options: Object.values(DividerAlignContent),
      control: {
        type: 'select',
      },
    },
    appearance: {
      options: Object.values(DividerAppearance),
      control: {
        type: 'select',
      },
    },
    role: {
      options: Object.values(DividerRole),
      control: {
        type: 'select',
      },
    },
    inset: {
      control: 'boolean',
    },
    orientation: {
      options: Object.values(TabsOrientation),
      control: {
        type: 'select',
      },
    },
  },
} as DividerStoryMeta;

export const Divider = renderComponent(storyTemplate).bind({});
