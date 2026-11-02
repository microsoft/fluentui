import './define.js';

const itemRenderer = () => {
  const text = document.createElement('fluent-text');
  const p = document.createElement('p');
  p.appendChild(document.createTextNode('text'));
  text.appendChild(p);
  return text;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
