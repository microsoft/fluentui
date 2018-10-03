import * as React from 'react';

import { IChartProps, IChartDataPoint, MultiStackedBarChart } from '@uifabric/charting';
import { IStyle, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

import { Recommendation } from '../Recommendation';

import { wrappingContainerHeight, wrappingContainerWidth, IRecommendationExampleState } from './RecommendationExamples.Common';

interface IMultiSBCVisualizationStyles {
  visualizationContainer: IStyle;
}

const getMultiSBCVisualizationStyles = (): IMultiSBCVisualizationStyles => ({
  visualizationContainer: {
    paddingTop: 10
  }
});

const DlpVisualization = () => {
  const getClassNames = classNamesFunction<{}, IMultiSBCVisualizationStyles>();
  const classNames = getClassNames(getMultiSBCVisualizationStyles!);

  const firstChartPoints: IChartDataPoint[] = [
    { legend: 'Debit card numbers (EU and USA)', data: 40, color: DefaultPalette.blue },
    { legend: 'Passport numbers (USA)', data: 23, color: DefaultPalette.red },
    { legend: 'Social security numbers', data: 35, color: DefaultPalette.blueLight },
    { legend: 'Credit card numbers', data: 87, color: DefaultPalette.green },
    { legend: 'Tax identification numbers (USA)', data: 87, color: DefaultPalette.yellow }
  ];

  const secondChartPoints: IChartDataPoint[] = [
    { legend: 'Phone Numbers', data: 40, color: DefaultPalette.blue },
    { legend: 'Credit card Numbers', data: 23, color: DefaultPalette.purpleLight },
    { legend: 'Asset Numbers', data: 35, color: DefaultPalette.orangeLight }
  ];

  const data: IChartProps[] = [
    {
      chartTitle: 'Monitored',
      chartData: firstChartPoints
    },
    {
      chartTitle: 'Unmonitored',
      chartData: secondChartPoints
    }
  ];

  return (
    <div className={classNames.visualizationContainer}>
      <MultiStackedBarChart data={data} />
    </div>
  );
};

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
    const recommendationDescriptionHeaderLong = 'The quick brown fox jumps over the lazy dog';
    const recommendationDescriptionHeaderVeryLong =
      'The quick brown fox jumps over the lazy dog, The quick brown fox jumps over the lazy dog';
    // tslint:disable-next-line:max-line-length
    const recommendationDescription = `Some sensitive information types aren't currently monotired and could be shared accidentally. We recommend creating a data loss prevention (DLP) policy to detect when items containing this sensitive info are shared with people outside your org.`;

    return this.state.dismissed === true ? null : (
      <>
        <div className={classNames.sampleContainerStyle}>
          <Recommendation
            recommendationBarTitle={recommendationBarTitle}
            recommendationDescriptionHeader={recommendationDescriptionHeader}
            recommendationDescription={recommendationDescription}
            handleViewRecommendationClick={this.onViewRecommendationClick}
            handleDismissRecommendationClick={this.onDimissRecommendationClick}
          >
            <div className={classNames.visualizationStyle}>
              <DlpVisualization />
            </div>
          </Recommendation>
        </div>
        <div className={classNames.sampleContainerStyle}>
          <Recommendation
            recommendationBarTitle={recommendationBarTitle}
            recommendationDescriptionHeader={recommendationDescriptionHeader}
            recommendationDescription={recommendationDescription}
            handleViewRecommendationClick={this.onViewRecommendationClick}
            handleDismissRecommendationClick={this.onDimissRecommendationClick}
            centerDataVisualization
          >
            <div className={classNames.visualizationContainerAlternate}>
              <DlpVisualization />
            </div>
          </Recommendation>
        </div>
        <div className={classNames.sampleContainerStyle}>
          <Recommendation
            recommendationBarTitle={recommendationBarTitle}
            recommendationDescriptionHeader={recommendationDescriptionHeaderLong}
            recommendationDescription={recommendationDescription}
            handleViewRecommendationClick={this.onViewRecommendationClick}
            handleDismissRecommendationClick={this.onDimissRecommendationClick}
            centerDataVisualization
          >
            <div className={classNames.visualizationContainerAlternate}>
              <DlpVisualization />
            </div>
          </Recommendation>
        </div>
        <div className={classNames.sampleContainerStyle}>
          <Recommendation
            recommendationBarTitle={recommendationBarTitle}
            recommendationDescriptionHeader={recommendationDescriptionHeaderVeryLong}
            recommendationDescription={recommendationDescription}
            handleViewRecommendationClick={this.onViewRecommendationClick}
            handleDismissRecommendationClick={this.onDimissRecommendationClick}
            centerDataVisualization
          >
            <div className={classNames.visualizationContainerAlternate}>
              <DlpVisualization />
            </div>
          </Recommendation>
        </div>
      </>
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
