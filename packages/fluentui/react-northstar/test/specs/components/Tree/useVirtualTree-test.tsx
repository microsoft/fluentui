import * as React from 'react';
import { mountWithProvider } from 'test/utils';
import { useVirtualTree } from '../../../../src/components/Tree/hooks/useVirtualTree';
import { act } from 'react-dom/test-utils';

const items = [
  {
    id: '1',
    title: '1',
    items: [
      {
        id: '11',
        title: '11',
      },
      {
        id: '12',
        title: '12',
        items: [
          {
            id: '121',
            title: '121',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: '2',
    items: [
      {
        id: '21',
        title: '21',
        items: [
          {
            id: '211',
            title: '211',
          },
        ],
      },
      {
        id: '22',
        title: '22',
      },
    ],
  },
  {
    id: '3',
    title: '3',
  },
];

const flatTreeItems = {
  '1': {
    childrenIds: ['11', '12'],
    expanded: true,
    hasSubtree: true,
    index: 1,
    item: {
      id: '1',
      items: [
        { id: '11', title: '11' },
        { id: '12', items: [{ id: '121', title: '121' }], title: '12' },
      ],
      title: '1',
    },
    level: 1,
    parent: 'FLUENT_UI_SECRET_ROOT_ID',
    treeSize: 3,
    selected: false,
  },
  '11': {
    expanded: false,
    hasSubtree: false,
    index: 1,
    item: { id: '11', title: '11' },
    level: 2,
    parent: '1',
    treeSize: 2,
    selected: false,
  },
  '12': {
    childrenIds: ['121'],
    expanded: false,
    hasSubtree: true,
    index: 2,
    item: { id: '12', items: [{ id: '121', title: '121' }], title: '12' },
    level: 2,
    parent: '1',
    treeSize: 2,
    selected: false,
  },
  '121': {
    expanded: false,
    hasSubtree: false,
    index: 1,
    item: { id: '121', title: '121' },
    level: 3,
    parent: '12',
    treeSize: 1,
    selected: false,
  },
  '2': {
    childrenIds: ['21', '22'],
    expanded: false,
    hasSubtree: true,
    index: 2,
    item: {
      id: '2',
      items: [
        { id: '21', items: [{ id: '211', title: '211' }], title: '21' },
        { id: '22', title: '22' },
      ],
      title: '2',
    },
    level: 1,
    parent: 'FLUENT_UI_SECRET_ROOT_ID',
    treeSize: 3,
    selected: false,
  },
  '21': {
    childrenIds: ['211'],
    expanded: false,
    hasSubtree: true,
    index: 1,
    item: { id: '21', items: [{ id: '211', title: '211' }], title: '21' },
    level: 2,
    parent: '2',
    treeSize: 2,
    selected: false,
  },
  '211': {
    expanded: false,
    hasSubtree: false,
    index: 1,
    item: { id: '211', title: '211' },
    level: 3,
    parent: '21',
    treeSize: 1,
    selected: false,
  },
  '22': {
    expanded: false,
    hasSubtree: false,
    index: 2,
    item: { id: '22', title: '22' },
    level: 2,
    parent: '2',
    treeSize: 2,
    selected: false,
  },
  '3': {
    expanded: false,
    hasSubtree: false,
    index: 3,
    item: { id: '3', title: '3' },
    level: 1,
    parent: 'FLUENT_UI_SECRET_ROOT_ID',
    treeSize: 3,
    selected: false,
  },
  FLUENT_UI_SECRET_ROOT_ID: {
    childrenIds: ['1', '2', '3'],
    expanded: true,
    hasSubtree: true,
    index: 1,
    level: 0,
    treeSize: 1,
  },
};

const TestHook = ({ callback }) => {
  callback();
  return null;
};

const testHook = callback => {
  mountWithProvider(<TestHook callback={callback} />);
};

describe('useVirtualTree', () => {
  let useVirtualTreeResult;
  beforeAll(() => {
    testHook(() => {
      useVirtualTreeResult = useVirtualTree({
        items,
        defaultActiveItemIds: ['1'],
      });
    });
  });

  test('should return correct flatTree', () => {
    expect(useVirtualTreeResult.flatTree).toStrictEqual(flatTreeItems);
  });

  test('should return correct activeItemIds and visibleItemIds', () => {
    expect(useVirtualTreeResult.activeItemIds).toEqual(['1']);
    expect(useVirtualTreeResult.visibleItemIds).toEqual(['1', '11', '12', '2', '3']);
  });

  test('should return getItemById', () => {
    expect(useVirtualTreeResult.getItemById('1')).toStrictEqual(flatTreeItems['1']);
    expect(useVirtualTreeResult.getItemById('non_exist_id')).toBeUndefined();
  });

  test('should return registerItemRef and getItemRef', () => {
    const dummyElement = document.createElement('div');
    useVirtualTreeResult.registerItemRef('1', dummyElement);
    expect(useVirtualTreeResult.getItemRef('1')).toBe(dummyElement);
  });

  test('should return ref to be assigned to virtual list', () => {
    expect(useVirtualTreeResult.listRef).not.toBeUndefined();
  });
});

describe('useVirtualTree with state change', () => {
  let useVirtualTreeResult;
  beforeEach(() => {
    testHook(() => {
      useVirtualTreeResult = useVirtualTree({
        items,
        defaultActiveItemIds: ['1'],
      });
    });
  });
  test('should update activeItemIds/visibleItemIds when toggleItemActive is called', () => {
    act(() => {
      useVirtualTreeResult.toggleItemActive({} as React.SyntheticEvent, '12');
    });
    expect(useVirtualTreeResult.activeItemIds).toEqual(['1', '12']);
    expect(useVirtualTreeResult.visibleItemIds).toEqual(['1', '11', '12', '121', '2', '3']);
  });

  test('should update activeItemIds/visibleItemIds when expandSiblings is called', () => {
    act(() => {
      useVirtualTreeResult.toggleItemActive({} as React.SyntheticEvent, '12');
      useVirtualTreeResult.expandSiblings({} as React.SyntheticEvent, '1');
    });
    expect(useVirtualTreeResult.activeItemIds).toEqual(['1', '12', '2', '3']);
    expect(useVirtualTreeResult.visibleItemIds).toEqual(['1', '11', '12', '121', '2', '21', '22', '3']);
  });
});
