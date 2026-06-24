import './define.js';

const itemRenderer = () => {
  const treeItem = document.createElement('fluent-tree-item');
  return treeItem;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
