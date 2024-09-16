import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './text-input.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const textInput = document.createElement('fluent-text-input');
  return textInput;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
