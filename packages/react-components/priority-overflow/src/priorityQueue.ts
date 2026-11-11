export type PriorityQueueCompareFn<T> = (a: T, b: T) => number;

export interface PriorityQueue<T> extends Iterable<T> {
  clear: () => void;
  contains: (item: T) => boolean;
  dequeue: () => T;
  enqueue: (item: T) => void;
  peek: () => T | null;
  remove: (item: T) => void;
  size: () => number;
}

/**
 * @param compare - comparison function for items
 * @returns Priority queue implemented with a min heap
 */
export function createPriorityQueue<T>(compare: PriorityQueueCompareFn<T>): PriorityQueue<T> {
  const arr: T[] = [];
  let size = 0;

  const swap = (a: number, b: number) => {
    const tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
  };

  const heapify = (i: number) => {
    let smallest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;

    if (l < size && compare(arr[l], arr[smallest]) < 0) {
      smallest = l;
    }

    if (r < size && compare(arr[r], arr[smallest]) < 0) {
      smallest = r;
    }

    if (smallest !== i) {
      swap(smallest, i);
      heapify(smallest);
    }
  };

  const removeAt = (index: number) => {
    swap(index, --size);
    arr.pop();
    heapify(index);
  };

  const dequeue = () => {
    if (!size) {
      throw new Error('Priority queue empty');
    }

    const res = arr[0];
    removeAt(0);

    return res;
  };

  const peek = () => (size ? arr[0] : null);

  const enqueue = (item: T) => {
    arr[size++] = item;
    let i = size - 1;
    // eslint-disable-next-line no-bitwise
    let p = (i - 1) >>> 1;
    while (i > 0 && compare(arr[p], arr[i]) > 0) {
      swap(p, i);
      i = p;
      // eslint-disable-next-line no-bitwise
      p = (i - 1) >>> 1;
    }
  };

  const contains = (item: T) => arr.indexOf(item) >= 0;

  const remove = (item: T) => {
    const i = arr.indexOf(item);

    if (i === -1) {
      return;
    }

    removeAt(i);
  };

  const clear = () => {
    arr.length = size = 0;
  };

  return {
    clear,
    contains,
    dequeue,
    enqueue,
    peek,
    remove,
    size: () => size,
    [Symbol.iterator]: () => arr.values(),
  };
}
