import * as React from 'react';
import {
  BaseComponent,
  KeyCodes,
  elementContains,
  getNativeProps,
  divProperties,
  getFirstTabbable,
  getLastTabbable,
  getNextElement,
  focusAsync
} from '../../Utilities';
import { IFocusTrapZone, IFocusTrapZoneProps } from './FocusTrapZone.types';

export class FocusTrapZone extends BaseComponent<IFocusTrapZoneProps, {}> implements IFocusTrapZone {
  private static _focusStack: FocusTrapZone[] = [];

  private _root = React.createRef<HTMLDivElement>();
  private _previouslyFocusedElementOutsideTrapZone: HTMLElement;
  private _previouslyFocusedElementInTrapZone?: HTMLElement;
  private _hasFocusHandler: boolean;
  private _hasClickHandler: boolean;

  public componentDidMount(): void {
    this._bringFocusIntoZone();
    this._updateEventHandlers(this.props);
  }

  public componentWillReceiveProps(nextProps: IFocusTrapZoneProps): void {
    const { elementToFocusOnDismiss } = nextProps;
    if (elementToFocusOnDismiss && this._previouslyFocusedElementOutsideTrapZone !== elementToFocusOnDismiss) {
      this._previouslyFocusedElementOutsideTrapZone = elementToFocusOnDismiss;
    }

    this._updateEventHandlers(nextProps);
  }

  public componentDidUpdate(prevProps: IFocusTrapZoneProps) {
    const prevForceFocusInsideTrap = prevProps.forceFocusInsideTrap !== undefined ? prevProps.forceFocusInsideTrap : true;
    const newForceFocusInsideTrap = this.props.forceFocusInsideTrap !== undefined ? this.props.forceFocusInsideTrap : true;

    if (!prevForceFocusInsideTrap && newForceFocusInsideTrap) {
      // Transition from forceFocusInsideTrap disabled to enabled. Emulate what happens when a FocusTrapZone gets mounted
      this._bringFocusIntoZone();
    } else if (prevForceFocusInsideTrap && !newForceFocusInsideTrap) {
      // Transition from forceFocusInsideTrap enabled to disabled. Emulate what happens when a FocusTrapZone gets unmounted
      this._returnFocusToInitiator();
    }
  }

  public componentWillUnmount(): void {
    this._events.dispose();
    this._returnFocusToInitiator();
  }

  public render(): JSX.Element {
    const { className, ariaLabelledBy } = this.props;
    const divProps = getNativeProps(this.props, divProperties);

    return (
      <div
        {...divProps}
        className={className}
        ref={this._root}
        aria-labelledby={ariaLabelledBy}
        onKeyDown={this._onKeyboardHandler}
        onFocusCapture={this._onFocusCapture}
      >
        {this.props.children}
      </div>
    );
  }

  public focus() {
    const { focusPreviouslyFocusedInnerElement, firstFocusableSelector } = this.props;

    if (
      focusPreviouslyFocusedInnerElement &&
      this._previouslyFocusedElementInTrapZone &&
      elementContains(this._root.current, this._previouslyFocusedElementInTrapZone)
    ) {
      // focus on the last item that had focus in the zone before we left the zone
      focusAsync(this._previouslyFocusedElementInTrapZone);
      return;
    }

    const focusSelector =
      typeof firstFocusableSelector === 'string' ? firstFocusableSelector : firstFocusableSelector && firstFocusableSelector();

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

  private _bringFocusIntoZone(): void {
    const { elementToFocusOnDismiss, disableFirstFocus = false } = this.props;

    FocusTrapZone._focusStack.push(this);

    this._previouslyFocusedElementOutsideTrapZone = elementToFocusOnDismiss
      ? elementToFocusOnDismiss
      : (document.activeElement as HTMLElement);
    if (!elementContains(this._root.current, this._previouslyFocusedElementOutsideTrapZone) && !disableFirstFocus) {
      this.focus();
    }
  }

  private _returnFocusToInitiator(): void {
    const { ignoreExternalFocusing } = this.props;

    FocusTrapZone._focusStack = FocusTrapZone._focusStack.filter((value: FocusTrapZone) => {
      return this !== value;
    });

    const activeElement = document.activeElement as HTMLElement;
    if (
      !ignoreExternalFocusing &&
      this._previouslyFocusedElementOutsideTrapZone &&
      typeof this._previouslyFocusedElementOutsideTrapZone.focus === 'function' &&
      (elementContains(this._root.current, activeElement) || activeElement === document.body)
    ) {
      focusAsync(this._previouslyFocusedElementOutsideTrapZone);
    }
  }

  private _updateEventHandlers(newProps: IFocusTrapZoneProps): void {
    const { isClickableOutsideFocusTrap = false, forceFocusInsideTrap = true } = newProps;

    if (forceFocusInsideTrap && !this._hasFocusHandler) {
      this._events.on(window, 'focus', this._forceFocusInTrap, true);
    } else if (!forceFocusInsideTrap && this._hasFocusHandler) {
      this._events.off(window, 'focus', this._forceFocusInTrap, true);
    }
    this._hasFocusHandler = forceFocusInsideTrap;

    if (!isClickableOutsideFocusTrap && !this._hasClickHandler) {
      this._events.on(window, 'click', this._forceClickInTrap, true);
    } else if (isClickableOutsideFocusTrap && this._hasClickHandler) {
      this._events.off(window, 'click', this._forceClickInTrap, true);
    }
    this._hasClickHandler = !isClickableOutsideFocusTrap;
  }

  private _onFocusCapture = (ev: React.FocusEvent<HTMLDivElement>) => {
    if (this.props.onFocusCapture) {
      this.props.onFocusCapture(ev);
    }
    if (ev.target !== ev.currentTarget) {
      // every time focus changes within the trap zone, remember the focused element so that
      // it can be restored if focus leaves the pane and returns via keystroke (i.e. via a call to this.focus(true))
      this._previouslyFocusedElementInTrapZone = ev.target as HTMLElement;
    }
  };

  private _onKeyboardHandler = (ev: React.KeyboardEvent<HTMLDivElement>): void => {
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

    const _firstTabbableChild = getFirstTabbable(this._root.current, this._root.current.firstChild as HTMLElement, true);
    const _lastTabbableChild = getLastTabbable(this._root.current, this._root.current.lastChild as HTMLElement, true);

    if (ev.shiftKey && _firstTabbableChild === ev.target) {
      focusAsync(_lastTabbableChild);
      ev.preventDefault();
      ev.stopPropagation();
    } else if (!ev.shiftKey && _lastTabbableChild === ev.target) {
      focusAsync(_firstTabbableChild);
      ev.preventDefault();
      ev.stopPropagation();
    }
  };

  private _forceFocusInTrap(ev: FocusEvent): void {
    if (FocusTrapZone._focusStack.length && this === FocusTrapZone._focusStack[FocusTrapZone._focusStack.length - 1]) {
      const focusedElement = (ev.relatedTarget as HTMLElement) || (document.activeElement as HTMLElement);

      if (!elementContains(this._root.current, focusedElement)) {
        this.focus();
        ev.preventDefault();
        ev.stopPropagation();
      }
    }
  }

  private _forceClickInTrap(ev: MouseEvent): void {
    if (FocusTrapZone._focusStack.length && this === FocusTrapZone._focusStack[FocusTrapZone._focusStack.length - 1]) {
      const clickedElement = ev.target as HTMLElement;

      if (clickedElement && !elementContains(this._root.current, clickedElement)) {
        this.focus();
        ev.preventDefault();
        ev.stopPropagation();
      }
    }
  }
}
