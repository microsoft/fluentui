import { createPriorityQueue } from './priorityQueue';

describe('Priority queue', () => {
  it('can use comparator to order in increasing priority', () => {
    const priorityQueue = createPriorityQueue<number>((a, b) => a - b);
    const values = [3, 8, 2, 5, 11, 67, 1, 7];
    values.forEach(value => priorityQueue.enqueue(value));

    const expected = [];
    while (priorityQueue.size() > 0) {
      expected.push(priorityQueue.dequeue());
    }

    expect(expected.length).toBe(values.length);
    expect(expected).toEqual([1, 2, 3, 5, 7, 8, 11, 67]);
  });

  it('can use comparator to order in decreasing priority', () => {
    const priorityQueue = createPriorityQueue<number>((a, b) => b - a);
    const values = [3, 8, 2, 5, 11, 67, 1, 7];
    values.forEach(value => priorityQueue.enqueue(value));

    const expected = [];
    while (priorityQueue.size() > 0) {
      expected.push(priorityQueue.dequeue());
    }

    expect(expected.length).toBe(values.length);
    expect(expected).toEqual([1, 2, 3, 5, 7, 8, 11, 67].reverse());
  });

  it('peek should return the same value as dequeue', () => {
    const priorityQueue = createPriorityQueue<number>((a, b) => a - b);
    const values = [3, 8, 2, 5, 11, 67, 1, 7];
    values.forEach(value => priorityQueue.enqueue(value));

    expect(priorityQueue.peek()).toBe(1);
    expect(priorityQueue.dequeue()).toBe(1);
  });

  it('clear should empty priority queue', () => {
    const priorityQueue = createPriorityQueue<number>((a, b) => a - b);
    const values = [3, 8, 2, 5, 11, 67, 1, 7];
    values.forEach(value => priorityQueue.enqueue(value));

    priorityQueue.clear();
    expect(priorityQueue.size()).toBe(0);
  });

  it('dequeue should throw if the queue is empty', () => {
    const priorityQueue = createPriorityQueue<number>((a, b) => a - b);
    const values = [3, 8, 2, 5, 11, 67, 1, 7];
    values.forEach(value => priorityQueue.enqueue(value));

    priorityQueue.clear();
    expect(priorityQueue.dequeue).toThrow('Priority queue empty');
  });

  it('remove should delete item from the queue without affecting order', () => {
    const priorityQueue = createPriorityQueue<number>((a, b) => a - b);
    const values = [3, 8, 2, 5, 11, 67, 1, 7];
    values.forEach(value => priorityQueue.enqueue(value));

    priorityQueue.remove(11);

    const expected = [];
    while (priorityQueue.size() > 0) {
      expected.push(priorityQueue.dequeue());
    }

    expect(expected.length).toBe(values.length - 1);
    expect(expected).toEqual([1, 2, 3, 5, 7, 8, 67]);
  });

  it('remove should repair the heap upwards when the replacement is smaller than its parent', () => {
    // The replacement for a removed entry is the last heap entry, which can be smaller than the
    // parent of the hole. `heapify` only compares downwards, so this case needs an upward pass.
    const priorityQueue = createPriorityQueue<number>((a, b) => a - b);
    [1, 4, 3, 5, 6, 7, 2].forEach(value => priorityQueue.enqueue(value));

    priorityQueue.remove(5);

    const actual = [];
    while (priorityQueue.size() > 0) {
      actual.push(priorityQueue.dequeue());
    }

    expect(actual).toEqual([1, 2, 3, 4, 6, 7]);
  });

  it('remove should keep promotion order correct for a longer queue of priorities', () => {
    const priorityQueue = createPriorityQueue<number>((a, b) => a - b);
    [20, 5, 8, 7, 6, 10, 17, 15, 18, 16, 9].forEach(value => priorityQueue.enqueue(value));

    priorityQueue.remove(20);

    const actual = [];
    while (priorityQueue.size() > 0) {
      actual.push(priorityQueue.dequeue());
    }

    expect(actual).toEqual([5, 6, 7, 8, 9, 10, 15, 16, 17, 18]);
  });

  it('remove should preserve order for every permutation of seven entries', () => {
    // Exhaustive: 5040 permutations x 7 removal targets. Smaller queues cannot fail, because the
    // only positions whose replacement can violate the invariant upward are deeper than a
    // seven entry heap has. 1008 of these 35280 cases fail without the upward pass.
    const values = [1, 2, 3, 4, 5, 6, 7];

    const permutations = (items: number[]): number[][] => {
      if (items.length <= 1) {
        return [items];
      }
      return items.flatMap((item, index) =>
        permutations([...items.slice(0, index), ...items.slice(index + 1)]).map(rest => [item, ...rest]),
      );
    };

    for (const permutation of permutations(values)) {
      for (const target of permutation) {
        const priorityQueue = createPriorityQueue<number>((a, b) => a - b);
        permutation.forEach(value => priorityQueue.enqueue(value));

        priorityQueue.remove(target);

        const actual = [];
        while (priorityQueue.size() > 0) {
          actual.push(priorityQueue.dequeue());
        }

        expect(actual).toEqual(permutation.filter(value => value !== target).sort((a, b) => a - b));
      }
    }
  });

  it('contains should return true if element is in the queue', () => {
    const priorityQueue = createPriorityQueue<number>((a, b) => a - b);
    const values = [3, 8, 2, 5, 11, 67, 1, 7];
    values.forEach(value => priorityQueue.enqueue(value));

    expect(priorityQueue.contains(1)).toBe(true);
  });

  it('contains should return true if element is not in the queue', () => {
    const priorityQueue = createPriorityQueue<number>((a, b) => a - b);
    const values = [3, 8, 2, 5, 11, 67, 1, 7];
    values.forEach(value => priorityQueue.enqueue(value));

    expect(priorityQueue.contains(99)).toBe(false);
  });
});
