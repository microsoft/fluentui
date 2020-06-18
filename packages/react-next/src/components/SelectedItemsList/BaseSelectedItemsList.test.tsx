/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */
import * as renderer from 'react-test-renderer';

import { ISelectedItemProps, IBaseSelectedItemsList } from './BaseSelectedItemsList.types';
import { BaseSelectedItemsList } from './BaseSelectedItemsList';

export interface ISimple {
  key: string;
  name: string;
}

const basicItemRenderer = (props: ISelectedItemProps<ISimple>) => {
  return <div key={props.key}> {props.name} </div>;
};

describe('SelectedItemsList', () => {
  describe('BaseSelectedItemsList', () => {
    it('renders BaseSelectedItemsList correctly', () => {
      const component = renderer.create(<BaseSelectedItemsList<ISimple> />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('can remove items', () => {
      const root = document.createElement('div');

      const onChange = (items: ISimple[] | undefined): void => {
        expect(items!.length).toBe(1);
        expect(items![0].name).toBe('b');
      };

      const itemsList = React.createRef<IBaseSelectedItemsList<ISimple>>();
      ReactDOM.render(
        <BaseSelectedItemsList<ISimple>
          onRenderItem={basicItemRenderer}
          selectedItems={[
            { key: '1', name: 'a' },
            { key: '2', name: 'b' },
          ]}
          onChange={onChange}
          componentRef={itemsList}
        />,
        root,
      );

      expect(itemsList.current?.items?.length).toEqual(2);
      itemsList.current?.removeItemAt?.(0);
    });

    it('can add items', () => {
      const root = document.createElement('div');
      const itemsList = React.createRef<IBaseSelectedItemsList<ISimple>>();
      ReactDOM.render(
        <BaseSelectedItemsList<ISimple> onRenderItem={basicItemRenderer} componentRef={itemsList} />,
        root,
      );

      const items: ISimple[] = [
        { key: '1', name: 'a' },
        { key: '2', name: 'b' },
      ];
      itemsList.current!.addItems(items);

      expect(itemsList.current!.items.length).toEqual(2);
    });
  });
});
