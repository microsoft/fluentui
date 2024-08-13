import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './button.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const button = document.createElement('fluent-button');
  button.appendChild(document.createTextNode('Button'));
  return button;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
