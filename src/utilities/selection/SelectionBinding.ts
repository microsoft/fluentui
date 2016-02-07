import EventGroup from '../eventGroup/EventGroup';
import ISelection from './ISelection';
import ISelectionLayout from './ISelectionLayout';
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

export default class SelectionBinding {
  private _element: HTMLElement;
  private _events: EventGroup;
  private _selection: ISelection;
  private _layout: ISelectionLayout;
  private _isMultiSelectEnabled: boolean;
  private _isSelectedOnFocus: boolean;
  private _onIsActiveChanged: (isActiveChanged: boolean) => void;

  constructor(
    element: HTMLElement,
    selection: ISelection,
    layout: ISelectionLayout,
    isMultiSelectEnabled: boolean,
    isSelectedOnFocus: boolean,
    onIsActiveChanged?: (isActive: boolean) => void) {

    this._element = element;
    this._events = new EventGroup(this);
    this._selection = selection;
    this._layout = layout;
    this._isMultiSelectEnabled = isMultiSelectEnabled;
    this._onIsActiveChanged = onIsActiveChanged;
    this._isSelectedOnFocus = isSelectedOnFocus;

    this._events.onAll(element, {
      'click': this._onClick,
      'keydown': this._onKeyDown
    });

    this._events.on(element, 'focus', this._onFocus, true);
    this._events.on(element, 'blur', this._onBlur, true);
  }

  public dispose() {
    this._events.dispose();
  }

  private _onFocus() {
    if (this._onIsActiveChanged) {
      this._onIsActiveChanged(true);
    }
  }

  private _onBlur() {
    if (this._onIsActiveChanged) {
      this._onIsActiveChanged(false);
    }
  }

  private _onKeyDown(ev: KeyboardEvent) {
    let eventTarget = <HTMLElement>ev.target;
    let isInput = this._isInputElement(eventTarget);

    // Ignore selection events if originating from INPUT elements or TEXTAREAs.
    if (isInput) {
      return true;
    }

    let selection = this._selection;
    let layout = this._layout;
    let focusIndex = selection.getFocusedIndex();
    let indexToSelect = -1;
    let isShiftPressed = !!ev.shiftKey;
    let isMetaPressed = !!ev.metaKey;
    let isCtrlPressed = !!ev.ctrlKey;
    let isHandled = true;

    switch (ev.which) {
      case KeyCodes.up:
        indexToSelect = layout.getItemIndexAbove(focusIndex);
        isHandled = indexToSelect !== focusIndex;
        break;

      case KeyCodes.down:
        indexToSelect = layout.getItemIndexBelow(focusIndex);
        isHandled = indexToSelect !== focusIndex;
        break;

      case KeyCodes.left:
        indexToSelect = layout.getItemIndexLeft(focusIndex);
        isHandled = indexToSelect !== focusIndex;
        break;

      case KeyCodes.right:
        indexToSelect = layout.getItemIndexRight(focusIndex);
        isHandled = indexToSelect !== focusIndex;
        break;

      case KeyCodes.home:
        indexToSelect = 0;
        break;

      case KeyCodes.end:
        indexToSelect = selection.getItems().length - 1;
        break;

      case KeyCodes.space:
        if (this._isButtonElement(eventTarget)) {
          return true;
        }

        selection.toggleIndexSelected(focusIndex);
        break;

      case KeyCodes.enter:
        if (this._isButtonElement(eventTarget) || !this._element.contains(eventTarget)) {
          return true;
        }
        selection.setAllSelected(false);
        selection.setIndexSelected(focusIndex, true, true, true);

        return;
      // return selection.invokeFocusedItem(ev);

      case KeyCodes.escape:
        if (selection.getSelectedCount() > 0) {
          ev.stopPropagation();
          ev.preventDefault();
          selection.setAllSelected(false);
        }
        return;

      case KeyCodes.a:
        if (isCtrlPressed || isMetaPressed) {
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
      // transaction(() => {
      if (indexToSelect >= 0 && indexToSelect !== focusIndex) {
        if (isShiftPressed && this._isMultiSelectEnabled) {
          if (!isCtrlPressed && !isMetaPressed) {
            selection.setAllSelected(false);
          }
          selection.selectToIndex(indexToSelect);
        } else if (isCtrlPressed || isMetaPressed) {
          // selection.setIndexFocus(indexToSelect);
          selection.setIndexSelected(indexToSelect, selection.isIndexSelected(indexToSelect), true, true);
        } else {
          if (this._isSelectedOnFocus) {
            selection.setAllSelected(false);
            selection.setIndexSelected(indexToSelect, true, true, true);
          } else {
            selection.setIndexFocused(indexToSelect);
          }
        }
      }
      // });
    }

    // If we didn't return early, it means we handled the event so we cancel it.
    return !isHandled;
  }

  private _onClick(ev: MouseEvent) {
    let target = ev.target as HTMLElement;
    let key = this._getKeyFromElement(target);

    if (key) {
      let selection = this._selection;
      let isShiftPressed = !!ev.shiftKey;
      let isMetaPressed = !!ev.metaKey;
      let isCtrlPressed = !!ev.ctrlKey;
      let isToggleElement = this._isToggleElement(target);

      // transaction(() => {
      if (isShiftPressed && this._isMultiSelectEnabled) {
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
      // });

      // ev.stopPropagation();
      // ev.preventDefault();
    }
  }

  private _isToggleElement(element: HTMLElement) {
    let isToggle = false;

    while (!isToggle && element !== document.body) {
      isToggle = element.getAttribute('data-selection-toggle') === 'true';
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

    return element ? element.getAttribute('data-selection-key') : null;
  }

  private _getSelectionElement(element: HTMLElement): HTMLElement {
    let key;

    while (!key && element) {
      key = element.getAttribute('data-selection-key');

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
