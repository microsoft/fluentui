import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './badge.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const badge = document.createElement('fluent-badge');
  badge.appendChild(document.createTextNode('Badge'));
  return badge;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
