import { LCG } from 'random-seedable';
import { RandomSelector } from '../../../src/shared/css/RandomSelector.js';
import { Attribute, RandomSelectorTreeNode, TreeNode, TreeNodeCreateCallback } from '../../../src/shared/tree/types';

const rando: LCG = new LCG(4212021);

const coin = (pTrue: number = 0.5): boolean => rando.coin(pTrue);
const choice = <T>(choices: T[]): T => rando.choice(choices);

const randomSelector = new RandomSelector();

const chances: { [key: string]: number } = {
  not: 0.05,
  addClassName: 0.5,
  addAttribute: 0.2,
  buildDescendentSelector: 0.5,
  addSibling: 0.1,
  addPseudo: 0.1,
  useDescendantCombinator: 0.2,
  useNonMatchingSelector: 0.5,
};

const nonMatchingSelector = '.non-matching-selector';

const buildDescendentSelector = <T extends RandomSelectorTreeNode>(
  node: TreeNode<T> | null,
  selector?: string,
): string => {
  if (!node) {
    return selector ?? '';
  }

  if (!selector) {
    selector = choice(getSelectorsFromNode(node, { pseudos: false }));
  }

  const parent = node.parent;

  if (!parent) {
    return selector;
  }

  let selectorChoices = getSelectorsFromNode(parent, { pseudos: false });
  if (coin(chances.useNonMatchingSelector)) {
    selectorChoices = [...selectorChoices, nonMatchingSelector];
  }

  selector = (
    maybeNot(choice(selectorChoices)) +
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
  const attributes = [] as Attribute[];
  if (coin(chances.addAttribute)) {
    const selector = randomSelector.randomSelector(['attribute-name', 'attribute-value']);
    const [key, value] = selector.replace(/(\[|\])/g, '').split('=');
    attributes.push({ key, value, selector });
  }

  return attributes;
};

const getSiblingSelectors = (
  parent: TreeNode<RandomSelectorTreeNode> | null,
  node: TreeNode<RandomSelectorTreeNode>,
) => {
  const siblings = [] as string[];

  if (parent && coin(chances.addSibling)) {
    const combinator = choice(['nth-child', '~', '+']);
    if (combinator === 'nth-child') {
      siblings.push(randomSelector.randomSelector(['nth-child']));
    } else {
      const sibling = choice(parent.children);
      if (!sibling) {
        return siblings;
      }
      const siblingSelectorType = choice(['classNames', 'attribute']);
      let siblingSelector;
      if (siblingSelectorType === 'classNames') {
        siblingSelector = choice(sibling.value.classNames) ?? '*';
      } else {
        siblingSelector = choice(sibling.value.attributes)?.selector ?? '*';
      }

      const nodeSelectorType = choice(['classNames', 'attribute']);
      let nodeSelector;
      if (nodeSelectorType === 'classNames') {
        nodeSelector = choice(node.value.classNames) ?? '*';
      } else {
        nodeSelector = choice(node.value.attributes)?.selector ?? '*';
      }
      siblings.push(`${siblingSelector} ${combinator} ${nodeSelector}`);
    }
  }

  return siblings;
};

const getPseudoSelectors = () => {
  const pseudo = [] as string[];

  if (coin(chances.addPsuedo)) {
    pseudo.push(randomSelector.randomSelector(['pseudo-element']));
  }

  return pseudo;
};

type IncludeOptions = {
  [k in keyof RandomSelectorTreeNode]?: boolean;
};
const getSelectorsFromNode = (node: TreeNode<RandomSelectorTreeNode>, include?: IncludeOptions): string[] => {
  const { classNames = true, attributes = true, siblings = true, pseudos = true } = include ?? {};

  let selectors = [] as string[];

  if (classNames) {
    selectors = selectors.concat(...node.value.classNames);
  }

  if (attributes) {
    selectors = selectors.concat(...node.value.attributes.map(attr => attr.selector));
  }

  if (siblings) {
    selectors = selectors.concat(...node.value.siblings);
  }

  if (pseudos) {
    selectors = selectors.concat(...node.value.pseudos);
  }

  return selectors;
};

export type RandomSelectorTreeCreator = (selectors: string[]) => TreeNodeCreateCallback<RandomSelectorTreeNode>;

export const selectorTreeCreator: RandomSelectorTreeCreator = selectors => {
  const createSelectorTree: TreeNodeCreateCallback<RandomSelectorTreeNode> = (parent, depth, breadth) => {
    const node = {
      value: {
        name: `${depth}-${breadth}`,
        classNames: getNodeClassNames(),
        attributes: getAttributes(),
        siblings: [] as string[],
        pseudos: getPseudoSelectors(),
      },
      children: [],
      parent,
    };

    node.value.siblings = getSiblingSelectors(parent, node);

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
