import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition as menuButtonDefinition } from '../menu-button/menu-button.definition.js';
import { definition as menuItemDefinition } from '../menu-item/menu-item.definition.js';
import { definition as menuListDefinition } from '../menu-list/menu-list.definition.js';
import { definition as menuDefinition } from './menu.definition.js';

menuDefinition.define(FluentDesignSystem.registry);
menuButtonDefinition.define(FluentDesignSystem.registry);
menuListDefinition.define(FluentDesignSystem.registry);
menuItemDefinition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const menu = document.createElement('fluent-menu');
  const menuButton = document.createElement('fluent-menu-button');
  const menuList = document.createElement('fluent-menu-list');
  const menuItem = document.createElement('fluent-menu-item');
  const menuItem2 = document.createElement('fluent-menu-item');
  const menuItem3 = document.createElement('fluent-menu-item');

  menuButton.setAttribute('slot', 'trigger');
  menuButton.appendChild(document.createTextNode('Menu button'));
  menuItem.appendChild(document.createTextNode('Menu item 1'));
  menuItem2.appendChild(document.createTextNode('Menu item 2'));
  menuItem3.appendChild(document.createTextNode('Menu item 3'));

  menuList.appendChild(menuItem);
  menuList.appendChild(menuItem2);
  menuList.appendChild(menuItem3);

  menu.appendChild(menuList);
  menu.appendChild(menuButton);

  return menu;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
