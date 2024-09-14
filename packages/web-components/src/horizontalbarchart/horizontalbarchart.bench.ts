import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './horizontalbarchart.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const horizontalbarchart = document.createElement('fluent-horizontalbarchart');
  return horizontalbarchart;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
