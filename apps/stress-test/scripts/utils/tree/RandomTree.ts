import { TreeNode, TreeNodeCreateCallback } from '../../../src/shared/tree/types';
import { TestTreeFixture } from '../../../src/shared/utils/testUtils.js';
import { LCG } from 'random-seedable';

const defaultSeed = 4212021;

type TreeParams = {
  minDepth?: number;
  maxDepth?: number;
  minBreadth?: number;
  maxBreadth?: number;
  seed?: number;
  targetSize?: number;
};

export class RandomTree<T> {
  private numNodes: number;
  private minDepth: number;
  private maxDepth: number;
  private minBreadth: number;
  private maxBreadth: number;
  private targetSize: number;

  private rando: LCG;

  constructor({
    minDepth = 1,
    maxDepth = 15,
    minBreadth = 1,
    maxBreadth = 15,
    seed = defaultSeed,
    targetSize,
  }: TreeParams = {}) {
    this.minDepth = Number(minDepth);
    this.maxDepth = Number(maxDepth);
    this.minBreadth = Number(minBreadth);
    this.maxBreadth = Number(maxBreadth);
    this.targetSize = targetSize ? Number(targetSize) : Infinity;

    this.rando = new LCG(seed);
    this.numNodes = 0;
  }

  public build = (createNode: TreeNodeCreateCallback<T>): TreeNode<T> => {
    this.numNodes = 1;
    const root = createNode(null, 0, 0);
    let tree = this._doBuild(createNode, root, 1);
    while (this.numNodes < this.targetSize) {
      tree = this._doBuild(createNode, root, 1);
    }

    return tree;
  };

  public fromFixture = (fixture: TestTreeFixture['tree'], parent: TreeNode<T> | null = null): TreeNode<T> => {
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
    return this.rando.randRange(this.minDepth, max ?? this.maxDepth);
  };

  private _randomBreadth = (max?: number): number => {
    return this.rando.randRange(this.minBreadth, max ?? this.maxBreadth);
  };

  private _doBuild = (
    createNode: TreeNodeCreateCallback<T>,
    parent: TreeNode<T>,
    currentDepth: number,
    currentBreadth: number = this.maxBreadth,
  ): TreeNode<T> => {
    const breadth = this._randomBreadth(currentBreadth);
    const depth = this._randomDepth(Math.max(this.maxDepth - currentDepth, this.minDepth));

    for (let i = 0; i < breadth && this.numNodes < this.targetSize; i++) {
      this.numNodes++;
      const node = createNode(parent, currentDepth, breadth);

      parent.children.push(node);

      if (currentDepth < depth && this.numNodes < this.targetSize) {
        this._doBuild(createNode, node, currentDepth + 1);
      }
    }

    return parent;
  };
}
