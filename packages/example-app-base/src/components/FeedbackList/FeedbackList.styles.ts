import { IStyleFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IFeedbackListStyleProps, IFeedbackListStyles } from './FeedbackList.types';
import { getFocusStyle, getTheme, DefaultFontStyles, FontSizes, FontWeights } from 'office-ui-fabric-react/lib/Styling';

const globalClassNames = {
  pivot: 'FeedbackList-pivot',
  issueList: 'FeedbackList-issueList',
  button: 'FeedbackList-button',
  listElement: 'FeedbackList-listElement',
  timeStamp: 'FeedbackList-timeStamp'
};

export const getStyles: IStyleFunction<IFeedbackListStyleProps, IFeedbackListStyles> = props => {
  const theme = getTheme();
  return {
    pivot: [{ paddingTop: 20 }, globalClassNames.pivot],
    issueList: [
      {
        maxHeight: 400,
        overflowY: 'auto'
      },
      globalClassNames.issueList
    ],
    button: [
      {
        marginBottom: 10,
        // Temporary workaround for https://github.com/OfficeDev/office-ui-fabric-react/issues/6782.
        selectors: {
          '&a:link, &a:hover, &a:focus, &a:visited': {
            color: theme.palette.white
          }
        }
      },
      globalClassNames.button
    ],
    itemCell: [
      getFocusStyle(theme, -1),
      {
        minHeight: 54,
        padding: 10,
        boxSizing: 'border-box',
        borderBottom: `1px solid ${theme.semanticColors.bodyDivider}`,
        display: 'flex',
        selectors: {
          '&:hover': { background: theme.palette.neutralLight }
        }
      }
    ],
    itemName: [
      DefaultFontStyles.xLarge,
      {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    ],
    itemLabel: [
      {
        fontSize: FontSizes.medium,
        fontWeight: FontWeights.bold
      },
      globalClassNames.listElement
    ],
    timeStamp: [{ fontSize: FontSizes.medium }, globalClassNames.timeStamp]
  };
};
