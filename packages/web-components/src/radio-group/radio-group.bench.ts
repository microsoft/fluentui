import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition as radioDefinition } from '../radio/radio.definition.js';
import { definition as radioGroupDefinition } from './radio-group.definition.js';

radioGroupDefinition.define(FluentDesignSystem.registry);
radioDefinition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const radioGroup = document.createElement('fluent-radio-group');
  const radio = document.createElement('fluent-radio');
  const radio2 = document.createElement('fluent-radio');
  const radio3 = document.createElement('fluent-radio');
  radio.appendChild(document.createTextNode('Radio 1'));
  radio2.appendChild(document.createTextNode('Radio 2'));
  radio3.appendChild(document.createTextNode('Radio 3'));

  radioGroup.appendChild(radio);
  radioGroup.appendChild(radio2);
  radioGroup.appendChild(radio3);

  return radioGroup;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
