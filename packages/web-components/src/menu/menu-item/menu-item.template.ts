import type { ElementViewTemplate } from '@microsoft/fast-element';
import { menuItemTemplate } from '@microsoft/fast-foundation';
import type { MenuItem } from './menu-item.js';

export const template: ElementViewTemplate<MenuItem> = menuItemTemplate();
