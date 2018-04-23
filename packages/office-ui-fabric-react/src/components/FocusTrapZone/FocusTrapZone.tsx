import * as React from 'react';
import {
  BaseComponent,
  KeyCodes,
  elementContains,
  getNativeProps,
  divProperties,
  getFirstFocusable,
  getLastTabbable,
  getNextElement,
  focusAsync,
  createRef
} from '../../Utilities';
import { IFocusTrapZone, IFocusTrapZoneProps } from './FocusTrapZone.types';

export class FocusTrapZone extends BaseComponent<IFocusTrapZoneProps, {}> implements IFocusTrapZone {

  private static _focusStack: FocusTrapZone[] = [];
  private static _clickStack: FocusTrapZone[] = [];

  private _root = createRef<HTMLDivElement>();
  private _previouslyFocusedElement: HTMLElement;
  private _isInFocusStack = false;
  private _isInClickStack = false;

  public componentWillMount(): void {
    const { isClickableOutsideFocusTrap = false, forceFocusInsideTrap = true } = this.props;
    if (forceFocusInsideTrap) {
      this._isInFocusStack = true;
      FocusTrapZone._focusStack.push(this);
    }
    if (!isClickableOutsideFocusTrap) {
      this._isInClickStack = true;
      FocusTrapZone._clickStack.push(this);
    }
  }

  public componentDidMount(): void {
    const { isClickableOutsideFocusTrap = false, forceFocusInsideTrap = true, elementToFocusOnDismiss, disableFirstFocus = false } = this.props;

    this._previouslyFocusedElement = elementToFocusOnDismiss ? elementToFocusOnDismiss : document.activeElement as HTMLElement;
    if (!elementContains(this._root.current, this._previouslyFocusedElement) && !disableFirstFocus) {
      this.focus();
    }

    if (forceFocusInsideTrap) {
      this._events.on(window, 'focus', this._forceFocusInTrap, true);
    }

    if (!isClickableOutsideFocusTrap) {
      this._events.on(window, 'click', this._forceClickInTrap, true);
    }
  }

  public componentWillReceiveProps(nextProps: IFocusTrapZoneProps): void {
    const { elementToFocusOnDismiss } = nextProps;
    if (elementToFocusOnDismiss && this._previouslyFocusedElement !== elementToFocusOnDismiss) {
      this._previouslyFocusedElement = elementToFocusOnDismiss;
    }
  }

  public componentWillUnmount(): void {
    const { ignoreExternalFocusing } = this.props;

    this._events.dispose();
    if (this._isInFocusStack || this._isInClickStack) {
      const filter = (value: FocusTrapZone) => {
        return this !== value;
      };
      if (this._isInFocusStack) {
        FocusTrapZone._focusStack = FocusTrapZone._focusStack.filter(filter);
      }
      if (this._isInClickStack) {
        FocusTrapZone._clickStack = FocusTrapZone._clickStack.filter(filter);
      }
    }

    const activeElement = document.activeElement as HTMLElement;
    if (!ignoreExternalFocusing &&
      this._previouslyFocusedElement &&
      typeof this._previouslyFocusedElement.focus === 'function' &&
      elementContains(this._root.value, activeElement)) {
      focusAsync(this._previouslyFocusedElement);
    }
  }

  public render(): JSX.Element {
    const { className, ariaLabelledBy } = this.props;
    const divProps = getNativeProps(this.props, divProperties);

    return (
      <div
        { ...divProps }
        className={ className }
        ref={ this._root }
        aria-labelledby={ ariaLabelledBy }
        onKeyDown={ this._onKeyboardHandler }
      >
        { this.props.children }
      </div>
    );
  }

  /**
   * Need to expose this method in case of popups since focus needs to be set when popup is opened
   */
  public focus() {
    const { firstFocusableSelector } = this.props;
    const focusSelector = typeof firstFocusableSelector === 'string'
      ? firstFocusableSelector
      : firstFocusableSelector && firstFocusableSelector();

    let _firstFocusableChild;

    if (this._root.current) {
      if (focusSelector) {
        _firstFocusableChild = this._root.current.querySelector('.' + focusSelector);
      } else {
        _firstFocusableChild = getNextElement(this._root.current, this._root.current.firstChild as HTMLElement, true, false, false, true);
      }
    }
    if (_firstFocusableChild) {
      focusAsync(_firstFocusableChild);
    }
  }

  private _onKeyboardHandler = (ev: React.KeyboardEvent<HTMLElement>): void => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(ev);
    }

    // If the default has been prevented, do not process keyboard events.
    if (ev.isDefaultPrevented()) {
      return;
    }

    if (ev.which !== KeyCodes.tab) {
      return;
    }

    if (!this._root.current) {
      return;
    }

    const _firstFocusableChild = getFirstFocusable(this._root.current, this._root.current.firstChild as HTMLElement, true);
    const _lastFocusableChild = getLastTabbable(this._root.current, this._root.current.lastChild as HTMLElement, true);

    if (ev.shiftKey && _firstFocusableChild === ev.target) {
      focusAsync(_lastFocusableChild);
      ev.preventDefault();
      ev.stopPropagation();
    } else if (!ev.shiftKey && _lastFocusableChild === ev.target) {
      focusAsync(_firstFocusableChild);
      ev.preventDefault();
      ev.stopPropagation();
    }
  }

  private _forceFocusInTrap(ev: FocusEvent): void {
    if (FocusTrapZone._focusStack.length && this === FocusTrapZone._focusStack[FocusTrapZone._focusStack.length - 1]) {
      const focusedElement = document.activeElement as HTMLElement;

      if (!elementContains(this._root.current, focusedElement)) {
        this.focus();
        ev.preventDefault();
        ev.stopPropagation();
      }
    }
  }

  private _forceClickInTrap(ev: MouseEvent): void {
    if (FocusTrapZone._clickStack.length && this === FocusTrapZone._clickStack[FocusTrapZone._clickStack.length - 1]) {
      const clickedElement = ev.target as HTMLElement;

      if (clickedElement && !elementContains(this._root.current, clickedElement)) {
        this.focus();
        ev.preventDefault();
        ev.stopPropagation();
      }
    }
  }
}
