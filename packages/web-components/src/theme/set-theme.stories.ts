import { html } from '@microsoft/fast-element';
import { teamsDarkTheme, teamsLightTheme, webDarkTheme, webLightTheme } from '@fluentui/tokens';

import { renderComponent } from '../helpers.stories.js';
import { setTheme } from './set-theme.js';

export default {
  title: 'Theme/SetTheme',
};

export const SetTheme = renderComponent(html`
  <div>
    <div>
      <p>These buttons set theme globally.</p>
      <fluent-button @click="${() => setTheme(webLightTheme)}">webLightTheme</fluent-button>
      <fluent-button @click="${() => setTheme(webDarkTheme)}">webDarkTheme</fluent-button>
      <fluent-button @click="${() => setTheme(teamsLightTheme)}">teamsLightTheme</fluent-button>
      <fluent-button @click="${() => setTheme(teamsDarkTheme)}">teamsDarkTheme</fluent-button>
    </div>

    <div id="local-theme" style="border: 1px solid #ccc;padding: 2rem;margin:2rem;">
      <p>These buttons set theme on this bordered box element.</p>
      <fluent-button @click="${() => setTheme(webLightTheme, document.getElementById('local-theme')!)}"
        >webLightTheme</fluent-button
      >
      <fluent-button @click="${() => setTheme(webDarkTheme, document.getElementById('local-theme')!)}"
        >webDarkTheme</fluent-button
      >
      <fluent-button @click="${() => setTheme(teamsLightTheme, document.getElementById('local-theme')!)}"
        >teamsLightTheme</fluent-button
      >
      <fluent-button @click="${() => setTheme(teamsDarkTheme, document.getElementById('local-theme')!)}"
        >teamsDarkTheme</fluent-button
      >
      <fluent-button @click="${() => setTheme(null, document.getElementById('local-theme')!)}"
        >Unset local theme</fluent-button
      >
    </div>

    <div style="border: 1px solid #ccc;padding: 2rem;margin:2rem;">
      <p>These buttons set theme on the following <code>&lt;fluent-text&gt;</code> element.</p>
      <fluent-text-input id="local-shadow-theme">
        <fluent-label>Sample Input</fluent-label>
      </fluent-text-input>
      <fluent-button @click="${() => setTheme(webLightTheme, document.getElementById('local-shadow-theme')!)}"
        >webLightTheme</fluent-button
      >
      <fluent-button @click="${() => setTheme(webDarkTheme, document.getElementById('local-shadow-theme')!)}"
        >webDarkTheme</fluent-button
      >
      <fluent-button @click="${() => setTheme(teamsLightTheme, document.getElementById('local-shadow-theme')!)}"
        >teamsLightTheme</fluent-button
      >
      <fluent-button @click="${() => setTheme(teamsDarkTheme, document.getElementById('local-shadow-theme')!)}"
        >teamsDarkTheme</fluent-button
      >
      <fluent-button @click="${() => setTheme(null, document.getElementById('local-shadow-theme')!)}"
        >Unset local theme</fluent-button
      >
    </div>
  </div>
`);
