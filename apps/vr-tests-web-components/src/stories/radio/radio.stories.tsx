import * as React from 'react';
import { default as parse } from 'html-react-parser';
import { Steps, StoryWright } from 'storywright';
import { RadioDefinition, FluentDesignSystem } from '@fluentui/web-components';
import { DARK_MODE, getStoryVariant } from '../../utilities/WCThemeDecorator.js';

RadioDefinition.define(FluentDesignSystem.registry);
export default {
  title: 'Radio',
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
  <fluent-radio value="pear">Pear</fluent-radio>
`);
export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);

export const Checked = () =>
  parse(`
  <fluent-radio checked value="pear">Pear</fluent-radio>
`);

export const CheckedDarkMode = getStoryVariant(Checked, DARK_MODE);

export const Disabled = () =>
  parse(`
  <fluent-radio disabled value="pear">Pear</fluent-radio>
`);

export const DisabledDarkMode = getStoryVariant(Disabled, DARK_MODE);

export const DisabledChecked = () =>
  parse(`
  <fluent-radio disabled checked value="pear">Pear</fluent-radio>
`);

export const DisabledCheckedDarkMode = getStoryVariant(DisabledChecked, DARK_MODE);
