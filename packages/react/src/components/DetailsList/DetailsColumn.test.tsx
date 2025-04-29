import '@testing-library/jest-dom';
import * as React from 'react';
import { ColumnActionsMode } from './DetailsList.types';
import { render, screen, fireEvent } from '@testing-library/react';
import { DetailsList } from './DetailsList';
import { TooltipHost } from '../../Tooltip';
import { resetIds } from '../../Utilities';
import * as renderer from 'react-test-renderer';
import type { IColumn, IDetailsHeaderProps } from './DetailsList.types';
import type { IRenderFunction } from '../../Utilities';
import type { ITooltipHostProps } from '../../Tooltip';

function getBySelector(container: HTMLElement, selector: string) {
  return container.querySelector(selector);
}

let mockOnColumnClick: jest.Mock<{}>;
let baseColumn: IColumn;

describe('DetailsColumn', () => {
  beforeEach(() => {
    resetIds();
    mockOnColumnClick = jest.fn();
    baseColumn = {
      key: '1',
      name: 'Foo',
      minWidth: 20,
      onColumnClick: mockOnColumnClick,
    };
  });

  it('invokes IColumn#onColumnClick when columnActionMode omitted', () => {
    const columns = [baseColumn];
    render(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        onShouldVirtualize={() => false}
      />,
    );

    const columnHeaderTitle = screen.getByText('Foo');
    fireEvent.click(columnHeaderTitle);

    expect(mockOnColumnClick).toHaveBeenCalledTimes(1);
  });

  it('invokes IColumn#onColumnClick when columnActionMode is ColumnActionsMode.clickable', () => {
    const column: IColumn = { ...baseColumn, columnActionsMode: ColumnActionsMode.clickable };
    const columns = [column];
    render(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        onShouldVirtualize={() => false}
      />,
    );

    const columnHeaderTitle = screen.getByText('Foo');
    fireEvent.click(columnHeaderTitle);

    expect(mockOnColumnClick).toHaveBeenCalledTimes(1);
  });

  it('invokes IColumn#onColumnClick when columnActionMode is ColumnActionsMode.hasDropdown', () => {
    const column: IColumn = { ...baseColumn, columnActionsMode: ColumnActionsMode.hasDropdown };
    const columns = [column];
    render(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        onShouldVirtualize={() => false}
      />,
    );

    const columnHeaderTitle = screen.getByText('Foo');
    fireEvent.click(columnHeaderTitle);

    expect(mockOnColumnClick).toHaveBeenCalledTimes(1);
  });

  it('does not invoke IColumn#onColumnClick when columnActionMode is ColumnActionMode.disabled', () => {
    const column: IColumn = { ...baseColumn, columnActionsMode: ColumnActionsMode.disabled };
    const columns = [column];
    render(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        onShouldVirtualize={() => false}
      />,
    );

    const columnHeaderTitle = screen.getByText('Foo');
    fireEvent.click(columnHeaderTitle);

    expect(mockOnColumnClick).toHaveBeenCalledTimes(0);
  });

  it('has aria-label set for columns which provide an ariaLabel', () => {
    const column: IColumn = { ...baseColumn, ariaLabel: 'Foo' };
    const columns = [column];

    render(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        onShouldVirtualize={() => false}
      />,
    );
    expect(screen.getByLabelText('Foo')).toBeInTheDocument();
  });

  it('by default, has aria-describedby set for filtered columns which provide a filter label', () => {
    const column: IColumn = { ...baseColumn, isFiltered: true, filterAriaLabel: 'Foo' };
    const columns = [column];

    render(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        onShouldVirtualize={() => false}
      />,
    );

    expect(screen.getByLabelText('Foo')).toHaveAttribute('aria-describedby');
  });

  it("by default, has a node present in the DOM referenced by the column's aria-describedby attribute", () => {
    const column: IColumn = { ...baseColumn, isFiltered: true, filterAriaLabel: 'Foo' };
    const columns = [column];

    render(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        onShouldVirtualize={() => false}
      />,
    );

    const ariaDescribedByEl = screen.getByLabelText('Foo');
    const referenceId = ariaDescribedByEl.getAttribute('aria-describedby');

    expect(document.getElementById(referenceId!)).toBeInTheDocument();
  });

  it('renders valid aria-describedby pointing to a custom tooltip not set using ariaLabel', () => {
    const column: IColumn = { ...baseColumn, isFiltered: true, filterAriaLabel: 'Foo' };
    const columns = [column];

    render(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        onRenderDetailsHeader={(props: IDetailsHeaderProps, defaultRenderer?: IRenderFunction<IDetailsHeaderProps>) => {
          return defaultRenderer!({
            ...props,
            onRenderColumnHeaderTooltip: (
              tooltipProps: ITooltipHostProps,
              tooltipRenderer?: IRenderFunction<ITooltipHostProps>,
            ) => {
              return <TooltipHost {...tooltipProps} content="foo" />;
            },
          });
        }}
        onShouldVirtualize={() => false}
      />,
    );

    const ariaDescribedByEl = screen.getByLabelText('Foo');
    const referenceId = ariaDescribedByEl.getAttribute('aria-describedby');

    expect(document.getElementById(referenceId!)).toBeInTheDocument();
  });

  it('does not render invalid aria-describedby if custom DetailsHeader has onRenderColumnHeaderTooltip', () => {
    const column: IColumn = { ...baseColumn, isFiltered: true, ariaLabel: 'Foo', filterAriaLabel: 'Foo' };
    const columns = [column];

    render(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        onRenderDetailsHeader={(props: IDetailsHeaderProps, defaultRenderer?: IRenderFunction<IDetailsHeaderProps>) => {
          return defaultRenderer!({
            ...props,
            onRenderColumnHeaderTooltip: (
              tooltipProps: ITooltipHostProps,
              tooltipRenderer?: IRenderFunction<ITooltipHostProps>,
            ) => {
              return <TooltipHost {...tooltipProps} />;
            },
          });
        }}
        onShouldVirtualize={() => false}
      />,
    );

    expect(screen.queryByLabelText('Foo')).not.toHaveAttribute('aria-describedby');
  });

  it('Examine aria-expanded value when columnActionMode is not hasDropDown', () => {
    const column: IColumn = { ...baseColumn, columnActionsMode: ColumnActionsMode.clickable, isMenuOpen: true };
    const columns = [column];

    render(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        onShouldVirtualize={() => false}
      />,
    );

    const columnHeaderTitle = screen.getByText('Foo');

    expect(columnHeaderTitle).not.toHaveAttribute('aria-expanded');
  });

  it('Examine aria-expanded value when columnActionMode is hasDropDown with isMenuOpen property set', () => {
    const column: IColumn = { ...baseColumn, columnActionsMode: ColumnActionsMode.hasDropdown, isMenuOpen: true };
    const columns = [column];

    const { container } = render(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        onShouldVirtualize={() => false}
      />,
    );

    const columnHeaderTitle = getBySelector(container, '.ms-DetailsHeader-cellTitle');

    expect(columnHeaderTitle).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders a sortable icon on an unsorted column when showSortIconWhenUnsorted is set to true', () => {
    const column: IColumn = { ...baseColumn, showSortIconWhenUnsorted: true, sortableAriaLabel: 'Foo' };

    const columns = [column];

    const component = renderer.create(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        onShouldVirtualize={() => false}
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
