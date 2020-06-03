import * as React from 'react';
import { create } from 'react-test-renderer';

import { SelectedItemsList } from './SelectedItemsList';
import { ISelectedItemProps, ISelectedItemsList } from './SelectedItemsList.types';
import { act } from 'react-dom/test-utils';

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

    it('renders SelectedItemsList correctly when no specific render component is provided', () => {
      const component = create(<SelectedItemsList onRenderItem={renderNothing} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders SelectedItemsList correctly', () => {
      const component = create(<SelectedItemsList onRenderItem={basicItemRenderer} />);
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
        <SelectedItemsList
          componentRef={listRef}
          onRenderItem={basicItemRenderer}
          defaultSelectedItems={[
            { key: '1', name: 'a' },
            { key: '2', name: 'b' },
          ]}
          onChange={onChange}
        />,
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
  });
});
