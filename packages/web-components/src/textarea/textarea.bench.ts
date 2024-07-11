import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './textarea.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const textInput = document.createElement('fluent-text-area');
  return textInput;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
