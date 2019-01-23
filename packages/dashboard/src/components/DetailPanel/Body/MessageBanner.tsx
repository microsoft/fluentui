import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar';
import * as React from 'react';

import { IDetailPanelMessageBannerProps, IDetailPanelAnalytics } from '../DetailPanel.types';
import { withAnalyticsHandler } from '../DetailPanelAnalyticsContext';

interface IDetailPanelMessageBannerStates {
  show: boolean;
}

type DetailPanelMessageBannerProps = IDetailPanelMessageBannerProps & IDetailPanelAnalytics;

class MessageBannerC extends React.PureComponent<DetailPanelMessageBannerProps, IDetailPanelMessageBannerStates> {
  constructor(props: DetailPanelMessageBannerProps) {
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
    const { onDismissAction, analyticsHandler } = this.props;
    if (onDismissAction) {
      if (analyticsHandler) {
        analyticsHandler('messageCloseButton', 'click', this.props);
      }
      onDismissAction();
    }

    this.setState({ show: false });
  };
}

const MessageBanner = withAnalyticsHandler<DetailPanelMessageBannerProps>(MessageBannerC);

export { MessageBanner, IDetailPanelMessageBannerStates };
