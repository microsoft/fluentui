import { TestOptions } from '../utils/testOptions';
import { SelectorTreeNode } from '../tree/types';
import { DOMSelectorTreeComponentRenderer } from './types';
import { renderVanillaTree } from './VanillaTree';

const itemRenderer =
  (componentRenderer: DOMSelectorTreeComponentRenderer) =>
  (node: SelectorTreeNode, depth: number, index: number): HTMLElement => {
    const { value } = node;

    const div = document.createElement('div');
    div.classList.add(...value.classNames.map(cn => cn.substring(1)));
    value.attributes.forEach(attr => {
      div.setAttribute(attr.key, attr.value ?? '');
    });

    div.style.marginLeft = `${depth * 10}px`;
    div.appendChild(componentRenderer(node, depth, index));

    return div;
  };

export const renderVanillaSelectorTree = (
  tree: SelectorTreeNode,
  _selectors: string[],
  componentRenderer: DOMSelectorTreeComponentRenderer,
  _testOptions: TestOptions,
): HTMLElement => {
  const vanillaTree = renderVanillaTree(tree, itemRenderer(componentRenderer));
  return vanillaTree;
};
