import { RandomSelector } from '../css/RandomSelector.js';
import { TreeNode, TreeNodeCreateCallback } from './RandomTree.js';
import { random } from '../utils/random.js';

export type Attribute = {
  key: string;
  value: string | undefined;
  selector: string;
};

export type RandomSelectorTreeNode = {
  name: string;
  classNames: string[];
  attributes: Attribute[];
  siblings: string[];
  pseudos: string[];
};

export type SelectorTreeNode = TreeNode<RandomSelectorTreeNode>;

const { coin, choice } = random();
const randomSelector = new RandomSelector();

const chances: { [key: string]: number } = {
  not: 0.05,
  addClassName: 0.5,
  addAttribute: 0.25,
  buildDescendentSelector: 0.75,
  addSibling: 0.25,
  addPseudo: 0.25,
  useDescendantCombinator: 0.2,
};

const buildDescendentSelector = <T extends RandomSelectorTreeNode>(
  node: TreeNode<T> | null,
  selector: string = '',
): string => {
  if (!node) {
    return selector;
  }

  selector = (
    maybeNot(choice(getSelectorsFromNode(node))) +
    (coin(chances.useDescendantCombinator) ? ' > ' : ' ') +
    selector
  ).trim();

  if (coin(chances.buildDescendentSelector)) {
    selector = buildDescendentSelector(node.parent, selector);
  }

  return selector;
};

const getNodeClassNames = () => {
  const nodeSelectors = [randomSelector.randomSelector(['class'])];
  if (coin(chances.addClassName)) {
    nodeSelectors.push(randomSelector.randomSelector(['class']));
  }

  return nodeSelectors;
};

const maybeNot = (selector: string): string => {
  if (coin(chances.not)) {
    return `:not(${selector})`;
  }

  return selector;
};

const getAttributes = () => {
  const attributes = [];
  if (coin(chances.addAttribute)) {
    const selector = randomSelector.randomSelector(['attribute-name', 'attribute-value']);
    const [key, value] = selector.replace(/(\[|\])/g, '').split('=');
    attributes.push({ key, value, selector });
  }

  return attributes;
};

const getSiblingSelectors = () => {
  const siblings = [];

  if (coin(chances.addSibling)) {
    siblings.push(randomSelector.randomSelector(['nth-child']));
  }

  return siblings;
};

const getPseudoSelectors = () => {
  const pseudo = [];

  if (coin(chances.addPsuedo)) {
    pseudo.push(randomSelector.randomSelector(['pseudo-element']));
  }

  return pseudo;
};

const getSelectorsFromNode = (node: TreeNode<RandomSelectorTreeNode>): string[] => {
  return [
    ...node.value.classNames,
    ...node.value.attributes.map(attr => attr.selector),
    ...node.value.siblings,
    ...node.value.pseudos,
  ];
};

export type RandomSelectorTreeCreator = (selectors: string[]) => TreeNodeCreateCallback<RandomSelectorTreeNode>;

export const selectorTreeCreator: RandomSelectorTreeCreator = selectors => {
  const createSelectorTree: TreeNodeCreateCallback<RandomSelectorTreeNode> = (parent, depth, breadth) => {
    const node = {
      value: {
        name: `${depth}-${breadth}`,
        classNames: getNodeClassNames(),
        attributes: getAttributes(),
        siblings: getSiblingSelectors(),
        pseudos: getPseudoSelectors(),
      },
      children: [],
      parent,
    };

    if (coin(chances.buildDescendentSelector)) {
      const descendentSelector = buildDescendentSelector(node);
      selectors.push(descendentSelector);
    } else {
      selectors.push(...getSelectorsFromNode(node));
    }

    return node;
  };

  return createSelectorTree;
};
