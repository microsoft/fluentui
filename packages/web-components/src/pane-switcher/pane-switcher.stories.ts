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

const settings20Regular = html`<svg
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

const animalDog20regular = html` <svg
  fill="currentColor"
  aria-hidden="true"
  width="20"
  height="20"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M10.77 2.4c.42-.3.9-.4 1.23-.4h1.45c.45 0 .9.12 1.28.36l1.78 1.07c.3.18.49.5.49.85V5.5c0 .83-.67 1.5-1.5 1.5H15v8.04c.42.06.84.22 1.2.51.5.43.8 1.08.8 1.95a.5.5 0 0 1-.5.5H5a3 3 0 0 1-1.8-5.4.5.5 0 0 1 .6.8A2 2 0 0 0 5 17c.29 0 .47-.07.59-.15.12-.08.21-.2.28-.32A1.34 1.34 0 0 0 6 16v-.05a4.69 4.69 0 0 1 .03-.5c.04-.33.1-.8.23-1.32.27-1.05.8-2.4 1.89-3.48C9.99 8.8 10 6.33 10 5.5V4c0-.76.33-1.29.77-1.6Zm.15 4.5a7.51 7.51 0 0 1-2.07 4.45 6.47 6.47 0 0 0-1.61 3.02 8.33 8.33 0 0 0-.24 1.6v.06a1.78 1.78 0 0 1-.03.29 2.34 2.34 0 0 1-.22.68h6.17c-.1-.32-.3-.65-.65-.83-.19-.1-.44-.17-.77-.17h-1a.5.5 0 0 1 0-1h1c.18 0 .34.01.5.04V12.5a.5.5 0 0 1 1 0v2.95c.58.42.85 1.04.95 1.55h2a1.2 1.2 0 0 0-.4-.68A1.64 1.64 0 0 0 14.5 16a.5.5 0 0 1-.5-.5v-9c0-.28.22-.5.5-.5h1a.5.5 0 0 0 .5-.5V4.28l-1.78-1.07a1.5 1.5 0 0 0-.77-.21H12c-.17 0-.44.06-.65.2-.18.14-.35.36-.35.8v1.5c0 .09.03.23.1.33.06.08.16.17.4.17.24 0 .34-.09.4-.17.07-.1.1-.24.1-.33a.5.5 0 0 1 1 0c0 .25-.07.6-.3.92-.24.33-.64.58-1.2.58-.22 0-.4-.04-.58-.1ZM7 16h-.5Z"
    fill="currentColor"
  ></path>
</svg>`;

const animalTurtle20Regular = html` <svg
  fill="currentColor"
  aria-hidden="true"
  width="20"
  height="20"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M9.1 4c-1.47 0-2.5.55-3.21 1.38a7.5 7.5 0 0 0-1.36 2.77L4.27 9H2.5a.5.5 0 0 0-.5.5c0 1.08.5 2.1 1.3 2.63l-.44 1.07a1.31 1.31 0 0 0 1.2 1.81h1.47c.5 0 .97-.3 1.19-.75l.47-1c1.31.18 2.64.18 3.95 0l.48 1c.21.46.67.75 1.18.75h1.45a1.31 1.31 0 0 0 1.21-1.8l-.5-1.21h1.7c.68 0 1.34-.52 1.34-1.26V10c0-1.14-.99-2-2.12-2H13.8a6.9 6.9 0 0 0-1.4-2.63A4.28 4.28 0 0 0 9.1 4Zm5.57 7-.57-2h1.78c.66 0 1.12.49 1.12 1v.74c0 .09-.11.26-.33.26h-2Zm-.57 1.53.44 1.05a.31.31 0 0 1-.29.43H12.8a.31.31 0 0 1-.28-.18l-.35-.75c.65-.14 1.3-.32 1.93-.55Zm-7.93.55-.36.75a.31.31 0 0 1-.28.18H4.07a.31.31 0 0 1-.29-.43l.44-1.05c.64.23 1.29.41 1.95.55Zm-2.54-1.96c-.27-.26-.5-.65-.58-1.12h.92l-.34 1.12ZM5.5 8.44c.27-.91.6-1.77 1.15-2.4A3.03 3.03 0 0 1 9.1 5c1.2 0 2 .43 2.56 1.05.59.63.96 1.5 1.23 2.39l.9 3.13c-3 1.1-6.25 1.1-9.25 0l.95-3.13Z"
    fill="currentColor"
  ></path>
</svg>`;

const animalCat20Regular = html`
  <svg
    fill="currentColor"
    aria-hidden="true"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.97 18h9.28c.95 0 1.72-.77 1.72-1.72v-7.6a2.12 2.12 0 0 0 1.7-3.24l-.5-.81c-.38-.63-1.06-1-1.8-1h-1.43v-.64a.99.99 0 0 0-.99-.99 2.45 2.45 0 0 0-2.44 2.45V7.9a4.28 4.28 0 0 0-2.95 1.58 8.11 8.11 0 0 0-1.52 3.35A17.04 17.04 0 0 0 5.63 17h-.66a1.97 1.97 0 0 1-1.44-3.32l.92-.98a3.59 3.59 0 0 0-.09-4.99l-.9-.9a.5.5 0 1 0-.7.7l.9.9a2.59 2.59 0 0 1 .06 3.6l-.92 1A2.97 2.97 0 0 0 4.97 18Zm7.97-15v1.12c0 .28.22.5.5.5h1.93c.4 0 .75.2.96.53l.5.81c.46.75-.08 1.72-.95 1.72h-.41a.5.5 0 0 0-.5.5v8.1c0 .4-.32.72-.72.72h-.72v-.72a2.93 2.93 0 0 0-2.93-2.93H9.6a.5.5 0 0 0 0 1h1.01c1.07 0 1.93.87 1.93 1.93V17h-5.9A18 18 0 0 1 7 13.05c.26-1.1.67-2.16 1.32-2.93A3.32 3.32 0 0 1 11 8.88a.5.5 0 0 0 .5-.5V4.45c0-.8.64-1.44 1.43-1.45Z"
      fill="currentColor"
    ></path>
  </svg>
`;

const animalRabbit20Regular = html`
  <svg
    fill="currentColor"
    class="___12fm75w f1w7gpdv fez10in fg4l7m0"
    aria-hidden="true"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.51 15.01h2.12c.91 0 1.68-.57 1.99-1.37.88.07 1.79-.23 2.46-.9a3.15 3.15 0 0 0 0-4.45l-4.22-4.22c-.59-.59-1.55-.59-2.14 0-.6.6-.6 1.56 0 2.15l1.34 1.33c-.12.16-.22.33-.3.5a3.55 3.55 0 0 0-.54-.05H7.54c-.33 0-.65.05-.95.13A2.5 2.5 0 1 0 4 11.95v.93c0 1.18.95 2.13 2.12 2.13h4.39Zm1.64-10.23L16.38 9a2.15 2.15 0 0 1-2 3.6l-.56-.13-.06.56c-.07.56-.54.99-1.12.99h-1.62v-.1C11 12.78 9.99 12 8.89 12H7.5a.5.5 0 0 0 0 1h1.39c.69 0 1.12.46 1.12.91v.1H6.12c-.62 0-1.12-.5-1.12-1.13v-1.33A2.55 2.55 0 0 1 7.54 9h3.68c.23 0 .46.03.68.1l.42.11.18-.4c.1-.26.26-.57.47-.79l.5-.48-2.04-2.02a.52.52 0 0 1 0-.74c.2-.2.52-.2.72 0Zm-6.5 3.77a3.55 3.55 0 0 0-1.6 2.38 1.5 1.5 0 1 1 1.6-2.38Z"
      fill="currentColor"
    ></path>
  </svg>
`;

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

        <fluent-button  icon-only slot="toggle-buttons">${animalTurtle20Regular}</fluent-button>
        <fluent-pane bind-id="pane1" trap-focus id="one" position="right" control-size="small">
          <span slot="close-icon">${dismissed16Regular}</span>
          <fluent-text slot="header">Pane 1</fluent-text>
          <div style="display: flex; flex-direction: column; row-gap: 14px;">
            <div>
              <fluent-label id="firstName" weight="bold">First Name</fluent-label>
              <fluent-text-input tabindex="0" ariaLabelledby="lastName" control-size="small" id="abc" type="text"></fluent-text-input>
            </div>
            <div>
              <fluent-label id="lastName" weight="bold">Last Name</fluent-label>
              <fluent-text-input tabindex="0" ariaLabelledby="lastName" control-size="small" id="def" type="text"></fluent-text-input>
            </div>
            <div>
              <fluent-radio-group orientation="vertical">
                <fluent-label slot="label" weight="bold">Choose an option</fluent-label>
                <fluent-radio value="1">Option 1</fluent-radio>
                <fluent-radio value="2">Option 2</fluent-radio>
                <fluent-radio value="3">Option 3</fluent-radio>
              </fluent-radio-group>
            </div>
          </div>
          <div slot="footer">
            <fluent-button tabindex="0" appearance="primary">Button 1</fluent-button>
            <fluent-button tabindex="0" appearance="subtle">Button 2</fluent-button>
          </div>
        </fluent-pane>

        <fluent-button icon-only slot="toggle-buttons">${animalCat20Regular}</fluent-button>
        <fluent-pane bind-id="pane2" position="right" trap-focus>
          <span slot="close-icon">${dismissed16Regular}</span>
          <fluent-text slot="header">Pane 2</fluent-text>
          <div style="display: flex; flex-direction: column; row-gap: 14px;">
            <div>
              <fluent-label weight="bold">First Name</fluent-label>
              <fluent-text-input control-size="small" id="abc" type="text"></fluent-text-input>
            </div>
            <div>
              <fluent-label weight="bold">Last Name</fluent-label>
              <fluent-text-input control-size="small" id="abc" type="text"></fluent-text-input>
            </div>
            <div>
              <fluent-radio-group orientation="vertical">
                <fluent-label slot="label" weight="bold">Choose an option</fluent-label>
                <fluent-radio value="1">Option 1</fluent-radio>
                <fluent-radio value="2">Option 2</fluent-radio>
                <fluent-radio value="3">Option 3</fluent-radio>
              </fluent-radip-group>
            </div>
          </div>
          <div slot="footer">
            <fluent-button appearance="primary">Button 1</fluent-button>
            <fluent-button appearance="subtle">Button 2</fluent-button>
          </div>
          
        </fluent-pane>

        <fluent-button icon-only slot="toggle-buttons">${animalDog20regular}</fluent-button>
        <fluent-pane bind-id="pane3" position="right" trap-focus control-size="small">
          <span slot="close-icon">${dismissed16Regular}</span>
          <fluent-text slot="header">Pane 3</fluent-text>
          <div style="display: flex; flex-direction: column; row-gap: 14px;">
            <div>
              <fluent-label weight="bold">First Name</fluent-label>
              <fluent-text-input control-size="small" id="abc" type="text"></fluent-text-input>
            </div>
            <div>
              <fluent-label weight="bold">Last Name</fluent-label>
              <fluent-text-input control-size="small" id="abc" type="text"></fluent-text-input>
            </div>
            <div>
              <fluent-radio-group orientation="vertical">
                <fluent-label slot="label" weight="bold">Choose an option</fluent-label>
                <fluent-radio value="1">Option 1</fluent-radio>
                <fluent-radio value="2">Option 2</fluent-radio>
                <fluent-radio value="3">Option 3</fluent-radio>
              </fluent-radip-group>
            </div>
          </div>
          <div slot="footer">
            <fluent-button appearance="primary">Button 1</fluent-button>
            <fluent-button appearance="subtle">Button 2</fluent-button>
          </div>
        </fluent-pane>
        
        <fluent-button icon-only slot="toggle-buttons">${animalRabbit20Regular}</fluent-button>
        <fluent-pane bind-id="pane4" position="right" trap-focus>
           <span slot="close-icon">${dismissed16Regular}</span>
           <fluent-text slot="header">Pane 4</fluent-text>
           <div style="display: flex; flex-direction: column; row-gap: 14px;">
            <div>
              <fluent-label weight="bold">First Name</fluent-label>
              <fluent-text-input control-size="small" id="abc" type="text"></fluent-text-input>
            </div>
            <div>
              <fluent-label weight="bold">Last Name</fluent-label>
              <fluent-text-input control-size="small" id="abc" type="text"></fluent-text-input>
            </div>
            <div>
              <fluent-radio-group>
                <fluent-label slot="label" weight="bold">Choose an option</fluent-label>
                <fluent-radio value="1">Option 1</fluent-radio>
                <fluent-radio value="2">Option 2</fluent-radio>
                <fluent-radio value="3">Option 3</fluent-radio>
              </fluent-radip-group>
            </div>
          </div>
          <div slot="footer">
            <fluent-button appearance="primary">Button 1</fluent-button>
            <fluent-button appearance="subtle">Button 2</fluent-button>
          </div>
        </fluent-pane>

        <fluent-button icon-only slot="toggle-buttons">${settings20Regular}</fluent-button>
        
        <fluent-pane id="settings" position="right" trap-focus control-size="small" compact>

          <span slot="header" block weight="bold">Customize Pane Switcher</span>
          <span slot="close-icon">${dismissed16Regular}</span>

          <fluent-pane-settings-item bind-id="pane1">
            <span slot="icon">${animalTurtle20Regular}</span>
            <fluent-text slot="header" block weight="bold"><span>Pane 1</span></fluent-text>
            <fluent-text slot="body" weight="regular" size="300" as="p">
                A short description of Pane 1.
            </fluent-text>
          </fluent-pane-settings-item>

          <fluent-pane-settings-item bind-id="pane2">
            <span slot="icon">${animalCat20Regular}</span>
            <fluent-text slot="header" block weight="bold"><span>Pane 2</span></fluent-text>
            <fluent-text slot="body" weight="regular" size="300" as="p">
            A short description of Pane 2.
            </fluent-text>
          </fluent-pane-settings-item>

          <fluent-pane-settings-item bind-id="pane3">
            <span slot="icon">${animalDog20regular}</span>
            <fluent-text slot="header" block weight="bold"><span>Pane 3</span></fluent-text>
            <fluent-text slot="body" weight="regular" size="300" as="p">
              A short description of Pane 3.
            </fluent-text>
          </fluent-pane-settings-item>

          <fluent-pane-settings-item bind-id="pane4">
            <span slot="icon">${animalRabbit20Regular}</span>
            <fluent-text slot="header" block weight="bold"><span>Pane 4</span></fluent-text>
            <fluent-text slot="body" weight="regular" size="300" as="p">
              A short description of Pane 4.
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
