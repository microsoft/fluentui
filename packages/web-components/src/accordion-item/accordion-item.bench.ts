import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './accordion-item.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const item = document.createElement('fluent-accordion-item');
  const text = document.createElement('span');
  text.setAttribute('slot', 'heading');
  text.appendChild(document.createTextNode('Accordion item'));
  item.appendChild(text);
  return item;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
