/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import * as React from 'react';
import { IHorizontalBarChartWithAxisProps } from './HorizontalBarChartWithAxis.types';
import { ErrorBoundary } from '../CommonComponents/ErrorBoundary';
import { HorizontalBarChartWithAxisBase } from './HorizontalBarChartWithAxis.base';
import { isHorizontalBarChartWithAxisEmpty } from '../CommonComponents/error-utils';

// Create a class to render the HorizontalBarChartWithAxis within ErrorBoundary
export class HorizontalBarChartWithAxisWithFallback extends React.Component<IHorizontalBarChartWithAxisProps> {
  render() {
    return (
      <ErrorBoundary
        handleError={this.props.handleError}
        handleEmptyState={this.props.handleEmptyState}
        theme={this.props.theme}
        hasEmptyState={isHorizontalBarChartWithAxisEmpty(this.props.data)}
        customErrorMsg={this.props.customErrorMsg}
        customEmptyMsg={this.props.customEmptyMsg}
        width={this.props.width}
      >
        <HorizontalBarChartWithAxisBase {...this.props} />
      </ErrorBoundary>
    );
  }
}
