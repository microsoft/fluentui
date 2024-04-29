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
    items: [
      {
        id: '31',
        title: '31',
      },
      {
        id: '32',
        title: '32',
        selectable: false,
      },
      {
        id: '33',
        title: '33',
      },
    ],
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
        defaultSelectedItemIds: ['211', '22'], // all leaves under '2'
      });
    });
  });

  test('should set item select state correctly according to defaultSelectedItemIds', () => {
    expect(useTreeResult.getItemById('1').selected).toBe(false);
    expect(useTreeResult.getItemById('11').selected).toBe(false);
    expect(useTreeResult.getItemById('2').selected).toBe(true);
    expect(useTreeResult.getItemById('21').selected).toBe(true);
    expect(useTreeResult.getItemById('211').selected).toBe(true);
    expect(useTreeResult.getItemById('22').selected).toBe(true);
    expect(useTreeResult.getItemById('3').selected).toBe(false);
    expect(useTreeResult.getItemById('31').selected).toBe(false);
    expect(useTreeResult.getItemById('32').selected).toBe(false);
    expect(useTreeResult.getItemById('33').selected).toBe(false);
  });

  test('should update item select state when toggleItemSelect is called from parent node', () => {
    act(() => {
      useTreeResult.toggleItemSelect({} as React.SyntheticEvent, '2'); // all items under 2 should become unselected
    });
    ['2', '21', '211', '22'].forEach(id => {
      expect(useTreeResult.getItemById(id).selected).toBe(false);
    });
  });

  test('should update item select state correctly when unselectable items present', () => {
    act(() => {
      useTreeResult.toggleItemSelect({} as React.SyntheticEvent, '31');
    });
    expect(useTreeResult.getItemById('31').selected).toBe(true);
    expect(useTreeResult.getItemById('32').selected).toBe(false);
    expect(useTreeResult.getItemById('33').selected).toBe(false);
    expect(useTreeResult.getItemById('3').selected).toBe('indeterminate');

    act(() => {
      useTreeResult.toggleItemSelect({} as React.SyntheticEvent, '33');
    });
    expect(useTreeResult.getItemById('31').selected).toBe(true);
    expect(useTreeResult.getItemById('32').selected).toBe(false);
    expect(useTreeResult.getItemById('33').selected).toBe(true);
    expect(useTreeResult.getItemById('3').selected).toBe(true);
  });
});
