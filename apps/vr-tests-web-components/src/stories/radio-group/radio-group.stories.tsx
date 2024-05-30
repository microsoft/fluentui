import * as React from 'react';
import { default as parse } from 'html-react-parser';
import { Steps, StoryWright } from 'storywright';
import { RadioDefinition, RadioGroupDefinition, FluentDesignSystem } from '@fluentui/web-components';
import { DARK_MODE, getStoryVariant, RTL } from '../../utilities/WCThemeDecorator.js';

RadioDefinition.define(FluentDesignSystem.registry);
RadioGroupDefinition.define(FluentDesignSystem.registry);

export default {
  title: 'RadioGroup',
  decorators: [
    (story: () => React.ReactElement) => {
      return (
        <StoryWright
          steps={new Steps()
            .snapshot('normal', { cropTo: '.testWrapper' })
            .click('[role="radio"]:first-child')
            .snapshot('1st selected', { cropTo: '.testWrapper' })
            .click('[role="radio"]:nth-child(2)')
            .snapshot('2nd selected', { cropTo: '.testWrapper' })
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
<fluent-radio-group>
  <fluent-radio value="pear">Pear</fluent-radio>
  <fluent-radio value="banana">Banana</fluent-radio>
  <fluent-radio value="orange">Orange</fluent-radio>
</fluent-radio-group>`);

export const DefaultRTL = getStoryVariant(Default, RTL);
export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);

export const Vertical = () =>
  parse(`
<fluent-radio-group orientation="vertical">
  <fluent-radio value="pear">Pear</fluent-radio>
  <fluent-radio value="banana">Banana</fluent-radio>
  <fluent-radio value="orange">Orange</fluent-radio>
</fluent-radio-group>`);

export const VerticalRTL = getStoryVariant(Vertical, RTL);

export const Horizontal = () =>
  parse(`
<fluent-radio-group orientation="horizontal">
  <fluent-radio value="pear">Pear</fluent-radio>
  <fluent-radio value="banana">Banana</fluent-radio>
  <fluent-radio value="orange">Orange</fluent-radio>
</fluent-radio-group>`);

export const HorizontalStacked = () =>
  parse(`
<fluent-radio-group orientation="horizontal" stacked>
  <fluent-radio value="pear">Pear</fluent-radio>
  <fluent-radio value="banana">Banana</fluent-radio>
  <fluent-radio value="orange">Orange</fluent-radio>
</fluent-radio-group>`);

export const HorizontalStackedRTL = getStoryVariant(HorizontalStacked, RTL);

export const DefaultChecked = () =>
  parse(`
<fluent-radio-group>
  <fluent-radio value="pear">Pear</fluent-radio>
  <fluent-radio value="banana" checked>Banana</fluent-radio>
  <fluent-radio value="orange">Orange</fluent-radio>
</fluent-radio-group>`);

export const Disabled = () =>
  parse(`
<fluent-radio-group disabled>
  <fluent-radio value="pear">Pear</fluent-radio>
  <fluent-radio value="banana">Banana</fluent-radio>
  <fluent-radio value="orange">Orange</fluent-radio>
</fluent-radio-group>`);

export const DisabledDarkMode = getStoryVariant(Disabled, DARK_MODE);

export const DisabledItem = () =>
  parse(`
<fluent-radio-group>
  <fluent-radio value="pear">Pear</fluent-radio>
  <fluent-radio value="banana" disabled>Banana</fluent-radio>
  <fluent-radio value="orange">Orange</fluent-radio>
</fluent-radio-group>`);

export const DisabledItemDarkMode = getStoryVariant(DisabledItem, DARK_MODE);
