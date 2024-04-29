import { fluentButton, provideFluentDesignSystem } from '@fluentui/web-components';
import { DOMSelectorTreeComponentRenderer } from '../../shared/vanilla/types';

provideFluentDesignSystem().register(fluentButton());

const componentRenderer: DOMSelectorTreeComponentRenderer = (node, depth, index) => {
  const btn = document.createElement('fluent-button') as HTMLElement;
  btn.textContent = node.value.name + ' ' + index;

  return btn;
};

export default componentRenderer;
