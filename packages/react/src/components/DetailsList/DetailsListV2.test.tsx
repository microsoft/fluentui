import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { safeMount } from '@fluentui/test-utilities';
import { EventGroup, KeyCodes, resetIds } from '../../Utilities';
import { SelectionMode, Selection, SelectionZone } from '../../Selection';
import { getTheme } from '../../Styling';
import { DetailsHeader } from './DetailsHeader';
import { DetailsList } from './DetailsList';
import { DetailsListBase } from './DetailsList.base';
import { CheckboxVisibility, DetailsListLayoutMode, IDetailsGroupRenderProps } from './DetailsList.types';
import { DetailsRow } from './DetailsRow';
import { DetailsRowCheck } from './DetailsRowCheck';
import type { IDragDropEvents } from '../../DragDrop';
import type { IGroup } from '../../GroupedList';
import type { IRenderFunction } from '../../Utilities';
import type { IDetailsColumnProps } from './DetailsColumn';
import type { IDetailsHeaderProps } from './DetailsHeader';
import type { IColumn, IDetailsGroupDividerProps, IDetailsList } from './DetailsList.types';
import type { IDetailsRowProps } from './DetailsRow';
import { GroupedListV2_unstable as GroupedListV2 } from '../GroupedList/GroupedListV2';

// Populate mock data for testing
function mockData(count: number, isColumn: boolean = false, customDivider: boolean = false): any {
  const data = [];
  let _data = {};

  for (let i = 0; i < count; i++) {
    _data = {
      key: i,
      name: 'Item ' + i,
      value: i,
    };
    if (isColumn) {
      _data = {
        ..._data,
        key: `column_key_${i}`,
        ariaLabel: `column_${i}`,
        onRenderDivider: customDivider ? customColumnDivider : columnDividerWrapper,
      };
    }
    data.push(_data);
  }

  return data;
}

// Wrapper function which calls the defaultRenderer with the corresponding params
function columnDividerWrapper(
  iDetailsColumnProps: IDetailsColumnProps,
  defaultRenderer: (props?: IDetailsColumnProps) => JSX.Element | null,
): any {
  return defaultRenderer(iDetailsColumnProps);
}

// Using a bar sign as a custom divider along with the default divider
function customColumnDivider(
  iDetailsColumnProps: IDetailsColumnProps,
  defaultRenderer: (props?: IDetailsColumnProps) => JSX.Element | null,
): any {
  return (
    <React.Fragment key={`divider_${iDetailsColumnProps.columnIndex}`}>
      <span>|</span>
      {defaultRenderer(iDetailsColumnProps)}
    </React.Fragment>
  );
}

const groupProps: IDetailsGroupRenderProps = {
  groupedListAs: GroupedListV2,
};

/**
 * NOTE: There isn't actually a DetailsListV2 control, rather
 * this control uses GroupedListV2 for rendering.
 */
describe('DetailsListV2', () => {
  let spy: jest.SpyInstance;

  beforeEach(() => {
    /* eslint-disable-next-line @typescript-eslint/no-empty-function */
    spy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });

  afterAll(() => {
    spy.mockRestore();
  });

  beforeEach(() => {
    resetIds();
  });

  afterEach(() => {
    if ((setTimeout as unknown as jest.Mock).mock) {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    }
  });

  it('renders List correctly', () => {
    const component = renderer.create(
      <DetailsList
        items={mockData(5)}
        onRenderRow={() => null}
        skipViewportMeasures={true}
        onShouldVirtualize={() => false}
        groupProps={groupProps}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders List correctly with onRenderDivider props', () => {
    const component = renderer.create(
      <DetailsList
        items={mockData(5)}
        columns={mockData(5, true)}
        onRenderRow={() => null}
        skipViewportMeasures={true}
        onShouldVirtualize={() => false}
        groupProps={groupProps}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders List with custom icon as column divider', () => {
    const component = renderer.create(
      <DetailsList
        items={mockData(5)}
        columns={mockData(5, true, true)}
        onRenderRow={() => null}
        skipViewportMeasures={true}
        onShouldVirtualize={() => false}
        groupProps={groupProps}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders List in fixed constrained layout correctly', () => {
    const component = renderer.create(
      <DetailsList
        items={mockData(5)}
        onRenderRow={() => null}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        skipViewportMeasures={true}
        onShouldVirtualize={() => false}
        groupProps={groupProps}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a single proportional column with correct width', () => {
    jest.useFakeTimers();

    let component: IDetailsList | null;
    safeMount(
      <DetailsList
        className="list"
        items={[{ key: 'item1' }, { key: 'item2' }, { key: 'item3' }]}
        columns={[
          { fieldName: 'a', key: 'col1', minWidth: 101, name: 'column 1' },
          { fieldName: 'b', key: 'col2', minWidth: 102, name: 'column 2', flexGrow: 1 },
          { fieldName: 'c', key: 'col3', minWidth: 103, name: 'column 3' },
        ]}
        componentRef={ref => (component = ref)}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        flexMargin={-640}
        skipViewportMeasures={false}
        onShouldVirtualize={() => false}
        groupProps={groupProps}
      />,
      () => {
        expect(component).toBeTruthy();
        component!.focusIndex(2);
        setTimeout(() => {
          const elements = (document.activeElement as HTMLElement).querySelectorAll('div[role=columnheader]');
          elements.forEach((element: Element, index: number) => {
            if (index === 0) {
              return;
            }

            const style = element.getAttribute('style')!;
            expect(style).toBeDefined();

            const width = style.match(/(?<=width: )\d+/g)!;
            expect(width).toBeDefined();
            expect(width[0]).toBeDefined();

            if (index === 1) {
              expect(width[0]).toBe('121');
            } else if (index === 2) {
              expect(width[0]).toBe('348');
            } else if (index === 3) {
              expect(width[0]).toBe('123');
            } else {
              fail('Unexpected index.');
            }
          });
        }, 0);
        jest.runOnlyPendingTimers();
      },
    );
  });

  it('renders proportional columns with proper width ratios', () => {
    jest.useFakeTimers();

    let component: IDetailsList | null;
    safeMount(
      <DetailsList
        className="list"
        items={[{ key: 'item1' }, { key: 'item2' }, { key: 'item3' }]}
        columns={[
          { fieldName: 'a', key: 'col1', minWidth: 100, name: 'column 1', flexGrow: 0.8 },
          { fieldName: 'b', key: 'col2', minWidth: 100, name: 'column 2', flexGrow: 0.5 },
        ]}
        componentRef={ref => (component = ref)}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        flexMargin={-640}
        skipViewportMeasures={false}
        onShouldVirtualize={() => false}
        groupProps={groupProps}
      />,
      () => {
        expect(component).toBeTruthy();
        component!.focusIndex(2);
        setTimeout(() => {
          const elements = (document.activeElement as HTMLElement).querySelectorAll('div[role=columnheader]');
          elements.forEach((element: Element, index: number) => {
            if (index === 0) {
              return;
            }

            const style = element.getAttribute('style')!;
            expect(style).toBeDefined();

            const width = style.match(/(?<=width: )\d+/g)!;
            expect(width).toBeDefined();
            expect(width[0]).toBeDefined();

            if (index === 1) {
              expect(width[0]).toBe('336');
            } else if (index === 2) {
              expect(width[0]).toBe('255');
            } else {
              fail('Unexpected index.');
            }
          });
        }, 0);
        jest.runOnlyPendingTimers();
      },
    );
  });

  it('renders proportional columns with proper width ratios when delayFirstMeasure', () => {
    jest.useFakeTimers();

    let component: IDetailsList | null;
    safeMount(
      <DetailsList
        className="list"
        items={[{ key: 'item1' }, { key: 'item2' }, { key: 'item3' }]}
        columns={[
          { fieldName: 'a', key: 'col1', minWidth: 100, name: 'column 1', flexGrow: 0.8 },
          { fieldName: 'b', key: 'col2', minWidth: 100, name: 'column 2', flexGrow: 0.5 },
        ]}
        componentRef={ref => (component = ref)}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        flexMargin={-640}
        skipViewportMeasures={false}
        onShouldVirtualize={() => false}
        delayFirstMeasure
        groupProps={groupProps}
      />,
      () => {
        expect(component).toBeTruthy();
        component!.focusIndex(2);
        setTimeout(() => {
          const elements = (document.activeElement as HTMLElement).querySelectorAll('div[role=columnheader]');
          elements.forEach((element: Element, index: number) => {
            if (index === 0) {
              return;
            }

            const style = element.getAttribute('style')!;
            expect(style).toBeDefined();

            const width = style.match(/(?<=width: )\d+/g)!;
            expect(width).toBeDefined();
            expect(width[0]).toBeDefined();

            if (index === 1) {
              expect(width[0]).toBe('336');
            } else if (index === 2) {
              expect(width[0]).toBe('255');
            } else {
              fail('Unexpected index.');
            }
          });
        }, 0);
        jest.runOnlyPendingTimers();
      },
    );
  });

  it('renders List in compact mode correctly', () => {
    const component = renderer.create(
      <DetailsList
        items={mockData(5)}
        onRenderRow={() => null}
        compact={true}
        skipViewportMeasures={true}
        onShouldVirtualize={() => false}
        groupProps={groupProps}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders List with hidden checkboxes correctly', () => {
    const component = renderer.create(
      <DetailsList
        items={mockData(5)}
        skipViewportMeasures={true}
        onShouldVirtualize={() => false}
        groups={[
          {
            key: 'group0',
            name: 'Group 0',
            startIndex: 0,
            count: 2,
          },
          {
            key: 'group1',
            name: 'Group 1',
            startIndex: 2,
            count: 3,
          },
        ]}
        checkboxVisibility={CheckboxVisibility.hidden}
        groupProps={groupProps}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('focuses row by index', () => {
    jest.useFakeTimers();

    let component: IDetailsList | null;
    safeMount(
      <DetailsList
        items={mockData(5)}
        componentRef={ref => (component = ref)}
        skipViewportMeasures={true}
        onShouldVirtualize={() => false}
        groupProps={groupProps}
      />,
      () => {
        expect(component).toBeTruthy();
        component!.focusIndex(2);
        jest.runAllTimers();
        expect(
          (document.activeElement as HTMLElement).querySelector('[data-automationid=DetailsRowCell]')!.textContent,
        ).toEqual('2');
        expect((document.activeElement as HTMLElement).className.split(' ')).toContain('ms-DetailsRow');
      },
      true /* attach */,
    );
  });

  it('focuses row by arrow key', () => {
    jest.useFakeTimers();

    let component: IDetailsList | null;
    const onSelectionChanged = jest.fn();
    const selection = new Selection({
      onSelectionChanged,
    });
    safeMount(
      <DetailsList
        componentRef={ref => (component = ref)}
        items={mockData(5)}
        selection={selection}
        skipViewportMeasures={true}
        onShouldVirtualize={() => false}
        groupProps={groupProps}
      />,
      wrapper => {
        expect(component).toBeTruthy();
        component!.focusIndex(0);
        jest.runAllTimers();

        onSelectionChanged.mockClear();
        wrapper.find('.ms-DetailsList-headerWrapper').simulate('keyDown', { which: KeyCodes.down });
        expect(onSelectionChanged).toHaveBeenCalledTimes(1);
      },
    );
  });

  it('does not focus by arrow key when isSelectedOnFocus is `false`', () => {
    jest.useFakeTimers();

    let component: IDetailsList | null;
    const onSelectionChanged = jest.fn();
    const selection = new Selection({
      onSelectionChanged,
    });
    safeMount(
      <DetailsList
        componentRef={ref => (component = ref)}
        items={mockData(5)}
        selection={selection}
        skipViewportMeasures={true}
        onShouldVirtualize={() => false}
        isSelectedOnFocus={false}
        groupProps={groupProps}
      />,
      wrapper => {
        expect(component).toBeTruthy();
        component!.focusIndex(0);
        jest.runAllTimers();

        onSelectionChanged.mockClear();
        wrapper.find('.ms-DetailsList-headerWrapper').simulate('keyDown', { which: KeyCodes.down });
        expect(onSelectionChanged).toHaveBeenCalledTimes(0);
      },
    );
  });

  it('clears selection when escape key is pressed and isSelectedOnFocus is `true`', () => {
    jest.useFakeTimers();

    let component: IDetailsList | null;
    const onSelectionChanged = jest.fn();
    const selection = new Selection({
      onSelectionChanged,
    });
    safeMount(
      <DetailsList
        componentRef={ref => (component = ref)}
        items={mockData(5)}
        selection={selection}
        skipViewportMeasures={true}
        onShouldVirtualize={() => false}
        groupProps={groupProps}
      />,
      wrapper => {
        expect(component).toBeTruthy();
        selection.setAllSelected(true);
        jest.runAllTimers();

        onSelectionChanged.mockClear();
        wrapper.find('.ms-SelectionZone').simulate('keyDown', { which: KeyCodes.escape });
        expect(onSelectionChanged).toHaveBeenCalledTimes(1);
        expect(selection.getSelectedCount()).toEqual(0);
      },
    );
  });

  it('does not clear selection when escape key is pressed and isSelectedOnFocus is `false`', () => {
    jest.useFakeTimers();

    let component: IDetailsList | null;
    const onSelectionChanged = jest.fn();
    const selection = new Selection({
      onSelectionChanged,
    });
    safeMount(
      <DetailsList
        componentRef={ref => (component = ref)}
        items={mockData(5)}
        selection={selection}
        skipViewportMeasures={true}
        onShouldVirtualize={() => false}
        isSelectedOnFocus={false}
        groupProps={groupProps}
      />,
      wrapper => {
        expect(component).toBeTruthy();
        selection.setAllSelected(true);
        jest.runAllTimers();

        onSelectionChanged.mockClear();
        wrapper.find('.ms-SelectionZone').simulate('keyDown', { which: KeyCodes.escape });
        expect(onSelectionChanged).toHaveBeenCalledTimes(0);
        expect(selection.getSelectedCount()).toEqual(5);
      },
    );
  });

  it('invokes optional onRenderMissingItem prop once per missing item rendered', () => {
    const onRenderMissingItem = jest.fn();
    const items = [...mockData(5), null, null];

    safeMount(
      <DetailsList
        items={items}
        skipViewportMeasures={true}
        onRenderMissingItem={onRenderMissingItem}
        groupProps={groupProps}
      />,
      () => {
        expect(onRenderMissingItem).toHaveBeenCalledTimes(2);
      },
    );
  });

  it('does not invoke optional onRenderMissingItem prop if no missing items are rendered', () => {
    const onRenderMissingItem = jest.fn();
    const items = mockData(5);

    safeMount(
      <DetailsList
        items={items}
        skipViewportMeasures={true}
        onRenderMissingItem={onRenderMissingItem}
        groupProps={groupProps}
      />,
      () => {
        expect(onRenderMissingItem).toHaveBeenCalledTimes(0);
      },
    );
  });

  it('executes onItemInvoked when double click is pressed', () => {
    const items = mockData(5);
    const onItemInvoked = jest.fn();

    safeMount(
      <DetailsList items={items} skipViewportMeasures={true} onItemInvoked={onItemInvoked} groupProps={groupProps} />,
      (wrapper: ReactWrapper) => {
        wrapper.find('.ms-DetailsRow').first().simulate('dblclick');

        expect(onItemInvoked).toHaveBeenCalledTimes(1);
      },
    );
  });

  it('executes onItemInvoked when enter is pressed', () => {
    const items = mockData(5);
    const onItemInvoked = jest.fn();

    safeMount(
      <DetailsList items={items} skipViewportMeasures={true} onItemInvoked={onItemInvoked} groupProps={groupProps} />,
      (wrapper: ReactWrapper) => {
        wrapper.find('.ms-DetailsRow').first().simulate('keydown', { which: KeyCodes.enter });

        expect(onItemInvoked).toHaveBeenCalledTimes(1);
      },
    );
  });

  it('respects changed dragDropEvents prop on re-renders.', () => {
    const _dragDropEvents: IDragDropEvents = {
      canDrag: jest.fn().mockReturnValue(true),
      canDrop: jest.fn().mockReturnValue(true),
      onDragEnd: jest.fn(),
      onDragEnter: jest.fn(),
      onDragLeave: jest.fn(),
      onDragStart: jest.fn(),
      onDrop: jest.fn(),
    };

    const _dragDropEvents2: IDragDropEvents = {
      canDrag: jest.fn().mockReturnValue(true),
      canDrop: jest.fn().mockReturnValue(true),
      onDragEnd: jest.fn(),
      onDragEnter: jest.fn(),
      onDragLeave: jest.fn(),
      onDragStart: jest.fn(),
      onDrop: jest.fn(),
    };

    const _RaiseEvent = (target: any, _eventName: string, _clientX: number) => {
      EventGroup.raise(
        target,
        _eventName,
        {
          clientX: _clientX,
          button: 0,
        } as DragEvent,
        true,
      );
    };

    const container = document.createElement('div');
    const items = mockData(5);
    const columns = mockData(5, true);

    ReactDOM.render(
      <DetailsListBase
        columns={columns}
        skipViewportMeasures={true}
        items={items}
        dragDropEvents={_dragDropEvents}
        groupProps={groupProps}
      />,
      container,
    );

    let detailsRowSource = container.querySelector('div[aria-rowindex="2"][role="row"]') as HTMLDivElement;

    _RaiseEvent(detailsRowSource, 'mousedown', 270);
    _RaiseEvent(detailsRowSource, 'dragstart', 270);

    // original eventhandler should be fired
    expect(_dragDropEvents.onDragStart).toHaveBeenCalledTimes(1);
    expect(_dragDropEvents2.onDragStart).toHaveBeenCalledTimes(0);

    ReactDOM.render(
      <DetailsListBase
        columns={columns}
        skipViewportMeasures={true}
        items={items}
        dragDropEvents={_dragDropEvents}
        groupProps={groupProps}
      />,
      container,
    );

    detailsRowSource = container.querySelector('div[aria-rowindex="2"][role="row"]') as HTMLDivElement;

    _RaiseEvent(detailsRowSource, 'mousedown', 270);
    _RaiseEvent(detailsRowSource, 'dragstart', 270);

    expect(_dragDropEvents.onDragStart).toHaveBeenCalledTimes(2);
    expect(_dragDropEvents2.onDragStart).toHaveBeenCalledTimes(0);

    ReactDOM.render(
      <DetailsListBase
        columns={columns}
        skipViewportMeasures={true}
        items={items}
        dragDropEvents={_dragDropEvents2}
        groupProps={groupProps}
      />,
      container,
    );

    detailsRowSource = container.querySelector('div[aria-rowindex="2"][role="row"]') as HTMLDivElement;

    _RaiseEvent(detailsRowSource, 'mousedown', 270);
    _RaiseEvent(detailsRowSource, 'dragstart', 270);

    expect(_dragDropEvents.onDragStart).toHaveBeenCalledTimes(2);
    expect(_dragDropEvents2.onDragStart).toHaveBeenCalledTimes(1);
  });

  it('focuses into row element', () => {
    jest.useFakeTimers();

    const onRenderColumn = (item: any, index: number, column: IColumn) => {
      let value = item && column && column.fieldName ? item[column.fieldName] : '';
      if (value === null || value === undefined) {
        value = '';
      }
      return (
        <div className={'test-column'} data-is-focusable={true}>
          {value}
        </div>
      );
    };

    const getCellValueKey = (item: any, index: number, column: IColumn) => {
      const valueKey = item && column && column.fieldName ? item[column.fieldName] : column.key + index;
      return valueKey;
    };

    let component: IDetailsList | null;
    safeMount(
      <DetailsList
        items={mockData(5)}
        componentRef={ref => (component = ref)}
        skipViewportMeasures={true}
        onShouldVirtualize={() => false}
        onRenderItemColumn={onRenderColumn}
        getCellValueKey={getCellValueKey}
        groupProps={groupProps}
      />,
      () => {
        expect(component).toBeTruthy();
        component!.focusIndex(3);
        jest.runOnlyPendingTimers();
        expect(
          (document.activeElement as HTMLElement).querySelector('[data-automationid=DetailsRowCell]')!.textContent,
        ).toEqual('3');
        expect((document.activeElement as HTMLElement).className.split(' ')).toContain('ms-DetailsRow');

        // Set element visibility manually as a test workaround
        component!.focusIndex(4);
        jest.runOnlyPendingTimers();
        ((document.activeElement as HTMLElement).children[1] as any).isVisible = true;
        ((document.activeElement as HTMLElement).children[1].children[0] as any).isVisible = true;
        ((document.activeElement as HTMLElement).children[1].children[0].children[0] as any).isVisible = true;

        component!.focusIndex(4, true);
        jest.runOnlyPendingTimers();
        expect((document.activeElement as HTMLElement).textContent).toEqual('4');
        expect((document.activeElement as HTMLElement).className.split(' ')).toContain('test-column');
      },
      true /* attach */,
    );
  });

  it('reset focusedItemIndex when setKey updates', () => {
    jest.useFakeTimers();

    let component: DetailsListBase | null;

    safeMount(
      <DetailsList
        items={mockData(5)}
        setKey={'key1'}
        initialFocusedIndex={0}
        componentRef={value => (component = value as any)}
        skipViewportMeasures={true}
        onShouldVirtualize={() => false}
        groupProps={groupProps}
      />,
      (wrapper: ReactWrapper) => {
        expect(component).toBeTruthy();
        component!.focusIndex(3);
        jest.runAllTimers();
        expect(component!.state.focusedItemIndex).toEqual(3);

        // update props to new setKey
        const newProps = { items: mockData(7), setKey: 'set2', initialFocusedIndex: 0 };
        wrapper.setProps(newProps);
        wrapper.update();

        // verify that focusedItemIndex is reset to 0 and 0th row is focused
        jest.runAllTimers();
        expect(component!.state.focusedItemIndex).toEqual(0);
        expect(
          (document.activeElement as HTMLElement).querySelector('[data-automationid=DetailsRowCell]')!.textContent,
        ).toEqual('0');
        expect((document.activeElement as HTMLElement).className.split(' ')).toContain('ms-DetailsRow');
      },
      true /* attach */,
    );
  });

  it('invokes optional onColumnResize callback per IColumn if defined when columns are adjusted', () => {
    jest.useFakeTimers();

    const columns: IColumn[] = mockData(2, true);
    columns[0].onColumnResize = jest.fn();
    columns[1].onColumnResize = jest.fn();

    safeMount(
      <DetailsList items={mockData(2)} columns={columns} onShouldVirtualize={() => false} groupProps={groupProps} />,
      () => {
        jest.runOnlyPendingTimers();
        expect(columns[0].onColumnResize).toHaveBeenCalledTimes(1);
        expect(columns[1].onColumnResize).toHaveBeenCalledTimes(1);
      },
    );
  });

  it('invokes optional onRenderDetailsHeader prop to customize DetailsHeader rendering when provided', () => {
    const onRenderDetailsHeaderMock = jest.fn();

    safeMount(
      <DetailsList
        items={mockData(2)}
        skipViewportMeasures={true}
        onShouldVirtualize={() => false}
        onRenderDetailsHeader={onRenderDetailsHeaderMock}
        groupProps={groupProps}
      />,
      () => {
        expect(onRenderDetailsHeaderMock).toHaveBeenCalledTimes(1);
      },
    );
  });

  it('invokes onRenderColumnHeaderTooltip to customize DetailsColumn tooltip rendering when provided', () => {
    const NUM_COLUMNS = 2;
    const onRenderColumnHeaderTooltipMock = jest.fn();
    const onRenderDetailsHeader = (
      props: IDetailsHeaderProps,
      defaultRenderer?: IRenderFunction<IDetailsHeaderProps>,
    ) => {
      return <DetailsHeader {...props} onRenderColumnHeaderTooltip={onRenderColumnHeaderTooltipMock} />;
    };

    safeMount(
      <DetailsList
        items={mockData(NUM_COLUMNS)}
        skipViewportMeasures={true}
        onShouldVirtualize={() => false}
        onRenderDetailsHeader={onRenderDetailsHeader}
        groupProps={groupProps}
      />,
      () => {
        expect(onRenderColumnHeaderTooltipMock).toHaveBeenCalledTimes(4);
      },
    );
  });

  it('invokes optional onRenderCheckbox callback to customize checkbox rendering when provided', () => {
    const onRenderCheckboxMock = jest.fn();
    const selection = new Selection();
    const theme = getTheme();

    safeMount(
      <DetailsList
        items={mockData(2)}
        skipViewportMeasures={true}
        onShouldVirtualize={() => false}
        onRenderCheckbox={onRenderCheckboxMock}
        checkboxVisibility={CheckboxVisibility.always}
        selectionMode={SelectionMode.multiple}
        selection={selection}
        groupProps={groupProps}
      />,
      () => {
        expect(onRenderCheckboxMock).toHaveBeenCalledTimes(3);
        expect(onRenderCheckboxMock.mock.calls[2][0]).toEqual({ checked: false, theme });

        selection.setAllSelected(true);

        expect(onRenderCheckboxMock).toHaveBeenCalledTimes(6);
        expect(onRenderCheckboxMock.mock.calls[5][0]).toEqual({ checked: true, theme });
      },
    );
  });

  it('initializes the selection mode object with the selectionMode prop', () => {
    safeMount(
      <DetailsList
        items={mockData(5)}
        columns={mockData(5, true)}
        selectionMode={SelectionMode.none}
        groupProps={groupProps}
      />,
      (wrapper: ReactWrapper) => {
        const selectionZone = wrapper.find(SelectionZone);

        expect(selectionZone.props().selection.mode).toEqual(SelectionMode.none);
      },
    );
  });

  it('handles updates to items and groups', () => {
    const tableOneItems = [
      { f1: 'A1', f2: 'B1', f3: 'C1' },
      { f1: 'A2', f2: 'B2', f3: 'C2' },
      { f1: 'A3', f2: 'B3', f3: 'C3' },
      { f1: 'A4', f2: 'B4', f3: 'C4' },
    ];
    const tableTwoItems = [
      { f1: 'D1', f2: 'E1', f3: 'F1' },
      { f1: 'D2', f2: 'E2', f3: 'F2' },
      { f1: 'D3', f2: 'E3', f3: 'F3' },
      { f1: 'D4', f2: 'E4', f3: 'F4' },
    ];

    const groupOneGroups: IGroup[] = [
      { key: 'one-1', name: 'one 1', count: 1, startIndex: 0 },
      { key: 'one-2', name: 'one 2', count: 1, startIndex: 1 },
      { key: 'one-3', name: 'one 3', count: 1, startIndex: 2 },
      { key: 'one-4', name: 'one 4', count: 1, startIndex: 3 },
    ];

    const groupTwoGroups: IGroup[] = [
      { key: 'two-1', name: 'two 1', count: 2, startIndex: 0 },
      { key: 'two-2', name: 'two 2', count: 2, startIndex: 2 },
    ];

    const onRenderDetailsHeader: IRenderFunction<IDetailsHeaderProps> = (headerProps: IDetailsHeaderProps) => {
      return (
        <div>
          {headerProps.columns.map((column: IColumn) => {
            return <div key={column.key}>{column.name}</div>;
          })}
        </div>
      );
    };

    const onRenderRow = (rowProps: IDetailsRowProps) => {
      return (
        <div>
          {rowProps.columns.map((column: IColumn) => {
            return <div key={column.key}>{rowProps.item[column.key]}</div>;
          })}
        </div>
      );
    };

    const onRenderGroupHeader: IRenderFunction<IDetailsGroupDividerProps> = (
      groupDividerProps: IDetailsGroupDividerProps,
    ) => {
      return <div>{groupDividerProps.group?.name}</div>;
    };

    const component = renderer.create(
      <DetailsList
        onRenderDetailsHeader={onRenderDetailsHeader}
        onRenderRow={onRenderRow}
        groupProps={{ onRenderHeader: onRenderGroupHeader, ...groupProps }}
        items={tableOneItems}
        groups={groupOneGroups}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        skipViewportMeasures={true}
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();

    // New items, same groups

    component.update(
      <DetailsList
        onRenderDetailsHeader={onRenderDetailsHeader}
        onRenderRow={onRenderRow}
        groupProps={{ onRenderHeader: onRenderGroupHeader, ...groupProps }}
        items={tableTwoItems}
        groups={groupOneGroups}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        skipViewportMeasures={true}
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();

    // Same items, new groups

    component.update(
      <DetailsList
        onRenderDetailsHeader={onRenderDetailsHeader}
        onRenderRow={onRenderRow}
        groupProps={{ onRenderHeader: onRenderGroupHeader, ...groupProps }}
        items={tableTwoItems}
        groups={groupTwoGroups}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        skipViewportMeasures={true}
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();

    // New items, same groups

    component.update(
      <DetailsList
        onRenderDetailsHeader={onRenderDetailsHeader}
        onRenderRow={onRenderRow}
        groupProps={{ onRenderHeader: onRenderGroupHeader, ...groupProps }}
        items={tableOneItems}
        groups={groupTwoGroups}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        skipViewportMeasures={true}
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('handles paged updates to items within groups', () => {
    const roundOneItems = [{ f1: 'A1', f2: 'B1', f3: 'C1' }, undefined, { f1: 'A3', f2: 'B3', f3: 'C3' }, undefined];
    const roundTwoItems = [
      { f1: 'A1', f2: 'B1', f3: 'C1' },
      { f1: 'A2', f2: 'B2', f3: 'C2' },
      { f1: 'A3', f2: 'B3', f3: 'C3' },
      { f1: 'A4', f2: 'B4', f3: 'C4' },
    ];

    const groups: IGroup[] = [
      { key: 'two-1', name: 'two 1', count: 2, startIndex: 0 },
      { key: 'two-2', name: 'two 2', count: 2, startIndex: 2 },
    ];

    const onRenderDetailsHeader: IRenderFunction<IDetailsHeaderProps> = (headerProps: IDetailsHeaderProps) => {
      return (
        <div>
          {headerProps.columns.map((column: IColumn) => {
            return <div key={column.key}>{column.name}</div>;
          })}
        </div>
      );
    };

    const onRenderRow = (rowProps: IDetailsRowProps) => {
      return (
        <div>
          {rowProps.columns.map((column: IColumn) => {
            return <div key={column.key}>{rowProps.item[column.key]}</div>;
          })}
        </div>
      );
    };

    const onRenderMissingItem = () => {
      return <div>Placeholder</div>;
    };

    const onRenderGroupHeader: IRenderFunction<IDetailsGroupDividerProps> = (
      groupDividerProps: IDetailsGroupDividerProps,
    ) => {
      return <div>{groupDividerProps.group?.name}</div>;
    };

    const component = renderer.create(
      <DetailsList
        onRenderDetailsHeader={onRenderDetailsHeader}
        onRenderRow={onRenderRow}
        onRenderMissingItem={onRenderMissingItem}
        groupProps={{ onRenderHeader: onRenderGroupHeader, ...groupProps }}
        items={roundOneItems}
        groups={groups}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        skipViewportMeasures={true}
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();

    // New items, same groups

    component.update(
      <DetailsList
        onRenderDetailsHeader={onRenderDetailsHeader}
        onRenderRow={onRenderRow}
        onRenderMissingItem={onRenderMissingItem}
        groupProps={{ onRenderHeader: onRenderGroupHeader, ...groupProps }}
        items={roundTwoItems}
        groups={groups}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        skipViewportMeasures={true}
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('returns an element with the correct text based on the second id passed in aria-labelledby', () => {
    const container = document.createElement('div');
    const columns = [
      {
        key: 'column1',
        name: 'Name',
        fieldName: 'name',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
        isRowHeader: true,
      },
      { key: 'column2', name: 'Value', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true },
    ];
    const items = mockData(1);

    ReactDOM.render(
      <DetailsListBase
        items={mockData(1)}
        columns={columns}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="select row"
        groupProps={groupProps}
      />,
      container,
    );

    const checkbox = container.querySelector('div[role="checkbox"][aria-label="select row"]') as HTMLElement;
    const rowHeaderId = checkbox?.getAttribute('aria-labelledby')?.split(' ')[1];

    expect(container.querySelector(`#${rowHeaderId}`)!.textContent).toEqual(items[0].name);
  });

  it('has an aria-labelledby checkboxId that matches the id of the checkbox', () => {
    const component = renderer.create(
      <DetailsList
        items={mockData(5)}
        columns={mockData(5, true)}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="select row"
        groupProps={groupProps}
      />,
    );

    const detailsRowSource = component.root.findAllByType(DetailsRow)[0];
    const detailsRowCheckSource = detailsRowSource.findByType(DetailsRowCheck).props;
    const checkboxId = detailsRowCheckSource.id;

    expect(checkboxId).toEqual(detailsRowCheckSource[`aria-labelledby`].split(' ')[0]);
  });

  it('names group header checkboxes based on checkButtonGroupAriaLabel', () => {
    const container = document.createElement('div');
    ReactDOM.render(
      <DetailsList
        items={mockData(5)}
        groups={[
          {
            key: 'group0',
            name: 'Group 0',
            startIndex: 0,
            count: 2,
          },
          {
            key: 'group1',
            name: 'Group 1',
            startIndex: 2,
            count: 3,
          },
        ]}
        checkButtonGroupAriaLabel="select section"
        groupProps={groupProps}
      />,
      container,
    );

    const checkbox = container.querySelector('[role="checkbox"][aria-label="select section"]') as HTMLElement;
    expect(checkbox).not.toBeNull();

    const groupNameId = checkbox.getAttribute('aria-labelledby')?.split(' ')[1];
    expect(container.querySelector(`#${groupNameId} span`)!.textContent).toEqual('Group 0');
  });
});
