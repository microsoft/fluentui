import * as React from 'react';
import { LoadingType, IDetailPanelMessageBannerProps, IDetailPanelMainBodyProps } from '../DetailPanel.types';
import { Loading } from './Loading';
import { MessageBanner } from './MessageBanner';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

interface IIDetailPanelMainBodyStates {
  isLoading: boolean;
  element?: JSX.Element;
}

class MainBody extends React.PureComponent<IDetailPanelMainBodyProps, IIDetailPanelMainBodyStates> {
  constructor(props: IDetailPanelMainBodyProps) {
    super(props);
    this.state = { isLoading: false, element: undefined };
  }

  public render(): JSX.Element {
    const { isLoading, element } = this.state;

    if (isLoading) {
      // Loading stage, show shimmer
      return this._getShimmer();
    }

    // return the rendered element
    return element!;
  }

  public componentDidMount(): void {
    const { onElementRender } = this.props;
    this.setState({ isLoading: true });
    Promise.resolve(onElementRender())
      .then((_: JSX.Element) => {
        this.setState({ element: _, isLoading: false });
      })
      .catch((err: IDetailPanelMessageBannerProps) => {
        if (err) {
          // set the error message to element
          const errorContent = (
            <div>
              <MessageBanner messageType={MessageBarType.error} message={err.message} onDismissAction={err.onDismissAction} />
            </div>
          );

          this.setState({ element: errorContent, isLoading: false });
        }
      });
  }

  private _getShimmer(): JSX.Element {
    const { shimmer } = this.props;
    if (shimmer) {
      return shimmer;
    }

    // return the default shimmer for main body load
    return <Loading loadingType={LoadingType.Content} />;
  }
}

export { MainBody };
