import './define.js';

const itemRenderer = () => {
  const spinner = document.createElement('fluent-spinner');
  return spinner;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
