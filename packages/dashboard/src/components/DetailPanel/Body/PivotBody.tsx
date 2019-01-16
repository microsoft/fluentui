import * as React from 'react';
import { IDetailPanelBaseCommonAction, IDetailPanelPivotBodyProps, IDetailPanelPivotBodyItem } from '../DetailPanel.types';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';

type PivotBodyProps = IDetailPanelPivotBodyProps & IDetailPanelBaseCommonAction;

const pivotBody: React.SFC<PivotBodyProps> = (props: PivotBodyProps) => {
    const _onPivotItemClick = (item?: PivotItem) => {
        if (item) {
            const { onPivotLinkClick } = props;
            if (onPivotLinkClick) {
                onPivotLinkClick(item.props.itemKey!);
            }
        }
    };

    const _renderElement = () => {
        const { selectedPivotKey, items } = props;
        return (
            <Pivot
                selectedKey={selectedPivotKey}
                onLinkClick={_onPivotItemClick}
            >
                {items && items.map((_: IDetailPanelPivotBodyItem) => {
                    return (
                        <PivotItem
                            key={_.itemKey}
                        >

                        </PivotItem>
                    )
                })}
            </Pivot>
        );
    }

    return _renderElement();
}

export {
    pivotBody as PivotBody
};
