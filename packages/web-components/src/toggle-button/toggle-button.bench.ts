import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './toggle-button.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const btn = document.createElement('fluent-toggle-button');
  btn.appendChild(document.createTextNode('Toggle button'));
  return btn;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
