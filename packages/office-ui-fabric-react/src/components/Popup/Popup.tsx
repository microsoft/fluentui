import * as React from 'react';
import {
  Async,
  KeyCodes,
  divProperties,
  doesElementContainFocus,
  getDocument,
  getNativeProps,
  on,
  getWindow,
  elementContains,
} from '../../Utilities';
import { IPopupProps } from './Popup.types';

export interface IPopupState {
  needsVerticalScrollBar?: boolean;
}

/**
 * This adds accessibility to Dialog and Panel controls
 */
export class Popup extends React.Component<IPopupProps, IPopupState> {
  public static defaultProps: IPopupProps = {
    shouldRestoreFocus: true,
  };

  public _root = React.createRef<HTMLDivElement>();
  private _disposables: (() => void)[] = [];
  private _originalFocusedElement: HTMLElement;
  private _containsFocus: boolean;
  private _async: Async;

  public constructor(props: IPopupProps) {
    super(props);
    this._async = new Async(this);
    this.state = { needsVerticalScrollBar: false };
  }

  public UNSAFE_componentWillMount(): void {
    this._originalFocusedElement = getDocument()!.activeElement as HTMLElement;
  }

  public componentDidMount(): void {
    if (this._root.current) {
      this._disposables.push(
        on(this._root.current, 'focus', this._onFocus, true),
        on(this._root.current, 'blur', this._onBlur, true),
      );
      const currentWindow = getWindow(this._root.current);
      if (currentWindow) {
        this._disposables.push(on(currentWindow, 'keydown', this._onKeyDown as any));
      }
      if (doesElementContainFocus(this._root.current)) {
        this._containsFocus = true;
      }
    }

    this._updateScrollBarAsync();
  }

  public componentDidUpdate() {
    this._updateScrollBarAsync();
    this._async.dispose();
  }

  public componentWillUnmount(): void {
    this._disposables.forEach((dispose: () => void) => dispose());

    // eslint-disable-next-line deprecation/deprecation
    if (this.props.shouldRestoreFocus) {
      const { onRestoreFocus = defaultFocusRestorer } = this.props;
      onRestoreFocus({
        originalElement: this._originalFocusedElement,
        containsFocus: this._containsFocus,
        documentContainsFocus: getDocument()?.hasFocus(),
      });
    }
    // De-reference DOM Node to avoid retainment via transpiled closure of _onKeyDown
    delete this._originalFocusedElement;
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
        needsVerticalScrollBar: needsVerticalScrollBar,
      });
    }
  }

  private _onFocus = (): void => {
    this._containsFocus = true;
  };

  private _onBlur = (ev: FocusEvent): void => {
    /** The popup should update this._containsFocus when:
     * relatedTarget exists AND
     * the relatedTarget is not contained within the popup.
     * If the relatedTarget is within the popup, that means the popup still has focus
     * and focused moved from one element to another within the popup.
     * If relatedTarget is undefined or null that usually means that a
     * keyboard event occured and focus didn't change
     */
    if (
      this._root.current &&
      ev.relatedTarget &&
      !elementContains(this._root.current, ev.relatedTarget as HTMLElement)
    ) {
      this._containsFocus = false;
    }
  };
}

function defaultFocusRestorer(options: {
  originalElement?: HTMLElement | Window;
  containsFocus: boolean;
  documentContainsFocus: boolean;
}) {
  const { originalElement, containsFocus } = options;

  if (originalElement && containsFocus && originalElement !== window) {
    // Make sure that the focus method actually exists
    // In some cases the object might exist but not be a real element.
    // This is primarily for IE 11 and should be removed once IE 11 is no longer in use.
    if (originalElement.focus) {
      originalElement.focus();
    }
  }
}
