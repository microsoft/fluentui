import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../__test__/helpers.js';
import type { Divider as FluentDivider } from './divider.js';
import { DividerAlignContent, DividerAppearance, DividerOrientation, DividerRole } from './divider.options.js';
import './define.js';
// import * as SampleIcon from './paginated_reports_20_regular.svg';

type DividerStoryArgs = Args & FluentDivider;
type DividerStoryMeta = Meta<DividerStoryArgs>;

const dividerTemplate = html<DividerStoryArgs>`
  <fluent-divider
    align-content=${x => x.alignContent}
    appearance=${x => x.appearance}
    role=${x => x.role}
    ?inset=${x => x.inset}
    orientation=${x => x.orientation}
  >
    ${x => (x.content ? html`<h3>${x.content}</h3>` : '')}
  </fluent-divider>
`;

const dividerSvgTemplate = html<DividerStoryArgs>`
  <fluent-divider
    align-content=${x => x.alignContent}
    appearance=${x => x.appearance}
    role=${x => x.role}
    ?inset=${x => x.inset}
    orientation=${x => x.orientation}
  >
  </fluent-divider>
`;

export default {
  title: 'Components/Divider',
  args: {
    content: 'Section One',
    alignContent: 'center',
    role: 'separator',
    inset: false,
    orientation: 'horizontal',
  },
  argTypes: {
    content: {
      table: {
        type: {
          summary: 'HTML element wrapping text  (e.g. <h3>Section One</h3>), Image or SVG',
        },
        defaultValue: {
          summary: 'empty',
        },
      },
    },
    alignContent: {
      table: {
        type: {
          summary: 'Align content within the divider',
        },
        defaultValue: {
          summary: 'center',
        },
      },
      options: Object.values(DividerAlignContent),
      control: {
        type: 'select',
      },
    },
    appearance: {
      table: {
        type: {
          summary: 'Divider and text colors',
        },
        defaultValue: {
          summary: 'colorNeutralStroke2',
        },
      },
      options: Object.values(DividerAppearance),
      control: {
        type: 'select',
      },
    },
    role: {
      table: {
        type: {
          summary: 'Set role attribute',
        },
        defaultValue: {
          summary: 'separator',
        },
      },
      options: Object.values(DividerRole),
      control: {
        type: 'select',
      },
    },
    inset: {
      table: {
        type: {
          summary: 'Pads ends of divider',
        },
        defaultValue: {
          summary: false,
        },
      },
      control: 'boolean',
    },
    orientation: {
      table: {
        type: {
          summary: 'Divider layout, used also for aria-orientation',
        },
        defaultValue: {
          summary: 'horizontal',
        },
      },
      options: Object.values(DividerOrientation),
      control: {
        type: 'select',
      },
    },
  },
} as DividerStoryMeta;

export const Divider = renderComponent(dividerTemplate).bind({});
export const DividerWithSvg = renderComponent(dividerSvgTemplate).bind({});
