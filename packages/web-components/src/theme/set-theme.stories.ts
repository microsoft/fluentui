import { html, repeat, when } from '@microsoft/fast-element';
import { teamsDarkTheme, teamsLightTheme, webDarkTheme, webLightTheme } from '@fluentui/tokens';
import type { Meta } from '../helpers.stories.js';
import { renderComponent } from '../helpers.stories.js';
import type { Theme } from './set-theme.js';
import { setTheme } from './set-theme.js';
import { colorNeutralBackground2, colorNeutralForeground2 } from './design-tokens.js';

const themes: Map<string, Theme | null> = new Map([
  ['web-light', webLightTheme],
  ['web-dark', webDarkTheme],
  ['team-light', teamsLightTheme],
  ['team-dark', teamsDarkTheme],
  ['unset', null],
]);

function updateTheme(evt: Event, type = 'global') {
  const { value } = evt.target as HTMLSelectElement;

  if (themes.has(value) !== undefined) {
    switch (type) {
      case 'global':
        setTheme(themes.get(value)!);
        break;
      case 'local':
        setTheme(themes.get(value)!, document.querySelector('.local') as HTMLElement);
        break;
      case 'shadow':
        document.querySelectorAll('.shadow').forEach(el => {
          setTheme(themes.get(value)!, el as HTMLElement);
        });
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

Set to \`null\` to unset the theme.
`;

export default {
  title: 'Theme/SetTheme',
  argTypes: {
    theme: {
      description: themeDescription,
      control: false,
    },
    node: {
      description: 'The node or element to set theme on. Defaults to `Document`',
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A utility funciton to sets the theme tokens as CSS Custom Properties.',
      },
    },
  },
} as Meta;

const ComponentCloudTemplate = html`
  <p>
    <fluent-button>A button</fluent-button>
    <fluent-spinner></fluent-spinner>
    <fluent-slider step="10" min="0" max="100"></fluent-slider>
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
  <p>
    <fluent-text-input>
      <fluent-label>Text input</fluent-label>
    </fluent-text-input>
  </p>
  <p>
    <fluent-field>
      <label slot="label" for="radiogroup">Radio group</label>
      <fluent-radio-group slot="input" id="radiogroup">
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
  <p>
    <fluent-field label-position="after">
      <label slot="label" for="checkbox">I would like this option</label>
      <fluent-checkbox slot="input" id="checkbox"></fluent-checkbox>
    </fluent-field>
  </p>
  <p></p>
`;

const ThemeOptionsTemplate = (selected: string = '') => html`
  <option value="unset">unset</option>
  ${repeat(
    Array.from(themes.keys()),
    html`
      ${when(k => k !== 'unset', html` <option ?selected=${k => selected === k} value="${k => k}">${k => k}</option> `)}
    `,
  )}
`;

export const SetTheme = renderComponent(html`
  <style>
    .toolbar {
      align-items: end;
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

    .local,
    .shadow-container {
      background: ${colorNeutralBackground2};
      border: 1px solid #ccc;
      color: ${colorNeutralForeground2};
      padding: 1rem;
      margin-trim: block;

      & > :first-child {
        margin-block-start: 0 !important;
      }

      & > :last-child {
        margin-block-end: 0 !important;
      }

      .shadow {
        background: ${colorNeutralBackground2};
        color: ${colorNeutralForeground2};
      }
    }

    fluent-spinner {
      vertical-align: middle;
    }
  </style>

  <div class="toolbar">
    <label>
      Global theme
      <select @change="${(_, c) => updateTheme(c.event)}">
        ${ThemeOptionsTemplate('web-light')}
      </select>
    </label>

    <label>
      Local theme (element without shadow root)
      <select @change="${(_, c) => updateTheme(c.event, 'local')}">
        ${ThemeOptionsTemplate()}
      </select>
    </label>

    <label>
      Local theme (element with shadow root)
      <select @change="${(_, c) => updateTheme(c.event, 'shadow')}">
        ${ThemeOptionsTemplate()}
      </select>
    </label>
  </div>

  <div class="global">
    <p style="color: ${colorNeutralForeground2}">These elements follow the global theme</p>
    ${ComponentCloudTemplate}
  </div>

  <div class="local">
    <p style="color: ${colorNeutralForeground2}">These elements follow the container element’s theme</p>
    ${ComponentCloudTemplate}

    <div class="shadow-container">
      <p style="color: ${colorNeutralForeground2}">
        These elements (which have shadow roots) follow their own themes when set
      </p>
      <p>
        <fluent-text-input class="shadow">
          <fluent-label>Text input</fluent-label>
        </fluent-text-input>
      </p>
      <p>
        <fluent-menu class="shadow">
          <fluent-menu-button appearance="primary" slot="trigger">Toggle Menu</fluent-menu-button>
          <fluent-menu-list>
            <fluent-menu-item>Menu item 1</fluent-menu-item>
            <fluent-menu-item>Menu item 2</fluent-menu-item>
            <fluent-menu-item>Menu item 3</fluent-menu-item>
            <fluent-menu-item>Menu item 4</fluent-menu-item>
          </fluent-menu-list>
        </fluent-menu>
      </p>
    </div>
  </div>
`);
