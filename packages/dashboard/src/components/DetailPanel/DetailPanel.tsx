import * as React from 'react';
import { IDetailPanelProps } from './DetailPanel.types';
import { MainBody } from './Body/MainBody';

const detailPanel: React.SFC<IDetailPanelProps> = (props: IDetailPanelProps) => {
    const _renderElement = () => {
        return (
            <MainBody {...props} />
        );
    };

    return _renderElement();
};

export { detailPanel as DetailPanel };
