import * as React from 'react';
import { IDetailPanelProps, IDetailPanelAnalytics } from './DetailPanel.types';
import { DetailPanelBase } from './DetailPanel.Base';
import { AnalyticsContext } from './DetailPanelAnalyticsContext';

const detailPanel: React.FunctionComponent<IDetailPanelProps> = (props: IDetailPanelProps) => {
  const _renderElement = () => {
    const analyticsContextValue: IDetailPanelAnalytics = {
      analyticsHandler: props.analyticsHandler
    };

    return (
      <AnalyticsContext.Provider value={analyticsContextValue}>
        <DetailPanelBase {...props} />
      </AnalyticsContext.Provider>
    );
  };

  return _renderElement();
};

export { detailPanel as DetailPanel };
