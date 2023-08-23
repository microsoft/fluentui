import * as React from 'react';
import { default as parse } from 'html-react-parser';
import { Steps, StoryWright } from 'storywright';
import { ButtonDefinition, FluentDesignSystem } from '@fluentui/web-components';
import { DARK_MODE, getStoryVariant, RTL } from '../../utilities/WCThemeDecorator.js';

ButtonDefinition.define(FluentDesignSystem.registry);

const buttonId = 'button-id';

const steps = new Steps()
  .snapshot('default', { cropTo: '.testWrapper' })
  .hover(`#${buttonId}`)
  .snapshot('hover', { cropTo: '.testWrapper' })
  .mouseDown(`#${buttonId}`)
  .snapshot('pressed', { cropTo: '.testWrapper' })
  .end();

export default {
  title: 'Button',
  decorators: [
    (story: () => React.ReactElement) => {
      return (
        <StoryWright steps={steps}>
          <div className="testWrapper" style={{ width: '300px' }}>
            {story()}
          </div>
        </StoryWright>
      );
    },
  ],
};

export const Default = () => parse(`<fluent-button id="${buttonId}">Default</fluent-button>`);

export const Primary = () =>
  parse(`<fluent-button id="${buttonId}" appearance="primary" id="${buttonId}">Primary</fluent-button>`);
export const PrimaryDarkMode = getStoryVariant(Primary, DARK_MODE);
export const PrimaryDisabled = () =>
  parse(`<fluent-button id="${buttonId}" disabled appearance="primary" id="${buttonId}">Primary</fluent-button>`);
export const PrimaryDisabledDarkMode = getStoryVariant(PrimaryDisabled, DARK_MODE);
export const PrimaryDisabledFocusable = () =>
  parse(
    `<fluent-button id="${buttonId}" disabled-focusable appearance="primary" id="${buttonId}">Primary</fluent-button>`,
  );
export const PrimaryDisabledFocusableDarkMode = getStoryVariant(PrimaryDisabledFocusable, DARK_MODE);

export const Outline = () =>
  parse(`<fluent-button id="${buttonId}" appearance="outline" id="${buttonId}">Outline</fluent-button>`);
export const OutlineDarkMode = getStoryVariant(Outline, DARK_MODE);
export const OutlineDisabled = () =>
  parse(`<fluent-button id="${buttonId}" disabled appearance="outline" id="${buttonId}">Outline</fluent-button>`);
export const OutlineDisabledDarkMode = getStoryVariant(OutlineDisabled, DARK_MODE);
export const OutlineDisabledFocusable = () =>
  parse(
    `<fluent-button id="${buttonId}" disabled-focusable appearance="outline" id="${buttonId}">Outline</fluent-button>`,
  );
export const OutlineDisabledFocusableDarkMode = getStoryVariant(OutlineDisabledFocusable, DARK_MODE);

export const Subtle = () =>
  parse(`<fluent-button id="${buttonId}" appearance="subtle" id="${buttonId}">Subtle</fluent-button>`);
export const SubtleDarkMode = getStoryVariant(Subtle, DARK_MODE);
export const SubtleDisabled = () =>
  parse(`<fluent-button id="${buttonId}" disabled appearance="subtle" id="${buttonId}">Subtle</fluent-button>`);
export const SubtleDisabledDarkMode = getStoryVariant(SubtleDisabled, DARK_MODE);
export const SubtleDisabledFocusable = () =>
  parse(
    `<fluent-button id="${buttonId}" disabled-focusable appearance="subtle" id="${buttonId}">Subtle</fluent-button>`,
  );
export const SubtleDisabledFocusableDarkMode = getStoryVariant(SubtleDisabledFocusable, DARK_MODE);

export const Transparent = () =>
  parse(`<fluent-button id="${buttonId}" appearance="transparent" id="${buttonId}">Transparent</fluent-button>`);
export const TransparentDarkMode = getStoryVariant(Transparent, DARK_MODE);
export const TransparentDisabled = () =>
  parse(
    `<fluent-button id="${buttonId}" disabled appearance="transparent" id="${buttonId}">Transparent</fluent-button>`,
  );
export const TransparentDisabledDarkMode = getStoryVariant(TransparentDisabled, DARK_MODE);
export const TransparentDisabledFocusable = () =>
  parse(
    `<fluent-button id="${buttonId}" disabled-focusable appearance="transparent" id="${buttonId}">Transparent</fluent-button>`,
  );
export const TransparentDisabledFocusableDarkMode = getStoryVariant(TransparentDisabledFocusable, DARK_MODE);

export const Rounded = () => parse(`<fluent-button id="${buttonId}" shape="rounded">Rounded</fluent-button>`);
export const Circular = () => parse(`<fluent-button id="${buttonId}" shape="circular">Circular</fluent-button>`);
export const Square = () => parse(`<fluent-button id="${buttonId}" shape="square">Square</fluent-button>`);

const icon: (slot?: 'start' | undefined) => string = slot => `<svg
      fill="currentColor"
      aria-hidden="true"
      width="1em"
      height="1em"
      ${slot !== undefined ? `slot="${slot}"` : ''}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5 3A2.5 2.5 0 0117 5.5v9a2.5 2.5 0 01-2.5 2.5h-9A2.5 2.5 0 013 14.5v-9A2.5 2.5 0 015.5 3h9zm0 1h-9C4.67 4 4 4.67 4 5.5v9c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-9c0-.83-.67-1.5-1.5-1.5zM7 11a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zM7 7a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2z"
        fill="currentColor"
      ></path></svg
  >`;

export const Small = () => parse(`<fluent-button id="${buttonId}" size="small">Small</fluent-button>`);
export const SmallWithIcon = () =>
  parse(`<fluent-button icon id="${buttonId}" size="small">${icon('start')} Small with calendar icon</fluent-button>`);
export const SmallWithIconDarkMode = getStoryVariant(SmallWithIcon, DARK_MODE);
export const SmallWithIconRTL = getStoryVariant(SmallWithIcon, RTL);

export const SmallIconOnly = () =>
  parse(`<fluent-button icon-only id="${buttonId}" size="small">${icon()}</fluent-button>`);
export const SmallIconOnlyDarkMode = getStoryVariant(SmallIconOnly, DARK_MODE);

export const Medium = () => parse(`<fluent-button id="${buttonId}" size="medium">Medium</fluent-button>`);
export const MediumWithIcon = () =>
  parse(
    `<fluent-button icon id="${buttonId}" size="medium">${icon('start')} Medium with calendar icon</fluent-button>`,
  );
export const MediumWithIconDarkMode = getStoryVariant(MediumWithIcon, DARK_MODE);
export const MediumWithIconRTL = getStoryVariant(MediumWithIcon, RTL);

export const MediumIconOnly = () =>
  parse(`<fluent-button icon-only id="${buttonId}" size="medium">${icon()}</fluent-button>`);
export const MediumIconOnlyDarkMode = getStoryVariant(MediumIconOnly, DARK_MODE);

export const Large = () => parse(`<fluent-button id="${buttonId}" size="large">Large</fluent-button>`);
export const LargeWithIcon = () =>
  parse(`<fluent-button icon id="${buttonId}" size="large">${icon('start')} Large with calendar icon</fluent-button>`);
export const LargeWithIconDarkMode = getStoryVariant(LargeWithIcon, DARK_MODE);
export const LargeWithIconRTL = getStoryVariant(LargeWithIcon, RTL);

export const LargeIconOnly = () =>
  parse(`<fluent-button icon-only id="${buttonId}" size="large">${icon()}</fluent-button>`);
export const LargeIconOnlyDarkMode = getStoryVariant(LargeIconOnly, DARK_MODE);

export const WithLongText = () =>
  parse(`
  <style>
    .max-width {
      width: 280px;
    }
  </style>
  <fluent-button id="${buttonId}" class="max-width">Long text wraps after it hits the max width of the component</fluent-button>
`);

export const WithLongTextRTL = getStoryVariant(WithLongText, RTL);
