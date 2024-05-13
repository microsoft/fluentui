import * as React from 'react';
import { default as parse } from 'html-react-parser';
import { Steps, StoryWright } from 'storywright';
import { BadgeDefinition, FluentDesignSystem } from '@fluentui/web-components';
import { DARK_MODE, getStoryVariant } from '../../utilities/WCThemeDecorator.js';

BadgeDefinition.define(FluentDesignSystem.registry);

export default {
  title: 'Badge',
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
  <fluent-badge></fluent-badge>
  `);

export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);

export const Appearance = () =>
  parse(`
  <fluent-badge appearance="filled">filled</fluent-badge>
  <fluent-badge appearance="ghost">ghost</fluent-badge>
  <fluent-badge appearance="outline">outline</fluent-badge>
  <fluent-badge appearance="tint">tint</fluent-badge>
`);

export const AppearanceDarkMode = getStoryVariant(Appearance, DARK_MODE);

export const Color = () =>
  parse(`
  <fluent-badge color="brand">brand</fluent-badge>
  <fluent-badge color="danger">danger</fluent-badge>
  <fluent-badge color="important">important</fluent-badge>
  <fluent-badge color="informative">informative</fluent-badge>
  <fluent-badge color="severe">severe</fluent-badge>
  <fluent-badge color="subtle">subtle</fluent-badge>
  <fluent-badge color="success">success</fluent-badge>
  <fluent-badge color="warning">warning</fluent-badge>
`);

export const ColorDarkMode = getStoryVariant(Color, DARK_MODE);

export const Shape = () =>
  parse(`
  <fluent-badge shape="circular"></fluent-badge>
  <fluent-badge shape="rounded"></fluent-badge>
  <fluent-badge shape="square"></fluent-badge>
`);

export const ShapeDarkMode = getStoryVariant(Shape, DARK_MODE);

export const Size = () =>
  parse(`
  <fluent-badge size="tiny"></fluent-badge>
  <fluent-badge size="extra-small"></fluent-badge>
  <fluent-badge size="small"></fluent-badge>
  <fluent-badge size="medium"></fluent-badge>
  <fluent-badge size="large"></fluent-badge>
  <fluent-badge size="extra-large"></fluent-badge>
`);

export const SizeDarkMode = getStoryVariant(Size, DARK_MODE);
