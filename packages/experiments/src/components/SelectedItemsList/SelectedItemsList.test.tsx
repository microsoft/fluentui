import * as React from 'react';
import { create } from 'react-test-renderer';

import { SelectedItemsList } from './SelectedItemsList';
import { ISelectedItemsListProps, BaseSelectedItem, ISelectedItemsList } from './SelectedItemsList.types';

export interface ISimple {
  key: string;
  name: string;
}

export type ITypedSelectedListProps = ISelectedItemsListProps<ISimple>;

export type ISelectedTypedList<TPersona extends ISimple & BaseSelectedItem = ISimple> = ISelectedItemsList<ISimple>;
export type SelectedTypedList<TPersona extends ISimple & BaseSelectedItem = ISimple> = SelectedItemsList<ISimple>;
// export const SelectedTypedList = React.forwardRef(
//   <TPersona extends ISimple & BaseSelectedItem = ISimple>(
//     props: ITypedSelectedListProps,
//     ref: React.Ref<ISelectedTypedList<ISimple>>,
//   ) => <SelectedItemsList<TPersona> ref={ref} {...props} />,
//);

const basicItemRenderer = (props: ITypedSelectedListProps) => {
  let name: string = '';
  if (props.selectedItems) {
    name = props.selectedItems[0].name;
  }
  return <div key={props.key}>{name}</div>;
};

describe('SelectedItemsList', () => {
  describe('SelectedItemsList', () => {
    const renderNothing = () => <></>;

    it('renders SelectedItemsList correctly', () => {
      const component = create(<SelectedItemsList onRenderItem={renderNothing} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders SelectedItemsList correctly', () => {
      const component = create(<SelectedItemsList onRenderItem={basicItemRenderer} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
