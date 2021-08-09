import MenuItemTemplate from './fixtures/menu-item.html';
import './index';

export default {
  title: 'Components/Menu Item',
  argTypes: {
    checked: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export const MenuItem = () => MenuItemTemplate;
