import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './switch.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const switchEl = document.createElement('fluent-switch');
  switchEl.appendChild(document.createTextNode('Switch'));
  return switchEl;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
