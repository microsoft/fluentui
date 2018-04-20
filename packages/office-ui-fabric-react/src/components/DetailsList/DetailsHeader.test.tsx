import * as React from 'react';
import { IDetailsHeader, DetailsHeader } from './DetailsHeader';
import { DetailsListLayoutMode, IColumn } from './DetailsList.types';
import { Selection, SelectionMode } from '../../utilities/selection/index';
import { EventGroup, createRef } from '../../Utilities';
import { mount } from 'enzyme';
import * as renderer from 'react-test-renderer';

const _items: {}[] = [];
const _selection = new Selection();
const _columns: IColumn[] = [
  { key: 'a', name: 'a', fieldName: 'a', minWidth: 200, maxWidth: 400, calculatedWidth: 200, isResizable: true },
  { key: 'b', name: 'b', fieldName: 'a', minWidth: 200, maxWidth: 400, calculatedWidth: 200, isResizable: true }
];

_selection.setItems(_items);

describe('DetailsHeader', () => {

  it('can render', () => {
    const component = renderer.create(
      <DetailsHeader
        selection={ _selection }
        selectionMode={ SelectionMode.multiple }
        layoutMode={ DetailsListLayoutMode.fixedColumns }
        columns={ _columns }
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('can resize columns', () => {
    let lastResize = { size: -1, index: -1 };

    const onColumnResized = (
      column: IColumn,
      size: number,
      index: number
    ): { size: number; index: number; } => lastResize = { size, index };
    const headerRef = createRef<IDetailsHeader>();

    const wrapper = mount(
      <DetailsHeader
        componentRef={ headerRef }
        selection={ _selection }
        selectionMode={ SelectionMode.multiple }
        layoutMode={ DetailsListLayoutMode.fixedColumns }
        columns={ _columns }
        onColumnResized={ onColumnResized }
      />
    );

    const sizerElement = wrapper.find('[data-sizer-index=0]').getDOMNode();
    const header: any = headerRef.current;

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
    expect(!!wrapper.state().isSizing).toBe(false);

    // Mouse move 1 pixel to the right to get into sizing mode.
    wrapper.simulate('mousemove', { clientX: 1 });
    expect(!!wrapper.state().isSizing).toBe(true);

    // The header is 200; move mouse 100 to the right, the header should be 300.
    header._onSizerMouseMove({ clientX: 100 });
    expect(lastResize).toEqual({ index: 0, size: 300 });

    // Mouse move 300 pixels to the right, should be 500.
    header._onSizerMouseMove({ clientX: 300 });
    expect(lastResize).toEqual({ index: 0, size: 500 });

    // Complete sizing.
    header._onSizerMouseUp();
    expect(!!wrapper.state().isSizing).toBe(false);
  });
});