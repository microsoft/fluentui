import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './button.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const btn = document.createElement('fluent-button');
  btn.appendChild(document.createTextNode('Fluent button'));
  return btn;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
