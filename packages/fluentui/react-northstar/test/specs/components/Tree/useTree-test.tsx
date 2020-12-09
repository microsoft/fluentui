import * as React from 'react';
import { mountWithProvider } from 'test/utils';
import { useTree } from '../../../../src/components/Tree/hooks/useTree';
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

const TestHook = ({ callback }) => {
  callback();
  return null;
};

const testHook = callback => {
  mountWithProvider(<TestHook callback={callback} />);
};

// UTs on useTree focus on select state.
// Because other parts in useTree is covered by useVirtualTree (which use useTree)
describe('useTree', () => {
  let useTreeResult;
  beforeEach(() => {
    testHook(() => {
      useTreeResult = useTree({
        items,
        defaultActiveItemIds: ['1'],
        defaultSelectedItemIds: ['211', '22'],
      });
    });
  });

  test('should return getItemById and set item select state correctly', () => {
    expect(useTreeResult.getItemById('1').selected).toBe(false);
    expect(useTreeResult.getItemById('11').selected).toBe(false);
    expect(useTreeResult.getItemById('12').selected).toBe(false);
    expect(useTreeResult.getItemById('121').selected).toBe(false);
    expect(useTreeResult.getItemById('2').selected).toBe(true);
    expect(useTreeResult.getItemById('21').selected).toBe(true);
    expect(useTreeResult.getItemById('211').selected).toBe(true);
    expect(useTreeResult.getItemById('22').selected).toBe(true);
    expect(useTreeResult.getItemById('3').selected).toBe(false);
  });

  test('should update item select state when is called', () => {
    act(() => {
      useTreeResult.toggleItemSelect({} as React.SyntheticEvent, '2');
    });
    ['1', '11', '12', '121', '2', '21', '211', '22', '3'].forEach(id => {
      expect(useTreeResult.getItemById(id).selected).toBe(false);
    });
  });
});
