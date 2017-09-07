/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */
import * as ReactTestUtils from 'react-addons-test-utils';
import { mount } from 'enzyme';
import { SwatchColorPicker } from './SwatchColorPicker';
import { IColorCellProps } from './SwatchColorPicker.Props';

let { expect } = chai;

const DEFAULT_OPTIONS: IColorCellProps[] = [
  { id: 'a', label: 'green', color: '#00ff00' },
  { id: 'b', label: 'orange', color: '#ffa500' },
  { id: 'c', label: 'blue', color: '#0000ff' },
  { id: 'd', label: 'red', color: '#ff0000' },
  { id: 'g', label: 'green', color: 'green' },
  { id: 'h', label: 'orange', color: 'orange' },
  { id: 'i', label: 'blue', color: 'blue' },
  { id: 'j', label: 'red', color: 'red' },
  { id: 'k', label: 'black', color: 'black' },
  { id: 'l', label: 'grey', color: 'grey' },
  { id: 'm', label: 'purple', color: 'purple' },
  { id: 'n', label: 'yellow', color: 'yellow' }
];

describe('SwatchColorPicker', () => {

  it('Can render in full without being parented to a button', () => {
    const wrapper = mount(
      <SwatchColorPicker
        colorCells={ DEFAULT_OPTIONS }
        columnCount={ 4 }
      />);
    expect(wrapper.find('.ms-swatchColorPickerBodyContainer').length).to.equal(1, 'should have a swatch color picker');
  });

  it('Can render the correct options when not in a menu', () => {
    const wrapper = mount(
      <SwatchColorPicker
        colorCells={ DEFAULT_OPTIONS }
        columnCount={ 4 }
      />);
    let reactContainer = wrapper.find('.ms-swatchColorPickerBodyContainer');
    let container = reactContainer.getDOMNode();
    expect(container).to.not.equal(null, 'should have a container');

    let tableElements = container.querySelectorAll('table[role="grid"]');
    let tableRowElements = container.querySelectorAll('tr[role="row"]');
    let tableCellElements = container.querySelectorAll('button[role="gridcell"]');
    let setSizeElements = container.querySelectorAll('[aria-setsize]');
    let posInSetElements = container.querySelectorAll('[aria-posinset]');

    expect(tableElements.length).to.equal(1, 'should be two grids in the swatch color picker');
    expect(tableRowElements.length).to.equal(3, 'should be three rows in the swatch color picker');
    expect(tableRowElements[0].getElementsByTagName('td').length).to.equal(4, 'the first row should have four td elements');
    expect(tableRowElements[1].getElementsByTagName('td').length).to.equal(4, 'the second row should have four td elements');
    expect(tableRowElements[2].getElementsByTagName('td').length).to.equal(4, 'the third row should have four td elements');
    expect(tableCellElements.length).to.equal(12, 'should be twelve grid cells in the swatch color picker');
    expect(setSizeElements.length).to.equal(0, 'should be zero elements with aria-setsize since we are not in a menu in the swatch color picker');
    expect(posInSetElements.length).to.equal(0, 'should be zero elements with aria-posinset since we are not in a menu in the swatch color picker');
  });

  it('Can execute a cell in non-collapsable swatch color picker ', () => {
    let eventFireCounter = 0;
    const wrapper = mount(
      <SwatchColorPicker
        colorCells={ [{ id: 'a', label: 'green', color: '#00ff00' }] }
        onColorChanged={ (color) => eventFireCounter++ }
        columnCount={ 4 }
      />);
    let reactContainer = wrapper.find('.ms-swatchColorPickerBodyContainer');
    let container = reactContainer.getDOMNode();
    expect(container).to.not.equal(null, 'should have a container');

    let item = container.querySelector('[role="gridcell"]') as Element;
    expect(item).to.not.equal(null, 'should find a item');

    ReactTestUtils.Simulate.click(item);
    expect(eventFireCounter).to.equal(1, 'one color changed events were fired');
  });

  it('Can fire the hover event on a cell in non-collapsable swatch color picker ', () => {
    let eventFireCounter = 0;
    const wrapper = mount(
      <SwatchColorPicker
        colorCells={ [{ id: 'a', label: 'green', color: '#00ff00' }] }
        onCellHovered={ (color) => eventFireCounter++ }
        columnCount={ 4 }
      />);
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
        colorCells={ [{ id: 'a', label: 'green', color: '#00ff00' }] }
        onCellFocused={ (color) => eventFireCounter++ }
        columnCount={ 4 }
      />);
    let reactContainer = wrapper.find('.ms-swatchColorPickerBodyContainer');
    let container = reactContainer.getDOMNode();
    expect(container).to.not.equal(null, 'should have a container');

    let cell = container.querySelector('[role="gridcell"]') as Element;
    expect(cell).to.not.equal(null, 'should find a cell');

    ReactTestUtils.Simulate.focus(cell);
    expect(eventFireCounter).to.equal(1, 'one color changed events were fired');
  });
});
