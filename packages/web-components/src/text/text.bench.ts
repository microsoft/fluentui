import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './text.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const text = document.createElement('fluent-text');
  const p = document.createElement('p');
  p.appendChild(document.createTextNode('text'));
  text.appendChild(p);
  return text;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
