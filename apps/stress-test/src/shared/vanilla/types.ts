import { SelectorTreeNode } from '../tree/RandomSelectorTreeNode';

export type DOMSelectorTreeComponentRenderer = (node: SelectorTreeNode, depth: number, index: number) => HTMLElement;
