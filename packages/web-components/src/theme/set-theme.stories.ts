import { html } from '@microsoft/fast-element';
import { teamsDarkTheme, teamsLightTheme, webDarkTheme, webLightTheme } from '@fluentui/tokens';

import { renderComponent } from '../helpers.stories.js';
import { setTheme } from './set-theme.js';

export default {
  title: 'Theme/SetTheme',
};

export const SetTheme = renderComponent(html`
  <fluent-button @click="${() => setTheme(webLightTheme)}">webLightTheme</fluent-button>
  <fluent-button @click="${() => setTheme(webDarkTheme)}">webDarkTheme</fluent-button>
  <fluent-button @click="${() => setTheme(teamsLightTheme)}">teamsLightTheme</fluent-button>
  <fluent-button @click="${() => setTheme(teamsDarkTheme)}">teamsDarkTheme</fluent-button>
`);
