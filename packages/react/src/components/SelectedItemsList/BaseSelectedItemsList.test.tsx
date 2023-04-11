import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import { BaseSelectedItemsList } from './BaseSelectedItemsList';
import { isConformant } from '../../common/isConformant';
import type { IBaseSelectedItemsListProps, ISelectedItemProps } from './BaseSelectedItemsList.types';

export interface ISimple {
  key: string;
  name: string;
}

const basicItemRenderer = (props: ISelectedItemProps<ISimple>) => {
  return <div key={props.key}> {props.name} </div>;
};

export type TypedBaseSelectedItemsList = BaseSelectedItemsList<ISimple, IBaseSelectedItemsListProps<ISimple>>;

describe('SelectedItemsList', () => {
  describe('BaseSelectedItemsList', () => {
    const BaseSelectedItemsListWithType = BaseSelectedItemsList as new (
      props: IBaseSelectedItemsListProps<ISimple>,
    ) => BaseSelectedItemsList<ISimple, IBaseSelectedItemsListProps<ISimple>>;

    it('renders BaseSelectedItemsList correctly', () => {
      const component = renderer.create(<BaseSelectedItemsListWithType />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    isConformant({
      Component: BaseSelectedItemsList,
      displayName: 'BaseSelectedItemsList',
      // Problem: Ref is not supported
      // Solution: Convert to FunctionComponent and support using forwardRef
      disabledTests: [
        'has-top-level-file',
        'component-handles-ref',
        'component-has-root-ref',
        'component-handles-classname',
      ],
    });

    it('can remove items', () => {
      const root = document.createElement('div');

      const onChange = (items: ISimple[] | undefined): void => {
        expect(items!.length).toBe(1);
        expect(items![0].name).toBe('b');
      };

      const itemsList: TypedBaseSelectedItemsList = ReactDOM.render(
        <BaseSelectedItemsListWithType
          onRenderItem={basicItemRenderer}
          selectedItems={[
            { key: '1', name: 'a' },
            { key: '2', name: 'b' },
          ]}
          onChange={onChange}
        />,
        root,
      ) as unknown as TypedBaseSelectedItemsList;

      expect(itemsList.items.length).toEqual(2);
      itemsList.removeItemAt(0);
    });

    it('can add items', () => {
      const root = document.createElement('div');
      const itemsList: TypedBaseSelectedItemsList = ReactDOM.render(
        <BaseSelectedItemsListWithType onRenderItem={basicItemRenderer} />,
        root,
      ) as unknown as TypedBaseSelectedItemsList;

      const items: ISimple[] = [
        { key: '1', name: 'a' },
        { key: '2', name: 'b' },
      ];
      itemsList.addItems(items);

      expect(itemsList.items.length).toEqual(2);
    });
  });
});
