import { fluentMenuItem } from './index';

export default {
  title: 'Components/Menu Item',
  component: fluentMenuItem,
  argTypes: {
    checked: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

const MenuItemTemplate = ({ checked, disabled }) => `
  <fluent-menu-item
    ${checked ? 'checked role="menuitemcheckbox"' : ''}
    ${disabled ? 'disabled' : ''}
  >Menu item 1</fluent-menu-item>
`;

export const MenuItem = MenuItemTemplate.bind({});

MenuItem.args = {
  disabled: false,
  checked: false,
};

const example = `
<fluent-menu-item>Menu item</fluent-menu-item>
`;

MenuItem.parameters = {
  docs: {
    source: {
      code: example,
    },
  },
};
