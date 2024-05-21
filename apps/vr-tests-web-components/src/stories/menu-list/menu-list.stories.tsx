import * as React from 'react';
import { default as parse } from 'html-react-parser';
import { Steps, StoryWright } from 'storywright';
import { MenuListDefinition, MenuItemDefinition, FluentDesignSystem } from '@fluentui/web-components';
import { DARK_MODE, getStoryVariant, RTL } from '../../utilities/WCThemeDecorator.js';

MenuListDefinition.define(FluentDesignSystem.registry);
MenuItemDefinition.define(FluentDesignSystem.registry);

const createDecorator =
  (steps: unknown[], wrapperStyle: React.CSSProperties = { width: '320px' }) =>
  (story: () => React.ReactElement) => {
    return (
      <StoryWright steps={steps}>
        <div className="testWrapper" style={wrapperStyle}>
          {story()}
        </div>
      </StoryWright>
    );
  };

const defaultSteps = new Steps()
  .snapshot('normal', { cropTo: '.testWrapper' })
  .hover('[role="menuitem"]')
  .snapshot('hover menuitem', { cropTo: '.testWrapper' })
  .end();

const checkboxSteps = new Steps()
  .snapshot('normal', { cropTo: '.testWrapper' })
  .click('[role="menuitemcheckbox"]')
  .snapshot('1st selected', { cropTo: '.testWrapper' })
  .click('[role="menuitemcheckbox"]:nth-of-type(2)')
  .snapshot('2nd selected', { cropTo: '.testWrapper' })
  .end();

const radioSteps = new Steps()
  .snapshot('normal', { cropTo: '.testWrapper' })
  .click('[role="menuitemradio"]')
  .snapshot('1st selected', { cropTo: '.testWrapper' })
  .click('[role="menuitemradio"]:nth-of-type(2)')
  .snapshot('2nd selected', { cropTo: '.testWrapper' })
  .end();

const submenuSteps = new Steps()
  .snapshot('normal', { cropTo: '.testWrapper' })
  .click('[aria-haspopup="menu"]')
  .snapshot('1st selected', { cropTo: '.testWrapper' })
  .click('[aria-haspopup="menu"]:nth-of-type(2)')
  .snapshot('2nd selected', { cropTo: '.testWrapper' })
  .end();

export default {
  title: 'MenuList',
};

const Cut20Filled = `<svg
  fill="currentColor"
  aria-hidden="true"
  width="20"
  height="20"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M14.88 3.16l-3.1 4.77-.9-1.38 2.74-4.2a.75.75 0 011.26.8zm-2.38 8.6a3.24 3.24 0 014.5 2.99 3.25 3.25 0 11-5.72-2.11L10 10.66l-1.28 1.98a3.25 3.25 0 11-1.21-.88l1.6-2.47-3.99-6.13a.75.75 0 011.26-.82l6.12 9.41zm.2 1.6a1.75 1.75 0 10.01-.02l-.02.02zM6.24 13a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5z"
    fill="currentColor"
  ></path>
</svg>`;

const Edit20Filled = `<svg
  fill="currentColor"
  aria-hidden="true"
  width="20"
  height="20"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M12.92 2.87a2.97 2.97 0 014.2 4.21l-.66.67-4.2-4.2.66-.68zm-1.38 1.38l-8 8c-.32.33-.55.74-.65 1.2l-.88 3.94a.5.5 0 00.6.6l3.92-.87c.47-.1.9-.34 1.24-.68l7.98-7.98-4.2-4.21z"
    fill="currentColor"
  ></path>
</svg>`;

export const Default = () =>
  parse(`
  <fluent-menu-list>
    <fluent-menu-item>Cut</fluent-menu-item>
    <fluent-menu-item>Edit</fluent-menu-item>
    <fluent-menu-item>Paste</fluent-menu-item>
  </fluent-menu-list>
`);
Default.decorators = [createDecorator(defaultSteps)];

export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);
export const DefaultRTL = getStoryVariant(Default, RTL);

export const Checkbox = () =>
  parse(`
    <fluent-menu-list>
      <fluent-menu-item role="menuitemcheckbox"> Item 1 </fluent-menu-item>
      <fluent-menu-item role="menuitemcheckbox"> Item 2 </fluent-menu-item>
      <fluent-menu-item role="menuitemcheckbox"> Item 3 </fluent-menu-item>
    </fluent-menu-list>
  `);
Checkbox.decorators = [createDecorator(checkboxSteps)];
export const CheckboxDarkMode = getStoryVariant(Checkbox, DARK_MODE);
export const CheckboxRTL = getStoryVariant(Checkbox, RTL);

export const Radio = () =>
  parse(`
    <fluent-menu-list>
      <fluent-menu-item role="menuitemradio"> Item 1 </fluent-menu-item>
      <fluent-menu-item role="menuitemradio"> Item 2 </fluent-menu-item>
      <fluent-menu-item role="menuitemradio"> Item 3 </fluent-menu-item>
    </fluent-menu-list>
  `);
Radio.decorators = [createDecorator(radioSteps)];
export const RadioDarkMode = getStoryVariant(Radio, DARK_MODE);
export const RadioRTL = getStoryVariant(Radio, RTL);

export const WithIcons = () =>
  parse(`
    <fluent-menu-list>
      <fluent-menu-item> Item 1 </fluent-menu-item>
      <fluent-menu-item>
        Edit
        <span slot="start">${Edit20Filled}</span>
      </fluent-menu-item>
      <fluent-menu-item>
        <span slot="start">${Cut20Filled}</span>
        Cut
      </fluent-menu-item>
    </fluent-menu-list>
`);
WithIcons.decorators = [createDecorator(defaultSteps)];

export const CheckboxWithIcons = () =>
  parse(`
    <fluent-menu-list>
      <fluent-menu-item role="menuitemcheckbox"> Item 1 </fluent-menu-item>
      <fluent-menu-item role="menuitemcheckbox">
        Edit
        <span slot="start">${Edit20Filled}</span>
      </fluent-menu-item>
      <fluent-menu-item role="menuitemcheckbox">
        <span slot="start">${Cut20Filled}</span>
        Cut
      </fluent-menu-item>
    </fluent-menu-list>
`);
CheckboxWithIcons.decorators = [createDecorator(checkboxSteps)];
export const CheckboxWithIconsRTL = getStoryVariant(CheckboxWithIcons, RTL);

export const RadioWithIcons = () =>
  parse(`
    <fluent-menu-list>
      <fluent-menu-item role="menuitemradio"> Item 1 </fluent-menu-item>
      <fluent-menu-item role="menuitemradio">
        Edit
        <span slot="start">${Edit20Filled}</span>
      </fluent-menu-item>
      <fluent-menu-item role="menuitemradio">
        <span slot="start">${Cut20Filled}</span>
        Cut
      </fluent-menu-item>
    </fluent-menu-list>
`);
RadioWithIcons.decorators = [createDecorator(radioSteps)];
export const RadioWithIconsRTL = getStoryVariant(RadioWithIcons, RTL);

export const WithSubmenu = () =>
  parse(`
    <fluent-menu-list>
      <fluent-menu-item>
        Item 1
        <fluent-menu-list slot="submenu">
          <fluent-menu-item> Subitem 1.1 </fluent-menu-item>
          <fluent-menu-item> Subitem 1.2 </fluent-menu-item>
        </fluent-menu-list>
      </fluent-menu-item>
      <fluent-menu-item>
        Item 2
        <fluent-menu-list slot="submenu">
          <fluent-menu-item> Subitem 2.1 </fluent-menu-item>
          <fluent-menu-item> Subitem 2.2 </fluent-menu-item>
        </fluent-menu-list>
      </fluent-menu-item>
      <fluent-menu-item>Item 3</fluent-menu-item>
    </fluent-menu-list>
`);
WithSubmenu.decorators = [createDecorator(submenuSteps, { width: '500px', padding: '20px 0' })];

export const WithSubmenuDarkMode = getStoryVariant(WithSubmenu, DARK_MODE);
export const WithSubmenuRLT = getStoryVariant(WithSubmenu, RTL);
