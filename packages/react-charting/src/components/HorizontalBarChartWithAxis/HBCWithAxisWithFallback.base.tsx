import * as React from 'react';
import { IHorizontalBarChartWithAxisProps } from './HorizontalBarChartWithAxis.types';
import { ErrorBoundary } from '../CommonComponents/ErrorBoundary';
import { HorizontalBarChartWithAxisBase } from './HorizontalBarChartWithAxis.base';
import { isHorizontalBarChartWithAxisEmpty } from '../CommonComponents/error-utils';

export class HorizontalBarChartWithAxisWithFallbackBase extends React.Component<IHorizontalBarChartWithAxisProps> {
  public render() {
    return (
      <ErrorBoundary
        handleError={this.props.errorProps ? this.props.errorProps!.handleError : undefined}
        handleEmptyState={this.props.errorProps ? this.props.errorProps!.handleEmptyState : undefined}
        theme={this.props.theme}
        hasEmptyState={isHorizontalBarChartWithAxisEmpty(this.props.data)}
        customErrorMsg={this.props.errorProps ? this.props.errorProps!.customErrorMsg : undefined}
        customEmptyMsg={this.props.errorProps ? this.props.errorProps!.customEmptyMsg : undefined}
        width={this.props.width}
      >
        <HorizontalBarChartWithAxisBase {...this.props} />
      </ErrorBoundary>
    );
  }
}
