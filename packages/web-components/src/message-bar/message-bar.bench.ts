import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './message-bar.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const messageBar = document.createElement('fluent-message-bar');
  messageBar.appendChild(document.createTextNode('message-bar'));
  return messageBar;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
