import {
  mergeStyles,
  ITheme,
  getTheme
} from '../../Styling';
import {
  memoizeFunction
} from '../../Utilities';
import { IActivityItemStyles } from './ActivityItem.Props';
import { IPersonaProps } from '../../Persona';

export interface IActivityItemClassNames {
  root?: string;
  activityContent?: string;
  activityText?: string;
  personaContainer?: string;
  activityPersona?: string;
  activityTypeIcon?: string;
  commentText?: string;
  timeStamp?: string;
}

export const getClassNames = memoizeFunction((
  styles: IActivityItemStyles,
  className: string,
  activityPersonas: Array<IPersonaProps>,
  isCompact: boolean
): IActivityItemClassNames => {
  return {
    root: mergeStyles(
      'ms-ActivityItem',
      className,
      styles.root,
      isCompact && styles.isCompactRoot
    ),

    personaContainer: mergeStyles(
      'ms-ActivityItem-personaContainer',
      styles.personaContainer,
      isCompact && styles.isCompactPersonaContainer
    ),

    activityPersona: mergeStyles(
      'ms-ActivityItem-activityPersona',
      styles.activityPersona,
      isCompact && styles.isCompactPersona,
      !isCompact && activityPersonas && activityPersonas.length === 2 && styles.doublePersona
    ),

    activityTypeIcon: mergeStyles(
      'ms-ActivityItem-activityTypeIcon',
      styles.activityTypeIcon,
      isCompact && styles.isCompactIcon
    ),

    activityContent: mergeStyles(
      'ms-ActivityItem-activityContent',
      styles.activityContent,
      isCompact && styles.isCompactContent
    ),

    activityText: mergeStyles('ms-ActivityItem-activityText', styles.activityText),
    commentText: mergeStyles('ms-ActivityItem-commentText', styles.commentText),
    timeStamp: mergeStyles('ms-ActivityItem-timeStamp', styles.timeStamp)
  };
});
