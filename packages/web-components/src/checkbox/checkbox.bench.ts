import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './checkbox.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const checkbox = document.createElement('fluent-checkbox');
  checkbox.appendChild(document.createTextNode('Checkbox'));
  return checkbox;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
