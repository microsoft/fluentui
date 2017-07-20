/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */
import * as ReactTestUtils from 'react-addons-test-utils';
import { mount } from 'enzyme';
import { KeyCodes } from '../../Utilities';
import { SwatchColorPicker } from './SwatchColorPicker';
import { ISwatchColorPickerItemProps, SwatchColorPickerItemType } from './SwatchColorPicker.Props';

let { expect } = chai;

const DEFAULT_OPTIONS: ISwatchColorPickerItemProps[] = [
  { id: '0', label: 'Colors', type: SwatchColorPickerItemType.Header },
  { id: 'd1', type: SwatchColorPickerItemType.Divider },
  { id: 'a', label: 'green', type: SwatchColorPickerItemType.Cell, color: '#00ff00' },
  { id: 'b', label: 'orange', type: SwatchColorPickerItemType.Cell, color: '#ffa500' },
  { id: 'c', label: 'blue', type: SwatchColorPickerItemType.Cell, color: '#0000ff' },
  { id: 'd', label: 'red', type: SwatchColorPickerItemType.Cell, color: '#ff0000' },
  { id: 'e', type: SwatchColorPickerItemType.Divider },
  { id: 'f', label: 'More Colors', type: SwatchColorPickerItemType.Header },
  { id: 'd2', type: SwatchColorPickerItemType.Divider },
  { id: 'g', label: 'green', type: SwatchColorPickerItemType.Cell, color: 'green' },
  { id: 'h', label: 'orange', type: SwatchColorPickerItemType.Cell, color: 'orange' },
  { id: 'i', label: 'blue', type: SwatchColorPickerItemType.Cell, color: 'blue' },
  { id: 'j', label: 'red', type: SwatchColorPickerItemType.Cell, color: 'red' },
  { id: 'k', label: 'black', type: SwatchColorPickerItemType.Cell, color: 'black' },
  { id: 'l', label: 'grey', type: SwatchColorPickerItemType.Cell, color: 'grey' },
  { id: 'm', label: 'purple', type: SwatchColorPickerItemType.Cell, color: 'purple' },
  { id: 'n', label: 'yellow', type: SwatchColorPickerItemType.Cell, color: 'yellow' },
  { id: 'o', type: SwatchColorPickerItemType.Divider },
  { id: 'p', label: 'Find Colors', type: SwatchColorPickerItemType.MenuItem },
  { id: 'q', label: 'Find More Colors', type: SwatchColorPickerItemType.MenuItem, menuItemButtonProps: { iconProps: { iconName: 'glasses' } } },
  { id: 'r', label: '...More Colors...', type: SwatchColorPickerItemType.MenuItem },
  { id: 's', label: 'Find Even More Colors', type: SwatchColorPickerItemType.MenuItem, menuItemButtonProps: { iconProps: { iconName: 'redEye' } } }
];

describe('SwatchColorPicker', () => {

  it('Can render in full without being parented to a button', () => {
    const wrapper = mount(
      <SwatchColorPicker
        swatchColorPickerItems={ DEFAULT_OPTIONS }
        columnCount={ 4 }
      />);
    let swatchColorPickerRoot = wrapper.find('.ms-swatchColorPickerWrapper');
    let menu = wrapper.getDOMNode().ownerDocument.querySelector('.ms-swatchColorPickerMenu');

    expect(swatchColorPickerRoot.find('.ms-swatchColorPickerButton').length).to.equal(0, 'should not have a button');
    expect(menu).equal(null, 'should not have a menu ');
    expect(swatchColorPickerRoot.find('.ms-swatchColorPickerBodyContainer').length).to.equal(1, 'should have a swatch color picker body');
  });

  it('Can render collapsed behind a button', () => {
    const wrapper = mount(
      <SwatchColorPicker
        menuButtonProps={ { iconProps: { iconName: 'fontColor' }, title: 'Font Color' } }
        swatchColorPickerItems={ DEFAULT_OPTIONS }
        columnCount={ 4 }
      />);
    let swatchColorPickerRoot = wrapper.find('.ms-swatchColorPickerWrapper');

    expect(swatchColorPickerRoot.find('.ms-swatchColorPickerButton').length).to.equal(1, 'should have a button');
    expect(swatchColorPickerRoot.find('.ms-swatchColorPickerButton.is-expanded').length).to.equal(0, 'not be expanded');
  });

  it('Can render collapsed behind a button and expand', () => {
    const wrapper = mount(
      <SwatchColorPicker
        menuButtonProps={ { iconProps: { iconName: 'fontColor' }, title: 'Font Color' } }
        swatchColorPickerItems={ DEFAULT_OPTIONS }
        columnCount={ 4 }
      />);
    let swatchColorPickerRoot = wrapper.find('.ms-swatchColorPickerWrapper');

    expect(swatchColorPickerRoot.find('.ms-swatchColorPickerButton').length).to.equal(1, 'should have a button');
    expect(swatchColorPickerRoot.find('.ms-swatchColorPickerButton.is-expanded').length).to.equal(0, 'should not be expanded');

    swatchColorPickerRoot.find('.ms-swatchColorPickerButton').simulate('click');

    expect(swatchColorPickerRoot.find('.ms-swatchColorPickerButton').length).to.equal(1, 'should have a button');
    expect(swatchColorPickerRoot.find('.ms-swatchColorPickerButton.is-expanded').length).to.equal(1, 'should be expanded');

    let menu = wrapper.getDOMNode().ownerDocument.querySelector('.ms-swatchColorPickerMenu');

    expect(menu).to.not.equal(null, 'should have a menu');
    expect(menu!.querySelectorAll('.ms-swatchColorPickerBodyContainer').length).to.equal(1, 'should have a swatch color picker body inside of the menu');
  });

  it('Can render the correct options when in a menu', () => {
    const wrapper = mount(
      <SwatchColorPicker
        menuButtonProps={ { iconProps: { iconName: 'fontColor' }, title: 'Font Color' } }
        swatchColorPickerItems={ DEFAULT_OPTIONS }
        columnCount={ 4 }
      />);
    let swatchColorPickerRoot = wrapper.find('.ms-swatchColorPickerWrapper');

    expect(swatchColorPickerRoot.find('.ms-swatchColorPickerButton').length).to.equal(1, 'should have a button');
    expect(swatchColorPickerRoot.find('.ms-swatchColorPickerButton.is-expanded').length).to.equal(0, 'should not be expanded');

    let button = swatchColorPickerRoot.find('.ms-swatchColorPickerButton');

    expect(button).to.not.equal(null, 'should have a button');
    button.simulate('click');

    let menu = wrapper.getDOMNode().ownerDocument.querySelector('.ms-swatchColorPickerMenu') as Element;
    expect(menu).to.not.equal(null, 'should have a menu');

    let tableElements = menu.querySelectorAll('table[role="grid"]');
    let tableRowElements = menu.querySelectorAll('tr[role="row"]');
    let tableCellElements = menu.querySelectorAll('button[role="gridcell"]');
    let headingElements = menu.querySelectorAll('[role="heading"]');
    let dividerElements = menu.querySelectorAll('[role="separator"]');
    let menuitems = menu.querySelectorAll('button[role="menuitem"]');
    let buttons = menu.querySelectorAll('button[role="button"]');
    let setSizeElements = menu.querySelectorAll('[aria-setsize]');

    expect(menu.querySelectorAll('[role="menu"]').length).to.equal(1, 'should be one menu in the swatch color picker');
    expect(tableElements.length).to.equal(2, 'should be two grids in the swatch color picker');
    expect(tableElements[0].getAttribute('aria-posinset')).to.equal('1', 'first grid should have aria-posinset of 1');
    expect(tableElements[1].getAttribute('aria-posinset')).to.equal('2', 'first grid should have aria-posinset of 2');
    expect(tableRowElements.length).to.equal(3, 'should be three rows in the swatch color picker');
    expect(tableRowElements[0].getElementsByTagName('td').length).to.equal(4, 'the first row should have four td elements');
    expect(tableRowElements[1].getElementsByTagName('td').length).to.equal(4, 'the second row should have four td elements');
    expect(tableRowElements[2].getElementsByTagName('td').length).to.equal(4, 'the third row should have four td elements');
    expect(tableCellElements.length).to.equal(12, 'should be twelve grid cells in the swatch color picker');
    expect(headingElements.length).to.equal(2, 'should be two headers in the swatch color picker');
    expect(dividerElements.length).to.equal(4, 'should be four dividers in the swatch color picker');
    expect(menuitems.length).to.equal(4, 'should be four menu items in the swatch color picker');
    expect(menuitems[0].getAttribute('aria-posinset')).to.equal('3', 'first grid should have aria-posinset of 3');
    expect(menuitems[1].getAttribute('aria-posinset')).to.equal('4', 'first grid should have aria-posinset of 4');
    expect(menuitems[2].getAttribute('aria-posinset')).to.equal('5', 'first grid should have aria-posinset of 5');
    expect(menuitems[3].getAttribute('aria-posinset')).to.equal('6', 'first grid should have aria-posinset of 6');
    expect(setSizeElements.length).to.equal(6, 'should be six elements with aria-setsize in the swatch color picker');
    expect(buttons.length).to.equal(0, 'should be zero role="button" elements in the swatch color picker');
    expect(setSizeElements[0].getAttribute('aria-setsize')).to.equal('6', 'set size shoud be equal to six in the swatch color picker');
  });

  it('Can render the correct options when not in a menu', () => {
    const wrapper = mount(
      <SwatchColorPicker
        swatchColorPickerItems={ DEFAULT_OPTIONS }
        columnCount={ 4 }
      />);
    let swatchColorPickerRoot = wrapper.find('.ms-swatchColorPickerWrapper');
    let reactContainer = wrapper.find('.ms-swatchColorPickerBodyContainer');
    let container = reactContainer.getDOMNode();
    expect(container).to.not.equal(null, 'should have a container');

    let tableElements = container.querySelectorAll('table[role="grid"]');
    let tableRowElements = container.querySelectorAll('tr[role="row"]');
    let tableCellElements = container.querySelectorAll('button[role="gridcell"]');
    let headingElements = container.querySelectorAll('[role="heading"]');
    let dividerElements = container.querySelectorAll('[role="separator"]');
    let menuitems = container.querySelectorAll('button[role="menuitem"]');
    let buttons = container.querySelectorAll('button[role="button"]');
    let setSizeElements = container.querySelectorAll('[aria-setsize]');
    let posInSetElements = container.querySelectorAll('[aria-posinset]');

    expect(container.querySelectorAll('[role="menu"]').length).to.equal(0, 'should be zero menus in the swatch color picker');
    expect(tableElements.length).to.equal(2, 'should be two grids in the swatch color picker');
    expect(tableRowElements.length).to.equal(3, 'should be three rows in the swatch color picker');
    expect(tableRowElements[0].getElementsByTagName('td').length).to.equal(4, 'the first row should have four td elements');
    expect(tableRowElements[1].getElementsByTagName('td').length).to.equal(4, 'the second row should have four td elements');
    expect(tableRowElements[2].getElementsByTagName('td').length).to.equal(4, 'the third row should have four td elements');
    expect(tableCellElements.length).to.equal(12, 'should be twelve grid cells in the swatch color picker');
    expect(headingElements.length).to.equal(2, 'should be two headers in the swatch color picker');
    expect(dividerElements.length).to.equal(4, 'should be four dividers in the swatch color picker');
    expect(menuitems.length).to.equal(0, 'should be zero menu items in the swatch color picker');
    expect(buttons.length).to.equal(4, 'should be four buttons in the swatch color picker');
    expect(setSizeElements.length).to.equal(0, 'should be zero elements with aria-setsize since we are not in a menu in the swatch color picker');
    expect(posInSetElements.length).to.equal(0, 'should be zero elements with aria-posinset since we are not in a menu in the swatch color picker');
  });

  it('Cannot expand a disabled collapsed swatch color picker', () => {
    const wrapper = mount(
      <SwatchColorPicker
        menuButtonProps={ { iconProps: { iconName: 'fontColor' }, title: 'Font Color' } }
        swatchColorPickerItems={ DEFAULT_OPTIONS }
        columnCount={ 4 }
        disabled={ true }
      />);
    let swatchColorPickerRoot = wrapper.find('.ms-swatchColorPickerWrapper');

    expect(swatchColorPickerRoot.find('.ms-swatchColorPickerButton').length).to.equal(1, 'should have a button');
    expect(swatchColorPickerRoot.find('.ms-swatchColorPickerButton.is-expanded').length).to.equal(0, 'should not be expanded');

    swatchColorPickerRoot.find('.ms-swatchColorPickerButton').simulate('click');

    expect(swatchColorPickerRoot.find('.ms-swatchColorPickerButton.is-expanded').length).to.equal(0, 'should be expanded');

    swatchColorPickerRoot.find('.ms-swatchColorPickerButton').simulate('keydown', { which: KeyCodes.enter });

    expect(swatchColorPickerRoot.find('.ms-swatchColorPickerButton.is-expanded').length).to.equal(0, 'should be expanded');
  });

  it('Cannot execute a disabled cell in an expanded swatch color picker', () => {
    let eventFireCounter = 0;
    const wrapper = mount(
      <SwatchColorPicker
        menuButtonProps={ { iconProps: { iconName: 'fontColor' }, title: 'Font Color' } }
        swatchColorPickerItems={ [{ id: 'a', label: 'green', type: SwatchColorPickerItemType.Cell, color: '#00ff00', disabled: true }] }
        onColorChanged={ (color) => eventFireCounter++ }
        columnCount={ 4 }
      />);
    let swatchColorPickerRoot = wrapper.find('.ms-swatchColorPickerWrapper');

    expect(swatchColorPickerRoot.find('.ms-swatchColorPickerButton').length).to.equal(1, 'should have a button');
    expect(swatchColorPickerRoot.find('.ms-swatchColorPickerButton.is-expanded').length).to.equal(0, 'should not be expanded');

    swatchColorPickerRoot.find('.ms-swatchColorPickerButton').simulate('click');

    expect(swatchColorPickerRoot.find('.ms-swatchColorPickerButton.is-expanded').length).to.equal(1, 'should be expanded');

    let menu = wrapper.getDOMNode().ownerDocument.querySelector('.ms-swatchColorPickerMenu') as Element;
    expect(menu).to.not.equal(null, 'should have a menu');

    let cell = menu.querySelector('button') as HTMLButtonElement;
    expect(cell).to.not.equal(null, 'should find a cell');

    ReactTestUtils.Simulate.click(cell);
    expect(swatchColorPickerRoot.find('.ms-swatchColorPickerButton.is-expanded').length).to.equal(1, 'should still be expanded');

    ReactTestUtils.Simulate.keyDown(cell, { which: KeyCodes.enter });
    expect(swatchColorPickerRoot.find('.ms-swatchColorPickerButton.is-expanded').length).to.equal(1, 'at the end the menu should still be expanded');

    expect(eventFireCounter).to.equal(0, 'no color changed events were fired');
  });

  it('Cannot execute a disabled menu item in an expanded swatch color picker', () => {
    let eventFireCounter = 0;
    const wrapper = mount(
      <SwatchColorPicker
        menuButtonProps={ { iconProps: { iconName: 'fontColor' }, title: 'Font Color' } }
        swatchColorPickerItems={ [{ id: 'a', label: 'green', type: SwatchColorPickerItemType.MenuItem, disabled: true }] }
        onMenuItemClick={ (item) => eventFireCounter++ }
        columnCount={ 4 }
      />);
    let swatchColorPickerRoot = wrapper.find('.ms-swatchColorPickerWrapper');

    expect(swatchColorPickerRoot.find('.ms-swatchColorPickerButton').length).to.equal(1, 'should have a button');
    expect(swatchColorPickerRoot.find('.ms-swatchColorPickerButton.is-expanded').length).to.equal(0, 'should not be expanded');

    swatchColorPickerRoot.find('.ms-swatchColorPickerButton').simulate('click');

    expect(swatchColorPickerRoot.find('.ms-swatchColorPickerButton.is-expanded').length).to.equal(1, 'should be expanded');

    let menu = wrapper.getDOMNode().ownerDocument.querySelector('.ms-swatchColorPickerMenu') as Element;
    expect(menu).to.not.equal(null, 'should have a menu');

    let cell = menu.querySelector('button') as HTMLButtonElement;
    expect(cell).to.not.equal(null, 'should find a cell');

    ReactTestUtils.Simulate.click(cell);
    expect(swatchColorPickerRoot.find('.ms-swatchColorPickerButton.is-expanded').length).to.equal(1, 'should still be expanded');
    expect(eventFireCounter).to.equal(0, 'no color changed events were fired');
  });

  it('Cannot execute a disabled cell in a non-collapsable swatch color picker', () => {
    let eventFireCounter = 0;
    const wrapper = mount(
      <SwatchColorPicker
        swatchColorPickerItems={ [{ id: 'a', label: 'green', type: SwatchColorPickerItemType.Cell, color: '#00ff00', disabled: true }] }
        onColorChanged={ (color) => eventFireCounter++ }
        columnCount={ 4 }
      />);
    let swatchColorPickerRoot = wrapper.find('.ms-swatchColorPickerWrapper');

    let button = swatchColorPickerRoot.find('button');
    expect(button).to.not.equal(null, 'should find a button');
    button.simulate('click');
    expect(eventFireCounter).to.equal(0, 'no color changed events were fired');
  });

  it('Cannot execute a disabled menu item in a non-collapsable swatch color picker', () => {
    let eventFireCounter = 0;
    const wrapper = mount(
      <SwatchColorPicker
        swatchColorPickerItems={ [{ id: 'a', label: 'green', type: SwatchColorPickerItemType.MenuItem, disabled: true }] }
        onMenuItemClick={ (item) => eventFireCounter++ }
        columnCount={ 4 }
      />);
    let swatchColorPickerRoot = wrapper.find('.ms-swatchColorPickerWrapper');

    let button = swatchColorPickerRoot.find('button');
    expect(button).to.not.equal(null, 'should find a button');
    button.simulate('click');
    expect(eventFireCounter).to.equal(0, 'no color changed events were fired');
  });

  it('Can execute a cell in non-collapsable swatch color picker ', () => {
    let eventFireCounter = 0;
    const wrapper = mount(
      <SwatchColorPicker
        swatchColorPickerItems={ [{ id: 'a', label: 'green', type: SwatchColorPickerItemType.Cell, color: '#00ff00' }] }
        onColorChanged={ (color) => eventFireCounter++ }
        columnCount={ 4 }
      />);
    let swatchColorPickerRoot = wrapper.find('.ms-swatchColorPickerWrapper');
    let reactContainer = wrapper.find('.ms-swatchColorPickerBodyContainer');
    let container = reactContainer.getDOMNode();
    expect(container).to.not.equal(null, 'should have a container');

    let item = container.querySelector('[role="gridcell"]') as Element;
    expect(item).to.not.equal(null, 'should find a item');

    ReactTestUtils.Simulate.click(item);
    expect(eventFireCounter).to.equal(1, 'one color changed events were fired');
  });

  it('Can execute a menu item in non-collapsable swatch color picker ', () => {
    let eventFireCounter = 0;
    const wrapper = mount(
      <SwatchColorPicker
        swatchColorPickerItems={ [{ id: 'a', label: 'green', type: SwatchColorPickerItemType.MenuItem }] }
        onMenuItemClick={ (item) => eventFireCounter++ }
        columnCount={ 4 }
      />);
    let swatchColorPickerRoot = wrapper.find('.ms-swatchColorPickerWrapper');
    let reactContainer = wrapper.find('.ms-swatchColorPickerBodyContainer');
    let container = reactContainer.getDOMNode();
    expect(container).to.not.equal(null, 'should have a container');

    let item = container.querySelector('[role="button"]') as Element;
    expect(item).to.not.equal(null, 'should find a item');

    ReactTestUtils.Simulate.click(item);
    expect(eventFireCounter).to.equal(1, 'one color changed events were fired');
  });

  it('Can fire the hover event on a cell in non-collapsable swatch color picker ', () => {
    let eventFireCounter = 0;
    const wrapper = mount(
      <SwatchColorPicker
        swatchColorPickerItems={ [{ id: 'a', label: 'green', type: SwatchColorPickerItemType.Cell, color: '#00ff00' }] }
        onCellHovered={ (color) => eventFireCounter++ }
        columnCount={ 4 }
      />);
    let swatchColorPickerRoot = wrapper.find('.ms-swatchColorPickerWrapper');
    let reactContainer = wrapper.find('.ms-swatchColorPickerBodyContainer');
    let container = reactContainer.getDOMNode();
    expect(container).to.not.equal(null, 'should have a container');

    let cell = container.querySelector('[role="gridcell"]') as Element;
    expect(cell).to.not.equal(null, 'should find a cell');

    ReactTestUtils.Simulate.mouseEnter(cell);
    expect(eventFireCounter).to.equal(1, 'one color changed events were fired');
  });

  it('Can fire the focus event on a cell in non-collapsable swatch color picker ', () => {
    let eventFireCounter = 0;
    const wrapper = mount(
      <SwatchColorPicker
        swatchColorPickerItems={ [{ id: 'a', label: 'green', type: SwatchColorPickerItemType.Cell, color: '#00ff00' }] }
        onCellFocused={ (color) => eventFireCounter++ }
        columnCount={ 4 }
      />);
    let swatchColorPickerRoot = wrapper.find('.ms-swatchColorPickerWrapper');
    let reactContainer = wrapper.find('.ms-swatchColorPickerBodyContainer');
    let container = reactContainer.getDOMNode();
    expect(container).to.not.equal(null, 'should have a container');

    let cell = container.querySelector('[role="gridcell"]') as Element;
    expect(cell).to.not.equal(null, 'should find a cell');

    ReactTestUtils.Simulate.focus(cell);
    expect(eventFireCounter).to.equal(1, 'one color changed events were fired');
  });

  it('Cannot fire a hover or focus event on a disabled cell in non-collapsable swatch color picker ', () => {
    let eventFireCounter = 0;
    const wrapper = mount(
      <SwatchColorPicker
        swatchColorPickerItems={ [{ id: 'a', label: 'green', type: SwatchColorPickerItemType.Cell, color: '#00ff00', disabled: true }] }
        onCellFocused={ (color) => eventFireCounter++ }
        onCellHovered={ (color) => eventFireCounter++ }
        columnCount={ 4 }
      />);
    let swatchColorPickerRoot = wrapper.find('.ms-swatchColorPickerWrapper');
    let reactContainer = wrapper.find('.ms-swatchColorPickerBodyContainer');
    let container = reactContainer.getDOMNode();
    expect(container).to.not.equal(null, 'should have a container');

    let cell = container.querySelector('[role="gridcell"]') as Element;
    expect(cell).to.not.equal(null, 'should find a cell');
    ReactTestUtils.Simulate.mouseEnter(cell);
    ReactTestUtils.Simulate.focus(cell);
    expect(eventFireCounter).to.equal(0, 'no color changed events were fired');
  });
});
