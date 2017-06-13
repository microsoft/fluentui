import {
  mergeStyles,
  mergeStyleSets,
  ITheme,
  getTheme
} from '../../Styling';
import {
  memoizeFunction
} from '../../Utilities';
import { IActivityItemStyles } from './ActivityItem.Props';

const DEFAULT_PERSONA_SIZE = '32px';

export const getStyles = memoizeFunction((
  theme: ITheme = getTheme(),
  customStyles: IActivityItemStyles = undefined
): IActivityItemStyles => {
  let ActivityItemStyles = {

    root: [
      theme.fonts.small,
      {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        lineHeight: '17px',
        color: theme.palette.neutralSecondary
      }
    ],

    personaContainer: {
      width: DEFAULT_PERSONA_SIZE,
      height: DEFAULT_PERSONA_SIZE
    },

    activityContent: {
      padding: '0 12px'
    },

    commentText: {
      color: theme.palette.neutralPrimary,
    },

    nameText: {
      fontWeight: '600',
      color: theme.palette.neutralPrimary
    },

    timeStamp: [
      theme.fonts.tiny,
      {
        fontWeight: '400',
        color: theme.palette.neutralSecondary
      }
    ]
  };

  return mergeStyleSets(ActivityItemStyles, customStyles);
});
