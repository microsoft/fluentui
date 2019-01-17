import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar';
import * as React from 'react';

import { IDetailPanelMessageBannerProps } from '../DetailPanel.types';

interface IDetailPanelMessageBannerStates {
  show: boolean;
}

class MessageBanner extends React.PureComponent<IDetailPanelMessageBannerProps, IDetailPanelMessageBannerStates> {
  constructor(props: IDetailPanelMessageBannerProps) {
    super(props);
    this.state = { show: true };
  }

  public render(): JSX.Element | null {
    const { show } = this.state;
    if (show) {
      const { message, messageType, onDismissAction } = this.props;
      if (message) {
        return (
          <MessageBar messageBarType={messageType} onDismiss={onDismissAction ? this._onDismissMessage : undefined}>
            {message}
          </MessageBar>
        );
      }
    }

    return null;
  }

  private _onDismissMessage = () => {
    const { onDismissAction } = this.props;
    if (onDismissAction) {
      onDismissAction();
    }

    this.setState({ show: false });
  };
}

export { MessageBanner, IDetailPanelMessageBannerStates };
