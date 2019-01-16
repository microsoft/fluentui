import * as React from 'react';
import { IDetailPanelProps } from './DetailPanel.types';
import { DetailPanelBase } from './DetailPanel.Base';

const detailPanel: React.SFC<IDetailPanelProps> = (props: IDetailPanelProps) => {
    const _renderElement = () => {
        return <DetailPanelBase {...props} />;
    };

    return _renderElement();
};

export { detailPanel as DetailPanel };
