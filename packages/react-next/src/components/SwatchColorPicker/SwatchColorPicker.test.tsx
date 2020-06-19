import * as React from 'react';
import { create } from '@uifabric/utilities/lib/test';
import { mount } from 'enzyme';
import { SwatchColorPicker } from './SwatchColorPicker';
import { IColorCellProps } from './ColorPickerGridCell.types';
import { expectNodes, findNodes } from '../../common/testUtilities';
import { resetIds } from '@uifabric/utilities';

const DEFAULT_OPTIONS: IColorCellProps[] = [
  { id: 'a', label: 'green', color: '#00ff00' },
  { id: 'b', label: 'orange', color: '#ffa500' },
  { id: 'c', label: 'blue', color: '#0000ff' },
  { id: 'd', label: 'red', color: '#ff0000' },
  { id: 'g', label: 'green', color: '#01ff01' },
  { id: 'h', label: 'orange', color: '#ffa501' },
  { id: 'i', label: 'blue', color: '#0101ff' },
  { id: 'j', label: 'red', color: '#ff0101' },
  { id: 'k', label: 'black', color: '#000' },
  { id: 'l', label: 'grey', color: '#888' },
  { id: 'm', label: 'white', color: '#fff' },
  { id: 'n', label: 'something', color: '#123' },
];

describe('SwatchColorPicker', () => {
  beforeEach(() => {
    resetIds();
  });

  it('renders SwatchColorPicker correctly', () => {
    const component = create(<SwatchColorPicker colorCells={DEFAULT_OPTIONS} columnCount={4} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Can render in full without being parented to a button', () => {
    const wrapper = mount(<SwatchColorPicker colorCells={DEFAULT_OPTIONS} columnCount={4} />);

    expectNodes(wrapper, '.ms-swatchColorPickerBodyContainer', 1);
  });

  it('Can render the correct options when not in a menu', () => {
    const wrapper = mount(<SwatchColorPicker colorCells={DEFAULT_OPTIONS} columnCount={4} />);

    expectNodes(wrapper, '.ms-swatchColorPickerBodyContainer', 1);
    expectNodes(wrapper, 'table[role="grid"]', 1);

    const tableRowElements = findNodes(wrapper, 'tr[role="row"]');

    expect(tableRowElements.length).toEqual(3);
    expect(tableRowElements.at(0).find('td').length).toEqual(4);
    expect(tableRowElements.at(1).find('td').length).toEqual(4);
    expect(tableRowElements.at(2).find('td').length).toEqual(4);
    expectNodes(wrapper, 'button[role="gridcell"]', 12);
    expectNodes(wrapper, '[aria-setsize]', 0);
    expectNodes(wrapper, '[aria-posinset]', 0);
  });

  it('Can execute a cell in non-collapsable swatch color picker ', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <SwatchColorPicker colorCells={[DEFAULT_OPTIONS[0]]} onColorChanged={onChange} columnCount={4} />,
    );

    expectNodes(wrapper, '.ms-swatchColorPickerBodyContainer', 1);
    expectNodes(wrapper, '.ms-swatchColorPickerBodyContainer [role="gridcell"]', 1);

    wrapper
      .find('.ms-swatchColorPickerBodyContainer [role="gridcell"]')
      .at(1)
      .simulate('click');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('Can fire the hover event on a cell in non-collapsable swatch color picker ', () => {
    const onHover = jest.fn();
    const wrapper = mount(
      <SwatchColorPicker colorCells={[DEFAULT_OPTIONS[0]]} onCellHovered={onHover} columnCount={4} />,
    );

    wrapper
      .find('.ms-swatchColorPickerBodyContainer [role="gridcell"]')
      .at(0)
      .simulate('mouseenter');
    expect(onHover).toHaveBeenCalledTimes(1);
  });

  it('Can fire the focus event on a cell in non-collapsable swatch color picker ', () => {
    const onFocus = jest.fn();
    const wrapper = mount(
      <SwatchColorPicker colorCells={[DEFAULT_OPTIONS[0]]} onCellFocused={onFocus} columnCount={4} />,
    );

    wrapper
      .find('.ms-swatchColorPickerBodyContainer [role="gridcell"]')
      .at(0)
      .simulate('focus');
    expect(onFocus).toHaveBeenCalledTimes(1);
  });
});
