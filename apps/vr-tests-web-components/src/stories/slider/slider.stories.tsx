import * as React from 'react';
import { default as parse } from 'html-react-parser';
import { Steps, StoryWright, Keys } from 'storywright';
import { SliderDefinition, FluentDesignSystem } from '@fluentui/web-components';
import { DARK_MODE, getStoryVariant, RTL } from '../../utilities/WCThemeDecorator.js';

SliderDefinition.define(FluentDesignSystem.registry);

export default {
  title: 'Slider',
  decorators: [
    (story: () => React.ReactElement) => {
      return (
        <StoryWright
          steps={new Steps()
            .snapshot('normal', { cropTo: '.testWrapper' })
            .focus('[role="slider"]')
            .keys('[role="slider"]', Keys.rightArrow)
            .snapshot('rightArrow', { cropTo: '.testWrapper' })
            .end()}
        >
          <div className="testWrapper" style={{ width: '300px' }}>
            {story()}
          </div>
        </StoryWright>
      );
    },
  ],
};

export const Default = () =>
  parse(`
  <fluent-slider></fluent-slider>
`);

export const DefaultRTL = getStoryVariant(Default, RTL);
export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);

export const Vertical = () =>
  parse(`
  <fluent-slider orientation="vertical"></fluent-slider>
`);

export const SizeSmall = () =>
  parse(`
  <fluent-slider size="small"></fluent-slider>
`);

export const SizeMedium = () =>
  parse(`
  <fluent-slider size="medium"></fluent-slider>
`);

export const SliderSteps = () =>
  parse(`
  <fluent-slider step="10" value="10" min="0" max="100"></fluent-slider>
`);

export const SliderStepsVertical = () =>
  parse(`
  <fluent-slider step="10" value="10" min="0" max="100" orientation="vertical"></fluent-slider>
`);

export const Disabled = () =>
  parse(`
  <fluent-slider disabled></fluent-slider>
`);

export const DisabledDarkMode = getStoryVariant(Disabled, DARK_MODE);
