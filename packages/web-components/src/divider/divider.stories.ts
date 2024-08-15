import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Divider as FluentDivider } from './divider.js';
import { DividerAlignContent, DividerAppearance, DividerOrientation, DividerRole } from './divider.options.js';

type DividerStoryArgs = Args & FluentDivider;
type DividerStoryMeta = Meta<DividerStoryArgs>;

const dividerTemplate = html<DividerStoryArgs>`
  <div>
    <fluent-divider
      align-content=${x => x.alignContent}
      appearance=${x => x.appearance}
      role=${x => x.role}
      ?inset=${x => x.inset}
      orientation=${x => x.orientation}
    >
      ${x => (x.content ? html`<h3>${x.content}</h3>` : '')}
    </fluent-divider>
  </div>
`;

const dividerSvgTemplate = html<DividerStoryArgs>`
  <div>
    <fluent-divider align-content="start" appearance="brand" role="presentation">
      <svg width="20px" height="20px" viewBox="0 0 32 33" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13 22.0312C13 21.479 12.5523 21.0312 12 21.0312C11.4477 21.0312 11 21.479 11 22.0312V25.0312C11 25.5835 11.4477 26.0312 12 26.0312C12.5523 26.0312 13 25.5835 13 25.0312V22.0312ZM16 15.0312C16.5523 15.0312 17 15.479 17 16.0312V25.0312C17 25.5835 16.5523 26.0312 16 26.0312C15.4477 26.0312 15 25.5835 15 25.0312V16.0312C15 15.479 15.4477 15.0312 16 15.0312ZM21 19.0312C21 18.479 20.5523 18.0312 20 18.0312C19.4477 18.0312 19 18.479 19 19.0312V25.0312C19 25.5835 19.4477 26.0312 20 26.0312C20.5523 26.0312 21 25.5835 21 25.0312V19.0312ZM5 5.03125C5 3.3744 6.34315 2.03125 8 2.03125H18.1716C18.9672 2.03125 19.7303 2.34732 20.2929 2.90993L26.1213 8.73836C26.6839 9.30097 27 10.064 27 10.8597V27.0312C27 28.6881 25.6569 30.0312 24 30.0312H8C6.34315 30.0312 5 28.6881 5 27.0312V5.03125ZM8 4.03125C7.44772 4.03125 7 4.47897 7 5.03125V27.0312C7 27.5835 7.44772 28.0312 8 28.0312H24C24.5523 28.0312 25 27.5835 25 27.0312V12.0312H20C18.3431 12.0312 17 10.6881 17 9.03125V4.03125H8ZM20 10.0312H24.5858L19 4.44546V9.03125C19 9.58353 19.4477 10.0312 20 10.0312Z"
          fill="currentColor"
        />
      </svg>
    </fluent-divider>
  </div>
`;

const dividerSvgVerticalTemplate = html<DividerStoryArgs>`
  <fluent-divider role=${x => x.role} ?inset=${x => x.inset} orientation="vertical">
    <svg width="20px" height="20px" viewBox="0 0 32 33" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13 22.0312C13 21.479 12.5523 21.0312 12 21.0312C11.4477 21.0312 11 21.479 11 22.0312V25.0312C11 25.5835 11.4477 26.0312 12 26.0312C12.5523 26.0312 13 25.5835 13 25.0312V22.0312ZM16 15.0312C16.5523 15.0312 17 15.479 17 16.0312V25.0312C17 25.5835 16.5523 26.0312 16 26.0312C15.4477 26.0312 15 25.5835 15 25.0312V16.0312C15 15.479 15.4477 15.0312 16 15.0312ZM21 19.0312C21 18.479 20.5523 18.0312 20 18.0312C19.4477 18.0312 19 18.479 19 19.0312V25.0312C19 25.5835 19.4477 26.0312 20 26.0312C20.5523 26.0312 21 25.5835 21 25.0312V19.0312ZM5 5.03125C5 3.3744 6.34315 2.03125 8 2.03125H18.1716C18.9672 2.03125 19.7303 2.34732 20.2929 2.90993L26.1213 8.73836C26.6839 9.30097 27 10.064 27 10.8597V27.0312C27 28.6881 25.6569 30.0312 24 30.0312H8C6.34315 30.0312 5 28.6881 5 27.0312V5.03125ZM8 4.03125C7.44772 4.03125 7 4.47897 7 5.03125V27.0312C7 27.5835 7.44772 28.0312 8 28.0312H24C24.5523 28.0312 25 27.5835 25 27.0312V12.0312H20C18.3431 12.0312 17 10.6881 17 9.03125V4.03125H8ZM20 10.0312H24.5858L19 4.44546V9.03125C19 9.58353 19.4477 10.0312 20 10.0312Z"
        fill="currentColor"
      />
    </svg>
  </fluent-divider>
`;

export default {
  title: 'Components/Divider',
  args: {
    content: 'Section One',
    alignContent: undefined,
    appearance: undefined,
    inset: false,
    orientation: undefined,
  },
  argTypes: {
    content: {
      description: 'HTML element wrapping text  (e.g. `<h3>Section One</h3>`), Image or SVG',
      table: {
        defaultValue: {
          summary: 'empty',
        },
      },
    },
    alignContent: {
      description: 'Align content',
      table: {
        type: {
          summary: 'Fluent v9. Determines the alignment of the content within the divider.',
        },
        defaultValue: {
          summary: 'undefined',
        },
      },
      options: Object.values(DividerAlignContent),
      control: {
        type: 'select',
      },
    },
    appearance: {
      description: 'Divider and text colors',
      table: {
        type: {
          summary: 'Fluent v9. A divider can have one of the preset appearances.',
        },
        defaultValue: {
          summary: 'undefined',
        },
      },
      options: Object.values(DividerAppearance),
      control: {
        type: 'select',
      },
    },
    role: {
      description: 'Set role attribute',
      table: {
        type: {
          summary: 'Inherited from FASTDivider. Aria role for the divider.',
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
      description: 'Pad the ends of divider',
      table: {
        type: {
          summary:
            'Type: boolean. Fluent v9. Divider layout is block for strict distinctions between items, or inset for closer relationships with neighboring content.',
        },
        defaultValue: {
          summary: false,
        },
      },
      control: 'boolean',
    },
    orientation: {
      description: 'Divider layout',
      table: {
        type: {
          summary:
            'Inherited from FASTDivider. Layout can be horizontal or vertical. Adds aria-orientation to component.',
        },
        defaultValue: {
          summary: undefined,
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

//
// Attribute Stories
//

export const Content = renderComponent(html<DividerStoryArgs>`
  <fluent-divider align-content="center">
    <em>Wrap your content in an element to render</em>
  </fluent-divider>
`);
export const AlignContent = renderComponent(html<DividerStoryArgs>`
  <div>
    <fluent-divider align-content="center"><div>center</div></fluent-divider>
    <fluent-divider align-content="start"><div>start</div></fluent-divider>
    <fluent-divider align-content="end"><div>end</div></fluent-divider>
  </div>
`);
export const Appearance = renderComponent(html<DividerStoryArgs>`
  <div>
    <fluent-divider appearance="strong"><div>strong</div></fluent-divider>
    <fluent-divider appearance="brand"><div>brand</div></fluent-divider>
    <fluent-divider appearance="subtle"><div>subtle</div></fluent-divider>
    <fluent-divider appearance="default"><div>default</div></fluent-divider>
  </div>
`);
export const Role = renderComponent(html<DividerStoryArgs>`
  <div>
    <fluent-divider role="separator"><div>separator</div></fluent-divider>
    <fluent-divider role="presentation"><div>presentation</div></fluent-divider>
  </div>
`);

// TODO: there is no visual difference between inset="true" and inset="false"
export const Inset = renderComponent(html<DividerStoryArgs>`
  <div>
    <fluent-divider inset><div>I'm inset from the edges</div></fluent-divider>
    <fluent-divider><div>Default</div></fluent-divider>
  </div>
`);
export const Orientation = renderComponent(html<DividerStoryArgs>`
  <div>
    <fluent-divider orientation="vertical"><div>vertical</div></fluent-divider>
    <br />
    <fluent-divider orientation="horizontal"><div>horizontal</div></fluent-divider>
  </div>
`);

//
// Extra stories - These stories are in addition to the story for each attribute.
//
export const DividerWithSvg = renderComponent(dividerSvgTemplate).bind({});
export const VerticalDividerWithSvg = renderComponent(dividerSvgVerticalTemplate).bind({});
