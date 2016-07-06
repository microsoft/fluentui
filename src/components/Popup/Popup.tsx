import * as React from 'react';
import { IPopupProps } from './Popup.Props';
import { KeyCodes } from '../../utilities/KeyCodes';
import { BaseComponent } from '../../common/BaseComponent';

/**
 * This adds accessibility to Dialog and Panel controls
 **/
export class Popup extends BaseComponent<IPopupProps, {}> {
  public static defaultProps: IPopupProps = {
    shouldRestoreFocus: true
  };

  public _originalFocusedElement: HTMLElement;

  public componentDidMount(): void {
    this._originalFocusedElement = document.activeElement as HTMLElement;

    this._events.on(window, 'keydown', this._onDialogKeyDown, true);
  }

  public componentWillUnmount(): void {
    if (this.props.shouldRestoreFocus && this._originalFocusedElement && this._originalFocusedElement as any !== window) {
      this._originalFocusedElement.focus();
    }
  }

  public render() {
    let { role, className, ariaLabelledBy, ariaDescribedBy } = this.props;

    return (
      <div
        { ...this.props as any }
        className={ className }
        role={ role }
        aria-labelledby={ ariaLabelledBy }
        aria-desribedby={ ariaDescribedBy } />
    );
  }

  private _onDialogKeyDown(ev: React.KeyboardEvent) {
    switch (ev.which) {
      case KeyCodes.escape:

        if (this.props.onDismiss) {
          this.props.onDismiss();

          ev.preventDefault();
          ev.stopPropagation();
        }

        break;
    }
  }
}
