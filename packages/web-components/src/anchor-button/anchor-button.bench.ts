import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './anchor-button.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const btn = document.createElement('fluent-anchor-button');
  btn.appendChild(document.createTextNode('Anchor button'));
  return btn;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
