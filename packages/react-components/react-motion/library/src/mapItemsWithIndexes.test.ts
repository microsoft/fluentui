import { mapItemsWithIndexes } from './mapItemsWithIndexes';

describe('mapItemsWithIndexes', () => {
  it('should map new items', () => {
    const previousItems = [];
    const currentItems = [{ key: '1' }, { key: '2' }, { key: '3' }];
    const result = mapItemsWithIndexes(previousItems, currentItems);

    // TODO: this is questionable, but it is the current behavior
    expect(result).toEqual([
      { prevIndex: -1, index: 0, key: '1' },
      { prevIndex: -1, index: 1, key: '2' },
      { prevIndex: -1, index: 2, key: '3' },
    ]);
  });

  it('should map items with indexes at end', () => {
    const previousItems = [{ key: '1' }, { key: '2' }, { key: '3' }];
    const currentItems = [{ key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }, { key: '5' }];
    const result = mapItemsWithIndexes(previousItems, currentItems);

    expect(result).toEqual([
      { prevIndex: 0, index: 0, key: '1' },
      { prevIndex: 1, index: 1, key: '2' },
      { prevIndex: 2, index: 2, key: '3' },
      { prevIndex: 2, index: 3, key: '4' },
      { prevIndex: 2, index: 4, key: '5' },
    ]);
  });

  it('should map items with indexes at start', () => {
    const previousItems = [{ key: '1' }, { key: '2' }, { key: '3' }];
    const currentItems = [{ key: '4' }, { key: '5' }, { key: '1' }, { key: '2' }, { key: '3' }];
    const result = mapItemsWithIndexes(previousItems, currentItems);

    expect(result).toEqual([
      { prevIndex: -1, index: 0, key: '4' },
      { prevIndex: -1, index: 1, key: '5' },
      { prevIndex: 0, index: 2, key: '1' },
      { prevIndex: 1, index: 3, key: '2' },
      { prevIndex: 2, index: 4, key: '3' },
    ]);
  });

  it('should map items with indexes added in middle', () => {
    const previousItems = [{ key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }];
    const currentItems = [{ key: '1' }, { key: '2' }, { key: '5' }, { key: '6' }, { key: '3' }, { key: '4' }];
    const result = mapItemsWithIndexes(previousItems, currentItems);

    expect(result).toEqual([
      { prevIndex: 0, index: 0, key: '1' },
      { prevIndex: 1, index: 1, key: '2' },
      { prevIndex: 1, index: 2, key: '5' },
      { prevIndex: 1, index: 3, key: '6' },
      { prevIndex: 2, index: 4, key: '3' },
      { prevIndex: 3, index: 5, key: '4' },
    ]);
  });

  it('should remap items on sort', () => {
    const previousItems = [{ key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }];
    const currentItems = [{ key: '3' }, { key: '2' }, { key: '1' }, { key: '4' }];
    const result = mapItemsWithIndexes(previousItems, currentItems);

    expect(result).toEqual([
      { prevIndex: 2, index: 0, key: '3' },
      { prevIndex: 1, index: 1, key: '2' },
      { prevIndex: 0, index: 2, key: '1' },
      { prevIndex: 3, index: 3, key: '4' },
    ]);
  });
});
