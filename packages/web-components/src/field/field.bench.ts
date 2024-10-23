import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './field.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const field = document.createElement('fluent-field');
  return field;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
