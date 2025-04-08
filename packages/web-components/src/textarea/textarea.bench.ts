import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './textarea.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const textarea = document.createElement('fluent-textarea');
  return textarea;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
