import './define.js';

const itemRenderer = () => {
  const progressBar = document.createElement('fluent-progress-bar');
  return progressBar;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
