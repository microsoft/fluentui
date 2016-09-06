import * as React from 'react';
import { KeyCodes } from '../../utilities/KeyCodes';
import { EventGroup } from '../../utilities/eventGroup/EventGroup';
import { IFocusTrapZone, IFocusTrapZoneProps } from './FocusTrapZone.Props';
import {
  getFirstFocusable,
  getLastFocusable,
  getNextElement
} from '../../utilities/focus';

export class FocusTrapZone extends React.Component<IFocusTrapZoneProps, {}> implements IFocusTrapZone {

  public refs: {
    [key: string]: React.ReactInstance,
    root: HTMLElement
  };

  private _previouslyFocusedElement: HTMLElement;
  private _events: EventGroup;

  constructor(props) {
    super(props);

    this._onKeyboardHandler = this._onKeyboardHandler.bind(this);
    this._events = new EventGroup(this);
  }

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
    this._events.dispose();

    if (!ignoreExternalFocusing && this._previouslyFocusedElement) {
      this._previouslyFocusedElement.focus();
    }
  }

  public render() {
    let { className, ariaLabelledBy } = this.props;

    return (
      <div
        { ...this.props as any }
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

  private _onKeyboardHandler(ev: React.KeyboardEvent) {
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
    const focusedElement = document.activeElement;

    if (!this.refs.root.contains(focusedElement)) {
      this.focus();
      ev.preventDefault();
      ev.stopPropagation();
    }
  }

 private _forceClickInTrap(ev: MouseEvent) {
    const clickedElement = ev.target as HTMLElement;

    if (clickedElement && !this.refs.root.contains(clickedElement)) {
      this.focus();
      ev.preventDefault();
      ev.stopPropagation();
    }
  }
}