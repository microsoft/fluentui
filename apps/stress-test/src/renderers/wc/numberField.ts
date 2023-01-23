import { fluentNumberField, NumberField, provideFluentDesignSystem } from '@fluentui/web-components';
import { DOMSelectorTreeComponentRenderer } from '../../shared/vanilla/types';

provideFluentDesignSystem().register(fluentNumberField());

const componentRenderer: DOMSelectorTreeComponentRenderer = (node, depth, index) => {
  const numberField = document.createElement('fluent-number-field') as NumberField;
  numberField.value = node.value.name + ' ' + index;

  return numberField;
};

export default componentRenderer;
