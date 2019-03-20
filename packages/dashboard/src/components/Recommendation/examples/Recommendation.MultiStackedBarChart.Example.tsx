import * as React from 'react';

import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

import { Recommendation } from '../Recommendation';
import { IRecommendationBannerChartData, VisualizationType, IRecommendationBannerChartDataPoint } from '../Recommendation.types';

import { wrappingContainerHeight, wrappingContainerWidth, IRecommendationExampleState } from './RecommendationExamples.Common';

interface IDlpRecommendationStyles {
  sampleContainerStyle: IStyle;

  visualizationStyle: IStyle;

  visualizationContainerAlternate: IStyle;
}

const getStyles = (): IDlpRecommendationStyles => {
  return {
    sampleContainerStyle: {
      width: wrappingContainerWidth,
      height: wrappingContainerHeight
    },
    visualizationStyle: {
      flex: 1
    },
    visualizationContainerAlternate: {
      marginTop: -10
    }
  };
};

const getVisualizationData = (): IRecommendationBannerChartData[] => {
  const firstChartDataPoints: IRecommendationBannerChartDataPoint[] = [
    { datapointText: 'Debit card numbers (EU and USA)', datapointValue: 40 },
    { datapointText: 'Passport numbers (USA)', datapointValue: 23 },
    { datapointText: 'Social security numbers', datapointValue: 35 }
  ];

  const firstChartData: IRecommendationBannerChartData = {
    chartTitle: 'Monitored',
    chartData: firstChartDataPoints
  };

  const secondChartDataPoints: IRecommendationBannerChartDataPoint[] = [
    { datapointText: 'Credit card numbers', datapointValue: 40 },
    { datapointText: 'Tax identification numbers (USA)', datapointValue: 23 }
  ];

  const secondChartData: IRecommendationBannerChartData = {
    chartTitle: 'Unmonitored',
    chartData: secondChartDataPoints
  };

  return [firstChartData, secondChartData];
};

export class RecommendationMultiStackedBarChartExample extends React.Component<{}, IRecommendationExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      dismissed: false
    };
  }

  public render(): JSX.Element | null {
    const getClassNames = classNamesFunction<{}, IDlpRecommendationStyles>();
    const classNames = getClassNames(getStyles!);

    const recommendationBarTitle = 'Recommended based on your DLP Policies';
    const recommendationDescriptionHeader = 'Protect your sensitive info';
    // tslint:disable-next-line:max-line-length
    const recommendationDescription = `Some sensitive information types aren't currently monotired and could be shared accidentally. We recommend creating a data loss prevention (DLP) policy to detect when items containing this sensitive info are shared with people outside your org.`;

    return this.state.dismissed === true ? null : (
      <div className={classNames.sampleContainerStyle}>
        <Recommendation
          recommendationBarTitle={recommendationBarTitle}
          recommendationDescriptionHeader={recommendationDescriptionHeader}
          recommendationDescription={recommendationDescription}
          handleViewRecommendationClick={this.onViewRecommendationClick}
          handleDismissRecommendationClick={this.onDimissRecommendationClick}
          recommendationVisualization={VisualizationType.MultiStackBarChart}
          chartVisualizationData={getVisualizationData()}
        />
      </div>
    );
  }

  private onViewRecommendationClick = () => {
    alert('View Recommendation clicked from Recommendation Dlp Example');
  };

  private onDimissRecommendationClick = () => {
    alert('Dismissing Dlp Recommendation');
    this.setState({
      dismissed: true
    });
  };
}
