import * as React from 'react';
import { IDetailPanelBaseCommonAction, IDetailPanelPivotBodyProps, IDetailPanelPivotBodyItem } from '../DetailPanel.types';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { DetailPanelPivotItem } from './DetailPanelPivotItem';

type DetailPanelPivotBodyProps = IDetailPanelPivotBodyProps & IDetailPanelBaseCommonAction;

const detailPanelPivotBody: React.SFC<DetailPanelPivotBodyProps> = (props: DetailPanelPivotBodyProps) => {
  const _onPivotItemClick = (item?: PivotItem) => {
    if (item) {
      const { onPivotLinkClick } = props;
      if (onPivotLinkClick) {
        onPivotLinkClick(item.props.itemKey!);
      }
    }
  };

  const _renderElement = () => {
    const { selectedPivotKey, items, onGetLoadingElement, onSetActionBar } = props;
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
                />
              </PivotItem>
            );
          })}
      </Pivot>
    );
  };

  return _renderElement();
};

export { detailPanelPivotBody as DetailPanelPivotBody, DetailPanelPivotBodyProps };
