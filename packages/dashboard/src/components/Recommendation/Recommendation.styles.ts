import { ICardComponentCustomizationStyles, IRecommendationStyles, IRecommendationStyleProps } from './Recommendation.types';
import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { DefaultFontStyles } from 'office-ui-fabric-react/lib/Styling';

const cardFrameColor = 'rgba(0, 120, 215, 1)';
const recommendationBaseColor = 'rgba(0,0,0,1)';
const commonFontFamily = DefaultFontStyles.medium.fontFamily;
const commonFontWeight = 'bold';
const largeFontSize = 28;
const regularFontSize = 12;
const regularLineHeight = 18;
const containerSpaceMargin = 22;
const flexDisplayStyle: IStyle = {
  display: 'flex',
  flex: 1
};

export const getRecommendationBannerStyles = (props: IRecommendationStyleProps): IRecommendationStyles => {
  const { className, theme } = props;
  return {
    recommendationContainer: [
      theme.fonts.medium,
      flexDisplayStyle,
      {
        paddingTop: 19,
        flexDirection: 'row',
        flexWrap: 'wrap'
      },
      className
    ],
    recommendationTextContainer: [
      flexDisplayStyle,
      {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginRight: containerSpaceMargin
      }
    ],
    recommendationVisualizationContainer: [
      flexDisplayStyle,
      {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }
    ],
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
    },
    recommendationRowContainer: [
      flexDisplayStyle,
      {
        paddingTop: 19,
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'space-between'
      }
    ],
    recommendationHeaderRow: {
      flexDirection: 'row',
      width: '48.5%',
      justifyContent: 'space-between',
      flexGrow: 0
    },
    recommendationContentRow: {
      flexDirection: 'row',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: '6px',
      flexGrow: 1
    },
    recommendationContentRowText: {
      width: '48.5%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    recommendationContentRowVisualization: {
      width: '48.5%'
    },
    recommendationCommandRow: {
      alignSelf: 'flex-end'
    }
  };
};

export const CardComponentStyles: ICardComponentCustomizationStyles = {
  separatorColor: cardFrameColor,
  frameHeaderColor: cardFrameColor
};
