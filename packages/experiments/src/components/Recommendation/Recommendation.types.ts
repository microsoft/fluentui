import { IStyle } from 'office-ui-fabric-react/lib/Styling';

export interface IRecommendationProps {
  recommendationBarTitle: string;
  recommendationDescriptionHeader: string;
  recommendationDescription: string;
  handleViewRecommendationClick: () => void;
  handleDismissRecommendationClick: () => void;
  recommendationButtonName?: string;
  recommendationButtonAriaDescription?: string;
}

export interface ICardComponentCustomizationStyles {
  separatorColor: string;
  frameHeaderColor: string;
}

export interface IRecommendationStyles {
  recommendationContainer: IStyle;

  recommendationTextContainer: IStyle;

  recommendationVisualizationContainer: IStyle;

  recommendationHeader: IStyle;

  recommendationContent: IStyle;
}
