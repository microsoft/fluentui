import './define.js';

const itemRenderer = () => {
  const avatar = document.createElement('fluent-avatar');
  return avatar;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
