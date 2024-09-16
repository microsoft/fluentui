import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition as menuItemDefinition } from '../menu-item/menu-item.definition.js';
import { definition as menuListDefinition } from './menu-list.definition.js';

menuListDefinition.define(FluentDesignSystem.registry);
menuItemDefinition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const menuList = document.createElement('fluent-menu-list');
  const menuItem = document.createElement('fluent-menu-item');
  const menuItem2 = document.createElement('fluent-menu-item');
  const menuItem3 = document.createElement('fluent-menu-item');

  menuItem.appendChild(document.createTextNode('Menu item 1'));
  menuItem2.appendChild(document.createTextNode('Menu item 2'));
  menuItem3.appendChild(document.createTextNode('Menu item 3'));

  menuList.appendChild(menuItem);
  menuList.appendChild(menuItem2);
  menuList.appendChild(menuItem3);

  return menuList;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
