import * as React from 'react';
import { default as parse } from 'html-react-parser';
import { Steps } from 'storywright';
import { TabDefinition, TabsDefinition, TabPanelDefinition, FluentDesignSystem } from '@fluentui/web-components';
import { getStoryVariant, RTL } from '../../utilities/WCThemeDecorator.js';

TabDefinition.define(FluentDesignSystem.registry);
TabsDefinition.define(FluentDesignSystem.registry);
TabPanelDefinition.define(FluentDesignSystem.registry);

const secondTabId = 'second-tab-id';

const horizontalSteps = new Steps()
  .snapshot('normal', { cropTo: '.testWrapper' })
  .hover(`#${secondTabId}`)
  .snapshot('hover', { cropTo: '.testWrapper' })
  .click(`#${secondTabId}`)
  .snapshot('2nd tab click', { cropTo: '.testWrapper' })
  .keys(`#${secondTabId}`, 'ArrowRight')
  .snapshot('right arrow', { cropTo: '.testWrapper' })
  .end();

const verticalSteps = new Steps()
  .snapshot('normal', { cropTo: '.testWrapper' })
  .hover(`#${secondTabId}`)
  .snapshot('hover', { cropTo: '.testWrapper' })
  .click(`#${secondTabId}`)
  .snapshot('2nd tab click', { cropTo: '.testWrapper' })
  .keys(`#${secondTabId}`, 'ArrowDown')
  .snapshot('down arrow', { cropTo: '.testWrapper' })
  .end();

const appearanceSteps = new Steps()
  .snapshot('normal', { cropTo: '.testWrapper' })
  .hover(`#${secondTabId}`)
  .snapshot('hover', { cropTo: '.testWrapper' })
  .end();

export default {
  title: 'Tabs',
  decorators: [
    (story: () => React.ReactElement) => {
      return (
        <div className="testWrapper" style={{ width: '380px' }}>
          {story()}
        </div>
      );
    },
  ],
};

export const Navigation = () =>
  parse(`
  <fluent-tabs>
    <fluent-tab>First Tab</fluent-tab>
    <fluent-tab id="${secondTabId}">Second Tab</fluent-tab>
    <fluent-tab>Third Tab</fluent-tab>
    <fluent-tab>Fourth Tab</fluent-tab>

    <fluent-tab-panel>First Panel</fluent-tab-panel>
    <fluent-tab-panel>Second Panel</fluent-tab-panel>
    <fluent-tab-panel>Third Panel</fluent-tab-panel>
    <fluent-tab-panel>Fourth Panel</fluent-tab-panel>
  </fluent-tabs>
  `);
Navigation.parameters = {
  storyWright: {
    steps: horizontalSteps,
  },
};

export const NavigationRTL = getStoryVariant(Navigation, RTL);

export const NavigationVertical = () =>
  parse(`
  <fluent-tabs orientation="vertical">
    <fluent-tab>First Tab</fluent-tab>
    <fluent-tab id="${secondTabId}">Second Tab</fluent-tab>
    <fluent-tab>Third Tab</fluent-tab>
    <fluent-tab>Fourth Tab</fluent-tab>

    <fluent-tab-panel>First Panel</fluent-tab-panel>
    <fluent-tab-panel>Second Panel</fluent-tab-panel>
    <fluent-tab-panel>Third Panel</fluent-tab-panel>
    <fluent-tab-panel>Fourth Panel</fluent-tab-panel>
  </fluent-tabs>
  `);

Navigation.parameters = {
  storyWright: {
    steps: verticalSteps,
  },
};

export const NavigationOverDisabledItem = () =>
  parse(`
  <fluent-tabs>
    <fluent-tab>First Tab</fluent-tab>
    <fluent-tab id="${secondTabId}">Second Tab</fluent-tab>
    <fluent-tab disabled>Third Tab</fluent-tab>
    <fluent-tab>Fourth Tab</fluent-tab>

    <fluent-tab-panel>First Panel</fluent-tab-panel>
    <fluent-tab-panel>Second Panel</fluent-tab-panel>
    <fluent-tab-panel>Third Panel</fluent-tab-panel>
    <fluent-tab-panel>Fourth Panel</fluent-tab-panel>
  </fluent-tabs>
  `);
NavigationOverDisabledItem.parameters = {
  storyWright: {
    steps: horizontalSteps,
  },
};

export const AppearanceTransparent = () =>
  parse(`
  <fluent-tabs appearance="transparent">
    <fluent-tab>First Tab</fluent-tab>
    <fluent-tab id="${secondTabId}">Second Tab</fluent-tab>
    <fluent-tab>Third Tab</fluent-tab>
    <fluent-tab>Fourth Tab</fluent-tab>

    <fluent-tab-panel>First Panel</fluent-tab-panel>
    <fluent-tab-panel>Second Panel</fluent-tab-panel>
    <fluent-tab-panel>Third Panel</fluent-tab-panel>
    <fluent-tab-panel>Fourth Panel</fluent-tab-panel>
  </fluent-tabs>
  `);
AppearanceTransparent.parameters = {
  storyWright: {
    steps: appearanceSteps,
  },
};

export const AppearanceSubtle = () =>
  parse(`
  <fluent-tabs appearance="subtle">
    <fluent-tab>First Tab</fluent-tab>
    <fluent-tab id="${secondTabId}">Second Tab</fluent-tab>
    <fluent-tab>Third Tab</fluent-tab>
    <fluent-tab>Fourth Tab</fluent-tab>

    <fluent-tab-panel>First Panel</fluent-tab-panel>
    <fluent-tab-panel>Second Panel</fluent-tab-panel>
    <fluent-tab-panel>Third Panel</fluent-tab-panel>
    <fluent-tab-panel>Fourth Panel</fluent-tab-panel>
  </fluent-tabs>
  `);
AppearanceSubtle.parameters = {
  storyWright: {
    steps: appearanceSteps,
  },
};
