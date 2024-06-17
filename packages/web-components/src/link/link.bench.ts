import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './link.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const btn = document.createElement('fluent-link');
  btn.appendChild(document.createTextNode('Link'));
  return btn;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
