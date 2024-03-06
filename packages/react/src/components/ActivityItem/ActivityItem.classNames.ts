import { classNamesFunction, memoizeFunction } from '../../Utilities';
import type { IActivityItemProps, IActivityItemStyles, IActivityItemStyleProps } from './ActivityItem.types';

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

const getMergedClassNames = classNamesFunction<IActivityItemStyleProps, IActivityItemStyles>();

const mergeClassStrings = (...classNames: string[]) => classNames.filter(Boolean).join(' ');

export const getClassNames = memoizeFunction(
  (
    props: IActivityItemStyleProps & Pick<IActivityItemProps, 'activityPersonas' | 'styles'>,
  ): IActivityItemClassNames => {
    const {
      activityPersonas,
      animateBeaconSignal,
      beaconColorOne,
      beaconColorTwo,
      className,
      isCompact,
      styles,
      theme,
    } = props;

    const classNames = getMergedClassNames(styles, {
      animateBeaconSignal,
      beaconColorOne,
      beaconColorTwo,
      className,
      isCompact,
      theme: theme!,
    });

    return {
      root: mergeClassStrings(classNames.root, isCompact && classNames.isCompactRoot),

      pulsingBeacon: classNames.pulsingBeacon,

      personaContainer: mergeClassStrings(
        classNames.personaContainer,
        isCompact && classNames.isCompactPersonaContainer,
      ),

      activityPersona: mergeClassStrings(
        classNames.activityPersona,
        isCompact && classNames.isCompactPersona,
        !isCompact && activityPersonas && activityPersonas.length === 2 && classNames.doublePersona,
      ),

      activityTypeIcon: mergeClassStrings(classNames.activityTypeIcon, isCompact && classNames.isCompactIcon),

      activityContent: mergeClassStrings(classNames.activityContent, isCompact && classNames.isCompactContent),

      activityText: classNames.activityText,
      commentText: classNames.commentText,
      timeStamp: mergeClassStrings(classNames.timeStamp, isCompact && classNames.isCompactTimeStamp),
    };
  },
);
