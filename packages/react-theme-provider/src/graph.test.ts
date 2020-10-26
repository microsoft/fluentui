import { graphSet, graphGet } from './graph';

describe('graph', () => {
  it('can set and get', () => {
    const map = new Map<string, string>();

    expect(graphGet(map, [false, false, false])).toBeUndefined();

    graphSet(map, [false, false, false], 42);

    expect(graphGet(map, [false, false, false])).toBe(42);

    expect(graphGet(map, [false, false, true])).toBeUndefined();
  });
});
