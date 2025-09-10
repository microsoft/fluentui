import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { render, act } from '@testing-library/react';
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
      const onChange = (items: ISimple[] | undefined): void => {
        expect(items!.length).toBe(1);
        expect(items![0].name).toBe('b');
      };

      const ref = React.createRef<TypedBaseSelectedItemsList>();

      render(
        <BaseSelectedItemsListWithType
          componentRef={ref}
          onRenderItem={basicItemRenderer}
          selectedItems={[
            { key: '1', name: 'a' },
            { key: '2', name: 'b' },
          ]}
          onChange={onChange}
        />,
      );

      const itemsList = ref.current!;
      expect(itemsList.items.length).toEqual(2);
      itemsList.removeItemAt(0);
    });

    it('can add items', () => {
      const ref = React.createRef<TypedBaseSelectedItemsList>();

      render(<BaseSelectedItemsListWithType componentRef={ref} onRenderItem={basicItemRenderer} />);

      const itemsList = ref.current!;
      const items: ISimple[] = [
        { key: '1', name: 'a' },
        { key: '2', name: 'b' },
      ];
      act(() => {
        itemsList.addItems(items);
      });

      expect(itemsList.items.length).toEqual(2);
    });
  });
});
