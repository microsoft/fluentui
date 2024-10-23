import * as React from 'react';
import { default as parse } from 'html-react-parser';
import { Steps, StoryWright } from 'storywright';
import { ProgressBarDefinition, FluentDesignSystem } from '@fluentui/web-components';
import { DARK_MODE, getStoryVariant, RTL } from '../../utilities/WCThemeDecorator.js';

ProgressBarDefinition.define(FluentDesignSystem.registry);

export default {
  title: 'ProgressBar',
  decorators: [
    (story: () => React.ReactElement) => {
      return (
        <StoryWright steps={new Steps().snapshot('normal', { cropTo: '.testWrapper' }).end()}>
          <div className="testWrapper" style={{ width: '300px', padding: '1em 0' }}>
            {story()}
          </div>
        </StoryWright>
      );
    },
  ],
};

export const Default = () =>
  parse(
    `<code>3/10</code><fluent-progress-bar value="3" aria-valuenow="3" max="10" aria-valuemax="10"></fluent-progress-bar>`,
  );

export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);
export const DefaultRTL = getStoryVariant(Default, RTL);

export const Value0 = () =>
  parse(`<code>0</code><fluent-progress-bar value="0" aria-valuenow="0"></fluent-progress-bar>`);
export const Value25 = () =>
  parse(`<code>25</code><fluent-progress-bar value="25" aria-valuenow="25"></fluent-progress-bar>`);
export const Value50 = () =>
  parse(`<code>50</code><fluent-progress-bar value="50" aria-valuenow="50"></fluent-progress-bar>`);
export const Value75 = () =>
  parse(`<code>75</code><fluent-progress-bar value="75" aria-valuenow="75"></fluent-progress-bar>`);
export const Value100 = () =>
  parse(`<code>100</code><fluent-progress-bar value="100" aria-valuenow="100"></fluent-progress-bar>`);

export const ThicknessMedium = () =>
  parse(`<fluent-progress-bar value="50" thickness="medium" aria-valuenow="50"></fluent-progress-bar>`);
export const ThicknessLarge = () =>
  parse(`<fluent-progress-bar value="50" thickness="large" aria-valuenow="50"></fluent-progress-bar>`);

export const ShapeRounded = () =>
  parse(`<fluent-progress-bar value="50" shape="rounded" aria-valuenow="50"></fluent-progress-bar>`);
export const ShapeSquare = () =>
  parse(`<fluent-progress-bar value="50" shape="square" aria-valuenow="50"></fluent-progress-bar>`);

export const ValidationStateSuccess = () =>
  parse(`<fluent-progress-bar value="50" validation-state="success" aria-valuenow="50"></fluent-progress-bar>`);
export const ValidationStateSuccessDarkMode = getStoryVariant(ValidationStateSuccess, DARK_MODE);

export const ValidationStateWarning = () =>
  parse(`<fluent-progress-bar value="50" validation-state="warning" aria-valuenow="50"></fluent-progress-bar>`);
export const ValidationStateWarningDarkMode = getStoryVariant(ValidationStateWarning, DARK_MODE);

export const ValidationStateError = () =>
  parse(`<fluent-progress-bar value="50" validation-state="error" aria-valuenow="50"></fluent-progress-bar>`);
export const ValidationStateErrorDarkMode = getStoryVariant(ValidationStateError, DARK_MODE);
