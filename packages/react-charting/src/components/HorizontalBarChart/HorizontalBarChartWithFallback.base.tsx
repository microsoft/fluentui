/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import * as React from 'react';
import { IHorizontalBarChartProps } from './HorizontalBarChart.types';
import { ErrorBoundary } from '../CommonComponents/ErrorBoundary';
import { HorizontalBarChartBase } from './HorizontalBarChart.base';
import { isHorizontalBarChartEmpty } from '../CommonComponents/error-utils';

// Create a class to render the HorizontalBarChart within ErrorBoundary
export class HorizontalBarChartWithFallback extends React.Component<IHorizontalBarChartProps> {
  render() {
    return (
      <ErrorBoundary
        handleError={this.props.handleError}
        handleEmptyState={this.props.handleEmptyState}
        theme={this.props.theme}
        hasEmptyState={isHorizontalBarChartEmpty(this.props.data)}
        customErrorMsg={this.props.customErrorMsg}
        customEmptyMsg={this.props.customEmptyMsg}
        width={this.props.width}
      >
        <HorizontalBarChartBase {...this.props} />
      </ErrorBoundary>
    );
  }
}
