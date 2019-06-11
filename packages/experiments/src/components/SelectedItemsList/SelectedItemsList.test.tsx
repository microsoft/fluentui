import * as React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';

import { ISelectedItemProps, IUncontrolledSelectedItemsList } from './SelectedItemsList.types';
import { SelectedItemsList } from './SelectedItemsList';
import { Selection as FabricSelection } from 'office-ui-fabric-react/lib/Selection';

export interface ISimple {
  key: string;
  name: string;
}

const basicItemRenderer = (props: ISelectedItemProps<ISimple>) => {
  return <div key={props.item.key}> {props.item.name} </div>;
};

const doNothing = () => undefined;

describe('SelectedItemsList', () => {
  describe('snapshots', () => {
    it('renders correctly when empty', () => {
      const component = create(<SelectedItemsList<ISimple> isControlled={false} onRenderItem={basicItemRenderer} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders correctly with children', () => {
      const listRef = React.createRef<IUncontrolledSelectedItemsList<ISimple>>();
      const component = create(<SelectedItemsList<ISimple> componentRef={listRef} isControlled={false} onRenderItem={basicItemRenderer} />);

      act(() => {
        listRef.current &&
          listRef.current.addItems([
            {
              key: 'key-1',
              name: 'Joey Wheeler'
            },
            {
              key: 'key-2',
              name: 'Tristan Taylor'
            }
          ]);
      });

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  it('can remove items', () => {
    // Arrange
    const onChange = (items: ISimple[] | undefined): void => {
      expect(items!.length).toBe(1);
      expect(items![0].name).toBe('b');
    };
    const listRef = React.createRef<IUncontrolledSelectedItemsList<ISimple>>();

    // Act
    act(() => {
      create(
        <SelectedItemsList<ISimple>
          defaultSelectedItems={[{ key: '1', name: 'a' }, { key: '2', name: 'b' }]}
          isControlled={false}
          componentRef={listRef}
          onRenderItem={basicItemRenderer}
          onChange={onChange}
        />
      );
    });

    // Assert
    if (!listRef.current) {
      throw new Error('listRef was not initialized');
    }
    expect(listRef.current.items.length).toEqual(2);
    act(() => {
      listRef.current && listRef.current.removeItems([listRef.current.items[1]]);
    });
    expect(listRef.current.items.length).toEqual(1);
  });

  it('can add items', () => {
    const listRef = React.createRef<IUncontrolledSelectedItemsList<ISimple>>();
    create(<SelectedItemsList<ISimple> isControlled={false} componentRef={listRef} onRenderItem={basicItemRenderer} />);

    const items: ISimple[] = [{ key: '1', name: 'a' }, { key: '2', name: 'b' }];
    if (!listRef.current) {
      throw new Error('listRef was not initialized');
    }

    act(() => {
      listRef.current && listRef.current.addItems(items);
    });
    expect(listRef.current.items.length).toEqual(2);
  });

  describe('selection', () => {
    let selection: FabricSelection;
    beforeEach(() => {
      selection = new FabricSelection();
    });

    const mountListWithData = (data: ISimple[]) => {
      // Run in 'act' to trigger effects after layout
      act(() => {
        create(
          <SelectedItemsList<ISimple>
            isControlled={true}
            selection={selection}
            onRenderItem={basicItemRenderer}
            selectedItems={data}
            onItemChange={doNothing}
            onItemsRemoved={doNothing}
          />
        );
      });
    };

    it('returns selected items via the selection', () => {
      mountListWithData([{ key: '1', name: 'a' }, { key: '2', name: 'b' }]);
      expect(selection.getItems()).toEqual([{ key: '1', name: 'a' }, { key: '2', name: 'b' }]);
    });

    it('can select items via the selection', () => {
      mountListWithData([{ key: '1', name: 'a' }, { key: '2', name: 'b' }]);
      act(() => {
        selection.setAllSelected(false);
        selection.setIndexSelected(
          0,
          true, // isSelected
          false // shouldAnchor
        );
      });
      expect(selection.getSelection()).toEqual([{ key: '1', name: 'a' }]);
    });

    it('updates items in selection when the selectedItems are updated by props', () => {
      let tree: ReactTestRenderer | undefined;
      act(() => {
        tree = create(
          <SelectedItemsList<ISimple>
            isControlled={true}
            selection={selection}
            onRenderItem={basicItemRenderer}
            selectedItems={[{ key: '1', name: 'a' }, { key: '2', name: 'b' }]}
            onItemChange={doNothing}
            onItemsRemoved={doNothing}
          />
        );
      });

      act(() => {
        tree!.update(
          <SelectedItemsList<ISimple>
            isControlled={true}
            selection={selection}
            onRenderItem={basicItemRenderer}
            selectedItems={[{ key: '1', name: 'alphonse' }, { key: '2', name: 'edward' }]}
            onItemChange={doNothing}
            onItemsRemoved={doNothing}
          />
        );
      });

      expect(selection.getItems()).toEqual([{ key: '1', name: 'alphonse' }, { key: '2', name: 'edward' }]);
    });
  });
});
