import * as React from 'react';
import { default as parse } from 'html-react-parser';
import { Steps, StoryWright } from 'storywright';
import { CheckboxDefinition, FluentDesignSystem } from '@fluentui/web-components';
import { DARK_MODE, getStoryVariant } from '../../utilities/WCThemeDecorator.js';

CheckboxDefinition.define(FluentDesignSystem.registry);

export default {
  title: 'Checkbox',
  decorators: [
    (story: () => React.ReactElement) => {
      return (
        <StoryWright
          steps={new Steps()
            .snapshot('normal', { cropTo: '.testWrapper' })
            .executeScript(
              'document.getElementsByTagName("fluent-checkbox").forEach(checkbox => checkbox.indeterminate = true)',
            )
            .snapshot('indeterminate', { cropTo: '.testWrapper' })
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

export const Indeterminate = () =>
  parse(`
  <fluent-checkbox indeterminate>Indeterminate</fluent-checkbox>
  `);

export const IndeterminateDarkMode = getStoryVariant(Indeterminate, DARK_MODE);

export const CircularIndeterminate = () =>
  parse(`
  <fluent-checkbox shape="circular" indeterminate>CircularIndeterminate</fluent-checkbox>
  `);

export const CircularIndeterminateDarkMode = getStoryVariant(CircularIndeterminate, DARK_MODE);
