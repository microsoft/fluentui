import * as React from 'react';
import { IDetailPanelProps } from './DetailPanel.types';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { MainBody } from './Body/MainBody';

const detailPanel: React.SFC<IDetailPanelProps> = (props: IDetailPanelProps) => {
    const _renderElement = () => {
        return (
            <Panel
                isOpen
                type={PanelType.medium}>
                <MainBody {...props} />
            </Panel>
        );
    }

    return _renderElement();
}

export {
    detailPanel as DetailPanel
}
