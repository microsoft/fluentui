import { DOMSelectorTreeComponentRenderer } from '../../../shared/vanilla/types';

const componentRenderer: DOMSelectorTreeComponentRenderer = (node, depth, index) => {
  const input = document.createElement('input');
  input.type = 'number';
  input.value = node.value.name + ' ' + index;

  return input;
};

export default componentRenderer;
