import './define.js';

const itemRenderer = () => {
  const btn = document.createElement('fluent-link');
  btn.appendChild(document.createTextNode('Link'));
  return btn;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
