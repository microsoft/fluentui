import { getGlobalClassNames } from '../../Styling';
import type { IDetailsListStyleProps, IDetailsListStyles } from './DetailsList.types';

const GlobalClassNames = {
  root: 'ms-DetailsList',
  compact: 'ms-DetailsList--Compact',
  contentWrapper: 'ms-DetailsList-contentWrapper',
  headerWrapper: 'ms-DetailsList-headerWrapper',
  isFixed: 'is-fixed',
  isHorizontalConstrained: 'is-horizontalConstrained',
  listCell: 'ms-List-cell',
};

export const getDetailsListStyles = (props: IDetailsListStyleProps): IDetailsListStyles => {
  const { theme, className, isHorizontalConstrained, compact, isFixed } = props;
  const { semanticColors } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      theme.fonts.small,
      {
        position: 'relative',
        color: semanticColors.listText,
        selectors: {
          [`& .${classNames.listCell}`]: {
            minHeight: 38,
            wordBreak: 'break-word',
          },
        },
      },

      isFixed && classNames.isFixed,

      compact && [
        classNames.compact,
        {
          selectors: {
            [`.${classNames.listCell}`]: {
              minHeight: 32,
            },
          },
        },
      ],

      isHorizontalConstrained && [
        classNames.isHorizontalConstrained,
        {
          overflowX: 'auto',
          overflowY: 'visible',
          WebkitOverflowScrolling: 'touch',
        },
      ],

      className,
    ],

    focusZone: [
      {
        display: 'inline-block',
        minWidth: '100%',
        minHeight: 1,
      },
    ],
    headerWrapper: classNames.headerWrapper,
    contentWrapper: classNames.contentWrapper,
  };
};
