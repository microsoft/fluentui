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
    { datapointText: '', datapointValue: 230 },
    { datapointText: '', datapointValue: 0 }
  ];

  const firstChartData: IRecommendationBannerChartData = {
    chartTitle: 'Unlabeled docs with sensitive info',
    chartData: firstChartDataPoints
  };

  const secondChartDataPoints: IRecommendationBannerChartDataPoint[] = [
    { datapointText: '', datapointValue: 0 },
    { datapointText: '', datapointValue: 230 }
  ];

  const secondChartData: IRecommendationBannerChartData = {
    chartTitle: 'Labeled docs with sensitive info',
    chartData: secondChartDataPoints
  };

  return [firstChartData, secondChartData];
};

export class RecommendationStackedBarChartExample extends React.Component<{}, IRecommendationExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      dismissed: false
    };
  }

  public render(): JSX.Element | null {
    const getClassNames = classNamesFunction<{}, IDlpRecommendationStyles>();
    const classNames = getClassNames(getStyles!);

    const recommendationBarTitle = 'Recommended based on sensitive info detected';
    const recommendationDescriptionHeader = 'Help users classify sensitive info';
    // tslint:disable-next-line:max-line-length
    const recommendationDescription = `Create labels like "Confidential" and "Personal" that people can use to classify their email and docs. You can then add protection settings like encryption or restricted sharing to specific labels.`;

    return this.state.dismissed === true ? null : (
      <div className={classNames.sampleContainerStyle}>
        <Recommendation
          recommendationBarTitle={recommendationBarTitle}
          recommendationDescriptionHeader={recommendationDescriptionHeader}
          recommendationDescription={recommendationDescription}
          handleViewRecommendationClick={this.onViewRecommendationClick}
          handleDismissRecommendationClick={this.onDimissRecommendationClick}
          recommendationVisualization={VisualizationType.StackedBarChart}
          centerDataVisualization={true}
          chartVisualizationData={getVisualizationData()}
        />
      </div>
    );
  }

  private onViewRecommendationClick = () => {
    alert('View Recommendation clicked from Recommendation Mip Example');
  };

  private onDimissRecommendationClick = () => {
    alert('Dismissing Mip Recommendation');
    this.setState({
      dismissed: true
    });
  };
}
