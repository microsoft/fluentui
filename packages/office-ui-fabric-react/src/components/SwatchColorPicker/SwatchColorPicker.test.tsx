/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */
import * as ReactTestUtils from 'react-addons-test-utils';
import { mount } from 'enzyme';
import { SwatchColorPicker } from './SwatchColorPicker';
import { IColorCellProps } from './SwatchColorPicker.Props';

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
    expect(wrapper.find('.ms-swatchColorPickerBodyContainer').length).toEqual(1);
  });

  it('Can render the correct options when not in a menu', () => {
    const wrapper = mount(
      <SwatchColorPicker
        colorCells={ DEFAULT_OPTIONS }
        columnCount={ 4 }
      />);
    let reactContainer = wrapper.find('.ms-swatchColorPickerBodyContainer');
    let container = reactContainer.getDOMNode();
    expect(container).not.toEqual(null);

    let tableElements = container.querySelectorAll('table[role="grid"]');
    let tableRowElements = container.querySelectorAll('tr[role="row"]');
    let tableCellElements = container.querySelectorAll('button[role="gridcell"]');
    let setSizeElements = container.querySelectorAll('[aria-setsize]');
    let posInSetElements = container.querySelectorAll('[aria-posinset]');

    expect(tableElements.length).toEqual(1);
    expect(tableRowElements.length).toEqual(3);
    expect(tableRowElements[0].getElementsByTagName('td').length).toEqual(4);
    expect(tableRowElements[1].getElementsByTagName('td').length).toEqual(4);
    expect(tableRowElements[2].getElementsByTagName('td').length).toEqual(4);
    expect(tableCellElements.length).toEqual(12);
    expect(setSizeElements.length).toEqual(0);
    expect(posInSetElements.length).toEqual(0);
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
    expect(container).not.toEqual(null);

    let item = container.querySelector('[role="gridcell"]') as Element;
    expect(item).not.toEqual(null);

    ReactTestUtils.Simulate.click(item);
    expect(eventFireCounter).toEqual(1);
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
    expect(container).not.toEqual(null);

    let cell = container.querySelector('[role="gridcell"]') as Element;
    expect(cell).not.toEqual(null);

    ReactTestUtils.Simulate.mouseEnter(cell);
    expect(eventFireCounter).toEqual(1);
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
    expect(container).not.toEqual(null);

    let cell = container.querySelector('[role="gridcell"]') as Element;
    expect(cell).not.toEqual(null);

    ReactTestUtils.Simulate.focus(cell);
    expect(eventFireCounter).toEqual(1);
  });
});
