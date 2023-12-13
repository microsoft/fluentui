import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import { colorNeutralStroke2, shadow8 } from '../theme/design-tokens.js';
import { ToolbarSize } from './toolbar.options.js';
import type { Toolbar as FluentToolbar } from './toolbar.js';
import './define.js';

type ToolbarStoryArgs = Args & FluentToolbar;
type ToolbarStoryMeta = Meta<ToolbarStoryArgs>;

const ArrowRedo = html`<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M15 2.5a.5.5 0 011 0v4.9a.6.6 0 01-.6.6h-4.9a.5.5 0 010-1h3.6l-3.48-3.02a4 4 0 10-5.24 6.04l8.17 7.1a.5.5 0 11-.66.76l-8.17-7.1a5 5 0 116.56-7.55L15 6.46V2.5z"
  />
</svg>`;
const ArrowUndo = html`<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M5 2.5a.5.5 0 00-1 0v4.9c0 .33.27.6.6.6h4.9a.5.5 0 000-1H5.9l3.48-3.02a4 4 0 015.25 6.04l-8.17 7.1a.5.5 0 00.65.76l8.17-7.1a5 5 0 00-6.56-7.55L5 6.46V2.5z"
  />
</svg>`;
const ClearFormatting = html`<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M4.25 3a.5.5 0 00-.5.42l-.24 1.5a.5.5 0 00.98.16L4.67 4h3.57l-1.73 9.91a.5.5 0 00-.01.09h-1a.5.5 0 000 1h3a.5.5 0 000-1h-1l1.74-9.91A.5.5 0 009.25 4h3.41l-.15.92a.5.5 0 10.98.16l.25-1.5a.5.5 0 00-.49-.58h-9zM9.6 17c-.16-.32-.3-.65-.4-1H2.5a.5.5 0 000 1h7.1zm9.4-2.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm-2.65-1.15a.5.5 0 00-.7-.7l-1.15 1.14-1.15-1.14a.5.5 0 00-.7.7l1.14 1.15-1.14 1.15a.5.5 0 00.7.7l1.15-1.14 1.15 1.14a.5.5 0 00.7-.7l-1.14-1.15 1.14-1.15z"
  />
</svg>`;
const Code = html`<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M6 3a3 3 0 00-3 3v8a3 3 0 003 3h8a3 3 0 003-3V6a3 3 0 00-3-3H6zM4 6c0-1.1.9-2 2-2h8a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm4.85 1.85a.5.5 0 10-.7-.7l-2.5 2.5a.5.5 0 000 .7l2.5 2.5a.5.5 0 00.7-.7L6.71 10l2.14-2.15zm3-.7a.5.5 0 00-.7.7L13.29 10l-2.14 2.15a.5.5 0 00.7.7l2.5-2.5a.5.5 0 000-.7l-2.5-2.5z"
  />
</svg>`;
const Delete = html`<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M8.5 4h3a1.5 1.5 0 00-3 0zm-1 0a2.5 2.5 0 015 0h5a.5.5 0 010 1h-1.05l-1.2 10.34A3 3 0 0112.27 18H7.73a3 3 0 01-2.98-2.66L3.55 5H2.5a.5.5 0 010-1h5zM5.74 15.23A2 2 0 007.73 17h4.54a2 2 0 001.99-1.77L15.44 5H4.56l1.18 10.23zM8.5 7.5c.28 0 .5.22.5.5v6a.5.5 0 01-1 0V8c0-.28.22-.5.5-.5zM12 8a.5.5 0 00-1 0v6a.5.5 0 001 0V8z"
  />
</svg>`;
const Highlight = html`<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M3.5 2c.28 0 .5.22.5.5v4c0 .28.22.5.5.5h11a.5.5 0 00.5-.5v-4a.5.5 0 011 0v4c0 .65-.42 1.2-1 1.41V9a2 2 0 01-2 2v2.07a2 2 0 01-1.1 1.8l-6.18 3.08A.5.5 0 016 17.5V11a2 2 0 01-2-2V7.91c-.58-.2-1-.76-1-1.41v-4c0-.28.22-.5.5-.5zM5 8v1a1 1 0 001 1h8a1 1 0 001-1V8H5zm2 3v5.7l5.45-2.73a1 1 0 00.55-.9V11H7z"
  />
</svg>`;
const Important = html`<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M10 3a2 2 0 00-2 2c0 2.07.75 4.91 1.18 6.4.1.36.44.6.82.6.39 0 .71-.24.82-.6C11.25 9.94 12 7.1 12 5a2 2 0 00-2-2zM7 5a3 3 0 016 0c0 2.25-.79 5.21-1.22 6.69-.24.8-.97 1.31-1.78 1.31s-1.54-.52-1.78-1.31C7.8 10.2 7 7.23 7 5zm3 10a1 1 0 100 2 1 1 0 000-2zm-2 1a2 2 0 114 0 2 2 0 01-4 0z"
  />
</svg>`;
const Insert = html`<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M6 3a1 1 0 00-1 1v2a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1H6zM4 4c0-1.1.9-2 2-2h8a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 13a1 1 0 01-1-1v-2a1 1 0 011-1h8a1 1 0 011 1v2a1 1 0 01-1 1H6zm-2-1c0 1.1.9 2 2 2h8a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2zm-2-6c0-.28.22-.5.5-.5h15a.5.5 0 010 1h-15A.5.5 0 012 10z"
  />
</svg>`;
const Link = html`<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M8 6a.5.5 0 01.09 1H6a3 3 0 00-.2 6H8a.5.5 0 01.09 1H6a4 4 0 01-.22-8H8zm6 0a4 4 0 01.22 8H12a.5.5 0 01-.09-1H14a3 3 0 00.2-6H12a.5.5 0 01-.09-1H14zM6 9.5h8a.5.5 0 01.09 1H6a.5.5 0 01-.09-1H14 6z"
  />
</svg>`;
const Table = html`<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M17 5.5A2.5 2.5 0 0014.5 3h-9A2.5 2.5 0 003 5.5v9A2.5 2.5 0 005.5 17h9a2.5 2.5 0 002.5-2.5v-9zm-13 9V13h3v3H5.36A1.5 1.5 0 014 14.5zm8-1.5v3H8v-3h4zm2.5 3H13v-3h3V14.64A1.5 1.5 0 0114.5 16zM12 8v4H8V8h4zm1 0h3v4h-3V8zm-1-4v3H8V4h4zm1 0H14.64A1.5 1.5 0 0116 5.5V7h-3V4zM7 4v3H4V5.36A1.5 1.5 0 015.5 4H7zm0 4v4H4V8h3z"
  />
</svg>`;
const TableAdd = html`<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M17 5.5A2.5 2.5 0 0014.5 3h-9A2.5 2.5 0 003 5.5v9A2.5 2.5 0 005.5 17h4.1c-.16-.32-.3-.65-.4-1H8v-3h1.2c.1-.35.24-.68.4-1H8V8h4v1.6c.32-.16.65-.3 1-.4V8h3v1.2c.35.1.68.24 1 .4V5.5zm-13 9V13h3v3H5.36A1.5 1.5 0 014 14.5zM12 4v3H8V4h4zm1 0H14.64A1.5 1.5 0 0116 5.5V7h-3V4zM7 4v3H4V5.36A1.5 1.5 0 015.5 4H7zm0 4v4H4V8h3zm12 6.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm-4-2a.5.5 0 00-1 0V14h-1.5a.5.5 0 000 1H14v1.5a.5.5 0 001 0V15h1.5a.5.5 0 000-1H15v-1.5z"
  />
</svg>`;
const TableDismiss = html`<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M17 5.5A2.5 2.5 0 0014.5 3h-9A2.5 2.5 0 003 5.5v9A2.5 2.5 0 005.5 17h4.1c-.16-.32-.3-.65-.4-1H8v-3h1.2c.1-.35.24-.68.4-1H8V8h4v1.6c.32-.16.65-.3 1-.4V8h3v1.2c.35.1.68.24 1 .4V5.5zm-13 9V13h3v3H5.36A1.5 1.5 0 014 14.5zM12 4v3H8V4h4zm1 0H14.64A1.5 1.5 0 0116 5.5V7h-3V4zM7 4v3H4V5.36A1.5 1.5 0 015.5 4H7zm0 4v4H4V8h3zm12 6.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm-3.8 0l1.15-1.15a.5.5 0 00-.7-.7l-1.15 1.14-1.15-1.14a.5.5 0 00-.7.7l1.14 1.15-1.14 1.15a.5.5 0 00.7.7l1.15-1.14 1.15 1.14a.5.5 0 00.7-.7l-1.14-1.15z"
  />
</svg>`;
const TextBold = html`<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M5.5 4.25C5.5 3.56 6.06 3 6.75 3h3.5a4 4 0 013.17 6.44c.9.7 1.58 1.8 1.58 3.31A4.23 4.23 0 0110.75 17h-4c-.69 0-1.25-.56-1.25-1.25V4.25zM8 11v3.5h2.75c.81 0 1.75-.62 1.75-1.75S11.56 11 10.75 11H8zm0-2.5h2.25a1.5 1.5 0 100-3H8v3z"
  />
</svg>`;
const TextBulletList = html`<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M3 5.5a1 1 0 100-2 1 1 0 000 2zm3-1c0-.28.22-.5.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0 5c0-.28.22-.5.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm.5 4.5a.5.5 0 000 1h11a.5.5 0 000-1h-11zm-2.5.5a1 1 0 11-2 0 1 1 0 012 0zm-1-4a1 1 0 100-2 1 1 0 000 2z"
  />
</svg>`;
const TextColor = html`<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M10.46 2.31a.5.5 0 00-.92 0l-3 7.5a.5.5 0 10.92.38L8.54 7.5h2.92l1.08 2.69a.5.5 0 10.92-.38l-3-7.5zM10 3.85l1.06 2.65H8.94L10 3.85zM4.5 12c-.83 0-1.5.67-1.5 1.5v3c0 .83.67 1.5 1.5 1.5h11c.83 0 1.5-.67 1.5-1.5v-3c0-.83-.67-1.5-1.5-1.5h-11zM4 13.5c0-.28.22-.5.5-.5h11c.28 0 .5.22.5.5v3a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-3z"
  />
</svg>`;
const TextFontSize = html`<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M13 3.5c.2 0 .4.13.47.32l3 8v.02l1.5 3.98a.5.5 0 11-.94.36l-1.38-3.68h-5.3l-1.38 3.68a.5.5 0 01-.93 0L6.96 13.5H4.04l-1.08 2.69a.5.5 0 11-.92-.38l1.2-2.98v-.03l1.8-4.49a.5.5 0 01.92 0l1.8 4.5v.02l.73 1.79 1.04-2.78v-.03l3-7.99A.5.5 0 0113 3.5zm-2.28 8h4.56L13 5.42l-2.28 6.08zm-4.16 1L5.5 9.85 4.44 12.5h2.12z"
  />
</svg>`;
const TextIndentIncrease = html`<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M6 4.5c0-.28.22-.5.5-.5h8a.5.5 0 010 1h-8a.5.5 0 01-.5-.5zm0 5c0-.28.22-.5.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm.5 4.5a.5.5 0 000 1h6a.5.5 0 000-1h-6zM2.85 7.73a.5.5 0 10-.7.7L3.2 9.5l-1.06 1.06a.5.5 0 10.7.7l1.42-1.4a.5.5 0 000-.71L2.85 7.73z"
  />
</svg>`;
const TextIndentDecrease = html`<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M6 4.75c0-.41.34-.75.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 016 4.75zM6.75 9a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H6.75zm0 5a.75.75 0 000 1.5h5.5a.75.75 0 000-1.5h-5.5zm-3.28-2.22a.75.75 0 001.06-1.06l-.97-.97.97-.97a.75.75 0 00-1.06-1.06l-1.5 1.5c-.3.3-.3.77 0 1.06l1.5 1.5z"
  />
</svg>`;
const TextItalic = html`<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 3a.5.5 0 010 1h-3.16L8.23 16h3.27a.5.5 0 010 1H4a.5.5 0 010-1h3.16l4.61-12H8.5a.5.5 0 010-1H16z" />
</svg>`;
const TextNumberList = html`<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M5 1.5a.5.5 0 00-.39-.49.5.5 0 00-.56.27l-.07.12a2.96 2.96 0 01-1.2 1.15.5.5 0 10.44.9c.3-.15.56-.34.78-.53V5.5a.5.5 0 001 0v-4zM2.65 7.65a.5.5 0 00.7.7l.05-.04.2-.12C3.76 8.09 4 8 4.3 8c.23 0 .41.06.53.15.1.07.16.17.16.35a.5.5 0 01-.21.44c-.15.12-.35.22-.62.35l-.14.08c-.32.15-.7.36-1 .7-.33.35-.53.81-.53 1.43 0 .28.22.5.5.5h2.5a.5.5 0 000-1H3.59c.04-.1.1-.2.17-.27a2.38 2.38 0 01.83-.53c.27-.13.59-.29.84-.5.33-.27.57-.65.57-1.2 0-.5-.22-.9-.57-1.15A1.92 1.92 0 004.33 7h-.01a2.5 2.5 0 00-1.66.63v.01h-.01zm.01-.02l-.01.02s.1-.1.01-.02zM4.25 15a.5.5 0 100 1c.34 0 .53.1.63.18.1.09.13.2.13.3-.01.2-.19.52-.76.52-.41 0-.63-.1-.72-.17a.42.42 0 01-.1-.07.5.5 0 00-.88.46v.01l.02.02a.8.8 0 00.1.15c.07.08.17.17.3.27.28.18.7.33 1.28.33 1.03 0 1.73-.67 1.76-1.48.01-.37-.12-.74-.4-1.02.28-.28.41-.65.4-1.02-.03-.8-.73-1.48-1.76-1.48-.59 0-1 .15-1.28.33a1.4 1.4 0 00-.4.42l-.01.01v.01a.5.5 0 00.87.48.42.42 0 01.1-.08c.1-.07.3-.17.72-.17.57 0 .75.33.76.52 0 .1-.04.21-.13.3-.1.08-.29.18-.63.18zm-.82-.75l.01-.02v.02zM8.5 4a.5.5 0 100 1h8a.5.5 0 000-1h-8zm0 5a.5.5 0 100 1h8a.5.5 0 000-1h-8zM8 14.5c0-.28.22-.5.5-.5h8a.5.5 0 110 1h-8a.5.5 0 01-.5-.5z"
  />
</svg>`;
const TextQuote = html`<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M7.83 8.62a8.8 8.8 0 01-.96 2.76 12.06 12.06 0 01-2.22 2.77.5.5 0 00.7.7h.02c.74-.75 1.66-1.67 2.38-2.98A10.83 10.83 0 009 6.5a2.5 2.5 0 10-1.17 2.12zM8 6.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm6.83 2.12a8.8 8.8 0 01-.96 2.76 12.06 12.06 0 01-2.22 2.77.5.5 0 00.7.7h.02c.74-.75 1.66-1.67 2.38-2.98A10.83 10.83 0 0016 6.5a2.5 2.5 0 10-1.17 2.12zM13.5 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
  />
</svg>`;
const TextStrikethrough = html`<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M6.53 4.03A6.15 6.15 0 0110 3a6.16 6.16 0 014.9 2.2.5.5 0 01-.8.6A5.17 5.17 0 0010 4c-1.15 0-2.18.35-2.9.85C6.36 5.35 6 5.98 6 6.5c0 .9.43 1.48 1.17 1.93.36.22.78.4 1.25.57H6.23A3.02 3.02 0 015 6.5c0-.98.64-1.86 1.53-2.47zM16.5 10a.5.5 0 010 1h-2.73A3.02 3.02 0 0115 13.5c0 1.23-.72 2.12-1.68 2.68-.94.56-2.16.82-3.32.82a7.27 7.27 0 01-2.9-.48 4.55 4.55 0 01-2.02-1.74.5.5 0 01.84-.56c.45.68.96 1.11 1.58 1.38.64.28 1.44.4 2.5.4 1.03 0 2.06-.24 2.82-.68.74-.44 1.18-1.05 1.18-1.82 0-.9-.43-1.48-1.17-1.93-.36-.22-.78-.4-1.25-.57H3.5a.5.5 0 010-1h13z"
  />
</svg>`;
const TextUnderline = html`<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M6 3.5a.5.5 0 00-1 0v6.45A5.02 5.02 0 0010 15c2.77 0 5-2.26 5-5.05V3.5a.5.5 0 00-1 0v6.45C14 12.2 12.2 14 10 14s-4-1.8-4-4.05V3.5zm-1 13c0-.28.22-.5.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5z"
  />
</svg>`;

const storyTemplate = html<ToolbarStoryArgs>`
  <fluent-toolbar size=${x => x.size}>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextBold}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextItalic}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextUnderline}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextStrikethrough}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Highlight}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextColor}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextFontSize}</fluent-button>
    <fluent-menu-button appearance="subtle" shape="rounded" size="small"> Paragraph </fluent-menu-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ClearFormatting}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextIndentIncrease}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextIndentDecrease}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextBulletList}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextNumberList}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextQuote}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Link}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Code}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Important}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Insert}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Table}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TableAdd}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TableDismiss}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ArrowUndo}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ArrowRedo}</fluent-button>
    <span slot="end">
      <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Delete}</fluent-button>
    </span>
  </fluent-toolbar>
`;

export default {
  title: 'Components/Toolbar',
  args: {
    size: 'medium',
  },
  argTypes: {
    size: {
      description: 'Toolbar size',
      table: {
        defaultValue: {
          summary: 'medium',
        },
      },
      options: Object.values(ToolbarSize),
      control: 'select',
    },
  },
} as ToolbarStoryMeta;

export const Toolbar = renderComponent(storyTemplate).bind({});

const verticalToolbar = html<ToolbarStoryArgs>`
  <style>
    #story--components-toolbar--vertical-toolbar div {
      align-content: space-between;
      display: flex;
      flex-direction: row;
    }
    #story--components-toolbar--vertical-toolbar code {
      align-self: flex-start;
      font-size: 0.75em;
      margin: 0 12px;
      width: 150px;
    }
    .vertical-bordered {
      border-left: 1px solid ${colorNeutralStroke2};
      border-right: 1px solid ${colorNeutralStroke2};
    }
    .no-radius {
      border-radius: 0;
    }
  </style>
  <code>Border and square edges are optional. Border requires Fluent Design Token: 'colorNeutralStroke2'.</code>
  <fluent-toolbar orientation="vertical" class="vertical-bordered no-radius">
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextBold}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextItalic}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextUnderline}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextStrikethrough}</fluent-button>
    <fluent-divider orientation="horizontal"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Highlight}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextColor}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextFontSize}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ClearFormatting}</fluent-button>
    <fluent-divider orientation="horizontal"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextIndentIncrease}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextIndentDecrease}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextBulletList}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextNumberList}</fluent-button>
    <fluent-divider orientation="horizontal"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextQuote}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Link}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Code}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Important}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Insert}</fluent-button>
    <fluent-divider orientation="horizontal"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Table}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TableAdd}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TableDismiss}</fluent-button>
    <fluent-divider orientation="horizontal"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ArrowUndo}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ArrowRedo}</fluent-button>
    <span slot="end">
      <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Delete}</fluent-button>
    </span>
  </fluent-toolbar>

  <code>Border and square edges are optional. Border requires Fluent Design Token: 'colorNeutralStroke2'.</code>
  <fluent-toolbar orientation="vertical">
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextBold}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextItalic}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextUnderline}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextStrikethrough}</fluent-button>
    <fluent-divider orientation="horizontal"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Highlight}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextColor}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextFontSize}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ClearFormatting}</fluent-button>
    <fluent-divider orientation="horizontal"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextIndentIncrease}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextIndentDecrease}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextBulletList}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextNumberList}</fluent-button>
    <fluent-divider orientation="horizontal"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextQuote}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Link}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Code}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Important}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Insert}</fluent-button>
    <fluent-divider orientation="horizontal"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Table}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TableAdd}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TableDismiss}</fluent-button>
    <fluent-divider orientation="horizontal"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ArrowUndo}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ArrowRedo}</fluent-button>
    <span slot="end">
      <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Delete}</fluent-button>
    </span>
  </fluent-toolbar>
`;

export const VerticalToolbar = renderComponent(verticalToolbar).bind({});

const labelToolbar = html<ToolbarStoryArgs>`
  <fluent-toolbar size=${x => x.size}>
    <span slot="label"><fluent-label weight="semibold" size="small">Label</fluent-label></span>
    <span slot="start"
      ><fluent-avatar appearance="ring" active="active" color="gold" shape="square" size="16"></fluent-avatar
    ></span>
    <span slot="end">
      <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Delete}</fluent-button>
    </span>
  </fluent-toolbar>
`;
export const LabelStartAndEndSlots = renderComponent(labelToolbar).bind({});

const sizesToolbar = html<ToolbarStoryArgs>`
  <style>
    code {
      font-size: 0.75em;
      margin: 20px 0;
    }
    .bordered {
      border-bottom: 1px solid ${colorNeutralStroke2};
    }
    .no-radius {
      border-radius: 0;
    }
  </style>
  <code>size="small"</code>
  <fluent-toolbar size="small">
    <fluent-button icon-only appearance="primary" shape="rounded" size="small">${TextBold}</fluent-button>
    <fluent-button icon-only appearance="outline" shape="rounded" size="small">${TextItalic}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextUnderline}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextStrikethrough}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Highlight}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextColor}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextFontSize}</fluent-button>
    <fluent-menu-button appearance="subtle" shape="rounded" size="small"> Paragraph </fluent-menu-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ClearFormatting}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextIndentIncrease}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextIndentDecrease}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextBulletList}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextNumberList}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextQuote}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Link}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Code}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Important}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Insert}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Table}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TableAdd}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TableDismiss}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ArrowUndo}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ArrowRedo}</fluent-button>
    <span slot="end">
      <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Delete}</fluent-button>
    </span>
  </fluent-toolbar>

  <code>size="medium"</code>
  <fluent-toolbar size="medium">
    <fluent-button icon-only appearance="primary" shape="rounded" size="small">${TextBold}</fluent-button>
    <fluent-button icon-only appearance="outline" shape="rounded" size="small">${TextItalic}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextUnderline}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextStrikethrough}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Highlight}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextColor}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextFontSize}</fluent-button>
    <fluent-menu-button appearance="subtle" shape="rounded" size="small"> Paragraph </fluent-menu-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ClearFormatting}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextIndentIncrease}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextIndentDecrease}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextBulletList}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextNumberList}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextQuote}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Link}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Code}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Important}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Insert}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Table}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TableAdd}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TableDismiss}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ArrowUndo}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ArrowRedo}</fluent-button>
    <span slot="end">
      <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Delete}</fluent-button>
    </span>
  </fluent-toolbar>

  <code
    >size="large". Border and square edges are optional. Border requires Fluent Design Token:
    'colorNeutralStroke2'</code
  >
  <fluent-toolbar size="large" class="bordered no-radius">
    <fluent-button icon-only appearance="primary" shape="rounded" size="small">${TextBold}</fluent-button>
    <fluent-button icon-only appearance="outline" shape="rounded" size="small">${TextItalic}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextUnderline}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextStrikethrough}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Highlight}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextColor}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextFontSize}</fluent-button>
    <fluent-menu-button appearance="subtle" shape="rounded" size="small"> Paragraph </fluent-menu-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ClearFormatting}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextIndentIncrease}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextIndentDecrease}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextBulletList}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextNumberList}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextQuote}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Link}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Code}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Important}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Insert}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Table}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TableAdd}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TableDismiss}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ArrowUndo}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ArrowRedo}</fluent-button>
    <span slot="end">
      <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Delete}</fluent-button>
    </span>
  </fluent-toolbar>
`;

export const Sizes = renderComponent(sizesToolbar).bind({});

const rtlToolbar = html<ToolbarStoryArgs>`
  <fluent-toolbar dir="rtl">
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextBold}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextItalic}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextUnderline}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextStrikethrough}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Highlight}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextColor}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextFontSize}</fluent-button>
    <fluent-menu-button appearance="subtle" shape="rounded" size="small"> Paragraph </fluent-menu-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ClearFormatting}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextIndentIncrease}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextIndentDecrease}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextBulletList}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextNumberList}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextQuote}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Link}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Code}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Important}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Insert}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Table}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TableAdd}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TableDismiss}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ArrowUndo}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ArrowRedo}</fluent-button>
    <span slot="end">
      <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Delete}</fluent-button>
    </span>
  </fluent-toolbar>
`;
export const RTL = renderComponent(rtlToolbar).bind({});

const buttonToolbar = html<ToolbarStoryArgs>`
  <code>Toolbar size="small" with Button</code>
  <fluent-toolbar size="small">
    <fluent-button appearance="primary" shape="rounded" size="small">New</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextQuote}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Link}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Code}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Important}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Insert}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Table}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TableAdd}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TableDismiss}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ArrowUndo}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ArrowRedo}</fluent-button>
    <span slot="end">
      <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Delete}</fluent-button>
    </span>
  </fluent-toolbar>

  <code>Toolbar size="medium" with Button</code>
  <fluent-toolbar>
    <fluent-button appearance="primary" shape="rounded" size="small">New</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextQuote}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Link}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Code}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Important}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Insert}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Table}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TableAdd}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TableDismiss}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ArrowUndo}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ArrowRedo}</fluent-button>
    <span slot="end">
      <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Delete}</fluent-button>
    </span>
  </fluent-toolbar>

  <code>Toolbar size="large" with Button</code>
  <fluent-toolbar size="large">
    <fluent-button appearance="primary" shape="rounded" size="small">New</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextQuote}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Link}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Code}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Important}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Insert}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Table}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TableAdd}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TableDismiss}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ArrowUndo}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ArrowRedo}</fluent-button>
    <span slot="end">
      <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Delete}</fluent-button>
    </span>
  </fluent-toolbar>
`;
export const ToolbarWithButton = renderComponent(buttonToolbar).bind({});

const floatingToolbar = html<ToolbarStoryArgs>`
  <style>
    .floating {
      box-shadow: ${shadow8};
    }
  </style>
  <code>Box shadow requires use of Fluent Design Token: 'shadow8'</code>
  <fluent-toolbar class="floating">
    <fluent-button icon-only appearance="primary" shape="rounded" size="small">${TextBold}</fluent-button>
    <fluent-button icon-only appearance="outline" shape="rounded" size="small">${TextItalic}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextUnderline}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextStrikethrough}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Highlight}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextColor}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextFontSize}</fluent-button>
    <fluent-menu-button appearance="subtle" shape="rounded" size="small"> Paragraph </fluent-menu-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ClearFormatting}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextIndentIncrease}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextIndentDecrease}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextBulletList}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextNumberList}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TextQuote}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Link}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Code}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Important}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Insert}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Table}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TableAdd}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${TableDismiss}</fluent-button>
    <fluent-divider orientation="vertical"></fluent-divider>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ArrowUndo}</fluent-button>
    <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${ArrowRedo}</fluent-button>
    <span slot="end">
      <fluent-button icon-only appearance="subtle" shape="rounded" size="small">${Delete}</fluent-button>
    </span>
  </fluent-toolbar>
`;

export const Floating = renderComponent(floatingToolbar).bind({});
