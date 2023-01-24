import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../__test__/helpers.js';
import type { Divider as FluentDivider } from './divider.js';
import { DividerAlignContent, DividerAppearance, DividerOrientation, DividerRole } from './divider.options.js';
import './define.js';

type DividerStoryArgs = Args & FluentDivider;
type DividerStoryMeta = Meta<DividerStoryArgs>;

const storyTemplate = html<DividerStoryArgs>`
  <fluent-divider
    align-content=${x => x.alignContent}
    appearance=${x => x.appearance}
    role=${x => x.role}
    ?inset=${x => x.inset}
    orientation=${x => x.orientation}
  >
    <span>
      <h3>${x => x.content}</h3>
    </span>
  </fluent-divider>
`;

export default {
  title: 'Components/Divider',
  args: {
    content: 'text',
    alignContent: 'center',
    role: 'presentation',
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
      options: Object.values(DividerOrientation),
      control: {
        type: 'select',
      },
    },
  },
} as DividerStoryMeta;

export const Divider = renderComponent(storyTemplate).bind({});
