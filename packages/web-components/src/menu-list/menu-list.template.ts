import { ElementViewTemplate } from '@microsoft/fast-element';
import { menuTemplate } from '@microsoft/fast-foundation/menu.js';
import type { MenuList } from './menu-list.js';

export const template: ElementViewTemplate<MenuList> = menuTemplate();
