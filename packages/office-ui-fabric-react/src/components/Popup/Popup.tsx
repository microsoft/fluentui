import * as React from 'react';
import { BaseComponent, KeyCodes, divProperties, doesElementContainFocus, getDocument, getNativeProps } from '../../Utilities';
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

  public _root = React.createRef<HTMLDivElement>();

  private _originalFocusedElement: HTMLElement;
  private _containsFocus: boolean;

  public constructor(props: IPopupProps) {
    super(props);
    this.state = { needsVerticalScrollBar: false };
  }

  public componentWillMount(): void {
    this._originalFocusedElement = getDocument()!.activeElement as HTMLElement;
  }

  public componentDidMount(): void {
    if (!this._root.current) {
      return;
    }

    this._events.on(this._root.current, 'focus', this._onFocus, true);
    this._events.on(this._root.current, 'blur', this._onBlur, true);

    if (doesElementContainFocus(this._root.current)) {
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
      (this._originalFocusedElement as any) !== window
    ) {
      // This slight delay is required so that we can unwind the stack, let react try to mess with focus, and then
      // apply the correct focus. Without the setTimeout, we end up focusing the correct thing, and then React wants
      // to reset the focus back to the thing it thinks should have been focused.
      if (this._originalFocusedElement) {
        this._originalFocusedElement.focus();
      }
    }
  }

  public render(): JSX.Element {
    const { role, className, ariaLabel, ariaLabelledBy, ariaDescribedBy, style } = this.props;

    return (
      <div
        ref={this._root}
        {...getNativeProps(this.props, divProperties)}
        className={className}
        role={role}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        onKeyDown={this._onKeyDown}
        style={{ overflowY: this.state.needsVerticalScrollBar ? 'scroll' : undefined, outline: 'none', ...style }}
      >
        {this.props.children}
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
  };

  private _updateScrollBarAsync(): void {
    this._async.requestAnimationFrame(() => {
      this._getScrollBar();
    });
  }

  private _getScrollBar(): void {
    // If overflowY is overriden, don't waste time calculating whether the scrollbar is necessary.
    if (this.props.style && this.props.style.overflowY) {
      return;
    }

    let needsVerticalScrollBar = false;
    if (this._root && this._root.current && this._root.current.firstElementChild) {
      // ClientHeight returns the client height of an element rounded to an
      // integer. On some browsers at different zoom levels this rounding
      // can generate different results for the root container and child even
      // though they are the same height. This causes us to show a scroll bar
      // when not needed. Ideally we would use BoundingClientRect().height
      // instead however seems that the API is 90% slower than using ClientHeight.
      // Therefore instead we will calculate the difference between heights and
      // allow for a 1px difference to still be considered ok and not show the
      // scroll bar.
      const rootHeight = this._root.current.clientHeight;
      const firstChildHeight = this._root.current.firstElementChild.clientHeight;
      if (rootHeight > 0 && firstChildHeight > rootHeight) {
        needsVerticalScrollBar = firstChildHeight - rootHeight > 1;
      }
    }
    if (this.state.needsVerticalScrollBar !== needsVerticalScrollBar) {
      this.setState({
        needsVerticalScrollBar: needsVerticalScrollBar
      });
    }
  }

  private _onFocus(): void {
    this._containsFocus = true;
  }

  private _onBlur(ev: React.FocusEvent<HTMLElement>): void {
    if (this._root.current && this._root.current.contains(ev.relatedTarget as HTMLElement)) {
      this._containsFocus = false;
    }
  }
}
