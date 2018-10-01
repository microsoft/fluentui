import { IPaginationStyles, IPaginationStyleProps } from './Pagination.types';
import { getGlobalClassNames } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-Pagination-container',
  pageNumber: 'ms-Pagination-page-number',
  selectedPageNumber: 'ms-Pagination-page-number-selected'
};

export function getStyles(props: IPaginationStyleProps): IPaginationStyles {
  const { theme } = props;

  const { palette } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

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
    previousNextPage: {
      color: palette.black,
      cursor: 'pointer',
      border: 'none',
      backgroundColor: 'Transparent'
    },
    disabledPreviousNextPage: {
      color: palette.neutralTertiaryAlt,
      border: 'none',
      backgroundColor: 'Transparent'
    },
    pageNumber: [
      classNames.pageNumber,
      {
        color: palette.black,
        cursor: 'pointer',
        border: 'none',
        backgroundColor: 'Transparent'
      }
    ],
    selectedPageNumber: [
      classNames.selectedPageNumber,
      {
        color: palette.blue,
        fontWeight: 'bold',
        cursor: 'pointer',
        border: 'none',
        backgroundColor: 'Transparent'
      }
    ]
  };
}
