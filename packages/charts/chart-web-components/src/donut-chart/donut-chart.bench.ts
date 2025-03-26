import { FluentDesignSystem } from '@fluentui/web-components';
import { definition } from './donut-chart.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const donutChart = document.createElement('fluent-donut-chart');
  return donutChart;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
