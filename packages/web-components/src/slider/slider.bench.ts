import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './slider.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const slider = document.createElement('fluent-slider');
  return slider;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
