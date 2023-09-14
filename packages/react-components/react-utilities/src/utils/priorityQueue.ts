/**
 * @internal
 */
export type PriorityQueueCompareFn<T> = (a: T, b: T) => number;

/**
 * @internal
 */
export interface PriorityQueue<T> {
  all: () => T[];
  clear: () => void;
  contains: (item: T) => boolean;
  dequeue: () => T;
  enqueue: (item: T) => void;
  peek: () => T | null;
  remove: (item: T) => void;
  size: () => number;
}

/**
 * @internal
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
    const l = left(i);
    const r = right(i);

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

  const dequeue = () => {
    if (size === 0) {
      throw new Error('Priority queue empty');
    }

    const res = arr[0];
    arr[0] = arr[--size];
    heapify(0);

    return res;
  };

  const peek = () => {
    if (size === 0) {
      return null;
    }

    return arr[0];
  };

  const enqueue = (item: T) => {
    arr[size++] = item;
    let i = size - 1;
    let p = parent(i);
    while (i > 0 && compare(arr[p], arr[i]) > 0) {
      swap(p, i);
      i = p;
      p = parent(i);
    }
  };

  const contains = (item: T) => {
    const index = arr.indexOf(item);
    return index >= 0 && index < size;
  };

  const remove = (item: T) => {
    const i = arr.indexOf(item);

    if (i === -1 || i >= size) {
      return;
    }

    arr[i] = arr[--size];
    heapify(i);
  };

  const clear = () => {
    size = 0;
  };

  const all = () => {
    return arr.slice(0, size);
  };

  return {
    all,
    clear,
    contains,
    dequeue,
    enqueue,
    peek,
    remove,
    size: () => size,
  };
}

const left = (i: number) => {
  return 2 * i + 1;
};

const right = (i: number) => {
  return 2 * i + 2;
};

const parent = (i: number) => {
  return Math.floor((i - 1) / 2);
};
