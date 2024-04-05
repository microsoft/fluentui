import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './progress-bar.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const progressBar = document.createElement('fluent-progress-bar');
  return progressBar;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
