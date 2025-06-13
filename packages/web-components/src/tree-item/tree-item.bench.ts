import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './tree-item.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const treeItem = document.createElement('fluent-tree-item');
  return treeItem;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
