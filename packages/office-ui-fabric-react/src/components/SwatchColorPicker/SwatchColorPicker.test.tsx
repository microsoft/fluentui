import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { SwatchColorPicker } from './SwatchColorPicker';
import { IColorCellProps } from './ColorPickerGridCell.types';
import { expectNodes, findNodes } from '../../common/testUtilities';

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
  { id: 'n', label: 'something', color: '#123' }
];

describe('SwatchColorPicker', () => {
  it('renders SwatchColorPicker correctly', () => {
    const component = renderer.create(<SwatchColorPicker colorCells={DEFAULT_OPTIONS} columnCount={4} />);
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
    let eventFireCounter = 0;
    const wrapper = mount(
      <SwatchColorPicker
        colorCells={[{ id: 'a', label: 'green', color: '#00ff00' }]}
        // tslint:disable-next-line:jsx-no-lambda
        onColorChanged={color => eventFireCounter++}
        columnCount={4}
      />
    );

    expectNodes(wrapper, '.ms-swatchColorPickerBodyContainer', 1);
    expectNodes(wrapper, '.ms-swatchColorPickerBodyContainer [role="gridcell"]', 1);

    wrapper
      .find('.ms-swatchColorPickerBodyContainer [role="gridcell"]')
      .at(1)
      .simulate('click');
    expect(eventFireCounter).toEqual(1);
  });

  it('Can fire the hover event on a cell in non-collapsable swatch color picker ', () => {
    let eventFireCounter = 0;
    const wrapper = mount(
      <SwatchColorPicker
        colorCells={[{ id: 'a', label: 'green', color: '#00ff00' }]}
        // tslint:disable-next-line:jsx-no-lambda
        onCellHovered={color => eventFireCounter++}
        columnCount={4}
      />
    );

    wrapper
      .find('.ms-swatchColorPickerBodyContainer [role="gridcell"]')
      .at(0)
      .simulate('mouseenter');
    expect(eventFireCounter).toEqual(1);
  });

  it('Can fire the focus event on a cell in non-collapsable swatch color picker ', () => {
    let eventFireCounter = 0;
    const wrapper = mount(
      <SwatchColorPicker
        colorCells={[{ id: 'a', label: 'green', color: '#00ff00' }]}
        // tslint:disable-next-line:jsx-no-lambda
        onCellFocused={color => eventFireCounter++}
        columnCount={4}
      />
    );

    wrapper
      .find('.ms-swatchColorPickerBodyContainer [role="gridcell"]')
      .at(0)
      .simulate('focus');
    expect(eventFireCounter).toEqual(1);
  });
});
