import * as React from 'react';
import { DetailsColumn } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsColumn';
import { IColumn, ColumnActionsMode, IDetailsHeaderProps } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList.types';
import { mount } from 'enzyme';
import { DetailsList } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList';
import { assign, IRenderFunction } from '@uifabric/utilities';
import { ITooltipHostProps, TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';

let mockOnColumnClick: jest.Mock<{}>;
let baseColumn: IColumn;

describe('DetailsColumn', () => {
  beforeEach(() => {
    mockOnColumnClick = jest.fn();
    baseColumn = {
      key: '1',
      name: 'Foo',
      minWidth: 20,
      onColumnClick: mockOnColumnClick
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
        // tslint:disable-next-line:jsx-no-lambda
        componentRef={ref => (component = ref)}
        // tslint:disable-next-line:jsx-no-lambda
        onShouldVirtualize={() => false}
      />
    );

    const columnHeader = component.find(DetailsColumn);
    const columnHeaderTitle = columnHeader.find('.ms-DetailsHeader-cellTitle');

    columnHeaderTitle.simulate('click');

    expect(mockOnColumnClick.mock.calls.length).toBe(1);
  });

  it('invokes IColumn#onColumnClick when columnActionMode is ColumnActionsMode.clickable', () => {
    const column = assign({}, baseColumn, { columnActionsMode: ColumnActionsMode.clickable });
    const columns = [column];
    let component: any;

    component = mount(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        // tslint:disable-next-line:jsx-no-lambda
        componentRef={ref => (component = ref)}
        // tslint:disable-next-line:jsx-no-lambda
        onShouldVirtualize={() => false}
      />
    );

    const columnHeader = component.find(DetailsColumn);
    const columnHeaderTitle = columnHeader.find('.ms-DetailsHeader-cellTitle');

    columnHeaderTitle.simulate('click');

    expect(mockOnColumnClick.mock.calls.length).toBe(1);
  });

  it('invokes IColumn#onColumnClick when columnActionMode is ColumnActionsMode.hasDropdown', () => {
    const column = assign({}, baseColumn, { columnActionsMode: ColumnActionsMode.hasDropdown });
    const columns = [column];
    let component: any;

    component = mount(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        // tslint:disable-next-line:jsx-no-lambda
        componentRef={ref => (component = ref)}
        // tslint:disable-next-line:jsx-no-lambda
        onShouldVirtualize={() => false}
      />
    );

    const columnHeader = component.find(DetailsColumn);
    const columnHeaderTitle = columnHeader.find('.ms-DetailsHeader-cellTitle');

    columnHeaderTitle.simulate('click');

    expect(mockOnColumnClick.mock.calls.length).toBe(1);
  });

  it('does not invoke IColumn#onColumnClick when columnActionMode is ColumnActionMode.disabled', () => {
    const column = assign({}, baseColumn, { columnActionsMode: ColumnActionsMode.disabled });
    const columns = [column];
    let component: any;

    component = mount(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        // tslint:disable-next-line:jsx-no-lambda
        componentRef={ref => (component = ref)}
        // tslint:disable-next-line:jsx-no-lambda
        onShouldVirtualize={() => false}
      />
    );

    const columnHeader = component.find(DetailsColumn);
    const columnHeaderTitle = columnHeader.find('.ms-DetailsHeader-cellTitle');

    columnHeaderTitle.simulate('click');

    expect(mockOnColumnClick.mock.calls.length).toBe(0);
  });

  it('by default, has aria-describedby set for columns which provide an ariaLabel value', () => {
    const column = assign({}, baseColumn, { ariaLabel: 'Foo' });
    let component: any;
    const columns = [column];

    component = mount(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        // tslint:disable-next-line:jsx-no-lambda
        componentRef={ref => (component = ref)}
        // tslint:disable-next-line:jsx-no-lambda
        onShouldVirtualize={() => false}
      />
    );

    expect(component.find('[aria-describedby]')).toHaveLength(1);
  });

  it("by default, has a node present in the DOM referenced by the column's aria-describedby attribute", () => {
    const column = assign({}, baseColumn, { ariaLabel: 'Foo' });
    let component: any;
    const columns = [column];

    component = mount(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        // tslint:disable-next-line:jsx-no-lambda
        componentRef={ref => (component = ref)}
        // tslint:disable-next-line:jsx-no-lambda
        onShouldVirtualize={() => false}
      />
    );

    const ariaDescribedByEl = component
      .find('[aria-describedby]')
      .first()
      .getDOMNode();
    const referenceId = ariaDescribedByEl.getAttribute('aria-describedby');

    expect(component.exists(`#${referenceId}`)).toBe(true);
  });

  it('if custom DetailsHeader has optional onRenderColumnHeaderTooltip, do not render invalid aria-describedby attribute', () => {
    const column = assign({}, baseColumn, { ariaLabel: 'Foo' });
    let component: any;
    const columns = [column];

    component = mount(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        // tslint:disable-next-line:jsx-no-lambda
        onRenderDetailsHeader={(props: IDetailsHeaderProps, defaultRenderer?: IRenderFunction<IDetailsHeaderProps>) => {
          return defaultRenderer!({
            ...props,
            onRenderColumnHeaderTooltip: (tooltipProps: ITooltipHostProps, tooltipRenderer?: IRenderFunction<ITooltipHostProps>) => {
              return <TooltipHost {...tooltipProps} />;
            }
          });
        }}
        // tslint:disable-next-line:jsx-no-lambda
        componentRef={ref => (component = ref)}
        // tslint:disable-next-line:jsx-no-lambda
        onShouldVirtualize={() => false}
      />
    );

    expect(component.exists('[aria-describedby]')).toBe(false);
  });

  it('Examine aria-expanded value when columnActionMode is not hasDropDown', () => {
    const column = assign({}, baseColumn, { columnActionsMode: ColumnActionsMode.clickable, isMenuOpen: true });
    const columns = [column];
    let component: any;

    component = mount(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        // tslint:disable-next-line:jsx-no-lambda
        componentRef={ref => (component = ref)}
        // tslint:disable-next-line:jsx-no-lambda
        onShouldVirtualize={() => false}
      />
    );

    const columnHeader = component.find(DetailsColumn);
    const columnHeaderTitle = columnHeader.find('.ms-DetailsHeader-cellTitle');

    expect(columnHeaderTitle.getDOMNode().getAttribute('aria-expanded')).toBe(null);
  });

  it('Examine aria-expanded value when columnActionMode is hasDropDown with isMenuOpen property set', () => {
    const column = assign({}, baseColumn, { columnActionsMode: ColumnActionsMode.hasDropdown, isMenuOpen: true });
    const columns = [column];
    let component: any;

    component = mount(
      <DetailsList
        items={[]}
        setKey={'key1'}
        initialFocusedIndex={0}
        skipViewportMeasures={true}
        columns={columns}
        // tslint:disable-next-line:jsx-no-lambda
        componentRef={ref => (component = ref)}
        // tslint:disable-next-line:jsx-no-lambda
        onShouldVirtualize={() => false}
      />
    );

    const columnHeader = component.find(DetailsColumn);
    const columnHeaderTitle = columnHeader.find('.ms-DetailsHeader-cellTitle');

    expect(columnHeaderTitle.getDOMNode().getAttribute('aria-expanded')).toBe('true');
  });
});
