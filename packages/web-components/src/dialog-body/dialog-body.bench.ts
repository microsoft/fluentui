import './define.js';

const itemRenderer = () => {
  const dialogBody = document.createElement('fluent-dialog-body');
  dialogBody.appendChild(document.createTextNode('DialogBody'));

  return dialogBody;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
