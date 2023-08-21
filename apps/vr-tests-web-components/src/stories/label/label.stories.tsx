import * as React from 'react';
import { default as parse } from 'html-react-parser';
import { Steps, StoryWright } from 'storywright';
import { LabelDefinition, FluentDesignSystem } from '@fluentui/web-components';
import { DARK_MODE, getStoryVariant, RTL } from '../../utilities/WCThemeDecorator.js';

LabelDefinition.define(FluentDesignSystem.registry);

export default {
  title: 'Label',
  decorators: [
    (story: () => React.ReactElement) => {
      return (
        <StoryWright steps={new Steps().snapshot('normal', { cropTo: '.testWrapper' }).end()}>
          <div className="testWrapper" style={{ width: '300px' }}>
            {story()}
          </div>
        </StoryWright>
      );
    },
  ],
};

export const Default = () => parse(`<fluent-label>Default</fluent-label>`);
export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);

export const SizeSmall = () => parse(`<fluent-label size="small">Small</fluent-label>`);
export const SizeMedium = () => parse(`<fluent-label size="medium">Medium</fluent-label>`);
export const SizeLarge = () => parse(`<fluent-label size="large">Large</fluent-label>`);

export const WeightRegular = () => parse(`<fluent-label weight="regular">Regular</fluent-label>`);
export const WeightSemibold = () => parse(`<fluent-label weight="semibold">Semibold</fluent-label>`);

export const Required = () => parse(`<fluent-label required>Required</fluent-label>`);
export const RequiredDarkMode = getStoryVariant(Required, DARK_MODE);
export const RequiredRTL = getStoryVariant(Required, RTL);

export const Disabled = () => parse(`<fluent-label disabled>Disabled</fluent-label>`);
export const DisabledDarkMode = getStoryVariant(Disabled, DARK_MODE);
