import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './spinner.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const spinner = document.createElement('fluent-spinner');
  return spinner;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
