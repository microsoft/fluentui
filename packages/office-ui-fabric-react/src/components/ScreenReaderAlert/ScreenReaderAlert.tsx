/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file Screen Reader Alert component.
 */

import * as React from 'react';

import { IScreenReaderAlertProps, defaultScreenReaderAlertProps, ReadingMode } from './ScreenReaderAlert.Props';
import styles = require('./ScreenReaderAlert.scss');

export interface IScreenReaderAlertState {
  alertText: string;
}

/**
 * The period of timeout used to clear the text after each rendering.
 *
 * More than 1000ms is critical for NVDA to read the text properly.
 */
const clearTextTime: number = 1000;

/**
 * This is a screen reader alert component for developers to easily add screen reader feature to their web site.
 * This component is a wrapper, you would like to wrap the texts for screen reader to read.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions Live Region in MDN}
 *
 * All functionalities of this component are tested through:
 * 1. Narrator in Windows 10.
 * 2. JAWS 18.
 * 3. NVDA 2016.4.
 * 4. ChromeVOX v53. (Not support ReadingMode.ReadAfterOtherContent option for ChromeVOX, it will read immediately)
 *
 * @example
 * <ScreenReaderAlert>
 *   { yourFirstAlertText }
 *   { yourSecondAlertText }
 * </ScreenReaderAlert>
 */
export class ScreenReaderAlert extends React.Component<IScreenReaderAlertProps, IScreenReaderAlertState> {
  // The default props will automatically be applied to this component.
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

  /**
   * The non-empty string which represents the latest string readout by screen readers.
   *
   * The reason of having this variable is that we have a timeout to clear the text in the live region.
   * We shouldn't let screen readers read the same string if the indicator is not changed. Use this to let React
   * render the live region only when text passed from props is changed or the indicator is changed.
   */
  private _previousValidString: string = '';

  private _clearTextTimeout: number;

  constructor(props: IScreenReaderAlertProps) {
    super(props);

    this.state = {
      alertText: this._getTextFromProps(React.Children.toArray(props.children))
    };
  }

  public componentWillReceiveProps(nextProps: IScreenReaderAlertProps): void {
    if (this._clearTextTimeout) {
      // Clear the timeout of removing text to avoid the new text being removed.
      window.clearTimeout(this._clearTextTimeout);
      this._clearTextTimeout = undefined;
    }

    this.setState({
      alertText: this._getTextFromProps(React.Children.toArray(nextProps.children))
    });
  }

  public shouldComponentUpdate(nextProps: IScreenReaderAlertProps, nextState: IScreenReaderAlertState): boolean {
    // When indicator is not changed, do NOT need to render the string if it's same with the previous non-empty string.
    const isValidStringChanged: boolean = nextState.alertText !== this._previousValidString;

    return (this.props.indicator !== nextProps.indicator || isValidStringChanged);
  }

  public componentDidUpdate(nextProps: IScreenReaderAlertProps): void {
    this._clearTextByTimeout();
    this._updateValidString();
  }

  public componentDidMount(): void {
    this._clearTextByTimeout();
    this._updateValidString();
  }

  public render(): JSX.Element {
    return (
      <div className={ styles.screenReaderAlert } key={ this._renderIndex++ }>
        {
          this.props.readingMode !== ReadingMode.DoNotRead && this.state.alertText && (
            <p
              role={ this._role }
              aria-live={ this._ariaLive }
              aria-atomic={ true }>
              { this.state.alertText }
            </p>
          )
        }
      </div>
    );
  }

  private get _role(): string {
    return this.props.readingMode === ReadingMode.ReadImmediately ? 'alert' : undefined;
  }

  private get _ariaLive(): string {
    switch (this.props.readingMode) {
      case ReadingMode.DoNotRead:
        return 'off';
      case ReadingMode.ReadAfterOtherContent:
        return 'polite';
      case ReadingMode.ReadImmediately:
        return 'assertive';
      default:
        return undefined;
    }
  }

  private _getTextFromProps(root: React.ReactChild | React.ReactChild[]): string {
    let text: string = '';
    if (typeof root === 'string' || typeof root === 'number') {
      text += root;
    } else if (Array.isArray(root)) {
      root.forEach((child: React.ReactChild) => text += this._getTextFromProps(child));
    }

    return text;
  }

  private _updateValidString(): void {
    this._previousValidString = this.state.alertText || this._previousValidString;
  }

  // Set a timeout to remove the text to avoid the text persisting in the DOM which can be confusing.
  // It will be cleared if props updating is occured before the text being cleared.
  private _clearTextByTimeout(): void {
    if (this.state.alertText) {
      this._clearTextTimeout = window.setTimeout(() => {
        this.setState({
          alertText: ''
        });
        this._clearTextTimeout = undefined;
      }, clearTextTime);
    }
  }
}
