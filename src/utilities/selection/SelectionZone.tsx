import * as React from 'react';
import EventGroup from '../eventGroup/EventGroup';
import { ISelection, SelectionMode } from './ISelection';
import ISelectionLayout from './ISelectionLayout';
import { default as SelectionLayout, SelectionDirection } from './SelectionLayout';
import KeyCodes from '../KeyCodes';

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

const SELECTION_KEY_ATTRIBUTE_NAME = 'data-selection-key';
const SELECTION_TOGGLE_ATTRIBUTE_NAME = 'data-selection-toggle';

export interface ISelectionZoneProps extends React.Props<SelectionZone> {
  selection: ISelection;
  layout?: ISelectionLayout;
  selectionMode: SelectionMode;
  isSelectedOnFocus?: boolean;
}

export default class SelectionZone extends React.Component<ISelectionZoneProps, any> {
  public static defaultProps = {
    layout: new SelectionLayout(SelectionDirection.vertical),
    isMultiSelectEnabled: true,
    isSelectedOnFocus: true
  };

  public refs: {
    [ key: string]: React.ReactInstance,
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

  private _onFocus() {
    /*
    if (this._onIsActiveChanged) {
      this._onIsActiveChanged(true);
    }
    */
  }

  private _onBlur() {
    /*
    if (this._onIsActiveChanged) {
      this._onIsActiveChanged(false);
    }
    */
  }

  private _onKeyDown(ev: KeyboardEvent) {
    let { selection, layout, selectionMode, isSelectedOnFocus } = this.props;

    let element = this.refs.root;
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
/*
      case KeyCodes.space:
        if (this._isButtonElement(eventTarget)) {
          return true;
        }

        selection.toggleIndexSelected(focusIndex, items);
        break;

      case KeyCodes.enter:
        if (this._isButtonElement(eventTarget) || !element.contains(eventTarget)) {
          return true;
        }
        selection.setAllSelected(false);
        selection.setIndexSelected(focusIndex, true, true, true);

        return;
      // return selection.invokeFocusedItem(ev);
*/

      case KeyCodes.escape:
        if (selection.getSelectedCount() > 0) {
          ev.stopPropagation();
          ev.preventDefault();
          selection.setAllSelected(false);
        }
        return;

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
          // selection.setIndexFocus(indexToSelect);
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
    let key = this._getKeyFromElement(target);

    if (key) {
      let isShiftPressed = !!ev.shiftKey;
      let isMetaPressed = !!ev.metaKey;
      let isCtrlPressed = !!ev.ctrlKey;
      let isToggleElement = this._isToggleElement(target);

      selection.setChangeEvents(false);

      if (isShiftPressed && selectionMode === SelectionMode.multiple) {
        if (!isCtrlPressed) {
          selection.setAllSelected(false);
        }
        selection.selectToKey(key);
      } else if (isCtrlPressed || isMetaPressed) {
        selection.setKeySelected(key, true, true, true);
      } else if (isToggleElement) {
        selection.toggleKeySelected(key);
      } else {
        if (!selection.isKeySelected(key) || selection.getSelectedCount() > 1) {
          selection.setAllSelected(false);
          selection.setKeySelected(key, true, true, true);
        }
      }

      selection.setChangeEvents(true);

      // ev.stopPropagation();
      // ev.preventDefault();
    }
  }

  private _isToggleElement(element: HTMLElement) {
    let isToggle = false;

    while (!isToggle && element !== document.body) {
      isToggle = element.getAttribute(SELECTION_TOGGLE_ATTRIBUTE_NAME) === 'true';
      element = element.parentElement;
    }

    return isToggle;
  }

  private _isInputElement(element: HTMLElement) {
    return element.tagName === 'INPUT' || element.tagName === 'TEXTAREA';
  }

  private _isButtonElement(element: HTMLElement) {
    return element.tagName === 'BUTTON';
  }

  private _getKeyFromElement(element: HTMLElement): string {
    element = this._getSelectionElement(element);

    return element ? element.getAttribute(SELECTION_KEY_ATTRIBUTE_NAME) : null;
  }

  private _getSelectionElement(element: HTMLElement): HTMLElement {
    let key;

    while (!key && element) {
      key = element.getAttribute(SELECTION_KEY_ATTRIBUTE_NAME);

      if (!key) {
        element = element.parentElement;
      }

      if (element === document.body) {
        element = null;
      }
    }

    return element;
  }
}
