import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './menu-item.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const menuItem = document.createElement('fluent-menu-item');
  menuItem.appendChild(document.createTextNode('Menu item'));
  return menuItem;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
