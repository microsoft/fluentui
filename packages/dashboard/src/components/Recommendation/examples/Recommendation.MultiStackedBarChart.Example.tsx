import * as React from 'react';

import { ILegendDataItem, MultiStackedBarChart } from '@uifabric/charting';
import { IStyle, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

import { Recommendation } from '../Recommendation';

import {
  wrappingContainerHeight,
  wrappingContainerWidth,
  IRecommendationExampleState
} from './RecommendationExamples.Common';

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

  const points = [
    [
      { x: 'Debit card numbers (EU and USA)', y: 40 },
      { x: 'Passport numbers (USA)', y: 23 },
      { x: 'Social security numbers', y: 35 },
      { x: 'Credit card numbers', y: 87 },
      { x: 'Tax identification numbers (USA)', y: 87 }
    ],
    []
  ];

  const colors: ILegendDataItem[] = [
    { legendText: 'Debit card numbers (EU and USA)', legendColor: DefaultPalette.blueLight },
    { legendText: 'Passport numbers (USA)', legendColor: DefaultPalette.blue },
    { legendText: 'Social security numbers', legendColor: DefaultPalette.blueMid },
    { legendText: 'Credit card numbers', legendColor: DefaultPalette.red },
    { legendText: 'Tax identification numbers (USA)', legendColor: DefaultPalette.black }
  ];

  const chartTitles: string[] = ['Monitored', 'Unmonitored'];

  return (
    <div className={classNames.visualizationContainer}>
      <MultiStackedBarChart data={points} legendData={colors} chartTitles={chartTitles} width={394} />;
    </div>
  );
};

interface IDlpRecommendationStyles {
  sampleContainerStyle: IStyle;

  visualizationStyle: IStyle;
}

const getStyles = (): IDlpRecommendationStyles => {
  return {
    sampleContainerStyle: {
      width: wrappingContainerWidth,
      height: wrappingContainerHeight
    },
    visualizationStyle: {
      flex: 1
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
        >
          <div className={classNames.visualizationStyle}>
            <DlpVisualization />
          </div>
        </Recommendation>
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
