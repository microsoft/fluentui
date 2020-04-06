import * as React from 'react';
import * as _ from 'lodash';

import Dropdown, { DropdownProps } from 'src/components/Dropdown/Dropdown';
import DropdownSearchInput from 'src/components/Dropdown/DropdownSearchInput';
import { findIntrinsicElement, mountWithProvider } from 'test/utils';

const items = ['item0', 'item1', 'item2', 'item3', 'item4', 'item5'];

const renderDropdown = (props: DropdownProps = {}) => {
  const wrapper = mountWithProvider(<Dropdown items={items} {...props} />);
  const triggerButtonWrapper = findIntrinsicElement(wrapper, `.${Dropdown.slotClassNames.triggerButton}`);
  const toggleIndicatorWrapper = findIntrinsicElement(wrapper, `.${Dropdown.slotClassNames.toggleIndicator}`);
  const searchInputWrapper = findIntrinsicElement(wrapper, `.${DropdownSearchInput.slotClassNames.input}`);
  const itemsListWrapper = findIntrinsicElement(wrapper, `.${Dropdown.slotClassNames.itemsList}`);
  const getItemsWrapper = () => findIntrinsicElement(wrapper, `.${Dropdown.slotClassNames.item}`);
  const getSelectedItemsWrapper = () => findIntrinsicElement(wrapper, `.${Dropdown.slotClassNames.selectedItem}`);
  const getSelectedItemWrapperAtIndex = index => getSelectedItemsWrapper().at(index);
  const getItemWrapperAtIndex = index => getItemsWrapper().at(index);
  const getClearIndicatorWrapper = () => findIntrinsicElement(wrapper, `.${Dropdown.slotClassNames.clearIndicator}`);

  return {
    wrapper,
    triggerButtonNode: triggerButtonWrapper.length ? triggerButtonWrapper.getDOMNode<HTMLElement>() : null,
    toggleIndicatorNode: toggleIndicatorWrapper.length ? toggleIndicatorWrapper.getDOMNode<HTMLElement>() : null,
    itemsListNode: itemsListWrapper.getDOMNode<HTMLElement>(),
    searchInputNode: searchInputWrapper.length ? searchInputWrapper.getDOMNode<HTMLInputElement>() : null,
    getA11yMessageContainerNode: () => findIntrinsicElement(wrapper, '[role="status"]').getDOMNode(),
    getItemNodes: () => getItemsWrapper().map(nodeWrapper => nodeWrapper.getDOMNode()),
    getSelectedItemNodes: () => getSelectedItemsWrapper().map(nodeWrapper => nodeWrapper.getDOMNode()),
    getSelectedItemNodeAtIndex: index => getSelectedItemWrapperAtIndex(index).getDOMNode(),
    getClearIndicatorWrapper,
    mouseOverItemAtIndex: index => getItemWrapperAtIndex(index).simulate('mousemove'),
    changeSearchInput: value => {
      searchInputWrapper.simulate('change', { target: { value } });
    },
    clickOnTriggerButton: () => {
      triggerButtonWrapper.simulate('click');
    },
    clickOnToggleIndicator: () => {
      toggleIndicatorWrapper.simulate('click');
    },
    clickOnSearchInput: () => {
      searchInputWrapper.simulate('click');
    },
    clickOnItemAtIndex: (index: number, optional = {}) => {
      getItemWrapperAtIndex(index).simulate(
        'click',
        _.merge(
          {
            nativeEvent: { stopImmediatePropagation: jest.fn() },
          },
          optional,
        ),
      );
    },
    clickOnClearIndicator: () => {
      getClearIndicatorWrapper().simulate('click');
    },
    clickOnSelectedItemAtIndex: (index: number, optional = {}) => {
      getSelectedItemWrapperAtIndex(index).simulate(
        'click',
        _.merge(
          {
            nativeEvent: { stopImmediatePropagation: jest.fn() },
          },
          optional,
        ),
      );
    },
    keyDownOnSearchInput: (key: string, optional?: Object) =>
      searchInputWrapper.simulate('keydown', { key, ...optional }),
    keyDownOnItemsList: (key: string, optional?: Object) => itemsListWrapper.simulate('keydown', { key, ...optional }),
    keyDownOnTriggerButton: (key: string, optional?: Object) =>
      triggerButtonWrapper.simulate('keydown', { key, ...optional }),
    keyDownOnSelectedItemAtIndex: (index: number, key: string, optional?: Object) => {
      getSelectedItemWrapperAtIndex(index).simulate('keydown', { key, ...optional });
    },
    focusTriggerButton: () => {
      triggerButtonWrapper.simulate('focus');
    },
    focusSearchInput: () => {
      searchInputWrapper.simulate('focus');
    },
    focusItemsList: () => {
      itemsListWrapper.simulate('focus');
    },
  };
};

const getItemIdRegexByIndex = index => new RegExp(`downshift-\\d+-item-${index}`);

export { getItemIdRegexByIndex, renderDropdown, items };
