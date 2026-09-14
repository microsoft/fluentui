import './define.js';

const itemRenderer = () => {
  const btn = document.createElement('fluent-anchor-button');
  btn.appendChild(document.createTextNode('Anchor button'));
  return btn;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
