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

  constructor() {
    super();

    this._events = new EventGroup(this);
  }

  public componentDidMount() {
    let element = this.refs.root;

    this._events.onAll(element, {
      'click': this._onClick,
      'keydown': this._onKeyDown
    });

    this._events.on(element, 'focus', this._onFocus, true);
    this._events.on(element, 'blur', this._onBlur, true);
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
    this.props.selection.setIsFocusActive(true);

    let index = this._getIndexFromElement(ev.target as HTMLElement);

    if (index >= 0) {
      this.props.selection.setIndexFocused(index);
    }
  }

  private _onBlur(ev: FocusEvent) {
    if (!this.refs.root.contains(ev.relatedTarget as Node)) {
      this.props.selection.setIsFocusActive(false);
    }
  }

  private _onKeyDown(ev: KeyboardEvent) {
    let {
      selection,
      layout,
      selectionMode,
      isSelectedOnFocus,
      onItemInvoked
    } = this.props;

    let items = selection.getItems();
    let eventTarget = ev.target as HTMLElement;
    let isInput = this._isInputElement(eventTarget);

    // Ignore selection events if originating from INPUT elements or TEXTAREAs.
    if (isInput) {
      return true;
    }

    let focusIndex = selection.getFocusedIndex();
    let indexToSelect = -1;
    let isShiftPressed = !!ev.shiftKey;
    let isMetaPressed = !!ev.metaKey;
    let isCtrlPressed = !!ev.ctrlKey;
    let isHandled = true;

    switch (ev.which) {
      case KeyCodes.up:
        indexToSelect = layout.getItemIndexAbove(focusIndex, items);
        isHandled = indexToSelect !== focusIndex;
        break;

      case KeyCodes.down:
        indexToSelect = layout.getItemIndexBelow(focusIndex, items);
        isHandled = indexToSelect !== focusIndex;
        break;

      case KeyCodes.left:
        indexToSelect = layout.getItemIndexLeft(focusIndex, items);
        isHandled = indexToSelect !== focusIndex;
        break;

      case KeyCodes.right:
        indexToSelect = layout.getItemIndexRight(focusIndex, items);
        isHandled = indexToSelect !== focusIndex;
        break;

      case KeyCodes.home:
        indexToSelect = 0;
        break;

      case KeyCodes.end:
        indexToSelect = selection.getItems().length - 1;
        break;

      case KeyCodes.space:
        selection.toggleIndexSelected(focusIndex);
        ev.stopPropagation();
        ev.preventDefault();
        break;

      case KeyCodes.escape:
        if (selection.getSelectedCount() > 0) {
          selection.setAllSelected(false);
          ev.stopPropagation();
          ev.preventDefault();
        }
        return;

      case KeyCodes.enter:
        if (onItemInvoked) {
          onItemInvoked(items[focusIndex], focusIndex, ev);
          return;
        }
        break;

      case KeyCodes.a:
        if (selectionMode === SelectionMode.multiple && (isCtrlPressed || isMetaPressed)) {
          selection.setAllSelected(true);
          ev.stopPropagation();
          ev.preventDefault();
        }
        return;

      default:
        // Do nothing. Let the event bubble.
        return;
    }

    if (isHandled) {
      selection.setChangeEvents(false);

      if (indexToSelect >= 0 && indexToSelect !== focusIndex) {
        if (selectionMode === SelectionMode.none) {
          selection.setIndexFocused(indexToSelect);
        } else if (isShiftPressed && selectionMode === SelectionMode.multiple) {
          if (!isCtrlPressed && !isMetaPressed) {
            selection.setAllSelected(false);
          }
          selection.selectToIndex(indexToSelect);
        } else if (isCtrlPressed || isMetaPressed) {
          selection.setIndexSelected(indexToSelect, selection.isIndexSelected(indexToSelect), true, true);
        } else {
          if (isSelectedOnFocus) {
            selection.setAllSelected(false);
            selection.setIndexSelected(indexToSelect, true, true, true);
          } else {
            selection.setIndexFocused(indexToSelect);
          }
        }
      }

      selection.setChangeEvents(true);
    }

    // If we didn't return early, it means we handled the event so we cancel it.
    return !isHandled;
  }

  private _onClick(ev: MouseEvent) {
    let { selection, selectionMode } = this.props;

    if (selectionMode === SelectionMode.none) {
      return;
    }

    let target = ev.target as HTMLElement;
    let index = this._getIndexFromElement(target);
    let isToggleElement = this._isToggleElement(target, SELECTION_TOGGLE_ATTRIBUTE_NAME);
    let isToggleAllElement = !isToggleElement && this._isToggleElement(target, SELECTALL_TOGGLE_ALL_ATTRIBUTE_NAME);

    if (index >= 0 || isToggleAllElement) {
      let isShiftPressed = !!ev.shiftKey;
      let isMetaPressed = !!ev.metaKey;
      let isCtrlPressed = !!ev.ctrlKey;

      selection.setChangeEvents(false);

      if (isShiftPressed && selectionMode === SelectionMode.multiple) {
        if (!isCtrlPressed) {
          selection.setAllSelected(false);
        }
        selection.selectToIndex(index);
      } else if (isCtrlPressed || isMetaPressed) {
        selection.setIndexSelected(index, true, true, true);
      } else if (isToggleElement) {
        selection.toggleIndexSelected(index);
      } else if (isToggleAllElement) {
        selection.toggleAllSelected();
      } else {
        if (!selection.isIndexSelected(index) || selection.getSelectedCount() > 1) {
          selection.setAllSelected(false);
          selection.setIndexSelected(index, true, true, true);
        }
      }

      selection.setChangeEvents(true);
    }
  }

  private _isToggleElement(element: HTMLElement, attributeName: string) {
    let isToggle = false;

    while (!isToggle && element !== document.body) {
      isToggle = element.getAttribute(attributeName) === 'true';
      element = element.parentElement;
    }

    return isToggle;
  }

  private _isInputElement(element: HTMLElement) {
    return element.tagName === 'INPUT' || element.tagName === 'TEXTAREA';
  }

  private _getIndexFromElement(element: HTMLElement): number {
    let index = -1;

    while (index === -1 && element !== document.body) {
      let indexString = element.getAttribute(SELECTION_INDEX_ATTRIBUTE_NAME);

      if (!indexString) {
        element = element.parentElement;
      } else {
        index = Number(indexString);
      }
    }

    return index;
  }

}
