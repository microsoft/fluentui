import { html } from '@microsoft/fast-element';
import { teamsDarkTheme, teamsLightTheme, webDarkTheme, webLightTheme } from '@fluentui/tokens';

import type { Story } from '../helpers.stories.js';
import { renderComponent } from '../helpers.stories.js';
import type { Theme } from './set-theme.js';
import { setTheme } from './set-theme.js';

const fluentTheme: Record<string, Theme> = {
  webLightTheme,
  webDarkTheme,
  teamsLightTheme,
  teamsDarkTheme,
};

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
  argTypes: {
    theme: {
      type: 'string',
      control: 'select',
      options: Object.keys(fluentTheme),
      description: themeDescription,
    },
  },
  args: {
    theme: 'webLightTheme',
  },
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

export const SetTheme: Story = renderComponent(ComponentCloudTemplate);
SetTheme.decorators = [
  (Story, { args: { theme } }) => {
    theme && setTheme(fluentTheme[theme]);
    return Story();
  },
];
