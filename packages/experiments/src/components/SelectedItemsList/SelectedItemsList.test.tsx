/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */
import * as renderer from 'react-test-renderer';

import { ISelectedItemsListProps, ISelectedItemProps } from './SelectedItemsList.types';
import { SelectedItemsList } from './SelectedItemsList';

export interface ISimple {
  key: string;
  name: string;
}

const basicItemRenderer = (props: ISelectedItemProps<ISimple>) => {
  return <div key={props.key}> {props.name} </div>;
};

export type TypedSelectedItemsList = SelectedItemsList<ISimple>;

describe('SelectedItemsList', () => {
  describe('SelectedItemsList', () => {
    const SelectedItemsListWithType = SelectedItemsList as new (props: ISelectedItemsListProps<ISimple>) => SelectedItemsList<ISimple>;

    const renderNothing = () => <></>;

    it('renders SelectedItemsList correctly', () => {
      const component = renderer.create(<SelectedItemsListWithType onRenderItem={renderNothing} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('can remove items', () => {
      const root = document.createElement('div');

      const onChange = (items: ISimple[] | undefined): void => {
        expect(items!.length).toBe(1);
        expect(items![0].name).toBe('b');
      };

      const itemsList: TypedSelectedItemsList = (ReactDOM.render(
        <SelectedItemsListWithType
          onRenderItem={basicItemRenderer}
          selectedItems={[{ key: '1', name: 'a' }, { key: '2', name: 'b' }]}
          onChange={onChange}
        />,
        root
      ) as unknown) as TypedSelectedItemsList;

      expect(itemsList.items.length).toEqual(2);
      itemsList.removeItemAt(0);
    });

    it('can add items', () => {
      const root = document.createElement('div');
      const itemsList: TypedSelectedItemsList = (ReactDOM.render(
        <SelectedItemsListWithType onRenderItem={basicItemRenderer} />,
        root
      ) as unknown) as TypedSelectedItemsList;

      const items: ISimple[] = [{ key: '1', name: 'a' }, { key: '2', name: 'b' }];
      itemsList.addItems(items);

      expect(itemsList.items.length).toEqual(2);
    });
  });
});
