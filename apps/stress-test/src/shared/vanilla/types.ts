import { SelectorTreeNode } from '../tree/types';

export type DOMSelectorTreeComponentRenderer = (node: SelectorTreeNode, depth: number, index: number) => HTMLElement;
