import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { PaneSwitcher } from './pane-switcher.js';
import './define.js';
import '../pane/define.js';
import '../button/define.js';
import '../label/define.js';
import '../text-input/define.js';
import '../radio-group/define.js';
import '../radio/define.js';
import '../switch/define.js';
import '../pane-settings-item/define.js';

type PaneSwitcherStoryArgs = Args & PaneSwitcher;
type PaneSwitcherStoryMeta = Meta<PaneSwitcherStoryArgs>;

const settings16Regular = html`<svg
  fill="currentColor"
  aria-hidden="true"
  width="20"
  height="20"
  viewBox="0 0 16 16"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M8 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM7 8a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm3.62-3.6a.7.7 0 0 1-.83-.57l-.26-1.42a.35.35 0 0 0-.27-.28 6.07 6.07 0 0 0-2.52 0 .35.35 0 0 0-.27.29L6.2 3.83a.71.71 0 0 1-.94.54l-1.36-.49a.36.36 0 0 0-.38.1c-.57.63-1 1.37-1.26 2.17-.05.14 0 .29.1.38l1.1.93a.7.7 0 0 1 0 1.08l-1.1.93c-.1.1-.15.24-.1.38.26.8.69 1.54 1.26 2.17.1.1.25.14.38.1l1.36-.49a.7.7 0 0 1 .94.54l.26 1.41c.02.15.13.26.27.29a6.07 6.07 0 0 0 2.52 0 .35.35 0 0 0 .27-.29l.26-1.41a.71.71 0 0 1 .94-.54l1.36.49c.13.04.28 0 .38-.1.57-.63 1-1.37 1.26-2.17a.35.35 0 0 0-.1-.38l-1.1-.93a.7.7 0 0 1 0-1.08l1.1-.93c.1-.1.15-.24.1-.38-.26-.8-.69-1.54-1.26-2.17a.36.36 0 0 0-.38-.1l-1.36.49a.71.71 0 0 1-.11.03ZM4 4.98l.94.33a1.71 1.71 0 0 0 2.25-1.3l.18-.97a5.1 5.1 0 0 1 1.26 0l.18.97a1.7 1.7 0 0 0 2.25 1.3l.94-.33c.26.33.47.7.63 1.08l-.75.64a1.7 1.7 0 0 0 0 2.6l.75.64c-.16.39-.37.75-.63 1.08l-.94-.33a1.7 1.7 0 0 0-2.25 1.3l-.18.97a5.1 5.1 0 0 1-1.26 0l-.18-.97a1.7 1.7 0 0 0-2.25-1.3l-.94.33c-.26-.33-.47-.7-.63-1.08l.75-.64a1.7 1.7 0 0 0 0-2.6l-.75-.64c.16-.39.37-.75.63-1.08Z"
    fill="currentColor"
  ></path>
</svg>`;

const dismissed16Regular = html`
  <svg
    fill="currentColor"
    aria-hidden="true"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m2.59 2.72.06-.07a.5.5 0 0 1 .63-.06l.07.06L8 7.29l4.65-4.64a.5.5 0 0 1 .7.7L8.71 8l4.64 4.65c.18.17.2.44.06.63l-.06.07a.5.5 0 0 1-.63.06l-.07-.06L8 8.71l-4.65 4.64a.5.5 0 0 1-.7-.7L7.29 8 2.65 3.35a.5.5 0 0 1-.06-.63l.06-.07-.06.07Z"
      fill="currentColor"
    ></path>
  </svg>
`;

const storyTemplate = html<PaneSwitcherStoryArgs>`
  <div>
    <style>
      div.docs-story > div:first-child {
        height: 32em;
        padding: 0;
      }
      .sbdocs-content {
        max-width: 1200px;
      }
      .toolbar-button {
        background: transparent;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2px;
      }
    </style>
    <div style="height: 32em; transform: scale(1); overflow-y: hidden; overflow-x: hidden;">
      <fluent-pane-switcher>

        <fluent-button bind-id="pane1" icon-only slot="toggle-buttons">${settings16Regular}</fluent-button>
        <fluent-pane bind-id="pane1" trap-focus id="one" position="right" trap-focus control-size="small">
          <span slot="close-icon">${dismissed16Regular}</span>
          <fluent-text slot="header">Pane 1</fluent-text>
          <div>
            <fluent-label>First Name</fluent-label>
            <fluent-text-input id="abc" type="text"></fluent-text-input>
            <fluent-button>Click me</fluent-button>
          </div>
        </fluent-pane>

        <fluent-button bind-id="pane2" icon-only slot="toggle-buttons">${dismissed16Regular}</fluent-button>
        <fluent-pane bind-id="pane2" position="right" trap-focus toolbar>
          <span slot="close-icon">${dismissed16Regular}</span>
          <fluent-text slot="header">Pane 2</fluent-text>
        </fluent-pane>

        <fluent-button bind-id="pane3" icon-only slot="toggle-buttons">${dismissed16Regular}</fluent-button>
        <fluent-pane bind-id="pane3" position="right" trap-focus control-size="small">
          <span slot="close-icon">${dismissed16Regular}</span>
          <fluent-text slot="header">Pane 3</fluent-text>
        </fluent-pane>
        
        <fluent-button bind-id="pane4" icon-only slot="toggle-buttons">${dismissed16Regular}</fluent-button>
        <fluent-pane bind-id="pane4" position="right" trap-focus>
           <span slot="close-icon" appearance="transparent" icon-only>${dismissed16Regular}</fluent-button>
           <fluent-text slot="header">Pane 4</fluent-text>
        </fluent-pane>

        <fluent-button icon-only slot="toggle-buttons">${settings16Regular}</fluent-button>
        <fluent-pane id="settings" position="right" trap-focus control-size="small" compact>

          <span slot="header" block weight="bold">Customize Pane Switcher</span>
          <span slot="subheader" block weight="bold">Panes</span>
          <span slot="close-icon">${dismissed16Regular}</span>

          <fluent-pane-settings-item bind-id="pane1">
            <span slot="icon">${settings16Regular}</span>
            <fluent-text slot="header" block weight="bold"><span>Pane 1</span></fluent-text>
            <fluent-text slot="body" weight="regular" size="300" as="p">
              A short description in which Pane 1 is described.
              </fluent-text>
          </fluent-pane-settings-item>

          <fluent-pane-settings-item bind-id="pane2">
            <fluent-text slot="header" weight="bold" size="700" as="h3">Pane 2</fluent-text>
            <fluent-text slot="body" weight="regular" size="300" as="p">
              A short description in which Pane 2 is described.
            </fluent-text>
          </fluent-pane-settings-item>

          <fluent-pane-settings-item bind-id="pane3">
            <fluent-text slot="header" weight="bold" size="700" as="h3">Pane 3</fluent-text>
            <fluent-text slot="body" weight="regular" size="300" as="p"
              >A short description in which Pane 3 is described.</fluent-text
            >
          </fluent-pane-settings-item>

          <fluent-pane-settings-item bind-id="pane4">
            <fluent-text slot="header" weight="bold" size="700" as="h3">Pane 4</fluent-text>
            <fluent-text slot="body" weight="regular" size="300" as="p">
              A short description in which Pane 4 is described.
            </fluent-text>
          </fluent-pane-settings-item>
        </fluent-pane>
      </fluent-pane-switcher>
    </div>
  </div>
`;

export default {
  title: 'Components/PaneSwitcher',
  args: {},
} as PaneSwitcherStoryMeta;

export const Default = renderComponent(storyTemplate).bind({});
