import * as React from 'react';
import {
  IDetailPanelBaseCommonAction,
  IDetailPanelPivotBodyProps,
  IDetailPanelPivotBodyItem,
  IDetailPanelAnalytics
} from '../DetailPanel.types';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { DetailPanelPivotItem } from './DetailPanelPivotItem';
import { withAnalyticsHandler } from '../DetailPanelAnalyticsContext';

type DetailPanelPivotBodyProps = IDetailPanelPivotBodyProps & IDetailPanelBaseCommonAction & IDetailPanelAnalytics;

const detailPanelPivotBody: React.SFC<DetailPanelPivotBodyProps> = (props: DetailPanelPivotBodyProps) => {
  const _onPivotItemClick = (item?: PivotItem) => {
    if (item) {
      const { onPivotLinkClick, analyticsHandler } = props;

      if (analyticsHandler) {
        analyticsHandler(`pivotTab`, 'click', props, { key: item.props.itemKey });
      }

      if (onPivotLinkClick) {
        onPivotLinkClick(item.props.itemKey!);
      }
    }
  };

  const _renderElement = () => {
    const { selectedPivotKey, items, onGetLoadingElement, onSetActionBar, messageBanner } = props;
    return (
      <Pivot selectedKey={selectedPivotKey} onLinkClick={_onPivotItemClick}>
        {items &&
          items.map((_: IDetailPanelPivotBodyItem, i: number) => {
            return (
              <PivotItem key={`${i}_${_.itemKey}`} {..._}>
                <DetailPanelPivotItem
                  itemKey={_.itemKey}
                  onContentLoad={_.onContentLoad}
                  content={_.content}
                  actionBar={_.actionBar}
                  onGetLoadingElement={onGetLoadingElement}
                  onSetActionBar={onSetActionBar}
                  messageBanner={messageBanner}
                />
              </PivotItem>
            );
          })}
      </Pivot>
    );
  };

  return _renderElement();
};

const DetailPanelPivotBody = withAnalyticsHandler<DetailPanelPivotBodyProps>(detailPanelPivotBody);

export { DetailPanelPivotBody, DetailPanelPivotBodyProps };
