import { EventListener } from '@fluentui/react-component-event-listener';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';

import { getElementType } from '../utils/getElementType';
import { getUnhandledProps } from '../utils/getUnhandledProps';
import {
  getNextElement,
  getFirstTabbable,
  getLastTabbable,
  getWindow,
  getDocument,
  focusAsync,
  HIDDEN_FROM_ACC_TREE,
} from './focusUtilities';
import { FocusTrapZoneProps } from './FocusTrapZone.types';
import { handleRef } from '@fluentui/react-component-ref';

interface FocusTrapZonePropsWithTabster extends FocusTrapZoneProps {
  'data-tabster': string;
}

/** FocusTrapZone is used to trap the focus in any html element placed in body
 *  and hide other elements outside of Focus Trap Zone from accessibility tree.
 *  Pressing tab will circle focus within the inner focusable elements of the FocusTrapZone. */
export class FocusTrapZone extends React.Component<FocusTrapZoneProps, {}> {
  static _focusStack: FocusTrapZone[] = [];

  _root: { current: HTMLElement | null } = { current: null };

  _previouslyFocusedElementOutsideTrapZone?: HTMLElement;
  _previouslyFocusedElementInTrapZone?: HTMLElement;

  _firstBumper = React.createRef<HTMLDivElement>();
  _lastBumper = React.createRef<HTMLDivElement>();
  _hasFocus: boolean = false;

  windowRef = React.createRef<Window>() as React.MutableRefObject<Window>;

  // @ts-ignore
  createRef = elem => {
    this._root.current = ReactDOM.findDOMNode(elem) as HTMLElement;
    // @ts-ignore
    this.windowRef.current = getWindow(this._root.current);
  };

  shouldHandleOutsideClick = () => !this.props.isClickableOutsideFocusTrap || !this.props.focusTriggerOnOutsideClick;

  static propTypes = {
    as: PropTypes.elementType,
    className: PropTypes.string,
    elementToFocusOnDismiss: PropTypes.object,
    ariaLabelledBy: PropTypes.string,
    isClickableOutsideFocusTrap: PropTypes.bool,
    ignoreExternalFocusing: PropTypes.bool,
    forceFocusInsideTrapOnOutsideFocus: PropTypes.bool,
    forceFocusInsideTrapOnComponentUpdate: PropTypes.bool,
    firstFocusableSelector: PropTypes.string,
    disableFirstFocus: PropTypes.bool,
    focusPreviouslyFocusedInnerElement: PropTypes.bool,
    focusTriggerOnOutsideClick: PropTypes.bool,
    preventScrollOnRestoreFocus: PropTypes.bool,
    innerRef: PropTypes.any,
  };

  static defaultProps: FocusTrapZoneProps = {
    as: 'div',
    isClickableOutsideFocusTrap: true,
    forceFocusInsideTrapOnOutsideFocus: false,
    // Hardcoding completely uncontrolled flag for proper interop with FluentUI V9.
    'data-tabster': '{"uncontrolled": {"completely": true}}',
  } as FocusTrapZonePropsWithTabster;

  componentDidMount(): void {
    this._enableFocusTrapZone();
  }

  componentDidUpdate(prevProps: FocusTrapZoneProps): void {
    const { forceFocusInsideTrapOnComponentUpdate, forceFocusInsideTrapOnOutsideFocus, disabled } = this.props;
    const doc = getDocument(this._root.current);
    // @ts-ignore
    const activeElement = doc.activeElement as HTMLElement;

    // if after componentDidUpdate focus is not inside the focus trap, bring it back
    if (
      !disabled &&
      // @ts-ignore
      !this._root.current.contains(activeElement) &&
      forceFocusInsideTrapOnComponentUpdate
    ) {
      this._bringFocusIntoZone();
      return;
    }

    const prevForceFocusInsideTrap =
      prevProps.forceFocusInsideTrapOnOutsideFocus !== undefined ? prevProps.forceFocusInsideTrapOnOutsideFocus : true;
    const newForceFocusInsideTrap =
      forceFocusInsideTrapOnOutsideFocus !== undefined ? forceFocusInsideTrapOnOutsideFocus : true;
    const prevDisabled = prevProps.disabled !== undefined ? prevProps.disabled : false;
    const newDisabled = disabled !== undefined ? disabled : false;

    if ((!prevForceFocusInsideTrap && newForceFocusInsideTrap) || (prevDisabled && !newDisabled)) {
      // Transition from forceFocusInsideTrap / FTZ disabled to enabled.
      // Emulate what happens when a FocusTrapZone gets mounted.
      this._enableFocusTrapZone();
    } else if ((prevForceFocusInsideTrap && !newForceFocusInsideTrap) || (!prevDisabled && newDisabled)) {
      // Transition from forceFocusInsideTrap / FTZ enabled to disabled.
      // Emulate what happens when a FocusTrapZone gets unmounted.
      this._releaseFocusTrapZone();
    }
  }

  componentWillUnmount(): void {
    // don't handle return focus unless forceFocusInsideTrapOnOutsideFocus is true or focus is still within FocusTrapZone
    const doc = getDocument(this._root.current);
    if (
      !this.props.disabled ||
      this.props.forceFocusInsideTrapOnOutsideFocus ||
      // @ts-ignore
      !this._root.current.contains(doc.activeElement as HTMLElement)
    ) {
      this._releaseFocusTrapZone();
    }

    // Dispose of element references so the DOM Nodes can be garbage-collected
    delete this._previouslyFocusedElementInTrapZone;
    delete this._previouslyFocusedElementOutsideTrapZone;
  }

  handleRef = (element: HTMLElement) => {
    this.createRef(element);
    handleRef(this.props.innerRef, element);
  };

  render(): JSX.Element {
    const { className, forceFocusInsideTrapOnOutsideFocus, ariaLabelledBy, disabled = false } = this.props;
    const unhandledProps = getUnhandledProps(_.keys(FocusTrapZone.propTypes) as any, this.props);
    const ElementType = getElementType(this.props);

    const bumperProps = {
      'aria-hidden': true,
      style: {
        pointerEvents: 'none',
        position: 'fixed', // 'fixed' prevents browsers from scrolling to bumpers when viewport does not contain them
      },
      tabIndex: disabled ? -1 : 0, // make bumpers tabbable only when enabled
      'data-is-visible': true,
    } as React.HTMLAttributes<HTMLDivElement>;

    return (
      <>
        <ElementType
          {...unhandledProps}
          className={className}
          ref={this.handleRef}
          aria-labelledby={ariaLabelledBy}
          onKeyDown={this._onKeyboardHandler}
          onFocusCapture={this._onFocusCapture}
          onFocus={this._onRootFocus}
          onBlur={this._onRootBlur}
        >
          <div {...bumperProps} ref={this._firstBumper} onFocus={this._onFirstBumperFocus} />
          {this.props.children}
          <div {...bumperProps} ref={this._lastBumper} onFocus={this._onLastBumperFocus} />
        </ElementType>

        {forceFocusInsideTrapOnOutsideFocus && (
          <EventListener capture listener={this._handleOutsideFocus} targetRef={this.windowRef} type="focus" />
        )}
        {this.shouldHandleOutsideClick() && (
          <EventListener capture listener={this._handleOutsideClick} targetRef={this.windowRef} type="click" />
        )}
      </>
    );
  }

  _onRootFocus = (ev: React.FocusEvent<HTMLDivElement>) => {
    if (this.props.onFocus) {
      this.props.onFocus(ev);
    }

    this._hasFocus = true;
  };

  _onRootBlur = (ev: React.FocusEvent<HTMLDivElement>) => {
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
      const doc = getDocument(this._root.current);
      // @ts-ignore
      relatedTarget = doc.activeElement as Element;
    }

    // @ts-ignore
    if (!this._root.current.contains(relatedTarget as HTMLElement)) {
      this._hasFocus = false;
    }
  };

  _onFirstBumperFocus = () => {
    this._onBumperFocus(true);
  };

  _onLastBumperFocus = () => {
    this._onBumperFocus(false);
  };

  _isBumper(element: HTMLElement): boolean {
    return element === this._firstBumper.current || element === this._lastBumper.current;
  }

  _onBumperFocus = (isFirstBumper: boolean) => {
    if (!this._root.current) {
      return;
    }

    const currentBumper = (
      isFirstBumper === this._hasFocus ? this._lastBumper.current : this._firstBumper.current
    ) as HTMLElement;

    const nextFocusable =
      isFirstBumper === this._hasFocus
        ? getLastTabbable(this._root.current, currentBumper, true, false)
        : getFirstTabbable(this._root.current, currentBumper, true, false);

    if (nextFocusable) {
      if (this._isBumper(nextFocusable)) {
        // This can happen when FTZ contains no tabbable elements. Focus will take care of finding a focusable element in FTZ.
        this._findElementAndFocusAsync();
      } else {
        nextFocusable.focus();
      }
    }
  };

  _focusAsync(element: HTMLElement, options?: FocusOptions): void {
    if (!this._isBumper(element)) {
      focusAsync(element, options);
    }
  }

  _enableFocusTrapZone = () => {
    const { disabled = false } = this.props;
    if (disabled) {
      return;
    }

    FocusTrapZone._focusStack.push(this);

    this._bringFocusIntoZone();
    this._hideContentFromAccessibilityTree();
  };

  _bringFocusIntoZone = () => {
    const { disableFirstFocus = false } = this.props;

    this._previouslyFocusedElementOutsideTrapZone = this._getPreviouslyFocusedElementOutsideTrapZone();

    if (
      // @ts-ignore
      !this._root.current.contains(this._previouslyFocusedElementOutsideTrapZone) &&
      !disableFirstFocus
    ) {
      this._findElementAndFocusAsync();
    }
  };

  _releaseFocusTrapZone = () => {
    const { ignoreExternalFocusing } = this.props;

    FocusTrapZone._focusStack = FocusTrapZone._focusStack.filter((value: FocusTrapZone) => {
      return this !== value;
    });

    // try to focus element which triggered FocusTrapZone - prviously focused element outside trap zone
    const doc = getDocument(this._root.current);
    // @ts-ignore
    const activeElement = doc.activeElement as HTMLElement;
    if (
      !ignoreExternalFocusing &&
      this._previouslyFocusedElementOutsideTrapZone &&
      // @ts-ignore
      (this._root.current.contains(activeElement) || activeElement === doc.body)
    ) {
      this._focusAsync(this._previouslyFocusedElementOutsideTrapZone, {
        preventScroll: this.props.preventScrollOnRestoreFocus,
      });
    }

    // if last active focus trap zone is going to be released - show previously hidden content in accessibility tree
    const lastActiveFocusTrap =
      FocusTrapZone._focusStack.length && FocusTrapZone._focusStack[FocusTrapZone._focusStack.length - 1];

    if (!lastActiveFocusTrap) {
      this._showContentInAccessibilityTree();
    } else if (lastActiveFocusTrap._root.current) {
      let element = lastActiveFocusTrap._root.current;
      // aria hidden attributes are added to direct children of body. It can be the focusTrapZone root itself, or its parent
      while (element.parentElement && element.parentElement !== doc?.body) {
        element = element.parentElement;
      }
      element.removeAttribute(HIDDEN_FROM_ACC_TREE);
      element.removeAttribute('aria-hidden');
    }
  };

  _findElementAndFocusAsync = () => {
    if (!this._root.current) {
      return;
    }

    const { focusPreviouslyFocusedInnerElement, firstFocusableSelector } = this.props;

    if (
      focusPreviouslyFocusedInnerElement &&
      this._previouslyFocusedElementInTrapZone &&
      this._root.current.contains(this._previouslyFocusedElementInTrapZone)
    ) {
      // focus on the last item that had focus in the zone before we left the zone
      this._focusAsync(this._previouslyFocusedElementInTrapZone);
      return;
    }

    const focusSelector =
      firstFocusableSelector &&
      (typeof firstFocusableSelector === 'string' ? firstFocusableSelector : firstFocusableSelector());

    let firstFocusableChild: HTMLElement | null = null;

    if (focusSelector) {
      firstFocusableChild = this._root.current.querySelector(focusSelector);
    }

    // Fall back to first element if query selector did not match any elements.
    if (!firstFocusableChild) {
      firstFocusableChild = getNextElement(
        this._root.current,
        this._root.current.firstChild as HTMLElement,
        false,
        false,
        false,
        true,
      );
    }

    firstFocusableChild && this._focusAsync(firstFocusableChild);
  };

  _onFocusCapture = (ev: React.FocusEvent<HTMLDivElement>) => {
    this.props.onFocusCapture && this.props.onFocusCapture(ev);
    if (ev.target !== ev.currentTarget && !this._isBumper(ev.target)) {
      // every time focus changes within the trap zone, remember the focused element so that
      // it can be restored if focus leaves the pane and returns via keystroke (i.e. via a call to this.focus(true))
      this._previouslyFocusedElementInTrapZone = ev.target as HTMLElement;
    }
  };

  _forceFocusInTrap = (ev: Event, triggeredElement: HTMLElement) => {
    if (FocusTrapZone._focusStack.length && this === FocusTrapZone._focusStack[FocusTrapZone._focusStack.length - 1]) {
      // @ts-ignore
      if (!this._root.current.contains(triggeredElement)) {
        this._findElementAndFocusAsync();
        ev.preventDefault();
        ev.stopPropagation();
      }
    }
  };

  _handleOutsideFocus = (ev: FocusEvent): void => {
    const doc = getDocument(this._root.current);
    // @ts-ignore
    const focusedElement = doc.activeElement as HTMLElement;
    focusedElement && this._forceFocusInTrap(ev, focusedElement);
  };

  _handleOutsideClick = (ev: MouseEvent): void => {
    const clickedElement = ev.target as HTMLElement;
    const { isClickableOutsideFocusTrap, focusTriggerOnOutsideClick } = this.props;

    if (!isClickableOutsideFocusTrap) {
      clickedElement && this._forceFocusInTrap(ev, clickedElement);
    } else if (!focusTriggerOnOutsideClick) {
      const isOutsideFocusTrapZone = this._root.current && !this._root.current.contains(clickedElement);
      const isOutsideTriggerElement =
        this._previouslyFocusedElementOutsideTrapZone &&
        !this._previouslyFocusedElementOutsideTrapZone.contains(clickedElement);
      if (isOutsideFocusTrapZone && isOutsideTriggerElement) {
        // set it to NULL, so the trigger will not be focused on componentWillUnmount
        // @ts-ignore
        this._previouslyFocusedElementOutsideTrapZone = null;
      }
    }
  };

  _onKeyboardHandler = (ev: React.KeyboardEvent<HTMLDivElement>): void => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(ev);
    }

    // do not propogate keyboard events outside focus trap zone
    // https://github.com/microsoft/fluent-ui-react/pull/1180
    ev.stopPropagation();
  };

  _getPreviouslyFocusedElementOutsideTrapZone = () => {
    const { elementToFocusOnDismiss } = this.props;
    let previouslyFocusedElement = this._previouslyFocusedElementOutsideTrapZone;

    if (elementToFocusOnDismiss && previouslyFocusedElement !== elementToFocusOnDismiss) {
      previouslyFocusedElement = elementToFocusOnDismiss;
    } else if (!previouslyFocusedElement) {
      const doc = getDocument(this._root.current);
      // @ts-ignore
      previouslyFocusedElement = doc.activeElement as HTMLElement;
    }

    return previouslyFocusedElement;
  };

  _hideContentFromAccessibilityTree = () => {
    const doc = getDocument(this._root.current);
    // @ts-ignore
    const bodyChildren = (doc.body && doc.body.children) || [];

    // @ts-ignore
    if (bodyChildren.length && !doc.body.contains(this._root.current)) {
      // In case popup render options will change
      /* eslint-disable-next-line no-console */
      console.warn(
        'Body element does not contain trap zone element. Please, ensure the trap zone element is placed inside body, so it will work properly.',
      );
    }

    for (let index = 0; index < bodyChildren.length; index++) {
      const currentChild = bodyChildren[index] as HTMLElement;
      const isOrHasFocusTrapZone = currentChild === this._root.current || currentChild.contains(this._root.current);
      const isAriaLiveRegion = currentChild.hasAttribute('aria-live');

      if (!isOrHasFocusTrapZone && !isAriaLiveRegion && currentChild.getAttribute('aria-hidden') !== 'true') {
        currentChild.setAttribute('aria-hidden', 'true');
        currentChild.setAttribute(HIDDEN_FROM_ACC_TREE, 'true');
      }
    }
  };

  _showContentInAccessibilityTree = () => {
    const doc = getDocument(this._root.current);
    // @ts-ignore
    const hiddenElements = doc.querySelectorAll(`[${HIDDEN_FROM_ACC_TREE}="true"]`);
    for (let index = 0; index < hiddenElements.length; index++) {
      const element = hiddenElements[index];
      element.removeAttribute('aria-hidden');
      element.removeAttribute(HIDDEN_FROM_ACC_TREE);
    }
  };
}
