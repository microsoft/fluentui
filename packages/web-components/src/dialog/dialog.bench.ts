import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition } from './dialog.definition.js';

definition.define(FluentDesignSystem.registry);

const itemRenderer = () => {
  const dialog = document.createElement('fluent-dialog');
  dialog.appendChild(document.createTextNode('Dialog'));

  return dialog;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
