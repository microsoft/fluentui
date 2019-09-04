import * as React from 'react';
import {
  elementContains,
  getNativeProps,
  divProperties,
  getFirstTabbable,
  getLastTabbable,
  getNextElement,
  getDocument,
  focusAsync,
  initializeComponentRef,
  on
} from '../../Utilities';
import { IFocusTrapZone, IFocusTrapZoneProps } from './FocusTrapZone.types';

export class FocusTrapZone extends React.Component<IFocusTrapZoneProps, {}> implements IFocusTrapZone {
  private static _focusStack: FocusTrapZone[] = [];

  private _root = React.createRef<HTMLDivElement>();
  private _firstBumper = React.createRef<HTMLDivElement>();
  private _lastBumper = React.createRef<HTMLDivElement>();
  private _hasFocus: boolean = false;

  private _previouslyFocusedElementOutsideTrapZone: HTMLElement;
  private _previouslyFocusedElementInTrapZone?: HTMLElement;
  private _disposeFocusHandler: (() => void) | undefined;
  private _disposeClickHandler: (() => void) | undefined;

  public constructor(props: IFocusTrapZoneProps) {
    super(props);
    initializeComponentRef(this);
  }

  public componentDidMount(): void {
    this._bringFocusIntoZone();
    this._updateEventHandlers(this.props);
  }

  // tslint:disable-next-line function-name
  public UNSAFE_componentWillReceiveProps(nextProps: IFocusTrapZoneProps): void {
    const { elementToFocusOnDismiss } = nextProps;
    if (elementToFocusOnDismiss && this._previouslyFocusedElementOutsideTrapZone !== elementToFocusOnDismiss) {
      this._previouslyFocusedElementOutsideTrapZone = elementToFocusOnDismiss;
    }

    this._updateEventHandlers(nextProps);
  }

  public componentDidUpdate(prevProps: IFocusTrapZoneProps) {
    const prevForceFocusInsideTrap = prevProps.forceFocusInsideTrap !== undefined ? prevProps.forceFocusInsideTrap : true;
    const newForceFocusInsideTrap = this.props.forceFocusInsideTrap !== undefined ? this.props.forceFocusInsideTrap : true;
    const prevDisabled = prevProps.disabled !== undefined ? prevProps.disabled : false;
    const newDisabled = this.props.disabled !== undefined ? this.props.disabled : false;

    if ((!prevForceFocusInsideTrap && newForceFocusInsideTrap) || (prevDisabled && !newDisabled)) {
      // Transition from forceFocusInsideTrap / FTZ disabled to enabled.
      // Emulate what happens when a FocusTrapZone gets mounted.
      this._bringFocusIntoZone();
    } else if ((prevForceFocusInsideTrap && !newForceFocusInsideTrap) || (!prevDisabled && newDisabled)) {
      // Transition from forceFocusInsideTrap / FTZ enabled to disabled.
      // Emulate what happens when a FocusTrapZone gets unmounted.
      this._returnFocusToInitiator();
    }
  }

  public componentWillUnmount(): void {
    // don't handle return focus unless forceFocusInsideTrap is true or focus is still within FocusTrapZone
    if (
      !this.props.disabled ||
      this.props.forceFocusInsideTrap ||
      !elementContains(this._root.current, this._getDocument().activeElement as HTMLElement)
    ) {
      this._returnFocusToInitiator();
    }
  }

  public render(): JSX.Element {
    const { className, disabled = false, ariaLabelledBy } = this.props;
    const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, divProperties);

    const bumperProps = {
      style: {
        pointerEvents: 'none',
        position: 'fixed' // 'fixed' prevents browsers from scrolling to bumpers when viewport does not contain them
      },
      tabIndex: disabled ? -1 : 0, // make bumpers tabbable only when enabled
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

    let _firstFocusableChild: HTMLElement | null = null;

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
    if (this.props.onFocus) {
      this.props.onFocus(ev);
    }

    this._hasFocus = true;
  };

  private _onRootBlur = (ev: React.FocusEvent<HTMLDivElement>) => {
    if (this.props.onBlur) {
      this.props.onBlur(ev);
    }

    let relatedTarget = ev.relatedTarget;
    if (ev.relatedTarget === null) {
      // In IE11, due to lack of support, event.relatedTarget is always
      // null making every onBlur call to be "outside" of the ComboBox
      // even when it's not. Using document.activeElement is another way
      // for us to be able to get what the relatedTarget without relying
      // on the event
      relatedTarget = this._getDocument().activeElement as Element;
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
    if (this.props.disabled) {
      return;
    }

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
    const { elementToFocusOnDismiss, disabled = false, disableFirstFocus = false } = this.props;

    if (disabled) {
      return;
    }

    FocusTrapZone._focusStack.push(this);

    this._previouslyFocusedElementOutsideTrapZone = elementToFocusOnDismiss
      ? elementToFocusOnDismiss
      : (this._getDocument().activeElement as HTMLElement);
    if (!disableFirstFocus && !elementContains(this._root.current, this._previouslyFocusedElementOutsideTrapZone)) {
      this.focus();
    }
  }

  private _returnFocusToInitiator(): void {
    const { ignoreExternalFocusing } = this.props;

    FocusTrapZone._focusStack = FocusTrapZone._focusStack.filter((value: FocusTrapZone) => {
      return this !== value;
    });

    const doc = this._getDocument();
    const activeElement = doc.activeElement as HTMLElement;
    if (
      !ignoreExternalFocusing &&
      this._previouslyFocusedElementOutsideTrapZone &&
      typeof this._previouslyFocusedElementOutsideTrapZone.focus === 'function' &&
      (elementContains(this._root.current, activeElement) || activeElement === doc.body)
    ) {
      this._focusAsync(this._previouslyFocusedElementOutsideTrapZone);
    }
  }

  private _updateEventHandlers(newProps: IFocusTrapZoneProps): void {
    const { isClickableOutsideFocusTrap = false, forceFocusInsideTrap = true } = newProps;

    if (forceFocusInsideTrap && !this._disposeFocusHandler) {
      this._disposeFocusHandler = on(window, 'focus', this._forceFocusInTrap, true);
    } else if (!forceFocusInsideTrap && this._disposeFocusHandler) {
      this._disposeFocusHandler();
      this._disposeFocusHandler = undefined;
    }

    if (!isClickableOutsideFocusTrap && !this._disposeClickHandler) {
      this._disposeClickHandler = on(window, 'click', this._forceClickInTrap, true);
    } else if (isClickableOutsideFocusTrap && this._disposeClickHandler) {
      this._disposeClickHandler();
      this._disposeClickHandler = undefined;
    }
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

  private _forceFocusInTrap = (ev: FocusEvent): void => {
    if (this.props.disabled) {
      return;
    }

    if (FocusTrapZone._focusStack.length && this === FocusTrapZone._focusStack[FocusTrapZone._focusStack.length - 1]) {
      const focusedElement = this._getDocument().activeElement as HTMLElement;

      if (!elementContains(this._root.current, focusedElement)) {
        this.focus();
        this._hasFocus = true; // set focus here since we stop event propagation
        ev.preventDefault();
        ev.stopPropagation();
      }
    }
  };

  private _forceClickInTrap = (ev: MouseEvent): void => {
    if (this.props.disabled) {
      return;
    }

    if (FocusTrapZone._focusStack.length && this === FocusTrapZone._focusStack[FocusTrapZone._focusStack.length - 1]) {
      const clickedElement = ev.target as HTMLElement;

      if (clickedElement && !elementContains(this._root.current, clickedElement)) {
        this.focus();
        this._hasFocus = true; // set focus here since we stop event propagation
        ev.preventDefault();
        ev.stopPropagation();
      }
    }
  };

  private _getDocument(): Document {
    return getDocument(this._root.current)!;
  }
}
