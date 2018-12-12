import * as React from 'react';
import { Recommendation } from '../Recommendation';
import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import {
  dlpItemCommonStyles,
  baseFontFamily,
  wrappingContainerHeight,
  wrappingContainerWidth,
  largeFontSize,
  regularFontWeight,
  IRecommendationExampleState
} from './RecommendationExamples.Common';
import { mergeStyles } from 'office-ui-fabric-react';

interface IDlpLineItemStyles {
  dlpLineItemContainer: IStyle;

  dlpLineItemName: IStyle;

  dlpLineItemDataContainer: IStyle;

  dlpLineItemDataCurrent: IStyle;

  dlpLineItemDataTotal: IStyle;
}

interface IDlpLineItemProps {
  lineItemName: string;

  lineItemDataCurrentCount: string;

  lineItemDataTotalCount: string;
}

const currentLineItemDataColor = 'rgba(247,148,30,1)';
const totalLineItemDataColor = 'rgba(132,132,132,1)';

const getDlpLineItemStyles = (): IDlpLineItemStyles => {
  return {
    dlpLineItemContainer: {
      display: 'flex',
      paddingBottom: 12,
      alignItems: 'flex-end',
      justifyContent: 'flex-end'
    },
    dlpLineItemName: mergeStyles(dlpItemCommonStyles, {
      color: 'rgba(0,0,0,1)',
      paddingRight: 24
    }),
    dlpLineItemDataContainer: mergeStyles(dlpItemCommonStyles, {
      display: 'flex'
    }),
    dlpLineItemDataCurrent: {
      color: currentLineItemDataColor
    },
    dlpLineItemDataTotal: {
      color: totalLineItemDataColor
    }
  };
};

const DlpLineItem = (props: IDlpLineItemProps) => {
  const getClassNames = classNamesFunction<{}, IDlpLineItemStyles>();
  const classNames = getClassNames(getDlpLineItemStyles!);

  return (
    <div className={classNames.dlpLineItemContainer}>
      <div className={classNames.dlpLineItemName}>{props.lineItemName}</div>
      <div className={classNames.dlpLineItemDataContainer}>
        <span className={classNames.dlpLineItemDataCurrent}>{props.lineItemDataCurrentCount}</span>
        &nbsp;/&nbsp;
        <span className={classNames.dlpLineItemDataTotal}>{props.lineItemDataTotalCount} items</span>
      </div>
    </div>
  );
};

interface IDlpVisualizationProps {
  dlpVisualizationHeaderText: string;
  dlpLineItems: IDlpLineItemProps[];
}

interface IDlpVisualizationStyles {
  visualizationContainer: IStyle;
  visualizationHeader: IStyle;
}

const getDlpVisualizationStyles = (): IDlpVisualizationStyles => ({
  visualizationContainer: {
    paddingTop: 10
  },
  visualizationHeader: {
    fontFamily: baseFontFamily,
    fontSize: largeFontSize,
    fontWeight: regularFontWeight,
    color: 'rgba(132,132,132,1)',
    textAlign: 'right',
    paddingBottom: 24
  }
});

const DlpVisualization = (props: IDlpVisualizationProps) => {
  const getClassNames = classNamesFunction<{}, IDlpVisualizationStyles>();
  const classNames = getClassNames(getDlpVisualizationStyles!);

  return (
    <div className={classNames.visualizationContainer}>
      <div className={classNames.visualizationHeader}>{props.dlpVisualizationHeaderText}</div>
      {props.dlpLineItems.map((dlpLineItem: IDlpLineItemProps) => (
        <DlpLineItem
          key={dlpLineItem.lineItemName}
          lineItemName={dlpLineItem.lineItemName}
          lineItemDataCurrentCount={dlpLineItem.lineItemDataCurrentCount}
          lineItemDataTotalCount={dlpLineItem.lineItemDataTotalCount}
        />
      ))}
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

export class RecommendationCustomDataVizExample extends React.Component<{}, IRecommendationExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      dismissed: false
    };
  }

  public render(): JSX.Element | null {
    const getClassNames = classNamesFunction<{}, IDlpRecommendationStyles>();
    const classNames = getClassNames(getStyles!);

    const dlpVisualizationData: IDlpLineItemProps[] = [
      {
        lineItemName: 'Passport numbers (USA and UK)',
        lineItemDataCurrentCount: '25,582',
        lineItemDataTotalCount: '57,386'
      },
      {
        lineItemName: 'Credit card numbers',
        lineItemDataCurrentCount: '22,958',
        lineItemDataTotalCount: '57,386'
      },
      {
        lineItemName: 'Debit card numbers (USA and EU)',
        lineItemDataCurrentCount: '17,633',
        lineItemDataTotalCount: '57,386'
      },
      {
        lineItemName: 'Tax identification numbers (USA)',
        lineItemDataCurrentCount: '4,659',
        lineItemDataTotalCount: '57,386'
      },
      {
        lineItemName: 'Social security numbers (USA)',
        lineItemDataCurrentCount: '2,134',
        lineItemDataTotalCount: '57,386'
      }
    ];

    const recommendationBarTitle = 'Recommended based on your DLP Policies';
    const recommendationDescriptionHeader = 'Protect your sensitive info';
    // tslint:disable-next-line:max-line-length
    const recommendationDescription = `Some sensitive information types aren't currently monotired and could be shared accidentally. We recommend creating a data loss prevention (DLP) policy to detect when items containing this sensitive info are shared with people outside your org.`;
    const visualizationHeaderText = 'Unprotected Items';

    return this.state.dismissed === true ? null : (
      <div className={classNames.sampleContainerStyle}>
        <Recommendation
          recommendationBarTitle={recommendationBarTitle}
          recommendationDescriptionHeader={recommendationDescriptionHeader}
          recommendationDescription={recommendationDescription}
          handleViewRecommendationClick={this.onViewRecommendationClick}
          handleDismissRecommendationClick={this.onDimissRecommendationClick}
        >
          <div>
            <DlpVisualization dlpVisualizationHeaderText={visualizationHeaderText} dlpLineItems={dlpVisualizationData} />
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
