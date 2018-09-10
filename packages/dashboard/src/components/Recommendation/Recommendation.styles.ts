import { ICardComponentCustomizationStyles, IRecommendationStyles } from './Recommendation.types';
import { IStyle, mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const cardFrameColor = 'rgba(0, 120, 215, 1)';
const recommendationBaseColor = 'rgba(0,0,0,1)';
const commonFontFamily = 'Segoe UI';
const commonFontWeight = 'bold';
const largeFontSize = 28;
const regularFontSize = 12;
const regularLineHeight = 18;
const containerSpaceMargin = 22;
const flexDisplayStyle: IStyle = {
  display: 'flex',
  flex: 1
};

export const getStyles = (): IRecommendationStyles => ({
  recommendationContainer: mergeStyles(flexDisplayStyle, {
    paddingTop: 19,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }),
  recommendationTextContainer: mergeStyles(flexDisplayStyle, {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: containerSpaceMargin
  }),
  recommendationVisualizationContainer: mergeStyles(flexDisplayStyle, {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }),
  recommendationHeader: {
    fontSize: largeFontSize,
    fontFamily: commonFontFamily,
    fontWeight: commonFontWeight,
    color: recommendationBaseColor,
    selectors: {
      p: {
        margin: '0px'
      }
    }
  },
  recommendationContent: {
    fontSize: regularFontSize,
    lineHeight: regularLineHeight,
    fontFamily: commonFontFamily,
    color: recommendationBaseColor,
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    wordWrap: 'break-word'
  }
});

export const CardComponentStyles: ICardComponentCustomizationStyles = {
  separatorColor: cardFrameColor,
  frameHeaderColor: cardFrameColor
};
