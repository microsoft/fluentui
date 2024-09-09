import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './divider.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const divider = document.createElement('fluent-divider');
  return divider;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
