import * as React from 'react';
import { default as parse } from 'html-react-parser';
import { Steps, StoryWright } from 'storywright';
import { SwitchDefinition, FluentDesignSystem } from '@fluentui/web-components';
import { DARK_MODE, getStoryVariant, RTL } from '../../utilities/WCThemeDecorator.js';

SwitchDefinition.define(FluentDesignSystem.registry);

const controlId = 'switch-id';

export default {
  title: 'Switch',
  decorators: [
    (story: () => React.ReactElement) => {
      return (
        <StoryWright
          steps={new Steps()
            .snapshot('normal', { cropTo: '.testWrapper' })
            .hover(`#${controlId}`)
            .snapshot('hover', { cropTo: '.testWrapper' })
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
  <fluent-switch id="${controlId}">Default</fluent-switch>
  `);

export const DefaultDark = getStoryVariant(Default, DARK_MODE);
export const DefaultRTL = getStoryVariant(Default, RTL);

export const Checked = () =>
  parse(`
  <fluent-switch id="${controlId}" checked>Checked</fluent-switch>
  `);

export const CheckedDark = getStoryVariant(Checked, DARK_MODE);
export const CheckedRTL = getStoryVariant(Checked, RTL);

export const Disabled = () =>
  parse(`
  <fluent-switch id="${controlId}" disabled>Disabled</fluent-switch>
  `);

export const DisabledDark = getStoryVariant(Disabled, DARK_MODE);
export const DisabledRTL = getStoryVariant(Disabled, RTL);

export const DisabledChecked = () =>
  parse(`
  <fluent-switch id="${controlId}" disabled checked>Disabled checked</fluent-switch>
  `);

export const DisabledCheckedDark = getStoryVariant(DisabledChecked, DARK_MODE);
