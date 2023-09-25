import * as React from 'react';
import * as _ from 'lodash';

import { Dropdown, DropdownProps, dropdownSlotClassNames } from 'src/components/Dropdown/Dropdown';
import { dropdownSearchInputSlotClassNames } from 'src/components/Dropdown/DropdownSearchInput';
import { findIntrinsicElement, mountWithProvider } from 'test/utils';

const items = ['item0', 'item1', 'item2', 'item3', 'item4', 'item5'];

const renderDropdown = (props: DropdownProps = {}, attachTo?: HTMLElement) => {
  const wrapper = mountWithProvider(<Dropdown items={items} {...props} />, { attachTo });
  const triggerButtonWrapper = findIntrinsicElement(wrapper, `.${dropdownSlotClassNames.triggerButton}`);
  const toggleIndicatorWrapper = findIntrinsicElement(wrapper, `.${dropdownSlotClassNames.toggleIndicator}`);
  const searchInputWrapper = findIntrinsicElement(wrapper, `.${dropdownSearchInputSlotClassNames.input}`);
  const itemsListWrapper = findIntrinsicElement(wrapper, `.${dropdownSlotClassNames.itemsList}`);
  const getItemsWrapper = () => findIntrinsicElement(wrapper, `.${dropdownSlotClassNames.item}`);
  const getItemsCountWrapper = () => findIntrinsicElement(wrapper, `.${dropdownSlotClassNames.itemsCount}`);
  const getSelectedItemsWrapper = () => findIntrinsicElement(wrapper, `.${dropdownSlotClassNames.selectedItem}`);
  const getSelectedItemWrapperAtIndex = index => getSelectedItemsWrapper().at(index);
  const getItemWrapperAtIndex = index => getItemsWrapper().at(index);
  const getClearIndicatorWrapper = () => findIntrinsicElement(wrapper, `.${dropdownSlotClassNames.clearIndicator}`);

  return {
    wrapper,
    rerender: props => wrapper.setProps(props),
    rootNode: wrapper.getDOMNode<HTMLElement>(),
    triggerButtonNode: triggerButtonWrapper.length ? triggerButtonWrapper.getDOMNode<HTMLElement>() : null,
    toggleIndicatorNode: toggleIndicatorWrapper.length ? toggleIndicatorWrapper.getDOMNode<HTMLElement>() : null,
    itemsListNode: itemsListWrapper.getDOMNode<HTMLElement>(),
    searchInputNode: searchInputWrapper.length ? searchInputWrapper.getDOMNode<HTMLInputElement>() : null,
    getA11yMessageContainerNode: () => findIntrinsicElement(wrapper, '[role="status"]').getDOMNode(),
    getItemsCountNode: () => getItemsCountWrapper().getDOMNode<HTMLElement>(),
    getItemNodes: () => getItemsWrapper().map(nodeWrapper => nodeWrapper.getDOMNode()),
    getItemNodeAtIndex: index => getItemWrapperAtIndex(index).getDOMNode(),
    getSelectedItemNodes: () => getSelectedItemsWrapper().map(nodeWrapper => nodeWrapper.getDOMNode()),
    getSelectedItemNodeAtIndex: index => getSelectedItemWrapperAtIndex(index).getDOMNode(),
    getClearIndicatorWrapper,
    getClearIndicatorNode: () => getClearIndicatorWrapper().getDOMNode(),
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
    keyDownOnClearIndicator: (key: string, optional?: Object) => {
      getClearIndicatorWrapper().simulate('keydown', { key, ...optional });
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
