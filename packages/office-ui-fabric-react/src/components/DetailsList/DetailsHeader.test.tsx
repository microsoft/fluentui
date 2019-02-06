import * as React from 'react';
import { DetailsHeader } from './DetailsHeader';
import { IDetailsHeader, IDropHintDetails, SelectAllVisibility } from './DetailsHeader.types';
import { DetailsListLayoutMode, IColumn, ColumnActionsMode } from './DetailsList.types';
import { Selection, SelectionMode } from '../../utilities/selection/index';
import { EventGroup } from '../../Utilities';
import { mount } from 'enzyme';
import * as renderer from 'react-test-renderer';

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
      endX: 150
    } as IDropHintDetails,
    {
      originX: 260,
      startX: 150,
      endX: 370,
      dropHintElementRef: component.find('#columnDropHint_1').getDOMNode() as HTMLElement
    } as IDropHintDetails,
    {
      originX: 480,
      startX: 370,
      endX: 590,
      dropHintElementRef: component.find('#columnDropHint_2').getDOMNode() as HTMLElement
    } as IDropHintDetails,
    {
      originX: 700,
      startX: 590,
      endX: 810,
      dropHintElementRef: component.find('#columnDropHint_3').getDOMNode() as HTMLElement
    } as IDropHintDetails,
    {
      originX: 920,
      startX: 810,
      endX: 1030,
      dropHintElementRef: component.find('#columnDropHint_4').getDOMNode() as HTMLElement
    } as IDropHintDetails,
    {
      originX: 1140,
      startX: 1030,
      endX: 1155,
      dropHintElementRef: component.find('#columnDropHint_5').getDOMNode() as HTMLElement
    } as IDropHintDetails,
    {
      originX: 1170,
      startX: 1155,
      endX: 1170
    } as IDropHintDetails
  ];

  return _dropHintDetails;
};

const _RaiseEvent = (target: any, _eventName: string, _clientX: number) => {
  EventGroup.raise(
    target,
    _eventName,
    {
      clientX: _clientX,
      button: 0
    } as DragEvent,
    true
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
    isSorted: true
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
    isIconOnly: false
  }
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
    ariaLabel: 'Click to sort.'
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
    ariaLabel: 'Click to sort, filter, or group.'
  }
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
    ariaLabel: 'Click to sort.'
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
    ariaLabel: 'Click to sort, filter, or group.'
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
    ariaLabel: 'Click to sort, filter, or group.'
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
    ariaLabel: 'Click to sort, filter, or group.'
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
    ariaLabel: 'Click to sort, filter, or group.'
  }
];

const _columnReorderProps = {
  frozenColumnCountFromStart: 1,
  handleColumnReorder: this._dummyFunction
};

const _columnReorderProps2 = {
  frozenColumnCountFromStart: 1,
  frozenColumnCountFromEnd: 1,
  handleColumnReorder: this._dummyFunction
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
      />
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
      />
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
      />
    );

    const sizerElement = wrapper.find('[data-sizer-index=0]').getDOMNode();
    const header: any = headerRef.current!;
    // Trigger a mousedown, which validates that the ref to focuszone is hooking up events.
    EventGroup.raise(
      sizerElement,
      'mousedown',
      {
        clientX: 0,
        button: 0
      },
      true
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
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  // if ariaLabelForSelectAllCheckbox is not provided, the select all checkbox label should not
  // be rendered and therefore aria-describedby should not exist on the select all checkbox
  it('does not accessible label for select all checkbox or aria-describedby', () => {
    const component = mount(
      <DetailsHeader
        selection={_selection}
        selectionMode={SelectionMode.multiple}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        columns={columns}
      />
    );

    const selectAllCheckBoxAriaLabelledBy = component
      .find('[aria-colindex=1]')
      .getDOMNode()
      .getAttribute('aria-labelledby');

    expect(
      component
        .find(`#${selectAllCheckBoxAriaLabelledBy}`)
        .first()
        .getDOMNode()
        .hasAttribute('aria-describedby')
    ).toBe(false);

    expect(component.find(`#${selectAllCheckBoxAriaLabelledBy}Tooltip`).length).toEqual(0);
  });

  // if ariaLabelForSelectAllCheckbox is passed in and onRenderColumnHeaderTooltip is not,
  // the select all checkbox label should be rendered and aria-describedby on select all
  // checkbox should exist with a valid id
  it('renders accessible label for select all checkbox and valid aria-describedby', () => {
    const component = mount(
      <DetailsHeader
        selection={_selection}
        selectionMode={SelectionMode.multiple}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        columns={columns}
        ariaLabelForSelectAllCheckbox={'Toggle selection for all items'}
      />
    );

    const selectAllCheckBoxAriaLabelledBy = component
      .find('[aria-colindex=1]')
      .getDOMNode()
      .getAttribute('aria-labelledby');

    expect(
      component
        .find(`#${selectAllCheckBoxAriaLabelledBy}`)
        .first()
        .getDOMNode()
        .getAttribute('aria-describedby')!
    ).toEqual(`${selectAllCheckBoxAriaLabelledBy}Tooltip`);

    expect(component.find(`#${selectAllCheckBoxAriaLabelledBy}Tooltip`).length).toEqual(1);
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
      />
    );

    const detailsColNotDraggable = component.find('[draggable=false]').getElements();
    const detailsColNotDraggableA = component.find('[aria-colindex=2]').getElement();
    const detailsColNotDraggableF = component.find('[aria-colindex=7]').getElement();

    expect(detailsColNotDraggable[0]).toEqual(detailsColNotDraggableA);
    expect(detailsColNotDraggable[1]).toEqual(detailsColNotDraggableF);

    const detailsColDraggable = component.find('[draggable=true]').getElements();
    const detailsColDraggableB = component.find('[aria-colindex=3]').getElement();
    const detailsColDraggableC = component.find('[aria-colindex=4]').getElement();
    const detailsColDraggableD = component.find('[aria-colindex=5]').getElement();
    const detailsColDraggableE = component.find('[aria-colindex=6]').getElement();

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
      />
    );

    const detailsColSourceA = component.find('[aria-colindex=2]').getDOMNode();
    const header: any = headerRef.current!;

    // try dragging first frozen column a
    _RaiseEvent(detailsColSourceA, _MOUSEDOWN, 60);
    _RaiseEvent(detailsColSourceA, _DRAGSTART, 60);

    expect(header._dragDropHelper._isDragging).toBe(undefined);
    expect(header._dragDropHelper._dragData).toBe(undefined);
    expect(detailsColSourceA.classList.item(4)).toBe(null);

    const detailsColSourceF = component.find('[aria-colindex=7]').getDOMNode();

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
      />
    );

    const detailsColSourceB = component.find('[aria-colindex=3]').getDOMNode();
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
      />
    );

    // moving column c and dragover from a to f
    const detailsColSourceC = component.find('[aria-colindex=4]').getDOMNode();
    const detailsColTargetB = component.find('[aria-colindex=3]').getDOMNode();
    const detailsColTargetD = component.find('[aria-colindex=5]').getDOMNode();
    const detailsColTargetE = component.find('[aria-colindex=6]').getDOMNode();
    const detailsColTargetF = component.find('[aria-colindex=7]').getDOMNode();
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
    expect(dropHintElementChildren.item(0)!.getAttribute('style')).toEqual('display: inline-block;');
    expect(dropHintElementChildren.item(1)!.getAttribute('style')).toEqual('display: inline-block;');

    // dragover b/w b&c and c&d -> dead zone b/w 370 and 810
    _RaiseEvent(detailsColSourceC, _DRAGOVER, 400);
    expect(header._draggedColumnIndex).toBe(2);
    expect(header._currentDropHintIndex).toBe(Number.MIN_SAFE_INTEGER);

    _RaiseEvent(detailsColTargetD, _DRAGOVER, 710);
    expect(header._draggedColumnIndex).toBe(2);
    expect(header._currentDropHintIndex).toBe(Number.MIN_SAFE_INTEGER);

    // dead zone : idx 2 and 3 -> no hint shown
    dropHintElement = component.find('#columnDropHint_2').getDOMNode();
    dropHintElementChildren = dropHintElement.children;
    expect(dropHintElementChildren.item(0)!.getAttribute('style')).toEqual(null);
    expect(dropHintElementChildren.item(1)!.getAttribute('style')).toEqual(null);

    dropHintElement = component.find('#columnDropHint_3').getDOMNode();
    dropHintElementChildren = dropHintElement.children;
    expect(dropHintElementChildren.item(0)!.getAttribute('style')).toEqual(null);
    expect(dropHintElementChildren.item(1)!.getAttribute('style')).toEqual(null);

    // dragover e
    _RaiseEvent(detailsColTargetE, _DRAGOVER, 811);
    expect(header._draggedColumnIndex).toBe(2);
    expect(header._currentDropHintIndex).toBe(4);
    dropHintElement = component.find('#columnDropHint_4').getDOMNode();
    dropHintElementChildren = dropHintElement.children;
    expect(dropHintElementChildren.item(0)!.getAttribute('style')).toEqual('display: inline-block;');
    expect(dropHintElementChildren.item(1)!.getAttribute('style')).toEqual('display: inline-block;');

    // raise dragend on column c
    _RaiseEvent(detailsColSourceC, _DRAGEND, 490);

    // drop hint should be hidden on doing a dragend
    dropHintElement = component.find('#columnDropHint_4').getDOMNode();
    dropHintElementChildren = dropHintElement.children;
    expect(dropHintElementChildren.item(0)!.getAttribute('style')).toEqual('display: none;');
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

    expect(dropHintElementChildren.item(0)!.getAttribute('style')).toEqual('display: inline-block;');
    expect(dropHintElementChildren.item(1)!.getAttribute('style')).toEqual('display: inline-block;');

    // dragover outside f's zone (frozen) -> should get last valid drop hint
    _RaiseEvent(detailsColTargetF, _DRAGOVER, 1169);
    expect(header._draggedColumnIndex).toBe(2);
    expect(header._currentDropHintIndex).toBe(5);
    dropHintElement = component.find('#columnDropHint_5').getDOMNode();
    dropHintElementChildren = dropHintElement.children;
    expect(dropHintElementChildren.item(0)!.getAttribute('style')).toEqual('display: inline-block;');
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
      handleColumnReorder: _handleColumnReorder
    };

    const component = mount(
      <DetailsHeader
        selection={_selection}
        componentRef={headerRef}
        selectionMode={SelectionMode.multiple}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        columns={columns1}
        columnReorderProps={_columnReorderPropsForDrop}
      />
    );

    // moving column e to between a and b (abcdef -> aebcdf)
    const detailsColSourceE = component.find('[aria-colindex=6]').getDOMNode();
    let detailsColTarget = component.find('[aria-colindex=3]').getDOMNode();
    const header: any = headerRef.current!;

    // do a mousedown and dragstart on source column e
    _RaiseEvent(detailsColSourceE, _MOUSEDOWN, 930);
    _RaiseEvent(detailsColSourceE, _DRAGSTART, 930);

    header._dropHintDetails = _getDropHintDetails(component);

    // fire dragover over the target column
    _RaiseEvent(detailsColTarget, _DRAGOVER, 160);

    let dropHintElement = component.find('#columnDropHint_1').getDOMNode();
    let dropHintElementChildren = dropHintElement.children;
    expect(dropHintElementChildren.item(0)!.getAttribute('style')).toEqual('display: inline-block;');
    expect(dropHintElementChildren.item(1)!.getAttribute('style')).toEqual('display: inline-block;');

    _RaiseEvent(detailsColTarget, _DROP, 160);
    expect(_sourceIndex).toBe(4);
    expect(_targetIndex).toBe(1);

    dropHintElement = component.find('#columnDropHint_1').getDOMNode();
    dropHintElementChildren = dropHintElement.children;
    expect(dropHintElementChildren.item(0)!.getAttribute('style')).toEqual('display: none;');
    expect(dropHintElementChildren.item(1)!.getAttribute('style')).toEqual('display: none;');

    // try moving column c after frozen column f (abcdef -> abdecf)
    let detailsColSourceC = component.find('[aria-colindex=4]').getDOMNode();
    detailsColTarget = component.find('[aria-colindex=7]').getDOMNode();

    // do a mousedown and dragstart on source column c
    _RaiseEvent(detailsColSourceC, _MOUSEDOWN, 490);
    _RaiseEvent(detailsColSourceC, _DRAGSTART, 490);

    header._dropHintDetails = _getDropHintDetails(component);

    // fire dragover over the target column
    _RaiseEvent(detailsColTarget, _DRAGOVER, 1169);

    dropHintElement = component.find('#columnDropHint_5').getDOMNode();
    dropHintElementChildren = dropHintElement.children;
    expect(dropHintElementChildren.item(0)!.getAttribute('style')).toEqual('display: inline-block;');
    expect(dropHintElementChildren.item(1)!.getAttribute('style')).toEqual('display: inline-block;');

    _RaiseEvent(detailsColTarget, _DROP, 1169);
    expect(_sourceIndex).toBe(2);
    expect(_targetIndex).toBe(4);

    dropHintElement = component.find('#columnDropHint_5').getDOMNode();
    dropHintElementChildren = dropHintElement.children;
    expect(dropHintElementChildren.item(0)!.getAttribute('style')).toEqual('display: none;');
    expect(dropHintElementChildren.item(1)!.getAttribute('style')).toEqual('display: none;');

    // source and target column are the same
    detailsColSourceC = component.find('[aria-colindex=4]').getDOMNode();
    detailsColTarget = component.find('[aria-colindex=4]').getDOMNode();
    _RaiseEvent(detailsColSourceC, _MOUSEDOWN, 490);
    _RaiseEvent(detailsColSourceC, _DRAGSTART, 490);

    header._dropHintDetails = _getDropHintDetails(component);

    // fire dragover over the source column itself
    _RaiseEvent(detailsColTarget, _DRAGOVER, 500);

    dropHintElement = component.find('#columnDropHint_2').getDOMNode();
    dropHintElementChildren = dropHintElement.children;
    expect(dropHintElementChildren.item(0)!.getAttribute('style')).toEqual(null);
    expect(dropHintElementChildren.item(1)!.getAttribute('style')).toEqual(null);

    // drop on source column itself -> drophintindex should not be set and hence target index not updated
    _RaiseEvent(detailsColTarget, _DROP, 500);
    expect(header._currentDropHintIndex).toBe(Number.MIN_SAFE_INTEGER);
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
      headerClassName
    };

    const component = mount(
      <DetailsHeader
        selection={_selection}
        selectionMode={SelectionMode.multiple}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        columns={[column]}
      />
    );

    expect(component.find(`.${headerClassName}`).exists()).toBe(true);
  });
});
