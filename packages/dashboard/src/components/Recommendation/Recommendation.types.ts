import { IStyle } from 'office-ui-fabric-react/lib/Styling';

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
