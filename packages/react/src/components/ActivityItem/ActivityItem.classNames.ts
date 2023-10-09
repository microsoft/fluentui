import { mergeStyles } from '../../Styling';
import { memoizeFunction } from '../../Utilities';
import type { IActivityItemStyles } from './ActivityItem.types';
import type { IPersonaProps } from '../../Persona';

export interface IActivityItemClassNames {
  root?: string;
  activityContent?: string;
  activityText?: string;
  personaContainer?: string;
  activityPersona?: string;
  activityTypeIcon?: string;
  commentText?: string;
  timeStamp?: string;
  pulsingBeacon?: string;
}

export const getClassNames = memoizeFunction(
  (
    styles: IActivityItemStyles,
    className: string,
    activityPersonas: Array<IPersonaProps>,
    isCompact: boolean,
  ): IActivityItemClassNames => {
    return {
      root: mergeStyles(
        styles.__shadowConfig__,
        'ms-ActivityItem',
        className,
        styles.root,
        isCompact && styles.isCompactRoot,
      ),

      pulsingBeacon: mergeStyles(styles.__shadowConfig__, 'ms-ActivityItem-pulsingBeacon', styles.pulsingBeacon),

      personaContainer: mergeStyles(
        styles.__shadowConfig__,
        'ms-ActivityItem-personaContainer',
        styles.personaContainer,
        isCompact && styles.isCompactPersonaContainer,
      ),

      activityPersona: mergeStyles(
        styles.__shadowConfig__,
        'ms-ActivityItem-activityPersona',
        styles.activityPersona,
        isCompact && styles.isCompactPersona,
        !isCompact && activityPersonas && activityPersonas.length === 2 && styles.doublePersona,
      ),

      activityTypeIcon: mergeStyles(
        styles.__shadowConfig__,
        'ms-ActivityItem-activityTypeIcon',
        styles.activityTypeIcon,
        isCompact && styles.isCompactIcon,
      ),

      activityContent: mergeStyles(
        styles.__shadowConfig__,
        'ms-ActivityItem-activityContent',
        styles.activityContent,
        isCompact && styles.isCompactContent,
      ),

      activityText: mergeStyles(styles.__shadowConfig__, 'ms-ActivityItem-activityText', styles.activityText),
      commentText: mergeStyles(styles.__shadowConfig__, 'ms-ActivityItem-commentText', styles.commentText),
      timeStamp: mergeStyles(
        styles.__shadowConfig__,
        'ms-ActivityItem-timeStamp',
        styles.timeStamp,
        isCompact && styles.isCompactTimeStamp,
      ),
    };
  },
);
