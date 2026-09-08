import './define.js';

const itemRenderer = () => {
  const textInput = document.createElement('fluent-text-input');
  return textInput;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
