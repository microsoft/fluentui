import { IStyleFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getFocusStyle, getTheme, FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { IPivotStyles } from 'office-ui-fabric-react/lib/Pivot';
import { IFeedbackListStyleProps, IFeedbackListStyles } from './FeedbackList.types';

const globalClassNames = {
  pivot: 'FeedbackList-pivot',
  issueList: 'FeedbackList-issueList',
  button: 'FeedbackList-button',
  listElement: 'FeedbackList-listElement',
  timeStamp: 'FeedbackList-timeStamp'
};

export const getStyles: IStyleFunction<IFeedbackListStyleProps, IFeedbackListStyles> = props => {
  const { theme = getTheme() } = props;
  const pivotStyles: Partial<IPivotStyles> = {
    root: [{ paddingTop: 20 }, globalClassNames.pivot]
  };
  return {
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
            color: theme.palette.white + ' !important'
          }
        }
      },
      globalClassNames.button
    ],
    itemCell: [
      getFocusStyle(theme, { inset: -1 }),
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
      theme.fonts.mediumPlus,
      {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    ],
    itemLabel: [
      {
        fontSize: theme.fonts.small.fontSize,
        fontWeight: FontWeights.bold
      },
      globalClassNames.listElement
    ],
    timeStamp: [{ fontSize: theme.fonts.small.fontSize }, globalClassNames.timeStamp],
    subComponentStyles: {
      pivot: pivotStyles
    }
  };
};
