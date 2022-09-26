import { random, Random } from '../utils/random.js';
import { TestFixture } from '../utils/testUtils.js';

type TreeParams = {
  minDepth?: number;
  maxDepth?: number;
  minBreadth?: number;
  maxBreadth?: number;
  seed?: number;
};

export type TreeNode<T> = {
  value: T;
  children: TreeNode<T>[];
  parent: TreeNode<T> | null;
};

export type TreeNodeCreateCallback<T> = (parent: TreeNode<T> | null, depth: number, breath: number) => TreeNode<T>;
export type TreeNodeVisitCallback<T> = (node: TreeNode<T>) => void;

/**
 * Exponential decay function.
 * See: https://www.cuemath.com/exponential-decay-formula/
 * @param a - Initial amount
 * @param r - Rate of decay
 * @param x - Decay interval
 * @returns Current amount after applying decay function.
 */
const decay = (a: number, r: number, x: number): number => {
  return a * Math.pow(1 - r, x);
};

export class RandomTree<T> {
  private numNodes: number;
  private minDepth: number;
  private maxDepth: number;
  private minBreadth: number;
  private maxBreadth: number;

  private rando: Random;

  constructor({ minDepth = 1, maxDepth = 15, minBreadth = 1, maxBreadth = 15, seed }: TreeParams = {}) {
    this.minDepth = minDepth;
    this.maxDepth = maxDepth;
    this.minBreadth = minBreadth;
    this.maxBreadth = maxBreadth;

    this.rando = random(seed);
    this.numNodes = 0;
  }

  public build = (createNode: TreeNodeCreateCallback<T>): TreeNode<T> => {
    this.numNodes = 1;
    const root = createNode(null, 0, 0);
    return this._doBuild(createNode, root, 1);
  };

  public fromFixture = (fixture: TestFixture['tree'], parent: TreeNode<T> | null = null): TreeNode<T> => {
    const root: TreeNode<T> = {
      value: fixture.value as T,
      children: [],
      parent,
    };

    for (const child of fixture.children) {
      root.children.push(this.fromFixture(child, root));
    }

    return root;
  };

  private _randomDepth = (max?: number): number => {
    return this.rando.range(this.minDepth, max ?? this.maxDepth);
  };

  private _randomBreadth = (max?: number): number => {
    return this.rando.range(this.minBreadth, max ?? this.maxBreadth);
  };

  private _doBuild = (
    createNode: TreeNodeCreateCallback<T>,
    parent: TreeNode<T>,
    currentDepth: number,
    currentBreadth: number = this.maxBreadth,
  ): TreeNode<T> => {
    const breadth = this._randomBreadth(currentBreadth);
    const depth = this._randomDepth(Math.max(this.maxDepth - currentDepth, this.minDepth));

    for (let i = 0; i < breadth; i++) {
      this.numNodes++;
      const node = createNode(parent, currentDepth, breadth);

      parent.children.push(node);

      if (currentDepth < depth) {
        this._doBuild(
          createNode,
          node,
          currentDepth + 1,
          Math.max(Math.ceil(decay(this.maxBreadth, 0.005, this.numNodes)), this.minBreadth),
        );
      }
    }

    return parent;
  };
}
