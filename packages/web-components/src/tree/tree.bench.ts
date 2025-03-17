import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './tree.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const tree = document.createElement('fluent-tree');
  return tree;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
