import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Select as FluentSelect } from './select.js';
import './define.js';

type SelectStoryArgs = Args & FluentSelect;
type SelectStoryMeta = Meta<SelectStoryArgs>;

const storyTemplate = html<SelectStoryArgs>`
  <fluent-select></fluent-slider>
`;

export default {
  title: 'Components/Select',
} as SelectStoryMeta;

export const Select = renderComponent(storyTemplate).bind({});
