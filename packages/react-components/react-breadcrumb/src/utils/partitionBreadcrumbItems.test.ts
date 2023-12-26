import { partitionBreadcrumbItems, PartitionBreadcrumbItemsOptions } from './partitionBreadcrumbItems';

type TestData = [PartitionBreadcrumbItemsOptions<number>, ReturnType<typeof partitionBreadcrumbItems>][];

const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const testData: TestData = [
  [
    { items, overflowIndex: 2, maxDisplayedItems: 3 },
    { startDisplayedItems: [0, 1], overflowItems: [2, 3, 4, 5, 6, 7, 8, 9], endDisplayedItems: [10] },
  ],
  [
    { items, maxDisplayedItems: 8, overflowIndex: 7 },
    { startDisplayedItems: [0, 1, 2, 3, 4, 5, 6], overflowItems: [7, 8, 9], endDisplayedItems: [10] },
  ],
  [
    { items, maxDisplayedItems: 2, overflowIndex: 2 },
    { startDisplayedItems: [0], overflowItems: [1, 2, 3, 4, 5, 6, 7, 8, 9], endDisplayedItems: [10] },
  ],
  [
    { items, maxDisplayedItems: 3, overflowIndex: 3 },
    { startDisplayedItems: [0, 1], overflowItems: [2, 3, 4, 5, 6, 7, 8, 9], endDisplayedItems: [10] },
  ],
  [
    { items, maxDisplayedItems: 7, overflowIndex: 7 },
    { startDisplayedItems: [0, 1, 2, 3, 4, 5], overflowItems: [6, 7, 8, 9], endDisplayedItems: [10] },
  ],
  [
    { items, maxDisplayedItems: 9, overflowIndex: 9 },
    { startDisplayedItems: [0, 1, 2, 3, 4, 5, 6, 7], overflowItems: [8, 9], endDisplayedItems: [10] },
  ],
  [
    { items, maxDisplayedItems: 999, overflowIndex: 999 },
    { startDisplayedItems: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], overflowItems: undefined, endDisplayedItems: undefined },
  ],
  [
    { items, maxDisplayedItems: 11, overflowIndex: 11 },
    { startDisplayedItems: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], overflowItems: undefined, endDisplayedItems: undefined },
  ],
];

const maxDisplayedItemsData: TestData = [
  [
    { items, maxDisplayedItems: 999 },
    { startDisplayedItems: [0], overflowItems: undefined, endDisplayedItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  ],
  [
    { items, maxDisplayedItems: 3 },
    { startDisplayedItems: [0], overflowItems: [1, 2, 3, 4, 5, 6, 7, 8], endDisplayedItems: [9, 10] },
  ],
  [
    { items, maxDisplayedItems: 2 },
    { startDisplayedItems: [0], overflowItems: [1, 2, 3, 4, 5, 6, 7, 8, 9], endDisplayedItems: [10] },
  ],
];
const overflowIndexData: TestData = [
  [
    { items, overflowIndex: 999 },
    { startDisplayedItems: [0, 1, 2, 3, 4], overflowItems: [5, 6, 7, 8, 9], endDisplayedItems: [10] },
  ],
  [
    { items, overflowIndex: 10 },
    { startDisplayedItems: [0, 1, 2, 3, 4], overflowItems: [5, 6, 7, 8, 9], endDisplayedItems: [10] },
  ],
  [
    { items, overflowIndex: 6 },
    { startDisplayedItems: [0, 1, 2, 3, 4], overflowItems: [5, 6, 7, 8, 9], endDisplayedItems: [10] },
  ],
  [
    { items, overflowIndex: 2 },
    { startDisplayedItems: [0, 1], overflowItems: [2, 3, 4, 5, 6], endDisplayedItems: [7, 8, 9, 10] },
  ],
  [
    { items, overflowIndex: 0 },
    { startDisplayedItems: [], overflowItems: [0, 1, 2, 3, 4], endDisplayedItems: [5, 6, 7, 8, 9, 10] },
  ],
];

describe('partitionBreadcrumbItems method', () => {
  it.each(testData)("splits items correctly '%s'", (testItems, expected) => {
    expect(partitionBreadcrumbItems(testItems as PartitionBreadcrumbItemsOptions<number>)).toStrictEqual(expected);
  });
  it.each(maxDisplayedItemsData)(
    "splits items correctly if maxDisplayedItems are passed '%s'",
    (testItems, expected) => {
      expect(partitionBreadcrumbItems(testItems as PartitionBreadcrumbItemsOptions<number>)).toStrictEqual(expected);
    },
  );
  it.each(overflowIndexData)("splits items correctly if overflowINdex is passed '%s'", (testItems, expected) => {
    expect(partitionBreadcrumbItems(testItems as PartitionBreadcrumbItemsOptions<number>)).toStrictEqual(expected);
  });
  expect(partitionBreadcrumbItems({ items } as PartitionBreadcrumbItemsOptions<number>)).toStrictEqual({
    startDisplayedItems: [0],
    overflowItems: [1, 2, 3, 4, 5],
    endDisplayedItems: [6, 7, 8, 9, 10],
  });
  expect(partitionBreadcrumbItems({} as PartitionBreadcrumbItemsOptions<number>)).toStrictEqual({
    startDisplayedItems: [],
    overflowItems: undefined,
    endDisplayedItems: undefined,
  });
});
