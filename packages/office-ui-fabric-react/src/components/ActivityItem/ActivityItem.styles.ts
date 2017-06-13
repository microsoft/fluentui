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

export const getStyles = memoizeFunction((
  theme: ITheme = getTheme(),
  customStyles: IActivityItemStyles = undefined
): IActivityItemStyles => {
  let ActivityItemStyles = {

    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      color: '#666666'
    },

    personaContainer: {
      width: '32px',
      height: '32px'
    },

    activityContent: {
      padding: '0 12px'
    },

    commentText: {
      color: '#333333',
      fontWeight: 'Semibold'
    },

    nameText: {
      color: '#333333',
      fontWeight: 'Semibold'
    }
  };

  return mergeStyleSets(ActivityItemStyles, customStyles);
});
