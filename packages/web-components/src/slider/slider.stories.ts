import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Slider as FluentSlider } from './slider.js';
import './define.js';

type SliderStoryArgs = Args & FluentSlider;
type SliderStoryMeta = Meta<SliderStoryArgs>;

const storyTemplate = html<SliderStoryArgs>` <fluent-slider min=${x => x.max} max=${x => x.max}></fluent-slider> `;

export default {
  title: 'Components/Slider',
} as SliderStoryMeta;

export const Slider = renderComponent(storyTemplate).bind({});

export const SliderVertical = renderComponent(html<SliderStoryArgs>`
  <fluent-slider min="0" max="100"></fluent-progress-bar>
`);
