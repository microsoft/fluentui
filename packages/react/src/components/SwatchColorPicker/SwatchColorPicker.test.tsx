import * as React from 'react';
import { create } from '@fluentui/test-utilities';
import { mount } from 'enzyme';
import { SwatchColorPicker } from './SwatchColorPicker';
import { resetIds } from '@fluentui/utilities';
import { isConformant } from '../../common/isConformant';
import { expectNodes, findNodes } from '../../common/testUtilities';
import type { ISwatchColorPickerProps } from './SwatchColorPicker.types';
import type { IColorCellProps } from './ColorPickerGridCell.types';

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

  isConformant({
    Component: SwatchColorPicker,
    displayName: 'SwatchColorPicker',
    requiredProps: { colorCells: DEFAULT_OPTIONS, columnCount: 4 },
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

  it('Uses radio semantics if cell count is less than or equal to column count', () => {
    const wrapper = mount(
      <SwatchColorPicker colorCells={[DEFAULT_OPTIONS[0], DEFAULT_OPTIONS[1], DEFAULT_OPTIONS[2]]} columnCount={3} />,
    );

    expectNodes(wrapper, 'table[role="grid"]', 0);
    expectNodes(wrapper, 'table[role="radiogroup"]', 1);
    expectNodes(wrapper, 'button[role="gridcell"]', 0);
    expectNodes(wrapper, 'button[role="radio"]', 3);
  });

  it('Can execute a cell in non-collapsable swatch color picker ', () => {
    const onChange = jest.fn();
    const wrapper = mount(<SwatchColorPicker colorCells={[DEFAULT_OPTIONS[0]]} onChange={onChange} columnCount={4} />);

    expectNodes(wrapper, '.ms-swatchColorPickerBodyContainer', 1);
    expectNodes(wrapper, '.ms-swatchColorPickerBodyContainer [role="radio"]', 1);

    wrapper.find('.ms-swatchColorPickerBodyContainer [role="radio"]').at(1).simulate('click');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('Can fire the hover event on a cell in non-collapsible swatch color picker ', () => {
    const onHover = jest.fn();
    const wrapper = mount(
      <SwatchColorPicker colorCells={[DEFAULT_OPTIONS[0]]} onCellHovered={onHover} columnCount={4} />,
    );

    wrapper.find('.ms-swatchColorPickerBodyContainer [role="radio"]').at(0).simulate('mouseenter');
    expect(onHover).toHaveBeenCalledTimes(1);
  });

  it('Can fire the focus event on a cell in non-collapsible swatch color picker ', () => {
    const onFocus = jest.fn();
    const wrapper = mount(
      <SwatchColorPicker colorCells={[DEFAULT_OPTIONS[0]]} onCellFocused={onFocus} columnCount={4} />,
    );

    wrapper.find('.ms-swatchColorPickerBodyContainer [role="radio"]').at(0).simulate('focus');
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('Can render the color picker when onRenderCell props is passed to swatch color picker ', () => {
    const onRenderColorCell = jest.fn();
    mount(
      <SwatchColorPicker colorCells={[DEFAULT_OPTIONS[0]]} onRenderColorCell={onRenderColorCell} columnCount={4} />,
    );
    expect(onRenderColorCell).toHaveBeenCalledTimes(1);
  });

  it('Can render the color picker when onRenderCell props is passed to swatch color picker ', () => {
    const onRenderColorCell = jest.fn();
    mount(
      <SwatchColorPicker colorCells={[DEFAULT_OPTIONS[0]]} onRenderColorCell={onRenderColorCell} columnCount={4} />,
    );
    expect(onRenderColorCell).toHaveBeenCalledTimes(1);
  });

  it('Can set the selectedID ', () => {
    const wrapper = mount(
      <SwatchColorPicker colorCells={[DEFAULT_OPTIONS[0], DEFAULT_OPTIONS[1]]} columnCount={4} selectedId={'a'} />,
    );

    const tableElements = findNodes(wrapper, '.ms-Button');
    expect(tableElements.length).toEqual(2);
    expect(tableElements.at(0).prop('aria-checked')).toEqual(true);
  });

  it('Can clear the selectedID if controlled', () => {
    const props: ISwatchColorPickerProps = {
      colorCells: [DEFAULT_OPTIONS[0], DEFAULT_OPTIONS[1]],
      columnCount: 4,
      selectedId: 'a',
    };
    const wrapper = mount(<SwatchColorPicker {...props} />);

    let tableElements = findNodes(wrapper, '.ms-Button');
    expect(tableElements.length).toEqual(2);

    // Verify initial id is selected
    expect(tableElements.at(0).prop('aria-checked')).toEqual(true);
    expect(tableElements.at(1).prop('aria-checked')).toEqual(false);

    // Update the props to set selected to undefined
    wrapper.setProps({ selectedId: undefined });

    tableElements = findNodes(wrapper, '.ms-Button');
    expect(tableElements.length).toEqual(2);

    // Verify nothing is selected
    expect(tableElements.at(0).prop('aria-checked')).toEqual(false);
    expect(tableElements.at(1).prop('aria-checked')).toEqual(false);
  });

  it('Cannot clear the selectedID if uncontrolled', () => {
    const props: ISwatchColorPickerProps = {
      colorCells: DEFAULT_OPTIONS,
      columnCount: 4,
    };
    const wrapper = mount(<SwatchColorPicker {...props} defaultSelectedId={'a'} />);

    let tableElements = findNodes(wrapper, '.ms-Button');
    expect(tableElements.length).toEqual(12);

    // Verify initial id is selected
    expect(tableElements.at(0).prop('aria-selected')).toEqual(true);

    // Update the props to set selected to undefined
    wrapper.setProps({ selectedId: undefined });

    tableElements = findNodes(wrapper, '.ms-Button');
    expect(tableElements.length).toEqual(12);

    // Verify initial id is still selected
    expect(tableElements.at(0).prop('aria-selected')).toEqual(true);
  });
});
