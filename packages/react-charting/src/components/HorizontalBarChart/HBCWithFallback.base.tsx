import * as React from 'react';
import { IHorizontalBarChartProps } from './HorizontalBarChart.types';
import { ErrorBoundary } from '../CommonComponents/ErrorBoundary';
import { HorizontalBarChartBase } from './HorizontalBarChart.base';
import { isHorizontalBarChartEmpty } from '../CommonComponents/error-utils';

export class HorizontalBarChartWithFallbackBase extends React.Component<IHorizontalBarChartProps> {
  public render() {
    return (
      <ErrorBoundary
        handleError={this.props.errorProps ? this.props.errorProps!.handleError : undefined}
        handleEmptyState={this.props.errorProps ? this.props.errorProps!.handleEmptyState : undefined}
        theme={this.props.theme}
        hasEmptyState={isHorizontalBarChartEmpty(this.props.data)}
        customErrorMsg={this.props.errorProps ? this.props.errorProps!.customErrorMsg : undefined}
        customEmptyMsg={this.props.errorProps ? this.props.errorProps!.customEmptyMsg : undefined}
        width={this.props.width}
      >
        <HorizontalBarChartBase {...this.props} />
      </ErrorBoundary>
    );
  }
}
