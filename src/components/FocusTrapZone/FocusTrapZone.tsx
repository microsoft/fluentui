import * as React from 'react';
import { KeyCodes } from '../../utilities/KeyCodes';
import { EventGroup } from '../../utilities/eventGroup/EventGroup';
import { css } from '../../utilities/css';
import { IFocusTrapZoneProps } from './FocusTrapZone.Props';
import * as FocusUtilities from '../../utilities/focus/focusUtilities';

export class FocusTrapZone extends React.Component<IFocusTrapZoneProps, {}> {

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
    let { elementToFocusOnDismiss } = this.props;

    this._previouslyFocusedElement = elementToFocusOnDismiss ? elementToFocusOnDismiss : document.activeElement as HTMLElement;
    this._focusOnFirstChildInZone();

    this._events.on(window, 'focus', this._forceFocusInTrap, true);
    this._events.on(window, 'click', this._forceClickInTrap, true);
  }

  public componentWillUnmount() {
    this._events.dispose();

    if (this._previouslyFocusedElement) {
      this._previouslyFocusedElement.focus();
    }
  }

  public render() {
    let { className, ariaLabelledBy } = this.props;

    return (
      <div
        { ...this.props as any }
        className={ css('ms-FocusTrapZone', className) }
        ref='root'
        aria-labelledby={ ariaLabelledBy }
        onKeyDown={ this._onKeyboardHandler }>
        { this.props.children }
      </div>
    );
  }

  private _onKeyboardHandler(ev: React.KeyboardEvent) {
    if (ev.which !== KeyCodes.tab) {
      return;
    }

    let { root } = this.refs;

    const _firstFocusableChild = FocusUtilities.getFirstFocusable(root, root.firstChild as HTMLElement, true, true);
    const _lastFocusableChild = FocusUtilities.getLastFocusable(root, root.lastChild as HTMLElement, true, true);

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

  private _focusOnFirstChildInZone() {
    const _firstFocusableChild = FocusUtilities.getNextElement(this.refs.root, this.refs.root.firstChild as HTMLElement, true, false, false, true, true);

    if (_firstFocusableChild) {
      _firstFocusableChild.focus();
    }
  }

  private _forceFocusInTrap(ev: FocusEvent) {
    const focusedElement = document.activeElement;

    if (!this.refs.root.contains(focusedElement)) {
      this._focusOnFirstChildInZone();
      ev.preventDefault();
      ev.stopPropagation();
    }
  }

 private _forceClickInTrap(ev: MouseEvent) {
    const clickedElement = ev.target as HTMLElement;

    if (clickedElement && !this.refs.root.contains(clickedElement)) {
      this._focusOnFirstChildInZone();
      ev.preventDefault();
      ev.stopPropagation();
    }
  }
}