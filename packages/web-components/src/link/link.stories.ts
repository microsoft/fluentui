import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { fontFamilyBase, fontSizeBase300 } from '../theme/design-tokens.js';
import { renderComponent } from '../helpers.stories.js';
import type { Link as FluentLink } from './link.js';
import { LinkAppearance } from './link.options.js';
import './define.js';

type LinkStoryArgs = Args & FluentLink;
type LinkStoryMeta = Meta<LinkStoryArgs>;

const storyTemplate = html<LinkStoryArgs>`
  <fluent-link
    href="${x => x.href}"
    appearance="${x => x.appearance}"
    ?disabled="${x => x.disabled}"
    ?disabled-focusable="${x => x.disabledFocusable}"
  >
    ${x => x.content}
  </fluent-link>
`;

export default {
  title: 'Components/Link',
  args: {
    content: 'This is a link',
    href: '#',
    disabled: false,
    disabledFocusable: false,
  },
  argTypes: {
    appearance: {
      options: Object.values(LinkAppearance),
      control: {
        type: 'select',
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        type: {
          summary: 'Sets the disabled state of the component',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    disabledFocusable: {
      control: 'boolean',
      table: {
        type: {
          summary: 'The component is disabled but still focusable',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    href: {
      control: 'text',
    },
    content: {
      control: 'Anchor text',
    },
  },
} as LinkStoryMeta;

export const Link = renderComponent(storyTemplate).bind({});

export const Appearance = renderComponent(html<LinkStoryArgs>`
  <fluent-link href="#">Default</fluent-link>
  <fluent-link href="#" appearance="subtle">Subtle</fluent-link>
`);

export const Inline = renderComponent(html<LinkStoryArgs>`
  <style>
    p {
      font-family: ${fontFamilyBase};
      font-size: ${fontSizeBase300};
    }
  </style>
  <p>This is a <fluent-link inline href="#">Fluent link</fluent-link> inline with text</p>
`);

export const Disabled = renderComponent(html<LinkStoryArgs>`
  <fluent-link href="#" disabled>Disabled</fluent-link>
  <fluent-link href="#" appearance="subtle" disabled>Subtle disabled</fluent-link>
`);

export const DisabledFocusabled = renderComponent(html<LinkStoryArgs>`
  <fluent-link href="#" disabled-focusable>Disabled focusable</fluent-link>
  <fluent-link href="#" appearance="subtle" disabled-focusable>Subtle disabled focusable</fluent-link>
`);
