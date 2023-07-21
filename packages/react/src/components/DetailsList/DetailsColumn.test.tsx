import * as React from 'react';
import { DetailsColumn } from './DetailsColumn';
import { ColumnActionsMode } from './DetailsList.types';
import { mount } from 'enzyme';
import { DetailsList } from './DetailsList';
import { TooltipHost } from '../../Tooltip';
import { resetIds } from '../../Utilities';
import * as renderer from 'react-test-renderer';
import type { IColumn, IDetailsHeaderProps } from './DetailsList.types';
import type { IRenderFunction } from '../../Utilities';
import type { ITooltipHostProps } from '../../Tooltip';

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
    let component: any;

    component = mount(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        componentRef={ref => (component = ref)}
        onShouldVirtualize={() => false}
      />,
    );

    const columnHeader = component.find(DetailsColumn);
    const columnHeaderTitle = columnHeader.find('.ms-DetailsHeader-cellTitle');

    columnHeaderTitle.simulate('click');

    expect(mockOnColumnClick.mock.calls.length).toBe(1);
  });

  it('invokes IColumn#onColumnClick when columnActionMode is ColumnActionsMode.clickable', () => {
    const column: IColumn = { ...baseColumn, columnActionsMode: ColumnActionsMode.clickable };
    const columns = [column];
    let component: any;

    component = mount(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        componentRef={ref => (component = ref)}
        onShouldVirtualize={() => false}
      />,
    );

    const columnHeader = component.find(DetailsColumn);
    const columnHeaderTitle = columnHeader.find('.ms-DetailsHeader-cellTitle');

    columnHeaderTitle.simulate('click');

    expect(mockOnColumnClick.mock.calls.length).toBe(1);
  });

  it('invokes IColumn#onColumnClick when columnActionMode is ColumnActionsMode.hasDropdown', () => {
    const column: IColumn = { ...baseColumn, columnActionsMode: ColumnActionsMode.hasDropdown };
    const columns = [column];
    let component: any;

    component = mount(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        componentRef={ref => (component = ref)}
        onShouldVirtualize={() => false}
      />,
    );

    const columnHeader = component.find(DetailsColumn);
    const columnHeaderTitle = columnHeader.find('.ms-DetailsHeader-cellTitle');

    columnHeaderTitle.simulate('click');

    expect(mockOnColumnClick.mock.calls.length).toBe(1);
  });

  it('does not invoke IColumn#onColumnClick when columnActionMode is ColumnActionMode.disabled', () => {
    const column: IColumn = { ...baseColumn, columnActionsMode: ColumnActionsMode.disabled };
    const columns = [column];
    let component: any;

    component = mount(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        componentRef={ref => (component = ref)}
        onShouldVirtualize={() => false}
      />,
    );

    const columnHeader = component.find(DetailsColumn);
    const columnHeaderTitle = columnHeader.find('.ms-DetailsHeader-cellTitle');

    columnHeaderTitle.simulate('click');

    expect(mockOnColumnClick.mock.calls.length).toBe(0);
  });

  it('has aria-label set for columns which provide an ariaLabel', () => {
    const column: IColumn = { ...baseColumn, ariaLabel: 'Foo' };
    let component: any;
    const columns = [column];

    component = mount(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        componentRef={ref => (component = ref)}
        onShouldVirtualize={() => false}
      />,
    );
    expect(component.find('[aria-label]')).toHaveLength(1);
  });

  it('by default, has aria-describedby set for filtered columns which provide a filter label', () => {
    const column: IColumn = { ...baseColumn, isFiltered: true, filterAriaLabel: 'Foo' };
    let component: any;
    const columns = [column];

    component = mount(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        componentRef={ref => (component = ref)}
        onShouldVirtualize={() => false}
      />,
    );

    expect(component.find('[aria-describedby]')).toHaveLength(1);
  });

  it("by default, has a node present in the DOM referenced by the column's aria-describedby attribute", () => {
    const column: IColumn = { ...baseColumn, isFiltered: true, filterAriaLabel: 'Foo' };
    let component: any;
    const columns = [column];

    component = mount(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        componentRef={ref => (component = ref)}
        onShouldVirtualize={() => false}
      />,
    );

    const ariaDescribedByEl = component.find('[aria-describedby]').first().getDOMNode();
    const referenceId = ariaDescribedByEl.getAttribute('aria-describedby');

    expect(component.exists(`#${referenceId}`)).toBe(true);
  });

  it('renders valid aria-describedby pointing to a custom tooltip not set using ariaLabel', () => {
    const column: IColumn = { ...baseColumn, isFiltered: true, filterAriaLabel: 'Foo' };
    let component: any;
    const columns = [column];

    component = mount(
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
        componentRef={ref => (component = ref)}
        onShouldVirtualize={() => false}
      />,
    );

    const ariaDescribedByEl = component.find('[aria-describedby]').first().getDOMNode();
    const referenceId = ariaDescribedByEl.getAttribute('aria-describedby');

    expect(component.exists(`#${referenceId}`)).toBe(true);
  });

  it('does not render invalid aria-describedby if custom DetailsHeader has onRenderColumnHeaderTooltip', () => {
    const column: IColumn = { ...baseColumn, isFiltered: true, ariaLabel: 'Foo', filterAriaLabel: 'Foo' };
    let component: any;
    const columns = [column];

    component = mount(
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
        componentRef={ref => (component = ref)}
        onShouldVirtualize={() => false}
      />,
    );

    expect(component.exists('[aria-describedby]')).toBe(false);
  });

  it('Examine aria-expanded value when columnActionMode is not hasDropDown', () => {
    const column: IColumn = { ...baseColumn, columnActionsMode: ColumnActionsMode.clickable, isMenuOpen: true };
    const columns = [column];
    let component: any;

    component = mount(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        componentRef={ref => (component = ref)}
        onShouldVirtualize={() => false}
      />,
    );

    const columnHeader = component.find(DetailsColumn);
    const columnHeaderTitle = columnHeader.find('.ms-DetailsHeader-cellTitle');

    expect(columnHeaderTitle.getDOMNode().getAttribute('aria-expanded')).toBe(null);
  });

  it('Examine aria-expanded value when columnActionMode is hasDropDown with isMenuOpen property set', () => {
    const column: IColumn = { ...baseColumn, columnActionsMode: ColumnActionsMode.hasDropdown, isMenuOpen: true };
    const columns = [column];
    let component: any;

    component = mount(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        componentRef={ref => (component = ref)}
        onShouldVirtualize={() => false}
      />,
    );

    const columnHeader = component.find(DetailsColumn);
    const columnHeaderTitle = columnHeader.find('.ms-DetailsHeader-cellTitle');

    expect(columnHeaderTitle.getDOMNode().getAttribute('aria-expanded')).toBe('true');
  });

  it('renders a sortable icon on an unsorted column when showSortIconWhenUnsorted is set to true', () => {
    const column: IColumn = { ...baseColumn, showSortIconWhenUnsorted: true, sortableAriaLabel: 'Foo' };

    const columns = [column];
    let component: any;

    component = renderer.create(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        componentRef={ref => (component = ref)}
        onShouldVirtualize={() => false}
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
