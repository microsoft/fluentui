import { removeListener } from './listeners';

type Listener = (payload: number) => void;

function createListeners(count: number) {
  const created = Array.from({ length: count }, () => jest.fn<void, [number]>());
  const listeners: Listener[] = [...created];

  return { listeners, created };
}

function notify(listeners: Listener[], payload: number) {
  listeners.forEach(listener => listener(payload));
}

/** Counts array elements visited by `indexOf()` and element moves done by `splice()` on one array. */
function spyOnArrayWork(listeners: Listener[]) {
  const work = { visited: 0, spliceCalls: 0 };
  const indexOf = listeners.indexOf.bind(listeners);
  const splice = listeners.splice.bind(listeners);

  Object.defineProperty(listeners, 'indexOf', {
    configurable: true,
    value: (value: Listener, fromIndex = 0) => {
      const index = indexOf(value, fromIndex);
      work.visited += (index === -1 ? listeners.length : index + 1) - fromIndex;
      return index;
    },
  });
  Object.defineProperty(listeners, 'splice', {
    configurable: true,
    value: (...args: [number, number]) => {
      work.spliceCalls++;
      return splice(...args);
    },
  });

  return work;
}

describe('removeListener', () => {
  it('removes listeners without notifying them and keeps the order of the remaining ones', () => {
    const { listeners, created } = createListeners(6);

    removeListener(listeners, created[1]);
    removeListener(listeners, created[4]);
    notify(listeners, 1);

    expect(created.map(listener => listener.mock.calls.length)).toEqual([1, 0, 1, 1, 0, 1]);

    const notified: number[] = [];
    created.forEach((listener, index) => listener.mockImplementation(() => notified.push(index)));
    notify(listeners, 2);

    expect(notified).toEqual([0, 2, 3, 5]);
  });

  it('removes listeners in mount order without shifting or rescanning the array', () => {
    const { listeners, created } = createListeners(1000);
    const work = spyOnArrayWork(listeners);

    created.slice(0, 999).forEach(listener => removeListener(listeners, listener));

    expect(work.spliceCalls).toBe(0);
    // indexOf() + splice() visited and shifted ~500,000 elements for the same removals
    expect(work.visited).toBeLessThanOrEqual(2 * 1000);
    expect([...listeners]).toEqual([created[999]]);
  });

  it('removes listeners in reverse order from the end of the array', () => {
    const { listeners, created } = createListeners(1000);
    const work = spyOnArrayWork(listeners);

    [...created].reverse().forEach(listener => removeListener(listeners, listener));

    expect(work).toEqual({ visited: 0, spliceCalls: 0 });
    expect(listeners).toHaveLength(0);
  });

  it('compacts placeholders once they make up half of the array', () => {
    const { listeners, created } = createListeners(8);

    removeListener(listeners, created[1]);
    removeListener(listeners, created[3]);
    removeListener(listeners, created[5]);
    expect(listeners).toHaveLength(8);

    removeListener(listeners, created[6]);
    expect([...listeners]).toEqual([created[0], created[2], created[4], created[7]]);

    removeListener(listeners, created[0]);
    removeListener(listeners, created[4]);
    expect([...listeners]).toEqual([created[2], created[7]]);
  });

  it('drops trailing placeholders when the last listener is removed', () => {
    const { listeners, created } = createListeners(5);

    removeListener(listeners, created[3]);
    removeListener(listeners, created[4]);

    expect([...listeners]).toEqual([created[0], created[1], created[2]]);

    removeListener(listeners, created[0]);
    removeListener(listeners, created[1]);
    removeListener(listeners, created[2]);

    expect(listeners).toEqual([]);
  });

  it('compacts placeholders when removing the last listener leaves too many of them', () => {
    const { listeners, created } = createListeners(6);

    removeListener(listeners, created[1]);
    removeListener(listeners, created[2]);
    removeListener(listeners, created[5]);
    expect(listeners).toHaveLength(5);

    removeListener(listeners, created[4]);
    expect([...listeners]).toEqual([created[0], created[3]]);
  });

  it('supports listeners added after removals', () => {
    const { listeners, created } = createListeners(4);
    const added = jest.fn<void, [number]>();

    removeListener(listeners, created[0]);
    listeners.push(added);
    removeListener(listeners, created[2]);
    notify(listeners, 1);

    expect(created.map(listener => listener.mock.calls.length)).toEqual([0, 1, 0, 1]);
    expect(added).toHaveBeenCalledTimes(1);

    removeListener(listeners, created[1]);
    removeListener(listeners, added);
    removeListener(listeners, created[3]);

    expect(listeners).toEqual([]);
  });

  it('finds listeners moved in front of removed ones by other code', () => {
    const { listeners, created } = createListeners(6);
    const external = jest.fn<void, [number]>();

    removeListener(listeners, created[0]);
    removeListener(listeners, created[1]);
    listeners.unshift(external);
    removeListener(listeners, external);
    removeListener(listeners, created[2]);
    notify(listeners, 1);

    expect(external).not.toHaveBeenCalled();
    expect(created.map(listener => listener.mock.calls.length)).toEqual([0, 0, 0, 1, 1, 1]);
  });

  it('ignores listeners that are not in the array', () => {
    const { listeners, created } = createListeners(3);

    removeListener(listeners, jest.fn());
    removeListener(listeners, created[0]);
    removeListener(listeners, created[0]);
    notify(listeners, 1);

    expect(created.map(listener => listener.mock.calls.length)).toEqual([0, 1, 1]);
  });
});
