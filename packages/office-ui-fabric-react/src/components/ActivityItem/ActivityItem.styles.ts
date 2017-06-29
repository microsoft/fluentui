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
const DEFAULT_ICON_SIZE = '24px';

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
        boxSizing: 'border-box',
        color: theme.palette.neutralSecondary
      }
    ],

    activityContent: {
      padding: '0 8px'
    },

    personaContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: DEFAULT_PERSONA_SIZE,
      width: DEFAULT_PERSONA_SIZE,
      height: DEFAULT_PERSONA_SIZE
    },

    activityTypeIcon: {
      minWidth: DEFAULT_PERSONA_SIZE,
      width: DEFAULT_PERSONA_SIZE,
      height: DEFAULT_PERSONA_SIZE,
      paddingTop: '3px',
      fontSize: DEFAULT_ICON_SIZE,
      lineHeight: DEFAULT_ICON_SIZE
    },

    activityPersona: {
      display: 'block'
    },

    doublePersona: {
      '&:first-child': {
        alignSelf: 'flex-end'
      }
    },

    nameText: {
      fontWeight: '600',
      color: theme.palette.neutralPrimary
    },

    docLink: {
      fontWeight: '600',
      color: theme.palette.themePrimary,
      textDecoration: 'none',
      cursor: 'pointer'
    },

    commentText: {
      color: theme.palette.neutralPrimary,
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
