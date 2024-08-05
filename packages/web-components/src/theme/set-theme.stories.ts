import { html, type HTMLView } from '@microsoft/fast-element';
import { teamsDarkTheme, teamsLightTheme, webDarkTheme, webLightTheme } from '@fluentui/tokens';
import type { Story } from '../helpers.stories.js';
import { renderComponent } from '../helpers.stories.js';
import type { Theme } from './set-theme.js';
import { setTheme } from './set-theme.js';

const themes: Record<string, Theme | null> = {
  'web-light': webLightTheme,
  'web-dark': webDarkTheme,
  'team-light': teamsLightTheme,
  'team-dark': teamsDarkTheme,
  null: null,
};

function updateTheme(c: HTMLView, type = 'global') {
  const { value } = c.event.target as HTMLSelectElement;

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

const themeDescription = `
Flat object of theme tokens. Each object entry must follow these rules:

* Key: the name of the token, usually in camel case. It must be a valid CSS Custom Property name
  **without** the starting two dashes (\`--\`), the two dashes are added inside the function
* Value: must be a valid CSS value, e.g. it cannot contain semicolons (\`;\`)

Note that this argument is not limited to existing theme objects (from \`@fluentui/tokens\`),
you can pass in an arbitrary theme object as long as each entry’s value is either a string or a number.
`;

export default {
  title: 'Theme/SetTheme',
  decorators: [
    (story: any) => {
      (window as any).setTheme = setTheme;
      return story();
    },
  ],
};

const ComponentCloudTemplate = html`
  <p><fluent-button>A button</fluent-button></p>
  <p><fluent-spinner></fluent-spinner></p>
  <p>
    <fluent-text-input>
      <fluent-label>Text input</fluent-label>
    </fluent-text-input>
  </p>
  <fluent-divider></fluent-divider>
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
  <fluent-divider></fluent-divider>
  <p>
    <fluent-field>
      <label slot="label" for="radiogroup">Radio group</label>
      <fluent-radio-group slot="input" id="radiogroup" orientation="vertical">
        <fluent-field label-position="after">
          <fluent-radio slot="input" id="radiogroup-radio-1"></fluent-radio>
          <label slot="label" for="radiogroup-radio-1">Option 1</label>
        </fluent-field>
        <fluent-field label-position="after">
          <fluent-radio slot="input" id="radiogroup-radio-2"></fluent-radio>
          <label slot="label" for="radiogroup-radio-2">Option 2</label>
        </fluent-field>
        <fluent-field label-position="after">
          <fluent-radio slot="input" id="radiogroup-radio-3"></fluent-radio>
          <label slot="label" for="radiogroup-radio-3">Option 3</label>
        </fluent-field>
      </fluent-radio-group>
    </fluent-field>
  </p>
  <fluent-divider></fluent-divider>
  <p>
    <fluent-field label-position="after">
      <label slot="label" for="checkbox">I would like this option</label>
      <fluent-checkbox slot="input" id="checkbox"></fluent-checkbox>
    </fluent-field>
  </p>
  <fluent-divider></fluent-divider>
  <p>
    <fluent-slider step="10" min="0" max="100"></fluent-slider>
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
        margin-block-start: 0.5rem;
        padding: 0.5rem;
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
