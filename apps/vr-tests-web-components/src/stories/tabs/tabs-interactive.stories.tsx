import * as React from 'react';
import { default as parse } from 'html-react-parser';
import { Steps, StoryWright } from 'storywright';
import { TabDefinition, TabsDefinition, TabPanelDefinition, FluentDesignSystem } from '@fluentui/web-components';
import { getStoryVariant, RTL } from '../../utilities/WCThemeDecorator.js';

TabDefinition.define(FluentDesignSystem.registry);
TabsDefinition.define(FluentDesignSystem.registry);
TabPanelDefinition.define(FluentDesignSystem.registry);

const secondTabId = 'second-tab-id';

const createDecorator =
  (steps: unknown[], wrapperStyle: React.CSSProperties = { width: '380px' }) =>
  (story: () => React.ReactElement) => {
    return (
      <StoryWright steps={steps}>
        <div className="testWrapper" style={wrapperStyle}>
          {story()}
        </div>
      </StoryWright>
    );
  };

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
Navigation.decorators = [createDecorator(horizontalSteps)];

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

Navigation.decorators = [createDecorator(verticalSteps)];

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
NavigationOverDisabledItem.decorators = [createDecorator(horizontalSteps)];

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
AppearanceTransparent.decorators = [createDecorator(appearanceSteps)];

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
AppearanceSubtle.decorators = [createDecorator(appearanceSteps)];
