import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition as optionDefinition } from '../option/option.definition.js';

optionDefinition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const option = document.createElement('fluent-option');
  option.appendChild(document.createTextNode('Label'));
  option.setAttribute('value', 'value');

  return option;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
