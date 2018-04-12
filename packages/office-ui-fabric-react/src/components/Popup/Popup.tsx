import * as React from 'react';
import {
  BaseComponent,
  KeyCodes,
  divProperties,
  doesElementContainFocus,
  getDocument,
  getNativeProps,
  createRef
} from '../../Utilities';
import { IPopupProps } from './Popup.types';

export interface IPopupState {
  needsVerticalScrollBar?: boolean;
}

/**
 * This adds accessibility to Dialog and Panel controls
 */
export class Popup extends BaseComponent<IPopupProps, IPopupState> {

  public static defaultProps: IPopupProps = {
    shouldRestoreFocus: true
  };

  public _root = createRef<HTMLDivElement>();

  private _originalFocusedElement: HTMLElement;
  private _containsFocus: boolean;

  public constructor(props: IPopupProps) {
    super(props);
    this.state = { needsVerticalScrollBar: false };
  }

  public componentWillMount() {
    this._originalFocusedElement = getDocument()!.activeElement as HTMLElement;
  }

  public componentDidMount(): void {
    if (!this._root.value) {
      return;
    }

    this._events.on(this._root.value, 'focus', this._onFocus, true);
    this._events.on(this._root.value, 'blur', this._onBlur, true);

    if (doesElementContainFocus(this._root.value)) {
      this._containsFocus = true;
    }

    this._updateScrollBarAsync();
  }

  public componentDidUpdate() {
    this._updateScrollBarAsync();
  }

  public componentWillUnmount(): void {
    if (
      this.props.shouldRestoreFocus &&
      this._originalFocusedElement &&
      this._containsFocus &&
      this._originalFocusedElement as any !== window) {
      // This slight delay is required so that we can unwind the stack, let react try to mess with focus, and then
      // apply the correct focus. Without the setTimeout, we end up focusing the correct thing, and then React wants
      // to reset the focus back to the thing it thinks should have been focused.
      if (this._originalFocusedElement) {
        this._originalFocusedElement.focus();
      }
    }
  }

  public render() {
    const { role, className, ariaLabel, ariaLabelledBy, ariaDescribedBy, style } = this.props;

    return (
      <div
        ref={ this._root }
        { ...getNativeProps(this.props, divProperties) }
        className={ className }
        role={ role }
        aria-label={ ariaLabel }
        aria-labelledby={ ariaLabelledBy }
        aria-describedby={ ariaDescribedBy }
        onKeyDown={ this._onKeyDown }
        style={ { overflowY: this.state.needsVerticalScrollBar ? 'scroll' : 'auto', ...style } }
      >
        { this.props.children }
      </div>
    );
  }

  private _onKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    switch (ev.which) {
      case KeyCodes.escape:

        if (this.props.onDismiss) {
          this.props.onDismiss(ev);

          ev.preventDefault();
          ev.stopPropagation();
        }

        break;
    }
  }

  private _updateScrollBarAsync() {
    this._async.requestAnimationFrame(() => {
      this._getScrollBar();
    });
  }

  private _getScrollBar() {
    let needsVerticalScrollBar = false;
    if (this._root && this._root.value && this._root.value.firstElementChild) {
      const rootHeight = this._root.value.getBoundingClientRect().height;
      needsVerticalScrollBar = rootHeight > 0
        && this._root.value.firstElementChild.getBoundingClientRect().height > rootHeight;
    }
    if (this.state.needsVerticalScrollBar !== needsVerticalScrollBar) {
      this.setState({
        needsVerticalScrollBar: needsVerticalScrollBar
      });
    }
  }

  private _onFocus() {
    this._containsFocus = true;
  }

  private _onBlur() {
    this._containsFocus = false;
  }
}
