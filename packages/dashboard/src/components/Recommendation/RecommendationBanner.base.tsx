import * as React from 'react';

/* Dependent Components */
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { IChartProps, IChartDataPoint, MultiStackedBarChart } from '@uifabric/charting';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { CardFrame, ICardDropDownOption } from '../Card/CardFrame/index';

/* Types for props and styles */
import {
  IRecommendationBannerChartData,
  IRecommendationBannerChartDataPoint,
  IRecommendationProps,
  IRecommendationStyles,
  IRecommendationStyleProps,
  VisualizationType
} from './Recommendation.types';

/* Styles for CardComponent and Recommendation Card */
import { CardComponentStyles } from './Recommendation.styles';

/* Utilities */
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { AutoFontSize } from 'auto-fontsize';

const getClassNames = classNamesFunction<IRecommendationStyleProps, IRecommendationStyles>();
const maxSupportedAutoFont = 28;
const lineHeightForMaxSupportedAutoFont = '36px';
const minSupportedAutoFont = 16;
const lineHeightForMinSupportedAutoFont = '23px';

export class RecommendationBannerBase extends React.Component<IRecommendationProps, {}> {
  /* Default Props */
  public static defaultProps: Partial<IRecommendationProps> = {
    recommendationButtonLocalizedName: 'View Recommendation',
    recommendationButtonAriaDescription: 'Click to View Recommendation',
    dismissRecommendationLocalizedName: 'Dismiss',
    dismissRecommendationAriaLabel: 'Dismiss Recommendation'
  };

  private recommendationMenuItems: ICardDropDownOption[];
  private classNames: IProcessedStyleSet<IRecommendationStyles>;

  constructor(props: IRecommendationProps) {
    super(props);
  }

  public render(): JSX.Element {
    const {
      recommendationBarTitle,
      dismissRecommendationLocalizedName,
      dismissRecommendationAriaLabel,
      handleDismissRecommendationClick,
      theme,
      className,
      styles
    } = this.props;

    this.recommendationMenuItems = [
      {
        name: dismissRecommendationLocalizedName!,
        ariaLabel: dismissRecommendationAriaLabel,
        icon: 'PageRemove',
        title: dismissRecommendationLocalizedName,
        onClick: handleDismissRecommendationClick
      }
    ];

    this.classNames = getClassNames(styles, {
      theme: theme!,
      className: className
    });

    return (
      <CardFrame
        cardTitle={recommendationBarTitle}
        seperatorColor={CardComponentStyles.separatorColor}
        titleTextColor={CardComponentStyles.frameHeaderColor}
        cardDropDownOptions={this.recommendationMenuItems}
        disableDrag={true}
      >
        {this._shouldCenterDataVisualization() ? this._generateFlexColumnLayout() : this._generateFlexRowLayout()}
      </CardFrame>
    );
  }

  private _shouldCenterDataVisualization(): boolean {
    const { centerDataVisualization, recommendationVisualization } = this.props;

    // user passed in value always takes precedence
    if (centerDataVisualization) {
      return centerDataVisualization;
    }

    // if visualizationtype has value and it's StackedBarChart it should be centered
    if (recommendationVisualization === VisualizationType.MultiStackBarChart) {
      return true;
    }

    return false;
  }

  private _generateFlexColumnLayout(): JSX.Element {
    const {
      recommendationDescriptionHeader,
      recommendationDescription,
      recommendationButtonLocalizedName,
      recommendationButtonAriaDescription,
      handleViewRecommendationClick,
      recommendationVisualization
    } = this.props;

    return (
      <div className={this.classNames.recommendationRowContainer}>
        <div className={this.classNames.recommendationHeaderRow}>
          <div className={this.classNames.recommendationHeader}>
            <AutoFontSize
              text={recommendationDescriptionHeader}
              targetElementType={'div'}
              fontSizeMapping={[
                { fontSize: maxSupportedAutoFont, lineHeight: lineHeightForMaxSupportedAutoFont },
                { fontSize: minSupportedAutoFont, lineHeight: lineHeightForMinSupportedAutoFont }
              ]}
              targetLines={2}
            />
          </div>
        </div>
        <div className={this.classNames.recommendationContentRow}>
          <div className={this.classNames.recommendationContentRowText}>
            <div className={this.classNames.recommendationContent}>{recommendationDescription}</div>
            <div className={this.classNames.recommendationCommandRow}>
              <PrimaryButton
                data-automation-id="btnRecommendation"
                name={recommendationButtonLocalizedName}
                onClick={handleViewRecommendationClick}
                ariaDescription={recommendationButtonAriaDescription}
              >
                {recommendationButtonLocalizedName}
              </PrimaryButton>
            </div>
          </div>
          <div className={this.classNames.recommendationContentRowVisualization}>
            {recommendationVisualization ? this._getVisualizationComponent() : this.props.children}
          </div>
        </div>
      </div>
    );
  }

  private _generateFlexRowLayout(): JSX.Element {
    const {
      recommendationDescriptionHeader,
      recommendationDescription,
      recommendationButtonLocalizedName,
      recommendationButtonAriaDescription,
      handleViewRecommendationClick,
      recommendationVisualization
    } = this.props;

    return (
      <div className={this.classNames.recommendationContainer}>
        <div className={this.classNames.recommendationTextContainer}>
          <div className={this.classNames.recommendationHeader}>
            <AutoFontSize
              text={recommendationDescriptionHeader}
              targetElementType={'div'}
              fontSizeMapping={[
                { fontSize: maxSupportedAutoFont, lineHeight: lineHeightForMaxSupportedAutoFont },
                { fontSize: minSupportedAutoFont, lineHeight: lineHeightForMinSupportedAutoFont }
              ]}
              targetLines={2}
            />
          </div>
          <div className={this.classNames.recommendationContent}>{recommendationDescription} </div>
          <div>
            <PrimaryButton
              data-automation-id="btnRecommendation"
              name={recommendationButtonLocalizedName}
              onClick={handleViewRecommendationClick}
              ariaDescription={recommendationButtonAriaDescription}
            >
              {recommendationButtonLocalizedName}
            </PrimaryButton>
          </div>
        </div>
        <div className={this.classNames.recommendationVisualizationContainer}>
          {recommendationVisualization ? this._getVisualizationComponent() : this.props.children}
        </div>
      </div>
    );
  }

  private _getVisualizationComponent(): JSX.Element | null {
    const { recommendationVisualization } = this.props;
    switch (recommendationVisualization) {
      case VisualizationType.ImageIllustration:
        return this._renderImageIllustrationVisualization();
      case VisualizationType.MultiStackBarChart:
        return this._renderStackedBarChartVisualization();
      default:
        return null;
    }
  }

  private _renderImageIllustrationVisualization(): JSX.Element | null {
    const { imageVisualizationSrc } = this.props;
    if (imageVisualizationSrc) {
      return (
        <div className={this.classNames.imageIllustrationContainerStyle}>
          <img src={imageVisualizationSrc} className={this.classNames.imageIllustrationStyle} />
        </div>
      );
    }

    return null;
  }

  private _renderStackedBarChartVisualization(): JSX.Element | null {
    const { chartVisualizationData } = this.props;
    const legendColors = ['#0078D4', '#0B6A0B', '#662D91', '#038387', '#00AE56'];
    const legendColorLength = legendColors.length;
    let counter = 0;
    const chartData: IChartProps[] = [];
    const hideRatio: boolean[] = [];

    if (chartVisualizationData) {
      chartVisualizationData.forEach((data: IRecommendationBannerChartData) => {
        const chartDataPoints: IChartDataPoint[] = data.chartData.map((point: IRecommendationBannerChartDataPoint) => {
          return {
            legend: point.datapointText,
            data: point.datapointValue,
            color: legendColors[counter++ % legendColorLength]
          };
        });

        const chartProp: IChartProps = {
          chartTitle: data.chartTitle,
          chartData: chartDataPoints
        };

        chartData.push(chartProp);
        hideRatio.push(true);
      });

      return (
        <div className={this.classNames.chartVisualizationContainerStyle}>
          <div className={this.classNames.chartVisualizationStyle}>
            <MultiStackedBarChart data={chartData} hideRatio={hideRatio} />
          </div>
        </div>
      );
    }

    return null;
  }
}
