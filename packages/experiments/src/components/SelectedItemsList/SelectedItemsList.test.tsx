import * as React from 'react';
import { act, create } from 'react-test-renderer';

import { ISelectedItemProps, ISelectedItemsList } from './SelectedItemsList.types';
import { SelectedItemsList } from './SelectedItemsList';

export interface ISimple {
  key: string;
  name: string;
}

const basicItemRenderer = (props: ISelectedItemProps<ISimple>) => {
  return <div key={props.name}> {props.name} </div>;
};

describe('SelectedItemsList', () => {
  describe('SelectedItemsList', () => {
    const renderNothing = () => <></>;

    it('renders SelectedItemsList correctly', () => {
      const component = create(<SelectedItemsList onRenderItem={renderNothing} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('can remove items', () => {
      const onChange = (items: ISimple[] | undefined): void => {
        expect(items!.length).toBe(1);
        expect(items![0].name).toBe('b');
      };

      const listRef = React.createRef<ISelectedItemsList<ISimple>>();
      create(
        <SelectedItemsList<ISimple>
          ref={listRef}
          onRenderItem={basicItemRenderer}
          selectedItems={[{ key: '1', name: 'a' }, { key: '2', name: 'b' }]}
          onChange={onChange}
        />
      );

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
      const listRef = React.createRef<ISelectedItemsList<ISimple>>();
      create(<SelectedItemsList<ISimple> ref={listRef} onRenderItem={basicItemRenderer} />);

      const items: ISimple[] = [{ key: '1', name: 'a' }, { key: '2', name: 'b' }];
      if (!listRef.current) {
        throw new Error('listRef was not initialized');
      }

      act(() => {
        listRef.current && listRef.current.addItems(items);
      });
      expect(listRef.current.items.length).toEqual(2);
    });
  });
});
