import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Radio as FluentRadio } from './radio.js';
import './define.js';
import '../radio-group/define.js';

type RadioStoryArgs = Args & FluentRadio;
type RadioStoryMeta = Meta<RadioStoryArgs>;

const storyTemplate = html<RadioStoryArgs>`
  <fluent-radio-group role="radiogroup" name="radio-story">
    <fluent-radio value="option1">Label</fluent-radio>
    <fluent-radio value="option2">Label 2</fluent-radio>
  </fluent-radio-group>
`;

export default {
  title: 'Components/Radio',
  args: {},
  argTypes: {},
} as RadioStoryMeta;

export const Radio = renderComponent(storyTemplate).bind({});
