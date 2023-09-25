import * as React from 'react';
import { DetailsHeader } from './DetailsHeader';
import { SelectAllVisibility } from './DetailsHeader.types';
import { DetailsListLayoutMode, ColumnActionsMode, CheckboxVisibility } from './DetailsList.types';
import { Selection, SelectionMode } from '../../utilities/selection/index';
import { EventGroup } from '../../Utilities';
import { mount } from 'enzyme';
import * as renderer from 'react-test-renderer';
import { getTheme } from '../../Styling';
import type { IDetailsHeader, IDropHintDetails } from './DetailsHeader.types';
import type { IColumn } from './DetailsList.types';

const _items: {}[] = [];
const _selection = new Selection();
const _MOUSEDOWN = 'mousedown';
const _DRAGSTART = 'dragstart';
const _DRAGOVER = 'dragover';
const _DRAGEND = 'dragend';
const _DROP = 'drop';

const _getDropHintDetails = (component: any) => {
  const _dropHintDetails = [
    {
      originX: 40,
      startX: 40,
      endX: 150,
    } as IDropHintDetails,
    {
      originX: 260,
      startX: 150,
      endX: 370,
      dropHintElementRef: component.find('#columnDropHint_1').getDOMNode() as HTMLElement,
    } as IDropHintDetails,
    {
      originX: 480,
      startX: 370,
      endX: 590,
      dropHintElementRef: component.find('#columnDropHint_2').getDOMNode() as HTMLElement,
    } as IDropHintDetails,
    {
      originX: 700,
      startX: 590,
      endX: 810,
      dropHintElementRef: component.find('#columnDropHint_3').getDOMNode() as HTMLElement,
    } as IDropHintDetails,
    {
      originX: 920,
      startX: 810,
      endX: 1030,
      dropHintElementRef: component.find('#columnDropHint_4').getDOMNode() as HTMLElement,
    } as IDropHintDetails,
    {
      originX: 1140,
      startX: 1030,
      endX: 1155,
      dropHintElementRef: component.find('#columnDropHint_5').getDOMNode() as HTMLElement,
    } as IDropHintDetails,
    {
      originX: 1170,
      startX: 1155,
      endX: 1170,
    } as IDropHintDetails,
  ];

  return _dropHintDetails;
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

const _columns: IColumn[] = [
  { key: 'a', name: 'a', fieldName: 'a', minWidth: 200, maxWidth: 400, calculatedWidth: 200, isResizable: true },
  {
    key: 'b',
    name: 'b',
    fieldName: 'a',
    minWidth: 200,
    maxWidth: 400,
    calculatedWidth: 200,
    isResizable: true,
    isSorted: true,
  },
  {
    key: 'c',
    name: 'c',
    fieldName: 'c',
    minWidth: 10,
    maxWidth: 100,
    calculatedWidth: 10,
    isResizable: true,
    columnActionsMode: ColumnActionsMode.hasDropdown,
    isIconOnly: false,
  },
];

const columns: IColumn[] = [
  { key: 'a', name: 'a', fieldName: 'a', minWidth: 200, maxWidth: 400, calculatedWidth: 200, isResizable: true },
  {
    key: 'b',
    name: 'b',
    fieldName: 'a',
    minWidth: 200,
    maxWidth: 400,
    calculatedWidth: 200,
    isResizable: true,
    isSorted: true,
    sortAscendingAriaLabel: 'Sorted up.',
    sortDescendingAriaLabel: 'Sorted down.',
    ariaLabel: 'Click to sort.',
  },
  {
    key: 'c',
    name: 'c',
    fieldName: 'c',
    minWidth: 10,
    maxWidth: 100,
    calculatedWidth: 10,
    isResizable: true,
    columnActionsMode: ColumnActionsMode.hasDropdown,
    isIconOnly: false,
    isFiltered: true,
    filterAriaLabel: 'Filtered.',
    isGrouped: true,
    groupAriaLabel: 'Grouped.',
    ariaLabel: 'Click to sort, filter, or group.',
  },
];

const columns1: IColumn[] = [
  { key: 'a', name: 'a', fieldName: 'a', minWidth: 200, maxWidth: 400, calculatedWidth: 200, isResizable: true },
  {
    key: 'b',
    name: 'b',
    fieldName: 'b',
    minWidth: 200,
    maxWidth: 400,
    calculatedWidth: 200,
    isResizable: true,
    isSorted: true,
    sortAscendingAriaLabel: 'Sorted up.',
    sortDescendingAriaLabel: 'Sorted down.',
    ariaLabel: 'Click to sort.',
  },
  {
    key: 'c',
    name: 'c',
    fieldName: 'c',
    minWidth: 200,
    maxWidth: 400,
    calculatedWidth: 200,
    isResizable: true,
    columnActionsMode: ColumnActionsMode.hasDropdown,
    isIconOnly: false,
    isFiltered: true,
    filterAriaLabel: 'Filtered.',
    isGrouped: true,
    groupAriaLabel: 'Grouped.',
    ariaLabel: 'Click to sort, filter, or group.',
  },
  {
    key: 'd',
    name: 'd',
    fieldName: 'd',
    minWidth: 200,
    maxWidth: 400,
    calculatedWidth: 200,
    isResizable: true,
    columnActionsMode: ColumnActionsMode.hasDropdown,
    isIconOnly: false,
    isFiltered: true,
    filterAriaLabel: 'Filtered.',
    isGrouped: true,
    groupAriaLabel: 'Grouped.',
    ariaLabel: 'Click to sort, filter, or group.',
  },
  {
    key: 'e',
    name: 'e',
    fieldName: 'e',
    minWidth: 200,
    maxWidth: 400,
    calculatedWidth: 200,
    isResizable: true,
    columnActionsMode: ColumnActionsMode.hasDropdown,
    isIconOnly: false,
    isFiltered: true,
    filterAriaLabel: 'Filtered.',
    isGrouped: true,
    groupAriaLabel: 'Grouped.',
    ariaLabel: 'Click to sort, filter, or group.',
  },
  {
    key: 'f',
    name: 'f',
    fieldName: 'f',
    minWidth: 10,
    maxWidth: 100,
    calculatedWidth: 10,
    isResizable: true,
    columnActionsMode: ColumnActionsMode.hasDropdown,
    isIconOnly: false,
    isFiltered: true,
    filterAriaLabel: 'Filtered.',
    isGrouped: true,
    groupAriaLabel: 'Grouped.',
    ariaLabel: 'Click to sort, filter, or group.',
  },
];

const _columnReorderProps = {
  frozenColumnCountFromStart: 1,
};

const _columnReorderProps2 = {
  frozenColumnCountFromStart: 1,
  frozenColumnCountFromEnd: 1,
};

_selection.setItems(_items);

/*
The detached DOM node for the DetailsHeader looks like this :
___________________________________________________________
|_|____a____|____b____|____c____|____d____|____e____|__f__|

a starts at 40px. All columns from a to e have a width of 220px. f has a width of 30px
*/

describe('DetailsHeader', () => {
  it('can render', () => {
    const component = renderer.create(
      <DetailsHeader
        selection={_selection}
        selectionMode={SelectionMode.multiple}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        columns={_columns}
      />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('can render a hidden select all checkbox in single selection mode', () => {
    const component = renderer.create(
      <DetailsHeader
        selection={_selection}
        selectionMode={SelectionMode.single}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        selectAllVisibility={SelectAllVisibility.hidden}
        columns={_columns}
      />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('can resize columns', () => {
    let lastResize = { size: -1, index: -1 };

    const onColumnResized = (column: IColumn, size: number, index: number): { size: number; index: number } =>
      (lastResize = { size, index });
    const headerRef = React.createRef<IDetailsHeader>();

    const wrapper = mount(
      <DetailsHeader
        componentRef={headerRef}
        selection={_selection}
        selectionMode={SelectionMode.multiple}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        columns={_columns}
        onColumnResized={onColumnResized}
        columnReorderProps={_columnReorderProps}
      />,
    );

    const sizerElement = wrapper.find('[data-sizer-index=0]').getDOMNode();
    const header: any = headerRef.current!;
    // Trigger a mousedown, which validates that the ref to focuszone is hooking up events.
    EventGroup.raise(
      sizerElement,
      'mousedown',
      {
        clientX: 0,
        button: 0,
      },
      true,
    );
    // Validate we go into resize mode.
    expect(sizerElement.classList.contains('is-resizing')).toBe(true);
    expect(!!header.state.isSizing).toBe(false);

    // Mouse move 1 pixel to the right to get into sizing mode.
    wrapper.simulate('mousemove', { clientX: 1 });
    expect(!!header.state.isSizing).toBe(true);

    // The header is 200; move mouse 100 to the right, the header should be 300.
    header._onSizerMouseMove({ clientX: 100 });
    expect(lastResize).toEqual({ index: 0, size: 300 });

    // Mouse move 300 pixels to the right, should be 500.
    header._onSizerMouseMove({ clientX: 300 });
    expect(lastResize).toEqual({ index: 0, size: 500 });

    // Complete sizing.
    header._onSizerMouseUp();
    expect(!!header.state.isSizing).toBe(false);
  });

  it('renders accessible labels', () => {
    const component = renderer.create(
      <DetailsHeader
        selection={_selection}
        selectionMode={SelectionMode.multiple}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        columns={columns}
        ariaLabelForSelectAllCheckbox={'Toggle selection for all items'}
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  // if ariaLabelForSelectAllCheckbox is not provided, the select all checkbox label should not be rendered
  it('does not render label for select all column header without string', () => {
    const component = mount(
      <DetailsHeader
        selection={_selection}
        selectionMode={SelectionMode.multiple}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        columns={columns}
      />,
    );

    const selectAllCheckBoxAriaLabelledBy = component
      .find('[role="columnheader"]')
      .at(0)
      .getDOMNode()
      .getAttribute('aria-labelledby');

    expect(component.find(`#${selectAllCheckBoxAriaLabelledBy}`).length).toEqual(0);
  });

  // if ariaLabelForSelectAllCheckbox is passed in and onRenderColumnHeaderTooltip is not,
  // the checkbox should use it as an aria-label, and the columnheader
  // should have aria-labelledby pointing to a valid id
  it('renders accessible label for select all checkbox and valid aria-describedby', () => {
    const component = mount(
      <DetailsHeader
        selection={_selection}
        selectionMode={SelectionMode.multiple}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        columns={columns}
        ariaLabelForSelectAllCheckbox={'Toggle selection for all items'}
      />,
    );

    const selectAllColumnAriaLabelledBy = component
      .find('[role="columnheader"]')
      .at(0)
      .getDOMNode()
      .getAttribute('aria-labelledby');

    expect(component.find(`#${selectAllColumnAriaLabelledBy}`).length).toEqual(1);

    const selectAllCheckboxLabel = component.find('[role="checkbox"]').getDOMNode().getAttribute('aria-label');

    expect(selectAllCheckboxLabel).toEqual('Toggle selection for all items');
  });

  it('should mark the columns as draggable', () => {
    const headerRef = React.createRef<IDetailsHeader>();

    const component = mount(
      <DetailsHeader
        selection={_selection}
        componentRef={headerRef}
        selectionMode={SelectionMode.multiple}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        columns={columns1}
        columnReorderProps={_columnReorderProps2}
      />,
    );

    const detailsColNotDraggable = component.find('[draggable=false]').getElements();
    const detailsColNotDraggableA = component.find('[role="columnheader"]').at(1).getElement();
    const detailsColNotDraggableF = component.find('[role="columnheader"]').at(6).getElement();

    expect(detailsColNotDraggable[0]).toEqual(detailsColNotDraggableA);
    expect(detailsColNotDraggable[1]).toEqual(detailsColNotDraggableF);

    const detailsColDraggable = component.find('[draggable=true]').getElements();
    const detailsColDraggableB = component.find('[role="columnheader"]').at(2).getElement();
    const detailsColDraggableC = component.find('[role="columnheader"]').at(3).getElement();
    const detailsColDraggableD = component.find('[role="columnheader"]').at(4).getElement();
    const detailsColDraggableE = component.find('[role="columnheader"]').at(5).getElement();

    expect(detailsColDraggable[0]).toEqual(detailsColDraggableB);
    expect(detailsColDraggable[1]).toEqual(detailsColDraggableC);
    expect(detailsColDraggable[2]).toEqual(detailsColDraggableD);
    expect(detailsColDraggable[3]).toEqual(detailsColDraggableE);
  });

  it('should not let frozen columns to be dragged', () => {
    const headerRef = React.createRef<IDetailsHeader>();

    const component = mount(
      <DetailsHeader
        selection={_selection}
        componentRef={headerRef}
        selectionMode={SelectionMode.multiple}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        columns={columns1}
        columnReorderProps={_columnReorderProps2}
      />,
    );

    const detailsColSourceA = component.find('[role="columnheader"]').at(1).getDOMNode();
    const header: any = headerRef.current!;

    // try dragging first frozen column a
    _RaiseEvent(detailsColSourceA, _MOUSEDOWN, 60);
    _RaiseEvent(detailsColSourceA, _DRAGSTART, 60);

    expect(header._dragDropHelper._isDragging).toBe(undefined);
    expect(header._dragDropHelper._dragData).toBe(undefined);
    expect(detailsColSourceA.classList.item(4)).toBe(null);

    const detailsColSourceF = component.find('[role="columnheader"]').at(6).getDOMNode();

    // try dragging last frozen column e
    _RaiseEvent(detailsColSourceF, _MOUSEDOWN, 950);
    _RaiseEvent(detailsColSourceF, _DRAGSTART, 950);

    expect(header._dragDropHelper._isDragging).toBe(undefined);
    expect(header._dragDropHelper._dragData).toBe(undefined);
    expect(detailsColSourceF.classList.item(4)).toBe(null);
  });

  it('should perform dragstart and dragend correctly', () => {
    const headerRef = React.createRef<IDetailsHeader>();

    const component = mount(
      <DetailsHeader
        selection={_selection}
        componentRef={headerRef}
        selectionMode={SelectionMode.multiple}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        columns={columns1}
        columnReorderProps={_columnReorderProps2}
      />,
    );

    const detailsColSourceB = component.find('[role="columnheader"]').at(2).getDOMNode();
    const header: any = headerRef.current!;

    // raise mouse down and dragstart on column b
    _RaiseEvent(detailsColSourceB, _MOUSEDOWN, 270);
    _RaiseEvent(detailsColSourceB, _DRAGSTART, 270);

    expect(header._dragDropHelper._isDragging).toBeTruthy();
    expect(header._dragDropHelper._dragData).toBeDefined();

    let _borderWhileDraggingClass: any = '';
    if (detailsColSourceB && detailsColSourceB.classList) {
      _borderWhileDraggingClass = detailsColSourceB.classList.item(4);
    }

    // border shall appear on doing a dragstart
    expect(_borderWhileDraggingClass.includes('borderWhileDragging')).toBeTruthy();
    _RaiseEvent(detailsColSourceB, _DRAGEND, 490);

    // border should dissappear on doing a dragend
    expect(detailsColSourceB.classList.item(4)).toBe(null);
  });

  it('should perform dragOver correctly', () => {
    const headerRef = React.createRef<IDetailsHeader>();

    const component = mount(
      <DetailsHeader
        selection={_selection}
        componentRef={headerRef}
        selectionMode={SelectionMode.multiple}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        columns={columns1}
        columnReorderProps={_columnReorderProps2}
      />,
    );

    // moving column c and dragover from a to f
    const detailsColSourceC = component.find('[role="columnheader"]').at(3).getDOMNode();
    const detailsColTargetB = component.find('[role="columnheader"]').at(2).getDOMNode();
    const detailsColTargetD = component.find('[role="columnheader"]').at(4).getDOMNode();
    const detailsColTargetE = component.find('[role="columnheader"]').at(5).getDOMNode();
    const detailsColTargetF = component.find('[role="columnheader"]').at(6).getDOMNode();
    const header: any = headerRef.current!;

    // do a mousedown and dragstart on source column c
    _RaiseEvent(detailsColSourceC, _MOUSEDOWN, 490);
    _RaiseEvent(detailsColSourceC, _DRAGSTART, 490);

    header._dropHintDetails = _getDropHintDetails(component);

    // dragover b/w a and b
    _RaiseEvent(detailsColTargetB, _DRAGOVER, 200);
    expect(header._draggedColumnIndex).toBe(2);
    expect(header._currentDropHintIndex).toBe(1);
    let dropHintElement = component.find('#columnDropHint_1').getDOMNode();
    let dropHintElementChildren = dropHintElement.children;
    expect(dropHintElementChildren.item(0)!.getAttribute('style')).toContain('display: inline-block;');
    expect(dropHintElementChildren.item(1)!.getAttribute('style')).toEqual('display: inline-block;');

    // dragover b/w b&c and c&d -> dead zone b/w 370 and 810
    _RaiseEvent(detailsColSourceC, _DRAGOVER, 400);
    expect(header._draggedColumnIndex).toBe(2);
    expect(header._currentDropHintIndex).toBe(-1);

    _RaiseEvent(detailsColTargetD, _DRAGOVER, 710);
    expect(header._draggedColumnIndex).toBe(2);
    expect(header._currentDropHintIndex).toBe(-1);

    // dead zone : idx 2 and 3 -> no hint shown
    dropHintElement = component.find('#columnDropHint_2').getDOMNode();
    dropHintElementChildren = dropHintElement.children;
    expect(dropHintElementChildren.item(0)!.getAttribute('style')).toBe(null);
    expect(dropHintElementChildren.item(1)!.getAttribute('style')).toBe(null);

    dropHintElement = component.find('#columnDropHint_3').getDOMNode();
    dropHintElementChildren = dropHintElement.children;
    expect(dropHintElementChildren.item(0)!.getAttribute('style')).toBe(null);
    expect(dropHintElementChildren.item(1)!.getAttribute('style')).toBe(null);

    // dragover e
    _RaiseEvent(detailsColTargetE, _DRAGOVER, 811);
    expect(header._draggedColumnIndex).toBe(2);
    expect(header._currentDropHintIndex).toBe(4);
    dropHintElement = component.find('#columnDropHint_4').getDOMNode();
    dropHintElementChildren = dropHintElement.children;
    expect(dropHintElementChildren.item(0)!.getAttribute('style')).toContain('display: inline-block;');
    expect(dropHintElementChildren.item(1)!.getAttribute('style')).toEqual('display: inline-block;');

    // raise dragend on column c
    _RaiseEvent(detailsColSourceC, _DRAGEND, 490);

    // drop hint should be hidden on doing a dragend
    dropHintElement = component.find('#columnDropHint_4').getDOMNode();
    dropHintElementChildren = dropHintElement.children;
    expect(dropHintElementChildren.item(0)!.getAttribute('style')).toContain('display: none;');
    expect(dropHintElementChildren.item(1)!.getAttribute('style')).toEqual('display: none;');

    // do a mousedown and dragstart on source column c
    _RaiseEvent(detailsColSourceC, _MOUSEDOWN, 490);
    _RaiseEvent(detailsColSourceC, _DRAGSTART, 490);

    // dragover f
    _RaiseEvent(detailsColTargetF, _DRAGOVER, 1040);
    expect(header._draggedColumnIndex).toBe(2);
    expect(header._currentDropHintIndex).toBe(5);
    dropHintElement = component.find('#columnDropHint_5').getDOMNode();
    dropHintElementChildren = dropHintElement.children;

    expect(dropHintElementChildren.item(0)!.getAttribute('style')).toContain('display: inline-block;');
    expect(dropHintElementChildren.item(1)!.getAttribute('style')).toEqual('display: inline-block;');

    // dragover outside f's zone (frozen) -> should get last valid drop hint
    _RaiseEvent(detailsColTargetF, _DRAGOVER, 1169);
    expect(header._draggedColumnIndex).toBe(2);
    expect(header._currentDropHintIndex).toBe(5);
    dropHintElement = component.find('#columnDropHint_5').getDOMNode();
    dropHintElementChildren = dropHintElement.children;
    expect(dropHintElementChildren.item(0)!.getAttribute('style')).toContain('display: inline-block;');
    expect(dropHintElementChildren.item(1)!.getAttribute('style')).toEqual('display: inline-block;');
  });

  it('should set source and target index correctly on drop', () => {
    let _sourceIndex = -1;
    let _targetIndex = -1;

    const _handleColumnReorder = (draggedIndex: number, targetIndex: number) => {
      const draggedItems = columns[draggedIndex];
      const newColumns: IColumn[] = [...columns];
      // insert before the dropped item
      newColumns.splice(draggedIndex, 1);
      newColumns.splice(targetIndex, 0, draggedItems);
      _sourceIndex = draggedIndex;
      _targetIndex = targetIndex;
    };

    const headerRef = React.createRef<IDetailsHeader>();

    const _columnReorderPropsForDrop = {
      frozenColumnCountFromStart: 1,
      frozenColumnCountFromEnd: 1,
      handleColumnReorder: _handleColumnReorder,
    };

    const component = mount(
      <DetailsHeader
        selection={_selection}
        componentRef={headerRef}
        selectionMode={SelectionMode.multiple}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        columns={columns1}
        columnReorderProps={_columnReorderPropsForDrop}
      />,
    );

    // moving column e to between a and b (abcdef -> aebcdf)
    const detailsColSourceE = component.find('[role="columnheader"]').at(5).getDOMNode();
    let detailsColTarget = component.find('[role="columnheader"]').at(2).getDOMNode();
    const header: any = headerRef.current!;

    // do a mousedown and dragstart on source column e
    _RaiseEvent(detailsColSourceE, _MOUSEDOWN, 930);
    _RaiseEvent(detailsColSourceE, _DRAGSTART, 930);

    header._dropHintDetails = _getDropHintDetails(component);

    // fire dragover over the target column
    _RaiseEvent(detailsColTarget, _DRAGOVER, 160);

    let dropHintElement = component.find('#columnDropHint_1').getDOMNode();
    let dropHintElementChildren = dropHintElement.children;
    expect(dropHintElementChildren.item(0)!.getAttribute('style')).toContain('display: inline-block;');
    expect(dropHintElementChildren.item(1)!.getAttribute('style')).toEqual('display: inline-block;');

    _RaiseEvent(detailsColTarget, _DROP, 160);
    expect(_sourceIndex).toBe(4);
    expect(_targetIndex).toBe(1);

    dropHintElement = component.find('#columnDropHint_1').getDOMNode();
    dropHintElementChildren = dropHintElement.children;
    expect(dropHintElementChildren.item(0)!.getAttribute('style')).toContain('display: none;');
    expect(dropHintElementChildren.item(1)!.getAttribute('style')).toEqual('display: none;');

    // try moving column c after frozen column f (abcdef -> abdecf)
    let detailsColSourceC = component.find('[role="columnheader"]').at(3).getDOMNode();
    detailsColTarget = component.find('[role="columnheader"]').at(6).getDOMNode();

    // do a mousedown and dragstart on source column c
    _RaiseEvent(detailsColSourceC, _MOUSEDOWN, 490);
    _RaiseEvent(detailsColSourceC, _DRAGSTART, 490);

    header._dropHintDetails = _getDropHintDetails(component);

    // fire dragover over the target column
    _RaiseEvent(detailsColTarget, _DRAGOVER, 1169);

    dropHintElement = component.find('#columnDropHint_5').getDOMNode();
    dropHintElementChildren = dropHintElement.children;
    expect(dropHintElementChildren.item(0)!.getAttribute('style')).toContain('display: inline-block;');
    expect(dropHintElementChildren.item(1)!.getAttribute('style')).toEqual('display: inline-block;');

    _RaiseEvent(detailsColTarget, _DROP, 1169);
    expect(_sourceIndex).toBe(2);
    expect(_targetIndex).toBe(4);

    dropHintElement = component.find('#columnDropHint_5').getDOMNode();
    dropHintElementChildren = dropHintElement.children;
    expect(dropHintElementChildren.item(0)!.getAttribute('style')).toContain('display: none;');
    expect(dropHintElementChildren.item(1)!.getAttribute('style')).toEqual('display: none;');

    // source and target column are the same
    detailsColSourceC = component.find('[role="columnheader"]').at(3).getDOMNode();
    detailsColTarget = component.find('[role="columnheader"]').at(3).getDOMNode();
    _RaiseEvent(detailsColSourceC, _MOUSEDOWN, 490);
    _RaiseEvent(detailsColSourceC, _DRAGSTART, 490);

    header._dropHintDetails = _getDropHintDetails(component);

    // fire dragover over the source column itself
    _RaiseEvent(detailsColTarget, _DRAGOVER, 500);

    dropHintElement = component.find('#columnDropHint_2').getDOMNode();
    dropHintElementChildren = dropHintElement.children;
    expect(dropHintElementChildren.item(0)!.getAttribute('style')).toBe(null);
    expect(dropHintElementChildren.item(1)!.getAttribute('style')).toBe(null);

    // drop on source column itself -> drophintindex should not be set and hence target index not updated
    _RaiseEvent(detailsColTarget, _DROP, 500);
    expect(header._currentDropHintIndex).toBe(-1);
    expect(_sourceIndex).toBe(2);
  });

  it('should set optional headerClassName on header if provided', () => {
    const headerClassName: string = 'foo';
    const column: IColumn = {
      key: 'a',
      name: 'a',
      fieldName: 'a',
      minWidth: 200,
      maxWidth: 400,
      calculatedWidth: 200,
      isResizable: true,
      headerClassName,
    };

    const component = mount(
      <DetailsHeader
        selection={_selection}
        selectionMode={SelectionMode.multiple}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        columns={[column]}
      />,
    );

    expect(component.find(`.${headerClassName}`).exists()).toBe(true);
  });

  it('renders details header with custom checkbox render', () => {
    const onRenderCheckboxMock = jest.fn();

    mount(
      <DetailsHeader
        selection={_selection}
        selectionMode={SelectionMode.multiple}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        onRenderDetailsCheckbox={onRenderCheckboxMock}
        checkboxVisibility={CheckboxVisibility.always}
      />,
    );

    expect(onRenderCheckboxMock).toHaveBeenCalledTimes(1);
    expect(onRenderCheckboxMock.mock.calls[0][0]).toEqual({ checked: false, theme: getTheme() });
  });
});
