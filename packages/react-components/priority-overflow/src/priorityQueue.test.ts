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
