import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition as buttonDefinition } from '../button/button.definition.js';
import { definition as splitButtonDefinition } from './split-button.definition.js';

splitButtonDefinition.define(FluentDesignSystem.registry);
buttonDefinition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const splitButton = document.createElement('fluent-split-button');
  const button = document.createElement('fluent-button');
  const button2 = document.createElement('fluent-button');
  button.appendChild(document.createTextNode('Primary Button'));
  button2.appendChild(document.createTextNode('Menu Button'));

  splitButton.appendChild(button);
  splitButton.appendChild(button2);

  return splitButton;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
