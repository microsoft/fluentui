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
    ) as string,

    personaContainer: mergeStyles(
      'ms-ActivityItem-personaContainer',
      styles.personaContainer,
      isCompact && styles.isCompactPersonaContainer
    ) as string,

    activityPersona: mergeStyles(
      'ms-ActivityItem-activityPersona',
      styles.activityPersona,
      isCompact && styles.isCompactPersona,
      !isCompact && activityPersonas && activityPersonas.length === 2 && styles.doublePersona
    ) as string,

    activityTypeIcon: mergeStyles(
      'ms-ActivityItem-activityTypeIcon',
      styles.activityTypeIcon,
      isCompact && styles.isCompactIcon
    ) as string,

    activityContent: mergeStyles(
      'ms-ActivityItem-activityContent',
      styles.activityContent,
      isCompact && styles.isCompactContent
    ) as string,

    activityText: mergeStyles('ms-ActivityItem-activityText', styles.activityText) as string,
    commentText: mergeStyles('ms-ActivityItem-commentText', styles.commentText) as string,
    timeStamp: mergeStyles('ms-ActivityItem-timeStamp', styles.timeStamp) as string
  };
});
