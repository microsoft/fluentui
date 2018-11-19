import { IStyle } from 'office-ui-fabric-react/lib/Styling';

export const baseFontFamily = 'Segoe UI';
export const wrappingContainerWidth = 771;
export const wrappingContainerHeight = 272;
export const regularFontWeight = 'bold';
export const regularFontSize = 12;
export const largeFontSize = 14;

export const dlpItemCommonStyles: IStyle = {
  fontFamily: baseFontFamily,
  fontWeight: regularFontWeight,
  fontSize: regularFontSize
};

export interface IRecommendationExampleState {
  dismissed: boolean;
}
