import * as React from 'react';
import { IDetailPanelPivotItemProps, IDetailInfoTileProps, IDetailPanelErrorResult, IDetailPanelBaseCommonAction } from '../DetailPanel.types';
import { _isReactComponent } from '../Utils';
import { DetailInfoTile } from './DetailTile';

interface IDetailPanelPivotItemStates {
    onLoading: boolean;
    contentElement?: JSX.Element;
}

type DetailPanelPivotItemProps = IDetailPanelPivotItemProps & IDetailPanelBaseCommonAction;

class DetailPanelPivotItem extends React.PureComponent<DetailPanelPivotItemProps, IDetailPanelPivotItemStates>{
    constructor(props: DetailPanelPivotItemProps) {
        super(props);
        this.state = {
            onLoading: false,
            contentElement: undefined
        };
    }

    public render() {
        const { content } = this.props;
        if (content) {
            return this._renderElement(content);
        }

        const { onLoading, contentElement } = this.state;
        if (onLoading) {
            // render loading animation
        }

        return contentElement ? contentElement : null;
    }

    public componentDidMount() {
        const { onContentLoad } = this.props;
        if (onContentLoad) {
            this.setState({ onLoading: true });
            Promise.resolve(onContentLoad()).then((_: JSX.Element | IDetailInfoTileProps[]) => {
                this.setState({
                    onLoading: false,
                    contentElement: this._renderElement(_)
                });
            }).catch((err: IDetailPanelErrorResult) => {
                // Set error message
                this.setState({
                    onLoading: false
                });
            })
        }
    }

    private _renderElement = (content: JSX.Element | IDetailInfoTileProps[]) => {
        // Just render the content
        if (_isReactComponent(content)) {
            return content as JSX.Element;
        }

        return this._renderTitles(content as IDetailInfoTileProps[])
    }

    private _renderTitles = (tiles: IDetailInfoTileProps[]) => {
        return (
            <div>
                {
                    tiles.map((_: IDetailInfoTileProps, i: number) =>
                        <DetailInfoTile key={`${i}_${_.title}`} {..._} />)
                }
            </div>
        );
    }
}

export {
    DetailPanelPivotItem
}
