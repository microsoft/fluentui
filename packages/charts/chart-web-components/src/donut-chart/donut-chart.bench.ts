import './define.js';

const itemRenderer = () => {
  const donutChart = document.createElement('fluent-donut-chart');
  return donutChart;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
