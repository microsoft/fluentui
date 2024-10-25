import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition as dropdownListDefinition } from '../dropdown-list/dropdown-list.definition.js';
import { definition as optionDefinition } from '../option/option.definition.js';

dropdownListDefinition.define(FluentDesignSystem.registry);
optionDefinition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const dropdownList = document.createElement('fluent-dropdown-list');
  const option1 = document.createElement('fluent-option');
  const option2 = document.createElement('fluent-option');
  const option3 = document.createElement('fluent-option');

  option1.appendChild(document.createTextNode('Option 1'));
  option2.appendChild(document.createTextNode('Option 2'));
  option3.appendChild(document.createTextNode('Option 3'));
  option1.setAttribute('value', '1');
  option2.setAttribute('value', '2');
  option3.setAttribute('value', '3');

  dropdownList.append(option1, option2, option3);

  return dropdownList;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
