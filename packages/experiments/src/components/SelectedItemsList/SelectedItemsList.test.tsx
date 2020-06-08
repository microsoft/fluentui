import * as React from 'react';
import { create } from 'react-test-renderer';

import { SelectedItemsList } from './SelectedItemsList';
import {
  ISelectedItemProps,
  ISelectedItemsList,
  BaseSelectedItem,
  ISelectedItemsListProps,
} from './SelectedItemsList.types';
import { mount } from 'enzyme';

export interface ISimple {
  key: string;
  name: string;
}

export const SelectedTypedList = React.forwardRef(
  <TPersona extends ISimple & BaseSelectedItem = ISimple>(
    props: ISelectedItemsListProps<TPersona>,
    ref: React.Ref<ISelectedItemsList<TPersona>>,
  ) => <SelectedItemsList<TPersona> ref={ref} {...props} />,
);

const basicItemRenderer = (props: ISelectedItemProps<ISimple>) => {
  return <div id={props.item.name}>{props.item.name}</div>;
};

// See SelectedPeopleList.test for more tests on items manipulation.
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

    it('render all items in selectedItemsList', () => {
      const wrapper = mount<ISelectedItemsList<ISimple>>(
        <SelectedItemsList
          onRenderItem={basicItemRenderer}
          selectedItems={[
            { key: '1', name: 'a' },
            { key: '2', name: 'b' },
          ]}
        />,
      );
      expect(wrapper).toBeDefined();
      expect(wrapper.find('div').length).toEqual(2);
      expect(
        wrapper
          .find('div')
          .first()
          .text(),
      ).toEqual('a');
      expect(
        wrapper
          .find('div')
          .last()
          .text(),
      ).toEqual('b');
    });
  });

  it('render all default selected items in selectedItemsList', () => {
    const removeItems = jest.fn();
    const wrapper = mount<ISelectedItemsList<ISimple>>(
      <SelectedItemsList
        onRenderItem={basicItemRenderer}
        defaultSelectedItems={[
          { key: 'd1', name: 'da' },
          { key: 'd2', name: 'db' },
        ]}
        onItemsRemoved={removeItems}
      />,
    );
    expect(wrapper).toBeDefined();
    expect(wrapper.find('div').length).toEqual(2);
    expect(
      wrapper
        .find('div')
        .first()
        .text(),
    ).toEqual('da');
    expect(
      wrapper
        .find('div')
        .last()
        .text(),
    ).toEqual('db');
  });
});
