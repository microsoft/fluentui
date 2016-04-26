import * as React from 'react';
import EventGroup from '../eventGroup/EventGroup';
import { SelectionLayout } from './SelectionLayout';
import KeyCodes from '../KeyCodes';
import {
  ISelection,
  ISelectionLayout,
  SelectionDirection,
  SelectionMode
} from './interfaces';

// Selection definitions:
//
// Anchor index: the point from which a range selection starts.
// Focus index: the point from which layout movement originates from.
//
// These two can differ. Tests:
//
// If you start at index 5
// Shift click to index 10
//    The focus is 10, the anchor is 5.
// If you shift click at index 0
//    The anchor remains at 5, the items between 0 and 5 are selected and everything else is cleared.
// If you click index 8
//    The anchor and focus are set to 8.

const SELECTION_INDEX_ATTRIBUTE_NAME = 'data-selection-index';
const SELECTION_TOGGLE_ATTRIBUTE_NAME = 'data-selection-toggle';
const SELECTALL_TOGGLE_ALL_ATTRIBUTE_NAME = 'data-selection-all-toggle';

export interface ISelectionZoneProps extends React.Props<SelectionZone> {
  selection: ISelection;
  layout?: ISelectionLayout;
  selectionMode: SelectionMode;
  isSelectedOnFocus?: boolean;
  onItemInvoked?: (item?: any, index?: number, ev?: Event) => void;
}

export default class SelectionZone extends React.Component<ISelectionZoneProps, any> {
  public static defaultProps = {
    layout: new SelectionLayout(SelectionDirection.vertical),
    isMultiSelectEnabled: true,
    isSelectedOnFocus: true
  };

  public refs: {
    [key: string]: React.ReactInstance,
    root: HTMLElement
  };

  private _events: EventGroup;

  private _isCtrlPressed: boolean;
  private _isShiftPressed: boolean;
  private _isMetaPressed: boolean;

  constructor() {
    super();

    this._events = new EventGroup(this);
  }

  public componentDidMount() {
    let element = this.refs.root;

    this._events.onAll(element, {
      'keydown': this._onKeyDown,
      'mousedown': this._onMouseDown
    });

    this._events.on(element, 'focus', this._onFocus, true);

    // Always know what the state of shift/ctrl/meta are.
    this._events.on(window, 'keydown', this._onKeyChangeCapture, true);
    this._events.on(window, 'keyup', this._onKeyChangeCapture, true);
  }

  public componentWillUnmount() {
    this._events.dispose();
  }

  public render() {
    return (
      <div
        className='ms-SelectionZone'
        ref='root'
        >
        {this.props.children }
      </div>
    );
  }

  private _onFocus(ev: FocusEvent) {
    let { selection } = this.props;
    let index = this._getIndexFromElement(ev.target as HTMLElement);

    if (index >= 0) {
      selection.setChangeEvents(false);

      if (this._isShiftPressed) {
        selection.setAllSelected(false);
        selection.selectToIndex(index);
      } else if (!this._isCtrlPressed && !this._isMetaPressed) {
        selection.setAllSelected(false);
        selection.setIndexSelected(index, true, true);
      }

      selection.setChangeEvents(true);
    }
  }

  private _onMouseDown(ev: MouseEvent) {
    let target = ev.target as HTMLElement;
    let { selection } = this.props;
    let isToggleElement = this._isToggleElement(target, SELECTION_TOGGLE_ATTRIBUTE_NAME);
    let isToggleAllElement = !isToggleElement && this._isToggleElement(target, SELECTALL_TOGGLE_ALL_ATTRIBUTE_NAME);
    let index = this._getIndexFromElement(target, true);

    if (isToggleElement) {
      selection.toggleIndexSelected(index);
    } else if (isToggleAllElement) {
      selection.toggleAllSelected();
    } else {
      return;
    }
  }

  private _onKeyChangeCapture(ev: KeyboardEvent) {
    this._isShiftPressed = ev.shiftKey;
    this._isCtrlPressed = ev.ctrlKey;
    this._isMetaPressed = ev.metaKey;
  }

  private _onKeyDown(ev: KeyboardEvent) {
    let target = ev.target as HTMLElement;
    let { selection, onItemInvoked } = this.props;
    let isToggleElement = this._isToggleElement(target, SELECTION_TOGGLE_ATTRIBUTE_NAME);
    let isToggleAllElement = !isToggleElement && this._isToggleElement(target, SELECTALL_TOGGLE_ALL_ATTRIBUTE_NAME);
    let index = this._getIndexFromElement(target, true);

    if (index >= 0 && !this._isInputElement(target)) {
      if (ev.which === KeyCodes.space) {
        if (isToggleAllElement) {
          selection.toggleAllSelected();
        } else {
          selection.toggleIndexSelected(index);
        }
      } else if (ev.which === KeyCodes.enter) {
        if (isToggleAllElement) {
          selection.toggleAllSelected();
        } else if (isToggleElement) {
          selection.toggleIndexSelected(index);
        } else if (this._getIndexFromElement(target) >= 0) {
          // if the target IS the item, and not a link inside, then call the invoke method.
          onItemInvoked(selection.getItems()[index], index, ev);
        } else {
          return;
        }
      } else if (ev.which === KeyCodes.a && (ev.ctrlKey || ev.metaKey)) {
        selection.setAllSelected(true);
      } else if (ev.which === KeyCodes.escape) {
        selection.setAllSelected(false);
      } else {
        return;
      }
    } else {
      return;
    }

    ev.preventDefault();
    ev.stopPropagation();
  }

  private _isToggleElement(element: HTMLElement, attributeName: string) {
    let isToggle = false;

    while (!isToggle && element !== this.refs.root) {
      isToggle = element.getAttribute(attributeName) === 'true';
      element = element.parentElement;
    }

    return isToggle;
  }

  private _isInputElement(element: HTMLElement) {
    return element.tagName === 'INPUT' || element.tagName === 'TEXTAREA';
  }

  private _getIndexFromElement(element: HTMLElement, traverseParents?: boolean): number {
    let index = -1;

    do {
      let indexString = element.getAttribute(SELECTION_INDEX_ATTRIBUTE_NAME);

      if (indexString) {
          index = Number(indexString);
          break;
      }
      element = element.parentElement;
    } while (traverseParents && element !== this.refs.root);

    return index;
  }

}
