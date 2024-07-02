import { FluentDesignSystem } from '../fluent-design-system.js';
import { treeViewDefinition } from './tree-view.definition.js';

treeViewDefinition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const treeItem = document.createElement('fluent-tree-view');
  return treeItem;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
