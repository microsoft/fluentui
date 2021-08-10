import { fluentMenu } from './index';

export default {
  title: 'Components/Menu',
  component: fluentMenu,
};

const menuTemplate = () => `
  <fluent-menu>
    <fluent-menu-item>Menu item 1</fluent-menu-item>
    <fluent-menu-item>Menu item 2</fluent-menu-item>
    <fluent-menu-item disabled="true">Menu item 3</fluent-menu-item>
    <fluent-menu-item>
      Menu item 4
      <div slot="end">Shortcut text</div>
    </fluent-menu-item>
  </fluent-menu>
`;

export const Menu = menuTemplate.bind({});
