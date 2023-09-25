import { fluentMenu } from './index';

export default {
  title: 'Components/Menu',
  component: fluentMenu,
};

const MenuTemplate = () => `
  <fluent-menu>
    <fluent-menu-item>Menu item 1</fluent-menu-item>
    <fluent-menu-item>
      Menu item 2
      <fluent-menu>
        <fluent-menu-item>Nested Menu item 2.1</fluent-menu-item>
        <fluent-menu-item>
          Nested Menu item 2.2
          <fluent-menu>
            <fluent-menu-item>Nested Menu item 2.2.1</fluent-menu-item>
            <fluent-menu-item>Nested Menu item 2.2.2</fluent-menu-item>
            <fluent-menu-item>Nested Menu item 2.2.3</fluent-menu-item>
          </fluent-menu>
        </fluent-menu-item>
        <fluent-menu-item>Nested Menu item 2.3</fluent-menu-item>
      </fluent-menu>
    </fluent-menu-item>
    <fluent-menu-item disabled="true">Menu item 3</fluent-menu-item>
    <fluent-menu-item>
      Menu item 4
      <div slot="end">Shortcut text</div>
    </fluent-menu-item>
  </fluent-menu>
`;

export const Menu = MenuTemplate.bind({});

const example = `
<fluent-menu>
  <fluent-menu-item>Menu item 1</fluent-menu-item>
  <fluent-menu-item>
    Menu item 2
    <fluent-menu>
      <fluent-menu-item>Nested Menu item 2.1</fluent-menu-item>
      <fluent-menu-item>Nested Menu item 2.2</fluent-menu-item>
      <fluent-menu-item>Nested Menu item 2.3</fluent-menu-item>
    </fluent-menu>
  </fluent-menu-item>
  <fluent-menu-item disabled="true">Menu item 3</fluent-menu-item>
  <fluent-menu-item>
    Menu item 4
    <div slot="end">Shortcut text</div>
  </fluent-menu-item>
</fluent-menu>
`;

Menu.parameters = {
  docs: {
    source: {
      code: example,
    },
  },
};
