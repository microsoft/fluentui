import { FluentDesignSystemProvider } from '../design-system-provider';
import { FluentMenuItem } from '../menu-item';
import MenuTemplate from './fixtures/menu.html';
import { FluentMenu } from '.';

// Prevent tree-shaking
FluentMenu;
FluentMenuItem;
FluentDesignSystemProvider;

export default {
  title: 'Menu',
};

export const Menu = (): string => MenuTemplate;
