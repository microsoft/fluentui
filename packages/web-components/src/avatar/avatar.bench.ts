import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './avatar.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const avatar = document.createElement('fluent-avatar');
  return avatar;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
