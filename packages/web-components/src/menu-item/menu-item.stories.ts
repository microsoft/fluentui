import { FluentDesignSystemProvider } from '../design-system-provider';
import MenuItemTemplate from './fixtures/menu-item.html';
import { FluentMenuItem } from '.';

// Prevent tree-shaking
FluentMenuItem;
FluentDesignSystemProvider;

export default {
  title: 'Menu item',
};

export const MenuItem = (): string => MenuItemTemplate;
