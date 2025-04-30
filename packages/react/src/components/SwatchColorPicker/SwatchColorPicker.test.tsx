import '@testing-library/jest-dom';
import * as React from 'react';
import { create } from '@fluentui/test-utilities';
import { render, screen, fireEvent } from '@testing-library/react';
import { SwatchColorPicker } from './SwatchColorPicker';
import { resetIds } from '@fluentui/utilities';
import { isConformant } from '../../common/isConformant';
import type { ISwatchColorPickerProps } from './SwatchColorPicker.types';
import type { IColorCellProps } from './ColorPickerGridCell.types';
import { expectNodesV2 } from '../../common/testUtilities';

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
    const { container } = render(<SwatchColorPicker colorCells={DEFAULT_OPTIONS} columnCount={4} />);

    expectNodesV2(container, '.ms-swatchColorPickerBodyContainer', 1);
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('Can render the correct options when not in a menu', () => {
    const { container } = render(<SwatchColorPicker colorCells={DEFAULT_OPTIONS} columnCount={4} />);

    expectNodesV2(container, '.ms-swatchColorPickerBodyContainer', 1);
    screen.getByRole('grid');

    const rows = screen.getAllByRole('row');
    expect(rows.length).toEqual(3);
    expect(rows[0].querySelectorAll('td').length).toEqual(4);
    expect(rows[1].querySelectorAll('td').length).toEqual(4);
    expect(rows[2].querySelectorAll('td').length).toEqual(4);
    expect(screen.getAllByRole('gridcell').length).toEqual(12);
  });

  it('Uses radio semantics if cell count is less than or equal to column count', () => {
    render(
      <SwatchColorPicker colorCells={[DEFAULT_OPTIONS[0], DEFAULT_OPTIONS[1], DEFAULT_OPTIONS[2]]} columnCount={3} />,
    );

    expect(screen.queryByRole('grid')).not.toBeInTheDocument();
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getAllByRole('radio').length).toEqual(3);
  });

  it('Can execute a cell in non-collapsable swatch color picker', () => {
    const onChange = jest.fn();
    const { container } = render(
      <SwatchColorPicker colorCells={[DEFAULT_OPTIONS[0]]} onChange={onChange} columnCount={4} />,
    );
    expectNodesV2(container, '.ms-swatchColorPickerBodyContainer', 1);

    const radio = screen.getByRole('radio');
    fireEvent.click(radio);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('Can fire the hover event on a cell in non-collapsible swatch color picker', () => {
    const onHover = jest.fn();
    render(<SwatchColorPicker colorCells={[DEFAULT_OPTIONS[0]]} onCellHovered={onHover} columnCount={4} />);

    const radio = screen.getByRole('radio');
    fireEvent.mouseEnter(radio);
    expect(onHover).toHaveBeenCalledTimes(1);
  });

  it('Can fire the focus event on a cell in non-collapsible swatch color picker', () => {
    const onFocus = jest.fn();
    render(<SwatchColorPicker colorCells={[DEFAULT_OPTIONS[0]]} onCellFocused={onFocus} columnCount={4} />);

    const radio = screen.getByRole('radio');
    fireEvent.focus(radio);
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('Can render the color picker when onRenderCell props is passed to swatch color picker ', () => {
    const onRenderColorCell = jest.fn();
    render(
      <SwatchColorPicker colorCells={[DEFAULT_OPTIONS[0]]} onRenderColorCell={onRenderColorCell} columnCount={4} />,
    );
    expect(onRenderColorCell).toHaveBeenCalledTimes(1);
  });

  it('Can render the color picker when onRenderCell props is passed to swatch color picker ', () => {
    const onRenderColorCell = jest.fn();
    render(
      <SwatchColorPicker colorCells={[DEFAULT_OPTIONS[0]]} onRenderColorCell={onRenderColorCell} columnCount={4} />,
    );
    expect(onRenderColorCell).toHaveBeenCalledTimes(1);
  });

  it('Can set the selectedID ', () => {
    render(
      <SwatchColorPicker colorCells={[DEFAULT_OPTIONS[0], DEFAULT_OPTIONS[1]]} columnCount={4} selectedId={'a'} />,
    );

    const tableElements = screen.getAllByRole('radio');
    expect(tableElements.length).toEqual(2);
    expect(tableElements[0].getAttribute('aria-checked')).toEqual('true');
  });

  it('Can clear the selectedID if controlled', () => {
    const props: ISwatchColorPickerProps = {
      colorCells: [DEFAULT_OPTIONS[0], DEFAULT_OPTIONS[1]],
      columnCount: 4,
      selectedId: 'a',
    };
    const { rerender } = render(<SwatchColorPicker {...props} />);

    let tableElements = screen.getAllByRole('radio');
    expect(tableElements.length).toEqual(2);

    // Verify initial id is selected
    expect(tableElements[0].getAttribute('aria-checked')).toEqual('true');
    expect(tableElements[1].getAttribute('aria-checked')).toEqual('false');

    // Update the props to set selected to undefined
    rerender(<SwatchColorPicker {...props} selectedId={undefined} />);

    tableElements = screen.getAllByRole('radio');
    expect(tableElements.length).toEqual(2);

    // Verify nothing is selected
    expect(tableElements[0].getAttribute('aria-checked')).toEqual('false');
    expect(tableElements[1].getAttribute('aria-checked')).toEqual('false');
  });

  it('Cannot clear the selectedID if uncontrolled', () => {
    const props: ISwatchColorPickerProps = {
      colorCells: DEFAULT_OPTIONS,
      columnCount: 4,
    };
    const { rerender } = render(<SwatchColorPicker {...props} defaultSelectedId={'a'} />);

    let tableElements = screen.getAllByRole('gridcell');
    expect(tableElements.length).toEqual(12);

    // Verify initial id is selected
    expect(tableElements[0].getAttribute('aria-selected')).toEqual('true');

    // Update the props to set selected to undefined
    rerender(<SwatchColorPicker {...props} selectedId={undefined} />);

    tableElements = screen.getAllByRole('gridcell');
    expect(tableElements.length).toEqual(12);

    // Verify initial id is still selected
    expect(tableElements[0].getAttribute('aria-selected')).toEqual('true');
  });
});
