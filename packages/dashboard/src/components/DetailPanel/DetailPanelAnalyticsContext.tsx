import * as React from 'react';
import { IDetailPanelAnalytics } from './DetailPanel.types';

const AnalyticsContext = React.createContext<IDetailPanelAnalytics>({});

const withAnalyticsHandler = <T extends IDetailPanelAnalytics, R = Pick<T, Exclude<keyof T, keyof IDetailPanelAnalytics>>>(
  Component: React.ComponentClass<T> | React.FunctionComponent<T>
): React.ComponentClass<R> => {
  return class ComponentWithAnalyticsHanlder extends React.PureComponent<R> {
    public render(): React.ReactNode {
      const props: T = (this.props as {}) as T;
      return (
        <AnalyticsContext.Consumer>
          {(analytics: IDetailPanelAnalytics) => {
            {
              return <Component analyticsHandler={analytics.analyticsHandler} {...props} />;
            }
          }}
        </AnalyticsContext.Consumer>
      );
    }
  };
};

export { AnalyticsContext, withAnalyticsHandler };
