import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './counter-badge.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const counterBadge = document.createElement('fluent-counter-badge');
  counterBadge.setAttribute('count', '5');
  return counterBadge;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
