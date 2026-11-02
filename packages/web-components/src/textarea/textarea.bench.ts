import './define.js';

const itemRenderer = () => {
  const textarea = document.createElement('fluent-textarea');
  return textarea;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
