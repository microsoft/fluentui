import './define.js';

const itemRenderer = () => {
  const horizontalbarchart = document.createElement('fluent-horizontal-bar-chart');
  return horizontalbarchart;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
