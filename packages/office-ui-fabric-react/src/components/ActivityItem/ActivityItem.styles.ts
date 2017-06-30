import {
  mergeStyleSets,
  ITheme,
  getTheme
} from '../../Styling';
import {
  memoizeFunction
} from '../../Utilities';
import { IActivityItemStyles } from './ActivityItem.Props';

const DEFAULT_PERSONA_SIZE = '32px';
const COMPACT_PERSONA_SIZE = '16px';
const DEFAULT_ICON_SIZE = '24px';
const COMPACT_ICON_SIZE = '13px';

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

    isCompactContent: {
      padding: '0 4px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflowX: 'hidden'
    },

    personaContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: DEFAULT_PERSONA_SIZE,
      width: DEFAULT_PERSONA_SIZE,
      height: DEFAULT_PERSONA_SIZE
    },

    isCompactPersonaContainer: {
      display: 'block',
      height: COMPACT_PERSONA_SIZE,
      width: 'auto',
      minWidth: COMPACT_PERSONA_SIZE
    },

    activityTypeIcon: {
      minWidth: DEFAULT_PERSONA_SIZE,
      width: DEFAULT_PERSONA_SIZE,
      height: DEFAULT_PERSONA_SIZE,
      paddingTop: '3px',
      fontSize: DEFAULT_ICON_SIZE,
      lineHeight: DEFAULT_ICON_SIZE,
    },

    isCompactIcon: {
      minWidth: COMPACT_PERSONA_SIZE,
      width: COMPACT_PERSONA_SIZE,
      height: COMPACT_PERSONA_SIZE,
      fontSize: COMPACT_ICON_SIZE,
      lineHeight: COMPACT_ICON_SIZE,
      color: theme.palette.themePrimary
    },

    activityPersona: {
      display: 'block'
    },

    doublePersona: {
      '&:first-child': {
        alignSelf: 'flex-end'
      }
    },

    isCompactPersona: {
      display: 'inline-block',
      width: '8px',
      minWidth: '8px',
      overflow: 'visible'
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
