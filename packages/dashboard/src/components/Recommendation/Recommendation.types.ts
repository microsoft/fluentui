import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';

export enum VisualizationType {
  /**
   * MutliStackBarChart Visualization (display more than 2 datapoints as a colored legend)
   */
  MultiStackBarChart = 1,

  /**
   * Simple StackBarChart Visualization (to display a ratio, maximum of two datapoints)
   */
  StackedBarChart = 2,

  /**
   * Image illustration visualization
   */
  ImageIllustration = 3
}

/**
 * Representation for each chart data point
 */
export interface IRecommendationBannerChartDataPoint {
  /**
   * The display text for a given datapoint
   */
  datapointText: string;

  /**
   * quantifying value for a given datapoint
   */
  datapointValue: number;
}

export interface IRecommendationBannerChartData {
  /**
   * ChartTitle to be displayed when rendering
   */
  chartTitle: string;

  /**
   * DataPoints that make up the chart
   */
  chartData: IRecommendationBannerChartDataPoint[];
}

/**
 * Props that are exposed for customizing the Recommendation Card
 */
export interface IRecommendationProps {
  /**
   * Localized title for the Recommendation Card.
   *
   * @type {string}
   * @memberof IRecommendationProps
   */
  recommendationBarTitle: string;
  /**
   * Localized description Header for the Recommendation Card.
   *
   * @type {string}
   * @memberof IRecommendationProps
   */
  recommendationDescriptionHeader: string;
  /**
   * Localized description details for the Recommendation card.
   *
   * @type {string}
   * @memberof IRecommendationProps
   */
  recommendationDescription: string;
  /**
   * Handler to be executed on click of ViewRecommendation button
   *
   * @type {() => void}
   * @memberof IRecommendationProps
   */
  handleViewRecommendationClick: () => void;
  /**
   * Handler to be executed on click of Dismiss Recommendation
   *
   * @type {() => void}
   * @memberof IRecommendationProps
   */
  handleDismissRecommendationClick: () => void;

  /**
   * Supported Visualizations by Recommendation Banner.
   * If this property is used, any custom visualizations
   * plugged in as children will be ignored
   *
   * @type {VisualizationType}
   * @memberof IRecommendationProps
   */
  recommendationVisualization?: VisualizationType;

  /**
   * If RecommendationVisualization is ImageIllustration,
   * imageVisualizationSrc is a mandatory property that takes in
   * image source that needs to be rendered.
   *
   * @type {string}
   * @memberof IRecommendationProps
   */
  imageVisualizationSrc?: string;

  /**
   * If RecommendationVisualization is ImageIllustration,
   * imageVisalizationAltText represents the altText to be displayed
   * for the image
   *
   * @type {string}
   * @memberof IRecommendationProps
   */
  imageVisualizationAltText?: string;

  /**
   * If RecommendationVisualization is StackedBarChart variation
   * chartVisualizationData is a mandatory property that needs
   * the specific schema of datapoints to construct the chart
   *
   * @type {IRecommendationBannerChartData[]}
   * @memberof IRecommendationProps
   */
  chartVisualizationData?: IRecommendationBannerChartData[];

  /**
   * Optional: Localized Name for the Recommendation Button
   *
   * @default View Recommendation
   * @type {string}
   * @memberof IRecommendationProps
   */
  recommendationButtonLocalizedName?: string;

  /**
   * Optional: Aria description for Recommendation Button
   *
   * @default Click to View Recommendation
   * @type {string}
   * @memberof IRecommendationProps
   */
  recommendationButtonAriaDescription?: string;

  /**
   * Optional: Dismiss Recommendation Menu Item Localized Name
   *
   * @default Dismiss
   * @type {string}
   * @memberof IRecommendationProps
   */
  dismissRecommendationLocalizedName?: string;

  /**
   * Optional: Dismiss Recommendation Menu Item Aria Label
   *
   * @default Dismiss
   * @type {string}
   * @memberof IRecommendationProps
   */
  dismissRecommendationAriaLabel?: string;

  /**
   * Optional: Align the data visualization child in center
   *
   * @default false
   * @type  {boolean}
   * @memberof IRecommendationProps
   */
  centerDataVisualization?: boolean;

  /**
   * Optional: Theme (provided through customization)
   */
  theme?: ITheme;

  /**
   * Optional: Additional css class(es) to apply for RecommendationBanner
   */
  className?: string;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IRecommendationStyleProps, IRecommendationStyles>;
}

/**
 * Styles for CardFrame which wraps the Recommendation Component
 */
export interface ICardComponentCustomizationStyles {
  /**
   * Color of the horizontal line that separates the header and layout
   */
  separatorColor: string;

  /**
   * Text color for the CardFrame header
   */
  frameHeaderColor: string;
}

/**
 * Props for style customizations
 */
export interface IRecommendationStyleProps {
  /**
   * Theme (provided through customization.)
   */
  theme: ITheme;

  /**
   * Additional CSS class(es) to apply to the StackedBarChart.
   */
  className?: string;
}

/**
 * Styles for the Recommendation Layout component
 */
export interface IRecommendationStyles {
  /**
   * Styles for the Recommendation container that acts as the wrapping container inside the layout
   */
  recommendationContainer: IStyle;

  /**
   * Styles for the Left half of the Container where Recommendation content is displayed
   */
  recommendationTextContainer: IStyle;

  /**
   * Styles for the Right half of the Container where Visualization/Image Illustration content is displayed
   */
  recommendationVisualizationContainer: IStyle;

  /**
   * Styles for the Recommendation Description Header
   */
  recommendationHeader: IStyle;

  /**
   * Styles for the Recommendation Content
   */
  recommendationContent: IStyle;

  /**
   * Style for the Recommendation flex row: header
   */
  recommendationHeaderRow: IStyle;

  /**
   * Style for the Recommendation flex row: content
   */
  recommendationContentRow: IStyle;

  /**
   * Style for the Recommendation flex row: command
   */
  recommendationCommandRow: IStyle;

  /**
   * Style for the Recommendation flex row: text
   */
  recommendationContentRowText: IStyle;

  /**
   * Style for the Recommendation flex row: visualization
   */
  recommendationContentRowVisualization: IStyle;

  /**
   * Style for the Recommendation flex row: visualization
   */
  recommendationRowContainer: IStyle;
}
