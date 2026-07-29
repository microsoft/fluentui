import '../radio/define.js';
import './define.js';

const itemRenderer = () => {
  const radioGroup = document.createElement('fluent-radio-group');
  const radio = document.createElement('fluent-radio');
  const radio2 = document.createElement('fluent-radio');
  const radio3 = document.createElement('fluent-radio');
  radio.appendChild(document.createTextNode('Radio 1'));
  radio2.appendChild(document.createTextNode('Radio 2'));
  radio3.appendChild(document.createTextNode('Radio 3'));

  radioGroup.appendChild(radio);
  radioGroup.appendChild(radio2);
  radioGroup.appendChild(radio3);

  return radioGroup;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
