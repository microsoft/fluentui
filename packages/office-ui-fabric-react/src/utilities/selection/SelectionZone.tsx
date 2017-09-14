import * as React from 'react';
import {
  BaseComponent,
  KeyCodes,
  autobind,
  elementContains,
  findScrollableParent,
  getParent,
  getDocument,
  getWindow,
  isElementTabbable
} from '../../Utilities';
import { SelectionLayout } from './SelectionLayout';
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

const SELECTION_DISABLED_ATTRIBUTE_NAME = 'data-selection-disabled';
const SELECTION_INDEX_ATTRIBUTE_NAME = 'data-selection-index';
const SELECTION_TOGGLE_ATTRIBUTE_NAME = 'data-selection-toggle';
const SELECTION_INVOKE_ATTRIBUTE_NAME = 'data-selection-invoke';
const SELECTALL_TOGGLE_ALL_ATTRIBUTE_NAME = 'data-selection-all-toggle';

export interface ISelectionZoneProps extends React.Props<SelectionZone> {
  componentRef?: () => void;
  selection: ISelection;
  layout?: ISelectionLayout;
  selectionMode?: SelectionMode;
  selectionPreservedOnEmptyClick?: boolean;
  isSelectedOnFocus?: boolean;
  onItemInvoked?: (item?: any, index?: number, ev?: Event) => void;
  onItemContextMenu?: (item?: any, index?: number, ev?: Event) => void | boolean;
}

export class SelectionZone extends BaseComponent<ISelectionZoneProps, {}> {
  public static defaultProps = {
    layout: new SelectionLayout(SelectionDirection.vertical),
    isMultiSelectEnabled: true,
    isSelectedOnFocus: true,
    selectionMode: SelectionMode.multiple
  };

  public refs: {
    [key: string]: React.ReactInstance,
    root: HTMLElement
  };

  private _isCtrlPressed: boolean;
  private _isShiftPressed: boolean;
  private _isMetaPressed: boolean;
  private _shouldHandleFocus: boolean;
  private _shouldHandleFocusTimeoutId: number | undefined;

  public componentDidMount() {
    let win = getWindow(this.refs.root);
    let scrollElement = findScrollableParent(this.refs.root);

    // Track the latest modifier keys globally.
    this._events.on(win, 'keydown, keyup', this._updateModifiers, true);
    this._events.on(scrollElement, 'click', this._tryClearOnEmptyClick);
  }

  public render() {
    return (
      <div
        className='ms-SelectionZone'
        ref='root'
        onKeyDown={ this._onKeyDown }
        onMouseDown={ this._onMouseDown }
        onKeyDownCapture={ this._onKeyDownCapture }
        onClick={ this._onClick }
        role='presentation'

        onDoubleClick={ this._onDoubleClick }
        onContextMenu={ this._onContextMenu }
        { ...{
          onMouseDownCapture: this._onMouseDownCapture,
          onFocusCapture: this._onFocus
        } }
      >
        { this.props.children }
      </div>
    );
  }

  /**
   * In some cases, the consuming scenario requires to set focus on a row without having SelectionZone
   * react to the event. Note that focus events in IE <= 11 will occur asynchronously after .focus() has
   * been called on an element, so we need a flag to store the idea that we will bypass the "next"
   * focus event that occurs. This method does that.
   */
  @autobind
  public ignoreNextFocus() {
    this._handleNextFocus(false);
  }

  @autobind
  private _onMouseDownCapture(ev: any) {
    if (document.activeElement !== ev.target && !elementContains(document.activeElement as HTMLElement, ev.target)) {
      this.ignoreNextFocus();
    }
  }

  /**
   * When we focus an item, for single/multi select scenarios, we should try to select it immediately
   * as long as the focus did not originate from a mouse down/touch event. For those cases, we handle them
   * specially.
   */
  @autobind
  private _onFocus(ev: React.FocusEvent<HTMLElement>) {
    let target = ev.target as HTMLElement;
    let { selection } = this.props;
    let isToggleModifierPressed = this._isCtrlPressed || this._isMetaPressed;

    const selectionMode = this._getSelectionMode();

    if (this._shouldHandleFocus && selectionMode !== SelectionMode.none) {
      let isToggle = this._hasAttribute(target, SELECTION_TOGGLE_ATTRIBUTE_NAME);
      let itemRoot = this._findItemRoot(target);

      if (!isToggle && itemRoot) {
        let index = this._getItemIndex(itemRoot);

        if (isToggleModifierPressed) {
          // set anchor only.
          selection.setIndexSelected(index, selection.isIndexSelected(index), true);
        } else {
          if (this.props.isSelectedOnFocus) {
            this._onItemSurfaceClick(ev, index);
          }
        }
      }
    }

    this._handleNextFocus(false);
  }

  @autobind
  private _onMouseDown(ev: React.MouseEvent<HTMLElement>) {
    this._updateModifiers(ev);

    let target = ev.target as HTMLElement;
    let itemRoot = this._findItemRoot(target);

    while (target !== this.refs.root) {
      if (this._hasAttribute(target, SELECTALL_TOGGLE_ALL_ATTRIBUTE_NAME)) {
        break;
      } else if (itemRoot) {
        if (this._hasAttribute(target, SELECTION_TOGGLE_ATTRIBUTE_NAME)) {
          break;
        } else if (this._hasAttribute(target, SELECTION_INVOKE_ATTRIBUTE_NAME)) {
          this._onInvokeMouseDown(ev, this._getItemIndex(itemRoot));
          break;
        } else if (target === itemRoot) {
          break;
        }
      }

      target = getParent(target) as HTMLElement;
    }
  }

  @autobind
  private _onClick(ev: React.MouseEvent<HTMLElement>) {
    this._updateModifiers(ev);

    let target = ev.target as HTMLElement;
    let itemRoot = this._findItemRoot(target);

    // No-op if selection is disabled
    if (this._isSelectionDisabled(target)) {
      return;
    }

    while (target !== this.refs.root) {
      if (this._hasAttribute(target, SELECTALL_TOGGLE_ALL_ATTRIBUTE_NAME)) {
        this._onToggleAllClick(ev);
        break;
      } else if (itemRoot) {
        let index = this._getItemIndex(itemRoot);

        if (this._hasAttribute(target, SELECTION_TOGGLE_ATTRIBUTE_NAME)) {
          if (this._isShiftPressed) {
            this._onItemSurfaceClick(ev, index);
          } else {
            this._onToggleClick(ev, index);
          }
          break;
        } else if (this._hasAttribute(target, SELECTION_INVOKE_ATTRIBUTE_NAME)) {
          this._onInvokeClick(ev, index);
          break;
        } else if (target === itemRoot) {
          this._onItemSurfaceClick(ev, index);
          break;
        }
      }

      target = getParent(target) as HTMLElement;
    }
  }

  @autobind
  private _onContextMenu(ev: React.MouseEvent<HTMLElement>) {
    const target = ev.target as HTMLElement;

    const { onItemContextMenu, selection } = this.props;
    if (onItemContextMenu) {
      const itemRoot = this._findItemRoot(target);

      if (itemRoot) {
        const index = this._getItemIndex(itemRoot);
        const skipPreventDefault = onItemContextMenu(selection.getItems()[index], index, ev.nativeEvent);

        // In order to keep back compat, if the value here is undefined, then we should still
        // call preventDefault(). Only in the case where true is explicitly returned should
        // the call be skipped.
        if (skipPreventDefault) {
          ev.preventDefault();
        }
      }
    }
  }

  private _isSelectionDisabled(target: HTMLElement): boolean {
    while (target !== this.refs.root) {
      if (this._hasAttribute(target, SELECTION_DISABLED_ATTRIBUTE_NAME)) {
        return true;
      }
      target = getParent(target) as HTMLElement;
    }

    return false;
  }

  /**
   * In multi selection, if you double click within an item's root (but not within the invoke element or input elements),
   * we should execute the invoke handler.
   */
  @autobind
  private _onDoubleClick(ev: React.MouseEvent<HTMLElement>) {
    let target = ev.target as HTMLElement;

    if (this._isSelectionDisabled(target)) {
      return;
    }

    let { onItemInvoked } = this.props;
    let itemRoot = this._findItemRoot(target);

    const selectionMode = this._getSelectionMode();

    if (itemRoot && onItemInvoked && selectionMode !== SelectionMode.none && !this._isInputElement(target)) {
      let index = this._getItemIndex(itemRoot);

      while (target !== this.refs.root) {
        if (
          this._hasAttribute(target, SELECTION_TOGGLE_ATTRIBUTE_NAME) ||
          this._hasAttribute(target, SELECTION_INVOKE_ATTRIBUTE_NAME)) {
          break;
        } else if (target === itemRoot) {
          this._onInvokeClick(ev, index);
          break;
        }

        target = getParent(target) as HTMLElement;
      }

      target = getParent(target) as HTMLElement;
    }
  }

  @autobind
  private _onKeyDownCapture(ev: React.KeyboardEvent<HTMLElement>) {
    this._updateModifiers(ev);

    this._handleNextFocus(true);
  }

  @autobind
  private _onKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    this._updateModifiers(ev);

    let target = ev.target as HTMLElement;

    if (this._isSelectionDisabled(target)) {
      return;
    }

    let { selection } = this.props;
    let isSelectAllKey = ev.which === KeyCodes.a && (this._isCtrlPressed || this._isMetaPressed);
    let isClearSelectionKey = ev.which === KeyCodes.escape;

    // Ignore key downs from input elements.
    if (this._isInputElement(target)) {
      // A key was pressed while an item in this zone was focused.
      return;
    }

    const selectionMode = this._getSelectionMode();

    // If ctrl-a is pressed, select all (if all are not already selected.)
    if (isSelectAllKey && selectionMode === SelectionMode.multiple && !selection.isAllSelected()) {
      selection.setAllSelected(true);
      ev.stopPropagation();
      ev.preventDefault();
      return;
    }

    // If escape is pressed, clear selection (if any are selected.)
    if (isClearSelectionKey && selection.getSelectedCount() > 0) {
      selection.setAllSelected(false);
      ev.stopPropagation();
      ev.preventDefault();
      return;
    }

    let itemRoot = this._findItemRoot(target);

    // If a key was pressed within an item, we should treat "enters" as invokes and "space" as toggle
    if (itemRoot) {
      let index = this._getItemIndex(itemRoot);

      while (target !== this.refs.root) {
        if (this._hasAttribute(target, SELECTION_TOGGLE_ATTRIBUTE_NAME)) {
          // For toggle elements, assuming they are rendered as buttons, they will generate a click event,
          // so we can no-op for any keydowns in this case.
          break;
        } else if ((ev.which === KeyCodes.enter || ev.which === KeyCodes.space) &&
          (target.tagName === 'BUTTON' || target.tagName === 'A' || target.tagName === 'INPUT')) {
          return false;
        } else if (target === itemRoot) {
          if (ev.which === KeyCodes.enter) {
            this._onInvokeClick(ev, index);
            ev.preventDefault();
            return;
          } else if (ev.which === KeyCodes.space) {
            this._onToggleClick(ev, index);
            ev.preventDefault();
            return;
          }
          break;
        }

        target = getParent(target) as HTMLElement;
      }
    }
  }

  private _onToggleAllClick(ev: React.MouseEvent<HTMLElement>) {
    let { selection } = this.props;

    const selectionMode = this._getSelectionMode();

    if (selectionMode === SelectionMode.multiple) {
      selection.toggleAllSelected();
      ev.stopPropagation();
      ev.preventDefault();
    }
  }

  private _onToggleClick(ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, index: number) {
    let { selection } = this.props;

    const selectionMode = this._getSelectionMode();

    if (selectionMode === SelectionMode.multiple) {
      selection.toggleIndexSelected(index);
    } else if (selectionMode === SelectionMode.single) {
      let isSelected = selection.isIndexSelected(index);
      selection.setChangeEvents(false);
      selection.setAllSelected(false);
      selection.setIndexSelected(index, !isSelected, true);
      selection.setChangeEvents(true);
    } else {
      return;
    }

    ev.stopPropagation();

    // NOTE: ev.preventDefault is not called for toggle clicks, because this will kill the browser behavior
    // for checkboxes if you use a checkbox for the toggle.
  }

  private _onInvokeClick(ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, index: number) {
    let { selection, onItemInvoked } = this.props;

    if (onItemInvoked) {
      onItemInvoked(selection.getItems()[index], index, ev.nativeEvent);
      ev.preventDefault();
      ev.stopPropagation();
    }
  }

  private _onItemSurfaceClick(ev: React.SyntheticEvent<HTMLElement>, index: number) {
    let { selection } = this.props;
    let isToggleModifierPressed = this._isCtrlPressed || this._isMetaPressed;

    const selectionMode = this._getSelectionMode();

    if (selectionMode === SelectionMode.multiple) {
      if (this._isShiftPressed) {
        selection.selectToIndex(index, !isToggleModifierPressed);
      } else if (isToggleModifierPressed) {
        selection.toggleIndexSelected(index);
      } else {
        this._clearAndSelectIndex(index);
      }
    } else if (selectionMode === SelectionMode.single) {
      this._clearAndSelectIndex(index);
    }
  }

  private _onInvokeMouseDown(ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, index: number) {
    let { selection } = this.props;

    // Only do work if item is not selected.
    if (selection.isIndexSelected(index)) {
      return;
    }

    this._clearAndSelectIndex(index);
  }

  private _tryClearOnEmptyClick(ev: MouseEvent) {
    if (
      !this.props.selectionPreservedOnEmptyClick &&
      this._isNonHandledClick(ev.target as HTMLElement)
    ) {
      this.props.selection.setAllSelected(false);
    }
  }

  private _clearAndSelectIndex(index: number) {
    let { selection } = this.props;
    let isAlreadySingleSelected = selection.getSelectedCount() === 1 && selection.isIndexSelected(index);

    if (!isAlreadySingleSelected) {
      selection.setChangeEvents(false);
      selection.setAllSelected(false);
      selection.setIndexSelected(index, true, true);
      selection.setChangeEvents(true);
    }
  }

  /**
   * We need to track the modifier key states so that when focus events occur, which do not contain
   * modifier states in the Event object, we know how to behave.
   */
  private _updateModifiers(ev: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>) {
    this._isShiftPressed = ev.shiftKey;
    this._isCtrlPressed = ev.ctrlKey;
    this._isMetaPressed = ev.metaKey;
  }

  private _findItemRoot(target: HTMLElement): HTMLElement | undefined {
    let { selection } = this.props;

    while (target !== this.refs.root) {
      let indexValue = target.getAttribute(SELECTION_INDEX_ATTRIBUTE_NAME);
      let index = Number(indexValue);

      if (indexValue !== null && index >= 0 && index < selection.getItems().length) {
        break;
      }

      target = getParent(target) as HTMLElement;
    }

    if (target === this.refs.root) {
      return undefined;
    }

    return target;
  }

  private _getItemIndex(itemRoot: HTMLElement): number {
    return Number(itemRoot.getAttribute(SELECTION_INDEX_ATTRIBUTE_NAME));
  }

  private _hasAttribute(element: HTMLElement, attributeName: string): boolean {
    let isToggle = false;

    while (!isToggle && element !== this.refs.root) {
      isToggle = element.getAttribute(attributeName) === 'true';
      element = getParent(element) as HTMLElement;
    }

    return isToggle;
  }

  private _isInputElement(element: HTMLElement): boolean {
    return element.tagName === 'INPUT' || element.tagName === 'TEXTAREA';
  }

  private _isNonHandledClick(element: HTMLElement): boolean {
    let doc = getDocument();

    if (doc && element) {
      while (element && element !== doc.documentElement) {
        if (isElementTabbable(element)) {
          return false;
        }

        element = getParent(element) as HTMLElement;
      }
    }

    return true;
  }

  private _handleNextFocus(handleFocus: boolean) {
    if (this._shouldHandleFocusTimeoutId) {
      this._async.clearTimeout(this._shouldHandleFocusTimeoutId);
      this._shouldHandleFocusTimeoutId = undefined;
    }

    this._shouldHandleFocus = handleFocus;

    if (handleFocus) {
      this._async.setTimeout(() => {
        this._shouldHandleFocus = false;
      }, 100);
    }
  }

  private _getSelectionMode(): SelectionMode {
    const {
      selection
    } = this.props;

    const {
      selectionMode = selection ? selection.mode : SelectionMode.none
    } = this.props;

    return selectionMode;
  }
}
