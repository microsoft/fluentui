import * as React from 'react';

import { RandomTree, TreeNode } from '../tree/RandomTree';
import { ReactTree } from './ReactTree';
import { selectorTreeCreator, RandomSelectorTreeNode } from '../tree/RandomSelectorTreeNode';
import { performanceMeasure } from '../performanceMeasure';
import { injectGlobalCss, randomCssFromSelectors } from '../css/injectStyles';

export type ReactSelectorTreeNode = TreeNode<RandomSelectorTreeNode>;

export type ReactSelectorTreeComponentRenderer = (
  node: ReactSelectorTreeNode,
  depth: number,
  index: number,
) => JSX.Element;

type ReactSelectorTreeProps = Partial<{
  minBreadth: number;
  maxBreadth: number;
  minDepth: number;
  maxDepth: number;
  seed: number;
  injectStyles: boolean;
  styleInjector: (selectors: string[]) => HTMLStyleElement;
}> & {
  componentRenderer: ReactSelectorTreeComponentRenderer;
};

type ReactSelectorTreeState = {
  tree: ReactSelectorTreeNode;
  selectors: string[];
};

const buildRenderer = (componentRenderer: ReactSelectorTreeComponentRenderer) => {
  const renderer = (node: ReactSelectorTreeNode, depth: number, index: number): JSX.Element => {
    const { value } = node;

    const className = value.classNames.map(cn => cn.substring(1)).join(' ');
    const attrs = value.attributes.reduce((map, attr) => {
      map[attr.key] = attr.value ?? '';
      return map;
    }, {} as { [key: string]: string });

    return (
      <div className={className} {...attrs} style={{ marginLeft: `${depth * 10}px` }}>
        {componentRenderer(node, depth, index)}
      </div>
    );
  };

  return renderer;
};

const styleInjector = (selectors: string[]): HTMLStyleElement => {
  performanceMeasure();
  return injectGlobalCss(randomCssFromSelectors(selectors));
};

export const ReactSelectorTree: React.FC<ReactSelectorTreeProps> = ({
  minBreadth,
  maxBreadth,
  minDepth,
  maxDepth,
  seed,
  injectStyles,
  componentRenderer,
}) => {
  const [data, setData] = React.useState({} as ReactSelectorTreeState);
  const styles = React.useRef<HTMLStyleElement>();

  React.useEffect(() => {
    const selectors = [] as string[];
    const treeBuilder = new RandomTree<RandomSelectorTreeNode>({ minBreadth, maxBreadth, minDepth, maxDepth, seed });
    const tree = treeBuilder.build(selectorTreeCreator(selectors));
    const dedupedSelectors = Array.from(new Set(selectors));

    setData({
      tree,
      selectors: dedupedSelectors,
    });
  }, [minBreadth, maxBreadth, minDepth, maxDepth, seed]);

  React.useEffect(() => {
    if (!injectStyles && styles.current) {
      document.head.removeChild(styles.current);
      styles.current = undefined;
    } else if (injectStyles && !styles.current) {
      styles.current = styleInjector(data.selectors);
    }
  }, [injectStyles]);

  return <>{data.tree ? <ReactTree tree={data.tree} itemRenderer={buildRenderer(componentRenderer)} /> : null}</>;
};
