/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file AutoClearText.tsx a component that render some text and auto-remove from DOM after a specified delay.
 */

import * as React from 'react';
import { autobind } from '@uifabric/utilities';

export interface IAutoClearTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  text: string;
}

export interface IAutoClearTextState {
  text: string;
}

/**
 * The period of timeout used to clear the text after each rendering.
 *
 * More than 1000ms is critical for NVDA to read the text properly.
 */
const CLEAR_TEXT_TIME: number = 1000;

export default class AutoClearText extends React.Component<IAutoClearTextProps, IAutoClearTextState> {
  private _clearTextTimeout: number;

  constructor(props: IAutoClearTextProps) {
    super(props);

    this.state = {
      text: props.text
    };
  }

  public componentWillReceiveProps(nextProps: IAutoClearTextProps): void {
    if (this._clearTextTimeout) {
      // Clear the timeout of removing text to avoid the new text being removed.
      window.clearTimeout(this._clearTextTimeout);
      this._clearTextTimeout = undefined;
    }

    this.setState({
      text: nextProps.text
    });
  }

  public componentDidUpdate(): void {
    this._clearTextByTimeout();
  }

  public render(): JSX.Element {
    const { text, ...htmlAttributes } = this.props;

    return (
      <p { ...htmlAttributes }>
        { this.state.text }
      </p>
    );
  }

  // Set a timeout to remove the text to avoid the text persisting in the DOM which can be confusing.
  // It will be cleared if props updating is occured before the text being cleared.
  @autobind
  private _clearTextByTimeout(): void {
    if (this.state.text) {
      this._clearTextTimeout = window.setTimeout(() => {
        this.setState({
          text: ''
        });
        this._clearTextTimeout = undefined;
      }, CLEAR_TEXT_TIME);
    }
  }
}
