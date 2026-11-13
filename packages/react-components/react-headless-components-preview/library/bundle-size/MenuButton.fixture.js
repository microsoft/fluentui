// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import { MenuButton, renderMenuButton, useMenuButton } from '@fluentui/react-headless-components-preview/menu-button';

console.log(MenuButton, renderMenuButton, useMenuButton);

export default {
  name: '@fluentui/react-headless-components-preview/menu-button',
};
