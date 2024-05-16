import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './compound-button.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const compoundButton = document.createElement('fluent-compound-button');
  const description = document.createElement('span');
  description.setAttribute('slot', 'description');
  description.appendChild(document.createTextNode('Description'));
  compoundButton.appendChild(document.createTextNode('Button'));
  compoundButton.appendChild(description);
  return compoundButton;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
