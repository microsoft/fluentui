import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition as tabDefinition } from '../tab/tab.definition.js';
import { definition as tabPanelDefinition } from './tab-panel.definition.js';

tabDefinition.define(FluentDesignSystem.registry);
tabPanelDefinition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const tabPanel = document.createElement('fluent-tab-panel');
  tabPanel.appendChild(document.createTextNode('Tab Panel 1'));
  return tabPanel;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
