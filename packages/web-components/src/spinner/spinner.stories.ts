import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import { SpinnerAppearance, SpinnerSize } from './spinner.options.js';

type SpinnerStoryArgs = Args;
type SpinnerStoryMeta = Meta<SpinnerStoryArgs>;

const storyTemplate = html<SpinnerStoryArgs>`
  <fluent-spinner appearance=${x => x.appearance} size=${x => x.size}></fluent-spinner>
`;

export default {
  title: 'Components/Spinner',
  argTypes: {
    appearance: {
      description: 'The appearance of the spinner',
      table: {
        defaultValue: { summary: 'primary' },
      },
      control: {
        type: 'select',
        options: Object.values(SpinnerAppearance),
      },
      defaultValue: 'primary',
    },
    size: {
      description: 'The size of the spinner',
      table: {
        defaultValue: { summary: 'medium' },
      },
      control: {
        type: 'select',
        options: Object.values(SpinnerSize),
      },
      defaultValue: 'medium',
    },
  },
  parameters: {
    status: {
      type: 'experimental',
    },
  },
} as SpinnerStoryMeta;

export const Spinner = renderComponent(storyTemplate).bind({});

//
// Attribute stories
//

export const Appearance = renderComponent(html<SpinnerStoryArgs>`
  <div>
    <div style="padding: 20px; display: flex; align-items: center; gap: 20px;">
      <code>primary</code>
      <fluent-spinner appearance="primary"></fluent-spinner>
    </div>
    <div
      style="padding: 20px; background-color: var(--colorNeutralBackgroundInverted); color: var(--colorNeutralForegroundInverted); display: flex; align-items: center; gap: 20px;"
    >
      <code>inverted</code>
      <fluent-spinner appearance="inverted" size="medium"></fluent-spinner>
    </div>
  </div>
`);

export const Size = renderComponent(html<SpinnerStoryArgs>`
  <div style="display: grid; align-items: center; gap: 0 20px; grid-template-columns: 120px min-content;">
    <code>tiny</code>
    <fluent-spinner size="tiny"></fluent-spinner>
    <code>extra-small</code>
    <fluent-spinner size="extra-small"></fluent-spinner>
    <code>small</code>
    <fluent-spinner size="small"></fluent-spinner>
    <code>medium</code>
    <fluent-spinner size="medium"></fluent-spinner>
    <code>large</code>
    <fluent-spinner size="large"></fluent-spinner>
    <code>extra-large</code>
    <fluent-spinner size="extra-large"></fluent-spinner>
    <code>huge</code>
    <fluent-spinner size="huge"></fluent-spinner>
  </div>
`);
