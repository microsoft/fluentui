import './define.js';

const itemRenderer = () => {
  const radio = document.createElement('fluent-radio');
  radio.appendChild(document.createTextNode('Radio'));
  return radio;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
