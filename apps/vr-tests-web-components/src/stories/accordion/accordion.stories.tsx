import * as React from 'react';
import { default as parse } from 'html-react-parser';
import { Steps, StoryWright } from 'storywright';
import { accordionDefinition, accordionItemDefinition, FluentDesignSystem } from '@fluentui/web-components';
import { DARK_MODE, getStoryVariant, RTL } from '../../utilities/WCThemeDecorator.js';

accordionDefinition.define(FluentDesignSystem.registry);
accordionItemDefinition.define(FluentDesignSystem.registry);

export default {
  title: 'Accordion',
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

const add20Filled = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M10.5 2.75C10.5 2.33579 10.1642 2 9.75 2C9.33579 2 9 2.33579 9 2.75V9H2.75C2.33579 9 2 9.33579 2 9.75C2 10.1642 2.33579 10.5 2.75 10.5H9V16.75C9 17.1642 9.33579 17.5 9.75 17.5C10.1642 17.5 10.5 17.1642 10.5 16.75V10.5H16.75C17.1642 10.5 17.5 10.1642 17.5 9.75C17.5 9.33579 17.1642 9 16.75 9H10.5V2.75Z"
    fill="#212121"
  />
</svg>`;
const subtract20Filled = `<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect x="3" y="9.25" width="14" height="1.5" rx="0.75" fill="#212121" />
</svg>`;

export const Size = () =>
  parse(`
    <fluent-accordion>
      <fluent-accordion-item expanded size="small">
        <span slot="heading">Small</span>
        Small Panel
      </fluent-accordion-item>
      <fluent-accordion-item expanded size="medium">
        <span slot="heading">Medium</span>
        Medium Panel
      </fluent-accordion-item>
      <fluent-accordion-item expanded size="large">
        <span slot="heading">Large</span>
        Large Panel
      </fluent-accordion-item>
      <fluent-accordion-item expanded size="extra-large">
        <span slot="heading">Extra Large</span>
        Extra Large Panel
      </fluent-accordion-item>
    </fluent-accordion>
  `);

export const SizeRTL = getStoryVariant(Size, RTL);
export const SizeDarkMode = getStoryVariant(Size, DARK_MODE);

export const ExpandIconPositionEnd = () =>
  parse(`
  <fluent-accordion openItems={[0]}>
    <fluent-accordion-item expanded expand-icon-position="end">
      <span slot="heading">Opened</span>
      Visible Panel
    </fluent-accordion-item>
    <fluent-accordion-item expand-icon-position="end">
      <span slot="heading">Closed</span>
      Hidden Panel
    </fluent-accordion-item>
  </fluent-accordion>
`);

export const ExpandIconPositionEndRTL = getStoryVariant(ExpandIconPositionEnd, RTL);
export const ExpandIconPositionEndDarkMode = getStoryVariant(ExpandIconPositionEnd, DARK_MODE);

export const AccordionWithCustomIcons = () =>
  parse(`
  <fluent-accordion>
    <fluent-accordion-item>
      <span slot="collapsed-icon">${add20Filled}</span>
      <span slot="expanded-icon">${subtract20Filled}</span>
      <span slot="heading">Accordion Header 1</span>
      Accordion Panel 1
    </fluent-accordion-item>
    <fluent-accordion-item>
      <span slot="collapsed-icon">${add20Filled}</span>
      <span slot="expanded-icon">${subtract20Filled}</span>
      <span slot="heading">Accordion Header 2</span>
      Accordion Panel 1
    </fluent-accordion-item>
    <fluent-accordion-item>
      <span slot="collapsed-icon">${add20Filled}</span>
      <span slot="expanded-icon">${subtract20Filled}</span>
      <span slot="heading">Accordion Header 3</span>
      Accordion Panel 1
    </fluent-accordion-item>
  </fluent-accordion>
`);

export const AccordionWithCustomIconsRTL = getStoryVariant(AccordionWithCustomIcons, RTL);
export const AccordionWithCustomIconsDarkMode = getStoryVariant(AccordionWithCustomIcons, DARK_MODE);

export const Disabled = () =>
  parse(`
  <fluent-accordion>
    <fluent-accordion-item disabled expanded>
      <span slot="heading">Disabled Item Opened</span>
      Disabled Item Opened Panel
    </fluent-accordion-item>
    <fluent-accordion-item disabled>
      <span slot="heading">Disabled Item Closed</span>
      Disabled Item Closed Panel
    </fluent-accordion-item>
  </fluent-accordion>
`);

export const DisabledRTL = getStoryVariant(Disabled, RTL);
export const DisabledDarkMode = getStoryVariant(Disabled, DARK_MODE);
