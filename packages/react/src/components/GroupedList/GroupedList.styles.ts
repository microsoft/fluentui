import { getGlobalClassNames, AnimationVariables } from '../../Styling';
import type { IGroupedListStyleProps, IGroupedListStyles } from './GroupedList.types';

const GlobalClassNames = {
  root: 'ms-GroupedList',
  compact: 'ms-GroupedList--Compact',
  group: 'ms-GroupedList-group',
  link: 'ms-Link',
  listCell: 'ms-List-cell',
};

const beziers = {
  easeInOutSine: 'cubic-bezier(0.445, 0.050, 0.550, 0.950)',
};

export const getStyles = (props: IGroupedListStyleProps): IGroupedListStyles => {
  const { theme, className, compact } = props;
  const { palette } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme!);

  return {
    root: [
      classNames.root,
      theme.fonts.small,
      {
        position: 'relative',
        selectors: {
          [`.${classNames.listCell}`]: {
            minHeight: 38, // be consistent with DetailsList styles
          },
        },
      },
      compact && [
        classNames.compact,
        {
          selectors: {
            [`.${classNames.listCell}`]: {
              minHeight: 32, // be consistent with DetailsList styles
            },
          },
        },
      ],
      className,
    ],
    group: [
      classNames.group,
      {
        transition: `background-color ${AnimationVariables.durationValue2} ${beziers.easeInOutSine}`,
      },
    ],
    groupIsDropping: {
      backgroundColor: palette.neutralLight,
    },
  };
};
