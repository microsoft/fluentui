import * as React from 'react';
import { default as parse } from 'html-react-parser';
import { Steps, StoryWright } from 'storywright';
import { TabDefinition, TabsDefinition, TabPanelDefinition, FluentDesignSystem } from '@fluentui/web-components';
import { DARK_MODE, getStoryVariant, RTL } from '../../utilities/WCThemeDecorator.js';

TabDefinition.define(FluentDesignSystem.registry);
TabsDefinition.define(FluentDesignSystem.registry);
TabPanelDefinition.define(FluentDesignSystem.registry);

export default {
  title: 'Tabs',
  decorators: [
    (story: () => React.ReactElement) => {
      return (
        <StoryWright steps={new Steps().snapshot('normal', { cropTo: '.testWrapper' }).end()}>
          <div className="testWrapper" style={{ width: '380px' }}>
            {story()}
          </div>
        </StoryWright>
      );
    },
  ],
};

export const Default = () =>
  parse(`
  <fluent-tabs>
    <fluent-tab>First Tab</fluent-tab>
    <fluent-tab>Second Tab</fluent-tab>
    <fluent-tab>Third Tab</fluent-tab>
    <fluent-tab>Fourth Tab</fluent-tab>

    <fluent-tab-panel>First Panel</fluent-tab-panel>
    <fluent-tab-panel>Second Panel</fluent-tab-panel>
    <fluent-tab-panel>Third Panel</fluent-tab-panel>
    <fluent-tab-panel>Fourth Panel</fluent-tab-panel>
  </fluent-tabs>
  `);

export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);
export const DefaultRTL = getStoryVariant(Default, RTL);

export const Horizontal = () =>
  parse(`
  <fluent-tabs orientation="horizontal">
    <fluent-tab>First Tab</fluent-tab>
    <fluent-tab>Second Tab</fluent-tab>
    <fluent-tab>Third Tab</fluent-tab>
    <fluent-tab>Fourth Tab</fluent-tab>

    <fluent-tab-panel>First Panel</fluent-tab-panel>
    <fluent-tab-panel>Second Panel</fluent-tab-panel>
    <fluent-tab-panel>Third Panel</fluent-tab-panel>
    <fluent-tab-panel>Fourth Panel</fluent-tab-panel>
  </fluent-tabs>
  `);

export const Vertical = () =>
  parse(`
  <fluent-tabs orientation="vertical">
    <fluent-tab>First Tab</fluent-tab>
    <fluent-tab>Second Tab</fluent-tab>
    <fluent-tab>Third Tab</fluent-tab>
    <fluent-tab>Fourth Tab</fluent-tab>

    <fluent-tab-panel>First Panel</fluent-tab-panel>
    <fluent-tab-panel>Second Panel</fluent-tab-panel>
    <fluent-tab-panel>Third Panel</fluent-tab-panel>
    <fluent-tab-panel>Fourth Panel</fluent-tab-panel>
  </fluent-tabs>
  `);

export const Disabled = () =>
  parse(`
  <fluent-tabs disabled>
    <fluent-tab>First Tab</fluent-tab>
    <fluent-tab>Second Tab</fluent-tab>
    <fluent-tab>Third Tab</fluent-tab>
    <fluent-tab>Fourth Tab</fluent-tab>

    <fluent-tab-panel>First Panel</fluent-tab-panel>
    <fluent-tab-panel>Second Panel</fluent-tab-panel>
    <fluent-tab-panel>Third Panel</fluent-tab-panel>
    <fluent-tab-panel>Fourth Panel</fluent-tab-panel>
  </fluent-tabs>
  `);

export const DisabledDarkMode = getStoryVariant(Disabled, DARK_MODE);

export const SizeSmall = () =>
  parse(`
  <fluent-tabs size="small">
    <fluent-tab>First Tab</fluent-tab>
    <fluent-tab>Second Tab</fluent-tab>
    <fluent-tab>Third Tab</fluent-tab>
    <fluent-tab>Fourth Tab</fluent-tab>

    <fluent-tab-panel>First Panel</fluent-tab-panel>
    <fluent-tab-panel>Second Panel</fluent-tab-panel>
    <fluent-tab-panel>Third Panel</fluent-tab-panel>
    <fluent-tab-panel>Fourth Panel</fluent-tab-panel>
  </fluent-tabs>
  `);
export const SizeSmallDarkMode = getStoryVariant(SizeSmall, DARK_MODE);

export const SizeSmallVertical = () =>
  parse(`
  <fluent-tabs size="small" orientation="vertical">
    <fluent-tab>First Tab</fluent-tab>
    <fluent-tab>Second Tab</fluent-tab>
    <fluent-tab>Third Tab</fluent-tab>
    <fluent-tab>Fourth Tab</fluent-tab>

    <fluent-tab-panel>First Panel</fluent-tab-panel>
    <fluent-tab-panel>Second Panel</fluent-tab-panel>
    <fluent-tab-panel>Third Panel</fluent-tab-panel>
    <fluent-tab-panel>Fourth Panel</fluent-tab-panel>
  </fluent-tabs>
  `);
export const SizeSmallVerticalDarkMode = getStoryVariant(SizeSmallVertical, DARK_MODE);

export const SizeMedium = () =>
  parse(`
  <fluent-tabs size="medium">
    <fluent-tab>First Tab</fluent-tab>
    <fluent-tab>Second Tab</fluent-tab>
    <fluent-tab>Third Tab</fluent-tab>
    <fluent-tab>Fourth Tab</fluent-tab>

    <fluent-tab-panel>First Panel</fluent-tab-panel>
    <fluent-tab-panel>Second Panel</fluent-tab-panel>
    <fluent-tab-panel>Third Panel</fluent-tab-panel>
    <fluent-tab-panel>Fourth Panel</fluent-tab-panel>
  </fluent-tabs>
  `);
export const SizeMediumDarkMode = getStoryVariant(SizeMedium, DARK_MODE);

export const SizeMediumVertical = () =>
  parse(`
  <fluent-tabs size="medium" orientation="vertical">
    <fluent-tab>First Tab</fluent-tab>
    <fluent-tab>Second Tab</fluent-tab>
    <fluent-tab>Third Tab</fluent-tab>
    <fluent-tab>Fourth Tab</fluent-tab>

    <fluent-tab-panel>First Panel</fluent-tab-panel>
    <fluent-tab-panel>Second Panel</fluent-tab-panel>
    <fluent-tab-panel>Third Panel</fluent-tab-panel>
    <fluent-tab-panel>Fourth Panel</fluent-tab-panel>
  </fluent-tabs>
  `);
export const SizeMediumVerticalDarkMode = getStoryVariant(SizeMediumVertical, DARK_MODE);

export const SizeLarge = () =>
  parse(`
  <fluent-tabs size="large">
    <fluent-tab>First Tab</fluent-tab>
    <fluent-tab>Second Tab</fluent-tab>
    <fluent-tab>Third Tab</fluent-tab>
    <fluent-tab>Fourth Tab</fluent-tab>

    <fluent-tab-panel>First Panel</fluent-tab-panel>
    <fluent-tab-panel>Second Panel</fluent-tab-panel>
    <fluent-tab-panel>Third Panel</fluent-tab-panel>
    <fluent-tab-panel>Fourth Panel</fluent-tab-panel>
  </fluent-tabs>
  `);
export const SizeLargeDarkMode = getStoryVariant(SizeLarge, DARK_MODE);

export const SizeLargeVertical = () =>
  parse(`
  <fluent-tabs size="large" orientation="vertical">
    <fluent-tab>First Tab</fluent-tab>
    <fluent-tab>Second Tab</fluent-tab>
    <fluent-tab>Third Tab</fluent-tab>
    <fluent-tab>Fourth Tab</fluent-tab>

    <fluent-tab-panel>First Panel</fluent-tab-panel>
    <fluent-tab-panel>Second Panel</fluent-tab-panel>
    <fluent-tab-panel>Third Panel</fluent-tab-panel>
    <fluent-tab-panel>Fourth Panel</fluent-tab-panel>
  </fluent-tabs>
  `);
export const SizeLargeVerticalDarkMode = getStoryVariant(SizeLargeVertical, DARK_MODE);
