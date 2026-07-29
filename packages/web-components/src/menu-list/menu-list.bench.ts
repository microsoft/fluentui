import '../menu-item/define.js';
import './define.js';

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
