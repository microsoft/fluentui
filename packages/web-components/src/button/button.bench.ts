import './define.js';

const itemRenderer = () => {
  const button = document.createElement('fluent-button');
  button.appendChild(document.createTextNode('Button'));
  return button;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
