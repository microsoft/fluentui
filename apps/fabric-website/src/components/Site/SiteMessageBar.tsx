import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { MessageBar, IMessageBarStyles, IMessageBarStyleProps } from 'office-ui-fabric-react/lib/MessageBar';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';

export interface ISiteMessageBarProps {
  /** Text for the message bar */
  text: string;

  /** If provided, a "Learn more" link will be shown after the text */
  learnMoreUrl?: string;

  /**
   * Prefix for local storage key for storing if the message bar has been closed.
   * If not provided, local storage will not be used.
   */
  localStoragePrefix?: string;

  /** Styles for the message bar */
  styles?: IStyleFunctionOrObject<IMessageBarStyleProps, IMessageBarStyles>;
}

export interface ISiteMessageBarState {
  isVisible: boolean;
}

export default class SiteMessageBar extends React.Component<ISiteMessageBarProps, ISiteMessageBarState> {
  private _localStorageKey: string | undefined;

  constructor(props: ISiteMessageBarProps) {
    super(props);

    let isVisible = true;
    if (props.localStoragePrefix) {
      this._localStorageKey = props.localStoragePrefix + 'MessageBarHidden';
      try {
        // Accessing localStorage can throw for various reasons--just ignore if this happens
        isVisible = !localStorage.getItem(this._localStorageKey);
      } catch (ex) {
        isVisible = true;
      }
    }

    this.state = { isVisible };
  }

  public render() {
    const { text, learnMoreUrl, styles } = this.props;
    const { isVisible } = this.state;

    return isVisible ? (
      <MessageBar onDismiss={this._onClose} isMultiline dismissButtonAriaLabel="Close" styles={styles}>
        {text + ' '}
        {learnMoreUrl && <Link href={learnMoreUrl}>Learn more</Link>}
      </MessageBar>
    ) : null;
  }

  private _onClose = () => {
    if (this._localStorageKey) {
      try {
        localStorage.setItem(this._localStorageKey, '1');
      } catch (ex) {
        // ignore
      }
    }

    this.setState({
      isVisible: false
    });
  };
}
