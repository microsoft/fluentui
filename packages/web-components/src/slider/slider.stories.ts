import addons from '@storybook/addons';
import { STORY_RENDERED } from '@storybook/core-events';
import { Slider as FoundationSlider } from '@microsoft/fast-foundation';
import Examples from './fixtures/slider.html';
import './index';

function valueTextFormatter(value: string): string {
  return `${value} degrees celsius`;
}

addons.getChannel().addListener(STORY_RENDERED, (name: string) => {
  if (name.toLowerCase().endsWith('slider')) {
    ['switcher', 'switcher2', 'slider1'].forEach(x => {
      const slider = document.getElementById(x) as FoundationSlider;
      slider.valueTextFormatter = valueTextFormatter;
    });
  }
});

export default {
  title: 'Slider',
};

export const Slider = () => Examples;
