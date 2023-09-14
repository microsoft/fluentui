import { fluentTextField, provideFluentDesignSystem } from '@fluentui/web-components';
import { DOMSelectorTreeComponentRenderer } from '../../shared/vanilla/types';

provideFluentDesignSystem().register(fluentTextField());

const componentRenderer: DOMSelectorTreeComponentRenderer = (node, depth, index) => {
  const field = document.createElement('fluent-text-field') as HTMLInputElement;
  field.value = node.value.name + ' ' + index;

  return field;
};

export default componentRenderer;
