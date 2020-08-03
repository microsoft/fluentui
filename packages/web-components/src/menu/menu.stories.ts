import { FASTDesignSystemProvider } from '../design-system-provider';
import { FASTMenuItem } from '../menu-item';
import MenuTemplate from './fixtures/menu.html';
import { FASTMenu } from '.';

// Prevent tree-shaking
FASTMenu;
FASTMenuItem;
FASTDesignSystemProvider;

export default {
  title: 'Menu',
};

export const Menu = (): string => MenuTemplate;
