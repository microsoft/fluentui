import * as React from 'react';
import { default as parse } from 'html-react-parser';
import { Steps, StoryWright } from 'storywright';
import { CheckboxDefinition, FluentDesignSystem } from '@fluentui/web-components';
import { DARK_MODE, getStoryVariant, RTL } from '../../utilities/WCThemeDecorator.js';

CheckboxDefinition.define(FluentDesignSystem.registry);

export default {
  title: 'Checkbox',
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

export const Default = () =>
  parse(`
  <fluent-checkbox>Default</fluent-checkbox>
  `);

export const DefaultRTL = getStoryVariant(Default, RTL);
export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);

export const Checked = () =>
  parse(`
  <fluent-checkbox checked>Checked</fluent-checkbox>
  `);
export const CheckedDarkMode = getStoryVariant(Checked, DARK_MODE);

export const Disabled = () =>
  parse(`
  <fluent-checkbox disabled>Disabled</fluent-checkbox>
  `);
export const DisabledDarkMode = getStoryVariant(Disabled, DARK_MODE);

export const DisabledChecked = () =>
  parse(`
  <fluent-checkbox disabled checked>Disabled checked</fluent-checkbox>
  `);
export const DisabledCheckedDarkMode = getStoryVariant(DisabledChecked, DARK_MODE);

export const Circular = () =>
  parse(`
  <fluent-checkbox shape="circular">Circular</fluent-checkbox>
  `);

export const CircularRTL = getStoryVariant(Circular, RTL);
export const CircularDarkMode = getStoryVariant(Circular, DARK_MODE);

export const CircularChecked = () =>
  parse(`
  <fluent-checkbox shape="circular" checked>CircularChecked</fluent-checkbox>
  `);
export const CircularCheckedDarkMode = getStoryVariant(CircularChecked, DARK_MODE);

export const CircularDisabled = () =>
  parse(`
  <fluent-checkbox shape="circular" disabled>CircularDisabled</fluent-checkbox>
  `);
export const CircularDisabledDarkMode = getStoryVariant(CircularDisabled, DARK_MODE);

export const CircularDisabledChecked = () =>
  parse(`
  <fluent-checkbox shape="circular" disabled checked>CircularDisabled checked</fluent-checkbox>
  `);
export const CircularDisabledCheckedDarkMode = getStoryVariant(CircularDisabledChecked, DARK_MODE);
