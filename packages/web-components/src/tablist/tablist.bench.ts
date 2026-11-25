import '../tab/define.js';
import './define.js';

const itemRenderer = () => {
  const tablist = document.createElement('fluent-tablist');
  const tab = document.createElement('fluent-tab');
  const tab2 = document.createElement('fluent-tab');
  const tab3 = document.createElement('fluent-tab');

  tab.appendChild(document.createTextNode('Tab 1'));
  tab2.appendChild(document.createTextNode('Tab 2'));
  tab3.appendChild(document.createTextNode('Tab 3'));

  tablist.appendChild(tab);
  tablist.appendChild(tab2);
  tablist.appendChild(tab3);

  return tablist;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
