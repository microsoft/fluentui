import { FASTDesignSystemProvider } from '../design-system-provider';
import MenuItemTemplate from './fixtures/menu-item.html';
import { FASTMenuItem } from '.';

// Prevent tree-shaking
FASTMenuItem;
FASTDesignSystemProvider;

export default {
  title: 'Menu item',
};

export const MenuItem = (): string => MenuItemTemplate;
