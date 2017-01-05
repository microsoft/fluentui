/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file Screen Reader Alert component.
 */

import * as React from 'react';

import { IScreenReaderAlertProps, defaultScreenReaderAlertProps, ReadingMode } from './ScreenReaderAlert.Props';
import './ScreenReaderAlert.scss';

/**
 * This is a screen reader alert component for developers to easily add screen reader feature to there web site.
 * This component is a wrapper, you would like to wrap the texts for screen reader to read.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions Live Region in MDN}
 *
 * All functionalities of this component is tested through:
 * 1. JAWS 18.
 * 2. ChromeVOX v53. (Not support ReadingMode.ReadAfterOtherContent option for ChromeVOX, it will read immediately)
 *
 * @example
 * <ScreenReaderAlert>
 *   { yourFirstAlertText }
 *   { yourSecondAlertText }
 * </ScreenReaderAlert>
 */
export class ScreenReaderAlert extends React.Component<IScreenReaderAlertProps, {}> {
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

  constructor(props: IScreenReaderAlertProps) {
    super(props);
  }

  public shouldComponentUpdate(nextProps: IScreenReaderAlertProps): boolean {
    return (this.props.indicator !== nextProps.indicator || !this._isSameText(this.props, nextProps));
  }

  public render(): JSX.Element {
    return (
      <div className='ms-ScreenReaderAlert' key={ this._renderIndex++ }>
        {
          this.props.readingMode !== ReadingMode.DoNotRead && (
            <p
              role={ this._role }
              aria-live={ this._ariaLive }
              aria-atomic={ true }>
              { this._alertMessages }
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

  private get _alertMessages(): React.ReactElement<HTMLSpanElement>[] {
    return React.Children.map(this.props.children, (child: string, index: number) =>
      // Use index as key to avoid React warnings, it doesn't affect actual rendering since the key of their
      // parent is always changed during each rendering.
      child && <span key={ index }>{ child }</span>
    );
  }

  private _isSameText(prevProps: IScreenReaderAlertProps, nextProps: IScreenReaderAlertProps): boolean {
    const prevText: string = this._getTextContentFromReactChild(React.Children.toArray(prevProps.children));
    const nextText: string = this._getTextContentFromReactChild(React.Children.toArray(nextProps.children));

    return prevText === nextText;
  }

  private _getTextContentFromReactChild(root: React.ReactChild | React.ReactChild[]): string {
    let text: string;
    if (typeof root === 'string' || typeof root === 'number') {
      text += root;
    } else if (Array.isArray(root)) {
      root.forEach((child: React.ReactChild) => text += this._getTextContentFromReactChild(child));
    } else if (root && root.props) {
      const children: any = root.props;

      if (Array.isArray(children)) {
        children.forEach((child: React.ReactChild) => text += this._getTextContentFromReactChild(child));
      } else {
        text += this._getTextContentFromReactChild(children);
      }
    }

    return text;
  }
}
