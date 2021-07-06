import * as React from 'react';
import { Link } from '@fluentui/react/lib/Link';
import { MessageBar } from '@fluentui/react/lib/MessageBar';
import { ISiteMessageBarProps } from './SiteMessageBar.types';

export interface ISiteMessageBarState {
  isVisible: boolean;
}

export class SiteMessageBar extends React.Component<ISiteMessageBarProps, ISiteMessageBarState> {
  private _sessionStorageKey: string | undefined;

  constructor(props: ISiteMessageBarProps) {
    super(props);

    let isVisible = true;
    if (props.sessionStoragePrefix) {
      this._sessionStorageKey = props.sessionStoragePrefix + 'MessageBarHidden';
      try {
        // Accessing sessionStorage can throw for various reasons--just ignore if this happens
        isVisible = !sessionStorage.getItem(this._sessionStorageKey);
      } catch (ex) {
        isVisible = true;
      }
    }

    this.state = { isVisible };
  }

  public render() {
    const { text, linkUrl, linkText, styles, ...rest } = this.props;
    const { isVisible } = this.state;

    return isVisible ? (
      <MessageBar onDismiss={this._onClose} isMultiline dismissButtonAriaLabel="Close" styles={styles} {...rest}>
        {text}{' '}
        {!!(linkUrl && linkText) && (
          <Link href={linkUrl} target={linkUrl.indexOf('http') === 0 ? '_blank' : ''} underline>
            {linkText}
          </Link>
        )}
      </MessageBar>
    ) : null;
  }

  private _onClose = () => {
    if (this._sessionStorageKey) {
      try {
        sessionStorage.setItem(this._sessionStorageKey, '1');
      } catch (ex) {
        // ignore
      }
    }

    this.setState({
      isVisible: false,
    });
  };
}
