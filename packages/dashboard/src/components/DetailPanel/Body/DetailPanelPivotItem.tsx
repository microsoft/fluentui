import * as React from 'react';
import {
  IDetailPanelPivotItemProps,
  IDetailInfoTileProps,
  IDetailPanelErrorResult,
  IDetailPanelBaseCommonAction,
  LoadingTheme
} from '../DetailPanel.types';
import { _isReactComponent } from '../Utils';
import { DetailInfoTile } from './DetailTile';
import { MessageBanner } from './MessageBanner';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { detailPanelPivotItemStyles, detailPanelBaseStyles } from '../DetailPanel.styles';

interface IDetailPanelPivotItemStates {
  contentElement?: JSX.Element;
  loadingElement?: JSX.Element;
}

type DetailPanelPivotItemProps = IDetailPanelPivotItemProps & IDetailPanelBaseCommonAction;

class DetailPanelPivotItem extends React.PureComponent<DetailPanelPivotItemProps, IDetailPanelPivotItemStates> {
  private _isMounted = false;
  constructor(props: DetailPanelPivotItemProps) {
    super(props);
    this.state = {
      loadingElement: undefined,
      contentElement: undefined
    };
  }

  public render(): JSX.Element {
    const css = detailPanelPivotItemStyles;
    return <div className={css.generalContainer}>{this._renderContent()}</div>;
  }

  public componentDidUpdate(prevProps: DetailPanelPivotItemProps): void {
    if (this.props.actionBar !== prevProps.actionBar) {
      if (this.props.onSetActionBar) {
        this.props.onSetActionBar(this.props.actionBar);
      }
    }
  }

  public componentDidMount(): void {
    const { onContentLoad, onGetLoadingElement, itemKey, actionBar, onSetActionBar } = this.props;

    this._isMounted = true;

    if (onContentLoad) {
      if (onSetActionBar) {
        onSetActionBar(undefined);
      }
      const loadingElement = onGetLoadingElement!(LoadingTheme.OnPivotItemLoad, itemKey);

      this.setState({ loadingElement: loadingElement });

      Promise.resolve(onContentLoad())
        .then((_: JSX.Element | IDetailInfoTileProps[]) => {
          if (this._isMounted) {
            this.setState({
              loadingElement: undefined,
              contentElement: this._renderElement(_)
            });

            if (onSetActionBar) {
              onSetActionBar(actionBar);
            }
          }
        })
        .catch((err: IDetailPanelErrorResult) => {
          // Set error message
          if (this._isMounted) {
            if (err && err.messageBannerSetting) {
              const messageBanner = (
                <MessageBanner
                  message={err.messageBannerSetting.message}
                  messageType={
                    err.messageBannerSetting.messageType === undefined ? MessageBarType.error : err.messageBannerSetting.messageType
                  }
                />
              );
              this.setState({
                contentElement: messageBanner
              });
            }

            this.setState({
              loadingElement: undefined
            });
          }
        });
    } else {
      if (onSetActionBar) {
        onSetActionBar(actionBar);
      }
    }
  }

  public componentWillUnmount(): void {
    this._isMounted = false;
  }

  private _renderMessageBanner = () => {
    const { messageBanner } = this.props;
    const css = detailPanelBaseStyles;
    if (messageBanner && !messageBanner.forceGlobal) {
      return (
        <div className={css.messageBar}>
          <MessageBanner {...messageBanner} />
        </div>
      );
    }
    return null;
  };

  private _renderContent = () => {
    const { content } = this.props;
    if (content) {
      return (
        <>
          {this._renderMessageBanner()}
          {this._renderElement(content)}
        </>
      );
    }

    const { loadingElement, contentElement } = this.state;
    if (loadingElement) {
      // render loading animation
      return loadingElement;
    }

    if (contentElement) {
      return contentElement;
    }

    return null;
  };

  private _renderElement = (content: JSX.Element | IDetailInfoTileProps[]) => {
    // Just render the content
    if (_isReactComponent(content)) {
      return content as JSX.Element;
    }

    return this._renderTitles(content as IDetailInfoTileProps[]);
  };

  private _renderTitles = (tiles: IDetailInfoTileProps[]) => {
    const css = detailPanelPivotItemStyles;
    return (
      <div className={css.tilesContainer}>
        {tiles.map((_: IDetailInfoTileProps, i: number) => (
          <DetailInfoTile key={`${i}_${_.title}`} {..._} />
        ))}
      </div>
    );
  };
}

export { DetailPanelPivotItem, DetailPanelPivotItemProps, IDetailPanelPivotItemStates };
