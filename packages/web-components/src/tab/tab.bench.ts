import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './tab.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const tab = document.createElement('fluent-tab');
  tab.appendChild(document.createTextNode('tab'));
  return tab;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
