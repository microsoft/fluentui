import * as React from 'react';
import {
  BaseComponent,
  KeyCodes,
  autobind,
  elementContains,
  getNativeProps,
  divProperties
} from '../../Utilities';
import { IFocusTrapZone, IFocusTrapZoneProps } from './FocusTrapZone.Props';
import {
  getFirstFocusable,
  getLastFocusable,
  getNextElement
} from '../../utilities/focus';

export class FocusTrapZone extends BaseComponent<IFocusTrapZoneProps, {}> implements IFocusTrapZone {

  public refs: {
    [key: string]: React.ReactInstance,
    root: HTMLElement
  };

  private _previouslyFocusedElement: HTMLElement;

  public componentDidMount() {
    let { elementToFocusOnDismiss, isClickableOutsideFocusTrap = false, forceFocusInsideTrap = true } = this.props;

    this._previouslyFocusedElement = elementToFocusOnDismiss ? elementToFocusOnDismiss : document.activeElement as HTMLElement;
    this.focus();

    if (forceFocusInsideTrap) {
      this._events.on(window, 'focus', this._forceFocusInTrap, true);
    }

    if (!isClickableOutsideFocusTrap) {
      this._events.on(window, 'click', this._forceClickInTrap, true);
    }
  }

  public componentWillUnmount() {
    let { ignoreExternalFocusing } = this.props;

    if (!ignoreExternalFocusing && this._previouslyFocusedElement) {
      this._previouslyFocusedElement.focus();
    }
  }

  public render() {
    let { className, ariaLabelledBy } = this.props;
    let divProps = getNativeProps(this.props, divProperties);

    return (
      <div
        { ...divProps }
        className={ className }
        ref='root'
        aria-labelledby={ ariaLabelledBy }
        onKeyDown={ this._onKeyboardHandler }>
        { this.props.children }
      </div>
    );
  }

  /**
   * Need to expose this method in case of popups since focus needs to be set when popup is opened
   */
  public focus() {
    let { firstFocusableSelector } = this.props;
    let _firstFocusableChild;
    let root = this.refs.root;

    if (firstFocusableSelector) {
      _firstFocusableChild = root.querySelector('.' + firstFocusableSelector);
    } else {
      _firstFocusableChild = getNextElement(root, root.firstChild as HTMLElement, true, false, false, true);
    }
    if (_firstFocusableChild) {
      _firstFocusableChild.focus();
    }
  }

  @autobind
  private _onKeyboardHandler(ev: React.KeyboardEvent<HTMLElement>) {
    if (ev.which !== KeyCodes.tab) {
      return;
    }

    let { root } = this.refs;

    const _firstFocusableChild = getFirstFocusable(root, root.firstChild as HTMLElement, true);
    const _lastFocusableChild = getLastFocusable(root, root.lastChild as HTMLElement, true);

    if (ev.shiftKey && _firstFocusableChild === ev.target) {
      _lastFocusableChild.focus();
      ev.preventDefault();
      ev.stopPropagation();
    } else if (!ev.shiftKey && _lastFocusableChild === ev.target) {
      _firstFocusableChild.focus();
      ev.preventDefault();
      ev.stopPropagation();
    }
  }

  private _forceFocusInTrap(ev: FocusEvent) {
    const focusedElement = document.activeElement as HTMLElement;

    if (!elementContains(this.refs.root, focusedElement)) {
      this.focus();
      ev.preventDefault();
      ev.stopPropagation();
    }
  }

  private _forceClickInTrap(ev: MouseEvent) {
    const clickedElement = ev.target as HTMLElement;

    if (clickedElement && !elementContains(this.refs.root, clickedElement)) {
      this.focus();
      ev.preventDefault();
      ev.stopPropagation();
    }
  }
}