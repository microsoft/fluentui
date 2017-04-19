/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file Screen Reader Alert component.
 */

import * as React from 'react';

import {
  IScreenReaderAlertProps,
  defaultScreenReaderAlertProps,
  ReadingMode,
  ARIA_LIVE_MAPPING
} from './ScreenReaderAlert.Props';
import AutoClearText from './AutoClearText';
import styles = require('./ScreenReaderAlert.scss');

/**
 * This is a screen reader alert component for developers to easily add screen reader feature to their web site.
 * This component is a wrapper, you would like to wrap the texts for screen reader to read.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions Live Region in MDN}
 *
 * All functionalities of this component are tested through:
 * 1. Narrator in Windows 10.
 * 2. JAWS 18.
 * 3. NVDA 2016.4.
 * 4. ChromeVOX v53.0.2784.4.
 *
 * @example
 * <ScreenReaderAlert text={ text }>
 */
export class ScreenReaderAlert extends React.PureComponent<IScreenReaderAlertProps, void> {
  // The default props that will automatically be applied to this component.
  public static defaultProps: IScreenReaderAlertProps = defaultScreenReaderAlertProps;

  /**
   * The index updated during each rendering to make React re-attach the DOM.
   *
   * It is critical to make React re-attach the DOM once we want it to read something. Simply updating the
   * text context inside DOM will cause different behavior in different screen readers or browsers.
   * Re-attaching the live region element is the most common way which is supported by most major screen reader
   * and browser combinations.
   */
  private _renderIndex: number = 0;

  public render(): JSX.Element {
    return (
      <div className={ styles.screenReaderAlert } key={ this._renderIndex++ }>
        {
          this.props.text && (
            <AutoClearText
              role={ this._role }
              aria-live={ ARIA_LIVE_MAPPING[this.props.readingMode] }
              aria-atomic={ true }
              text={ this.props.text }
            />
          )
        }
      </div>
    );
  }

  private get _role(): string {
    return this.props.readingMode === ReadingMode.ReadImmediately ? 'alert' : undefined;
  }
}
