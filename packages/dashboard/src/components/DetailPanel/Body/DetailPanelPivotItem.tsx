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

interface IDetailPanelPivotItemStates {
    contentElement?: JSX.Element;
    loadingElement?: JSX.Element;
}

type DetailPanelPivotItemProps = IDetailPanelPivotItemProps & IDetailPanelBaseCommonAction;

class DetailPanelPivotItem extends React.PureComponent<DetailPanelPivotItemProps, IDetailPanelPivotItemStates> {
    constructor(props: DetailPanelPivotItemProps) {
        super(props);
        this.state = {
            loadingElement: undefined,
            contentElement: undefined
        };
    }

    public render() {
        return <div>{this._renderContent()}</div>;
    }

    public componentDidMount() {
        const { onContentLoad, onGetLoadingElement, itemKey, actionBar, onSetActionBar } = this.props;

        if (onContentLoad) {
            if (onSetActionBar) {
                onSetActionBar(undefined);
            }
            const loadingElement = onGetLoadingElement!(LoadingTheme.OnPivotItemLoad, itemKey);

            this.setState({ loadingElement: loadingElement });

            Promise.resolve(onContentLoad())
                .then((_: JSX.Element | IDetailInfoTileProps[]) => {
                    this.setState({
                        loadingElement: undefined,
                        contentElement: this._renderElement(_)
                    });

                    if (onSetActionBar) {
                        onSetActionBar(actionBar);
                    }
                })
                .catch((err: IDetailPanelErrorResult) => {
                    // Set error message
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
                });
        } else {
            if (onSetActionBar) {
                onSetActionBar(actionBar);
            }
        }
    }

    public _renderContent = () => {
        const { content } = this.props;
        if (content) {
            return this._renderElement(content);
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
        return (
            <div>
                {tiles.map((_: IDetailInfoTileProps, i: number) => (
                    <DetailInfoTile key={`${i}_${_.title}`} {..._} />
                ))}
            </div>
        );
    };
}

export { DetailPanelPivotItem };
