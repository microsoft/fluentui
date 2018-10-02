import { IPaginationStyles, IPaginationStyleProps } from './Pagination.types';
import { getGlobalClassNames, IStyle } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-Pagination-container',
  pageNumber: 'ms-Pagination-page-number',
  omission: 'ms-Pagination-omission'
};

export function getStyles(props: IPaginationStyleProps): IPaginationStyles {
  const { theme } = props;

  const { palette } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const buttonStyles: IStyle = {
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent'
  };

  return {
    root: [
      classNames.root,
      {
        listStyle: 'none',
        selectors: {
          li: {
            display: 'inline'
          }
        }
      }
    ],
    previousNextPage: [
      buttonStyles,
      {
        color: palette.black,
        selectors: {
          '&:disabled': {
            cursor: 'default',
            color: palette.neutralTertiaryAlt
          },
          '&[disabled]': {
            cursor: 'default',
            color: palette.neutralTertiaryAlt
          }
        }
      }
    ],
    pageNumber: [
      classNames.pageNumber,
      buttonStyles,
      {
        color: palette.black,
        selectors: {
          '&:aria-selected=true': {
            color: palette.blue,
            fontWeight: 'bold'
          },
          '&[aria-selected=true]': {
            color: palette.blue,
            fontWeight: 'bold'
          }
        }
      }
    ],
    omission: [
      classNames.omission,
      {
        color: palette.neutralSecondary
      }
    ]
  };
}
