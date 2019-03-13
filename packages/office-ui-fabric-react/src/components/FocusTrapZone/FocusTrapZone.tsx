import * as React from 'react';
import {
  BaseComponent,
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
  private _firstBumper = React.createRef<HTMLDivElement>();
  private _lastBumper = React.createRef<HTMLDivElement>();
  private _hasFocus: boolean = false;

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

    const bumperProps = {
      style: {
        pointerEvents: 'none',
        position: 'fixed' // 'fixed' prevents browsers from scrolling to bumpers when viewport does not contain them
      },
      tabIndex: 0,
      'aria-hidden': true,
      'data-is-visible': true
    } as React.HTMLAttributes<HTMLDivElement>;

    return (
      <div
        {...divProps}
        className={className}
        ref={this._root}
        aria-labelledby={ariaLabelledBy}
        onFocusCapture={this._onFocusCapture}
        onFocus={this._onRootFocus}
        onBlur={this._onRootBlur}
      >
        <div {...bumperProps} ref={this._firstBumper} onFocus={this._onFirstBumperFocus} />
        {this.props.children}
        <div {...bumperProps} ref={this._lastBumper} onFocus={this._onLastBumperFocus} />
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
      this._focusAsync(this._previouslyFocusedElementInTrapZone);
      return;
    }

    const focusSelector =
      typeof firstFocusableSelector === 'string' ? firstFocusableSelector : firstFocusableSelector && firstFocusableSelector();

    let _firstFocusableChild;

    if (this._root.current) {
      if (focusSelector) {
        _firstFocusableChild = this._root.current.querySelector('.' + focusSelector);
      }

      // Fall back to first element if query selector did not match any elements.
      if (!_firstFocusableChild) {
        _firstFocusableChild = getNextElement(this._root.current, this._root.current.firstChild as HTMLElement, false, false, false, true);
      }
    }
    if (_firstFocusableChild) {
      this._focusAsync(_firstFocusableChild);
    }
  }

  private _focusAsync(element: HTMLElement): void {
    if (!this._isBumper(element)) {
      focusAsync(element);
    }
  }

  private _onRootFocus = (ev: React.FocusEvent<HTMLDivElement>) => {
    this._hasFocus = true;
  };

  private _onRootBlur = (ev: React.FocusEvent<HTMLDivElement>) => {
    let relatedTarget = ev.relatedTarget;
    if (ev.relatedTarget === null) {
      // In IE11, due to lack of support, event.relatedTarget is always
      // null making every onBlur call to be "outside" of the ComboBox
      // even when it's not. Using document.activeElement is another way
      // for us to be able to get what the relatedTarget without relying
      // on the event
      relatedTarget = document.activeElement as Element;
    }

    if (!elementContains(this._root.current, relatedTarget as HTMLElement)) {
      this._hasFocus = false;
    }
  };

  private _onFirstBumperFocus = () => {
    this._onBumperFocus(true);
  };

  private _onLastBumperFocus = () => {
    this._onBumperFocus(false);
  };

  private _onBumperFocus = (isFirstBumper: boolean) => {
    const currentBumper = (isFirstBumper === this._hasFocus ? this._lastBumper.current : this._firstBumper.current) as HTMLElement;
    if (this._root.current) {
      const nextFocusable =
        isFirstBumper === this._hasFocus
          ? getLastTabbable(this._root.current, currentBumper, true, false)
          : getFirstTabbable(this._root.current, currentBumper, true, false);

      if (nextFocusable) {
        if (this._isBumper(nextFocusable)) {
          // This can happen when FTZ contains no tabbable elements. focus will take care of finding a focusable element in FTZ.
          this.focus();
        } else {
          nextFocusable.focus();
        }
      }
    }
  };

  private _bringFocusIntoZone(): void {
    const { elementToFocusOnDismiss, disableFirstFocus = false } = this.props;

    FocusTrapZone._focusStack.push(this);

    this._previouslyFocusedElementOutsideTrapZone = elementToFocusOnDismiss
      ? elementToFocusOnDismiss
      : (document.activeElement as HTMLElement);
    if (!disableFirstFocus && !elementContains(this._root.current, this._previouslyFocusedElementOutsideTrapZone)) {
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
      this._focusAsync(this._previouslyFocusedElementOutsideTrapZone);
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

    if (ev.target !== ev.currentTarget && !this._isBumper(ev.target)) {
      // every time focus changes within the trap zone, remember the focused element so that
      // it can be restored if focus leaves the pane and returns via keystroke (i.e. via a call to this.focus(true))
      this._previouslyFocusedElementInTrapZone = ev.target as HTMLElement;
    }
  };

  private _isBumper(element: HTMLElement): boolean {
    return element === this._firstBumper.current || element === this._lastBumper.current;
  }

  private _forceFocusInTrap(ev: FocusEvent): void {
    if (FocusTrapZone._focusStack.length && this === FocusTrapZone._focusStack[FocusTrapZone._focusStack.length - 1]) {
      const focusedElement = document.activeElement as HTMLElement;

      if (!elementContains(this._root.current, focusedElement)) {
        this.focus();
        this._hasFocus = true; // set focus here since we stop event propagation
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
        this._hasFocus = true; // set focus here since we stop event propagation
        ev.preventDefault();
        ev.stopPropagation();
      }
    }
  }
}
