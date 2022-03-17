import { IStyleFunction } from '@fluentui/react/lib/Utilities';
import { getFocusStyle, getTheme, FontWeights } from '@fluentui/react/lib/Styling';
import { IPivotStyles } from '@fluentui/react/lib/Pivot';
import { IFeedbackListStyleProps, IFeedbackListStyles } from './FeedbackList.types';

const globalClassNames = {
  pivot: 'FeedbackList-pivot',
  issueList: 'FeedbackList-issueList',
  button: 'FeedbackList-button',
  listElement: 'FeedbackList-listElement',
  timeStamp: 'FeedbackList-timeStamp',
};

export const getStyles: IStyleFunction<IFeedbackListStyleProps, IFeedbackListStyles> = props => {
  const { theme = getTheme() } = props;
  const pivotStyles: Partial<IPivotStyles> = {
    root: [{ paddingTop: 20 }, globalClassNames.pivot],
  };
  return {
    issueList: [
      {
        maxHeight: 400,
        overflowY: 'auto',
      },
      globalClassNames.issueList,
    ],
    button: [
      {
        marginBottom: 10,
        // Temporary workaround for https://github.com/microsoft/fluentui/issues/6782.
        selectors: {
          '&a:link, &a:hover, &a:focus, &a:visited': {
            color: theme.palette.white + ' !important',
          },
        },
      },
      globalClassNames.button,
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
          '&:hover': { background: theme.palette.neutralLight },
        },
      },
    ],
    itemName: theme.fonts.mediumPlus,
    itemLabel: [
      {
        fontSize: theme.fonts.small.fontSize,
        fontWeight: FontWeights.bold,
        cursor: 'pointer',
      },
      globalClassNames.listElement,
    ],
    timeStamp: [{ fontSize: theme.fonts.small.fontSize }, globalClassNames.timeStamp],
    subComponentStyles: {
      pivot: pivotStyles,
    },
  };
};
