import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition as tabDefinition } from '../tab/tab.definition.js';
import { definition as tabPanelDefinition } from '../tab-panel/tab-panel.definition.js';
import { definition as tabsDefinition } from './tabs.definition.js';

tabDefinition.define(FluentDesignSystem.registry);
tabPanelDefinition.define(FluentDesignSystem.registry);
tabsDefinition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const tabs = document.createElement('fluent-tabs');
  const tabPanel = document.createElement('fluent-tab-panel');
  const tabPanel2 = document.createElement('fluent-tab-panel');
  const tabPanel3 = document.createElement('fluent-tab-panel');
  const tab = document.createElement('fluent-tab');
  const tab2 = document.createElement('fluent-tab');
  const tab3 = document.createElement('fluent-tab');

  tab.appendChild(document.createTextNode('Tab 1'));
  tab2.appendChild(document.createTextNode('Tab 2'));
  tab3.appendChild(document.createTextNode('Tab 3'));

  tabPanel.appendChild(document.createTextNode('Tab Panel 1'));
  tabPanel2.appendChild(document.createTextNode('Tab Panel 2'));
  tabPanel3.appendChild(document.createTextNode('Tab Panel 3'));

  tabs.appendChild(tab);
  tabs.appendChild(tab2);
  tabs.appendChild(tab3);
  tabs.appendChild(tabPanel);
  tabs.appendChild(tabPanel2);
  tabs.appendChild(tabPanel3);

  return tabs;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
