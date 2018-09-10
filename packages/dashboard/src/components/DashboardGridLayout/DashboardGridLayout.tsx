import * as React from 'react';
import { IDashboardGridLayoutProps } from './DashboardGridLayout.types';
import { DashboardGridLayoutBase } from './DashboardGridLayoutBase';

export class DashboardGridLayout extends React.Component<IDashboardGridLayoutProps, {}> {
  public render(): JSX.Element {
    return <DashboardGridLayoutBase {...this.props} />;
  }
}
