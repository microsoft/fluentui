import * as React from 'react';
import { DetailsColumn } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsColumn';
import { IColumn, ColumnActionsMode } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList.types';
import { mount } from 'enzyme';
import { DetailsList } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList';
import { assign } from '@uifabric/utilities';

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
});
