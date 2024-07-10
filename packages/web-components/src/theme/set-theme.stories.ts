import { html, type HTMLView } from '@microsoft/fast-element';
import { teamsDarkTheme, teamsLightTheme, type Theme, webDarkTheme, webLightTheme } from '@fluentui/tokens';

import { renderComponent } from '../helpers.stories.js';
import { setTheme } from './set-theme.js';

const themes: Record<string, Theme | null> = {
 'web-light': webLightTheme ,
 'web-dark': webDarkTheme,
 'team-light': teamsLightTheme,
 'team-dark': teamsDarkTheme,
 'null': null,
};

function updateTheme(c: HTMLView, type = 'global') {
  const {value} = c.event.target as HTMLSelectElement;

  if (themes[value] !== undefined) {
    switch (type) {
      case 'global':
        setTheme(themes[value]);
        break;
      case 'local':
        setTheme(themes[value], document.querySelector('.local') as HTMLElement);
        break;
      case 'shadow':
        setTheme(themes[value], document.querySelector('.shadow') as HTMLElement);
        break;
    }
  }
}

export default {
  title: 'Theme/SetTheme',
};

const ComponentCloudTemplate = html`
  <p><fluent-button>A button</fluent-button></p>
  <p>
    <fluent-text-input>
      <fluent-label>Text input</fluent-label>
    </fluent-text-input>
  </p>
  <p>
    <fluent-menu>
      <fluent-menu-button appearance="primary" slot="trigger">Toggle Menu</fluent-menu-button>
      <fluent-menu-list>
        <fluent-menu-item>Menu item 1</fluent-menu-item>
        <fluent-menu-item>Menu item 2</fluent-menu-item>
        <fluent-menu-item>Menu item 3</fluent-menu-item>
        <fluent-menu-item>Menu item 4</fluent-menu-item>
      </fluent-menu-list>
    </fluent-menu>
  </p>
`;

export const SetTheme = renderComponent(html`
  <style>
    .toolbar {
      display: flex;
      gap: 1rem;
      border-block-end: 1px solid #ccc;
      padding-block-end: 2rem;

      label,
      select {
        display: flow-root;
        inline-size: fit-content;
      }

      label {
        flex: 1 0 0;
      }

      select {
        inline-size: 100%;
        margin-block-start: .5rem;
        padding: .5rem;
      }
    }

    .global {
      margin-block: 2rem;
    }

    .local {
      background: var(--colorNeutralBackground2);
      border: 1px solid #ccc;
      color: var(--colorNeutralForeground2);
      padding: 1rem;
      margin-trim: block;

      & > :first-child {
        margin-block-start: 0;
      }

      & > :last-child {
        margin-block-end: 0;
      }

      .shadow {
        background: var(--colorNeutralBackground2);
        color: var(--colorNeutralForeground2);
      }
    }
  </style>
  <div class="toolbar">
    <label>
      Global theme
      <select @change="${(_, c) => updateTheme(c as HTMLView)}">
        <option selected value="web-light">Web Light</option>
        <option value="web-dark">Web Dark</option>
        <option value="team-light">Team Light</option>
        <option value="team-dark">Team Dark</option>
      </select>
    </label>

    <label>
      Local theme (element without shadow root)
      <select @change="${(_, c) => updateTheme(c as HTMLView, 'local')}">
        <option value="null">Unset</option>
        <option value="web-light">Web Light</option>
        <option value="web-dark">Web Dark</option>
        <option value="team-light">Team Light</option>
        <option value="team-dark">Team Dark</option>
      </select>
    </label>

    <label>
      Local theme (element with shadow root)
      <select @change="${(_, c) => updateTheme(c as HTMLView, 'shadow')}">
        <option value="null">Unset</option>
        <option value="web-light">Web Light</option>
        <option value="web-dark">Web Dark</option>
        <option value="team-light">Team Light</option>
        <option value="team-dark">Team Dark</option>
      </select>
    </label>
  </div>

  <div class="global">
    <p>These elements follow the global theme</p>
    ${ComponentCloudTemplate}
  </div>

  <div class="local">
    <p>These elements follow the container element’s theme</p>
    ${ComponentCloudTemplate}

    <fluent-divider></fluent-divider>

    <p>This element (which has shadow root) follows its own theme</p>
    <fluent-text-input class="shadow">
      <fluent-label>Text input</fluent-label>
    </fluent-text-input>
  </div>
`);
