import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './radio.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const radio = document.createElement('fluent-radio');
  radio.appendChild(document.createTextNode('Radio'));
  return radio;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
