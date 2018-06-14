import { ICardComponentCustomizationStyles, IRecommendationStyles } from './Recommendation.types';
import { IStyle, mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const cardFrameColor = 'rgba(0, 120, 215, 1)';
const recommendationBaseColor = 'rgba(0,0,0,1)';
const commonFontFamily = 'Segoe UI';
const commonFontWeight = 'bold';
const largeFontSize = 28;
const regularFontSize = 12;
const containerSpaceMargin = 24;
const flexDisplayStyle: IStyle = {
  display: 'flex',
  flex: 1
};

export const getStyles = (): IRecommendationStyles => ({
  recommendationContainer: mergeStyles(flexDisplayStyle, {
    paddingTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }),
  recommendationTextContainer: mergeStyles(flexDisplayStyle, {
    flexDirection: 'column',
    marginRight: containerSpaceMargin
  }),
  recommendationVisualizationContainer: mergeStyles(flexDisplayStyle, {}),
  recommendationHeader: {
    fontSize: largeFontSize,
    fontFamily: commonFontFamily,
    fontWeight: commonFontWeight,
    color: recommendationBaseColor,
    marginBottom: 24
  },
  recommendationContent: {
    fontSize: regularFontSize,
    fontFamily: commonFontFamily,
    color: recommendationBaseColor,
    marginBottom: 16,
    flex: 1,
    wordWrap: 'break-word'
  }
});

export const CardComponentStyles: ICardComponentCustomizationStyles = {
  separatorColor: cardFrameColor,
  frameHeaderColor: cardFrameColor
};
