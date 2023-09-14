import { DOMSelectorTreeComponentRenderer } from '../../../shared/vanilla/types';

const componentRenderer: DOMSelectorTreeComponentRenderer = (node, depth, index) => {
  const btn = document.createElement('button');
  btn.innerHTML = node.value.name + ' ' + index;
  btn.classList.add('random-classname-6eb7ea7');

  return btn;
};

export default componentRenderer;
