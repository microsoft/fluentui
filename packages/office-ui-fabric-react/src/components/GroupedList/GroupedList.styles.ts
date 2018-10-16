import { IGroupedListStyleProps, IGroupedListStyles } from './GroupedList.types';
import { getGlobalClassNames, FontSizes, AnimationVariables } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-GroupedList',
  group: 'ms-GroupedList-group',
  link: 'ms-Link',
  listCell: 'ms-List-cell'
};

const beziers = {
  easeInOutSine: 'cubic-bezier(0.445, 0.050, 0.550, 0.950)'
};

export const getStyles = (props: IGroupedListStyleProps): IGroupedListStyles => {
  const { theme, className } = props;
  const { palette } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme!);

  return {
    root: [
      classNames.root,
      theme.fonts.medium,
      {
        position: 'relative',
        fontSize: FontSizes.small,
        selectors: {
          [`& :global(.${classNames.listCell})`]: {
            minHeight: 36
          }
        }
      },
      className
    ],
    group: [
      classNames.group,
      {
        transition: `background-color ${AnimationVariables.durationValue2} ${beziers.easeInOutSine}`
      }
    ],
    groupIsDropping: [
      {
        backgroundColor: palette.neutralLight
      }
    ]
  };
};
