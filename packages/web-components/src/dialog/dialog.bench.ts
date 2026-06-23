import './define.js';

const itemRenderer = () => {
  const dialog = document.createElement('fluent-dialog');
  dialog.appendChild(document.createTextNode('Dialog'));

  return dialog;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
