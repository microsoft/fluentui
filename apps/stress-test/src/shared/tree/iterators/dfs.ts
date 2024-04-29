import { TreeNode } from '../types';

type TreeResult<T> = {
  node: T;
  index: number;
};

export const dfsIterator = <T>(tree: TreeNode<T>): Iterable<TreeResult<T>> => {
  let index = 0;
  return {
    *[Symbol.iterator]() {
      const stack = [tree];
      while (stack.length) {
        const item = stack.pop()!;
        if (item.children.length) {
          let i = item.children.length - 1;
          while (i > -1) {
            stack.push(item.children[i]);
            i--;
          }
        }

        yield { node: item.value, index };
        index++;
      }
    },
  };
};
