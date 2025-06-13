import { FluentDesignSystem } from '@fluentui/web-components';
import { definition } from './horizontal-bar-chart.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const horizontalbarchart = document.createElement('fluent-horizontal-bar-chart');
  return horizontalbarchart;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
