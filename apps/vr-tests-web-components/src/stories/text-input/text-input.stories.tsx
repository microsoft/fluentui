import * as React from 'react';
import { default as parse } from 'html-react-parser';
import { Steps, StoryWright } from 'storywright';
import { TextInputDefinition, LabelDefinition, FluentDesignSystem } from '@fluentui/web-components';
import { tokens } from '@fluentui/tokens';
import { DARK_MODE, getStoryVariant, RTL } from '../../utilities/WCThemeDecorator.js';

TextInputDefinition.define(FluentDesignSystem.registry);
LabelDefinition.define(FluentDesignSystem.registry);

export default {
  title: 'TextInput',
  decorators: [
    (story: () => React.ReactElement) => {
      return (
        <StoryWright steps={new Steps().snapshot('normal', { cropTo: '.testWrapper' }).end()}>
          <div className="testWrapper" style={{ width: '320px' }}>
            {story()}
          </div>
        </StoryWright>
      );
    },
  ],
};
const Person20Regular = `<svg
  fill="currentColor"
  aria-hidden="true"
  width="1em"
  height="1em"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M10 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM7 6a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-2 5a2 2 0 0 0-2 2c0 1.7.83 2.97 2.13 3.8A9.14 9.14 0 0 0 10 18c1.85 0 3.58-.39 4.87-1.2A4.35 4.35 0 0 0 17 13a2 2 0 0 0-2-2H5Zm-1 2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1c0 1.3-.62 2.28-1.67 2.95A8.16 8.16 0 0 1 10 17a8.16 8.16 0 0 1-4.33-1.05A3.36 3.36 0 0 1 4 13Z"
    fill="currentColor"
  ></path>
</svg>`;

export const Default = () =>
  parse(`
  <fluent-text-input><fluent-label>Sample Input</fluent-label></fluent-text-input>
  `);

export const ContentStart = () =>
  parse(`
<fluent-text-input>
  <span slot="start">${Person20Regular}</span>
  <fluent-label>Content Start</fluent-label>
</fluent-text-input>
`);
export const ContentStartDarkMode = getStoryVariant(ContentStart, DARK_MODE);
export const ContentStartRTL = getStoryVariant(ContentStart, RTL);

export const ContentEnd = () =>
  parse(`
<fluent-text-input>
  <span slot="end">${Person20Regular}</span>
  <fluent-label>Content End</fluent-label>
</fluent-text-input>
`);
export const ContentEndDarkMode = getStoryVariant(ContentEnd, DARK_MODE);
export const ContentEndRTL = getStoryVariant(ContentEnd, RTL);

export const ContentStartEnd = () =>
  parse(`
<fluent-text-input>
  <fluent-text slot="start" size="400"><span>$</span></fluent-text>
  <fluent-text slot="end" size="400"><span>.00</span></fluent-text>
  <fluent-label>Content Before + After</fluent-label>
</fluent-text-input>
`);
export const ContentStartEndDarkMode = getStoryVariant(ContentStartEnd, DARK_MODE);
export const ContentStartEndRTL = getStoryVariant(ContentStartEnd, RTL);

export const Placeholder = () =>
  parse(`
  <fluent-text-input placeholder="This is a placeholder">
    <span slot="end">${Person20Regular}</span>
    <fluent-label>Input with a placeholder</fluent-label>
  </fluent-text-input>
`);
export const PlaceholderDarkMode = getStoryVariant(Placeholder, DARK_MODE);

export const Disabled = () =>
  parse(`
  <fluent-text-input disabled>
    <span slot="end">${Person20Regular}</span>
    <fluent-label>Disabled Input</fluent-label>
  </fluent-text-input>
`);
export const DisabledDarkMode = getStoryVariant(Disabled, DARK_MODE);

export const Required = () =>
  parse(`
  <fluent-text-input required>
    <span slot="end">${Person20Regular}</span>
    <fluent-label>Required Input</fluent-label>
  </fluent-text-input>
`);
export const RequiredDarkMode = getStoryVariant(Required, DARK_MODE);

export const AppearanceOutline = () =>
  parse(`
<fluent-text-input appearance="outline">
  <span slot="start">${Person20Regular}</span>
  <fluent-label>Outline (default) Input</fluent-label>
</fluent-text-input>
`);

export const AppearanceOutlineDarkMode = getStoryVariant(AppearanceOutline, DARK_MODE);

export const AppearanceUnderline = () =>
  parse(`
<fluent-text-input appearance="underline">
  <span slot="start">${Person20Regular}</span>
  <fluent-label>Underlined Input</fluent-label>
</fluent-text-input>
`);

export const AppearanceUnderlineDarkMode = getStoryVariant(AppearanceUnderline, DARK_MODE);

export const AppearanceFilledLighter = () =>
  parse(`
<div style="padding: 10px; background: ${tokens.colorNeutralBackgroundInverted}">
  <fluent-text-input appearance="filled-lighter">
    <span slot="start">${Person20Regular}</span>
    <fluent-label style="color: ${tokens.colorNeutralForegroundInverted2}">Filled Lighter Input</fluent-label>
  </fluent-text-input>
</div>
`);

export const AppearanceFilledLighterDarkMode = getStoryVariant(AppearanceFilledLighter, DARK_MODE);

export const AppearanceFilledDarker = () =>
  parse(`
<div style="padding: 10px; background: ${tokens.colorNeutralBackgroundInverted}">
  <fluent-text-input appearance="filled-darker">
    <span slot="start">${Person20Regular}</span>
    <fluent-label style="color: ${tokens.colorNeutralForegroundInverted2}">Filled Darker Input</fluent-label>
  </fluent-text-input>
</div>
`);

export const AppearanceFilledDarkerDarkMode = getStoryVariant(AppearanceFilledDarker, DARK_MODE);

export const SizeSmall = () =>
  parse(`
<fluent-text-input control-size="small">
  <span slot="end">${Person20Regular}</span>
  <fluent-label size="small">Small Input</fluent-label>
</fluent-text-input>
`);

export const SizeMedium = () =>
  parse(`
<fluent-text-input control-size="medium">
  <span slot="end">${Person20Regular}</span>
  <fluent-label>Medium (default) Input</fluent-label>
</fluent-text-input>
`);

export const SizeLarge = () =>
  parse(`
<fluent-text-input control-size="large">
  <span slot="end">${Person20Regular}</span>
  <fluent-label size="large">Large Input</fluent-label>
</fluent-text-input>
`);

export const Inline = () =>
  parse(`
<span
  >This is
  <fluent-text-input
    style="display: inline-flex; align-items: center;"
    placeholder="inline text input"
  ></fluent-text-input>
with a paragraph of text.</span>
`);
