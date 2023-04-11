import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { ListboxOption as FluentOption } from './option.js';
import './define.js';

type OptionStoryArgs = Args & FluentOption;
type OptionStoryMeta = Meta<OptionStoryArgs>;

const optionTemplate = html<OptionStoryArgs>`
  <div>
    <fluent-option>Hello</fluent-option>
  </div>
`;

export default {
  title: 'Components/Option',
  args: {},
  argTypes: {},
} as OptionStoryMeta;

export const Option = renderComponent(optionTemplate).bind({});
