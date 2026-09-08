import './define.js';

const itemRenderer = () => {
  const field = document.createElement('fluent-field');
  return field;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
