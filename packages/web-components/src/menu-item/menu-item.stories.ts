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

const menuItemTemplate = ({ checked, disabled }) => `
  <fluent-menu-item 
    checked="${checked}"
    ${disabled ? 'disabled' : ''}
  >Menu item 1</fluent-menu-item>
`;

export const MenuItem = menuItemTemplate.bind({});
