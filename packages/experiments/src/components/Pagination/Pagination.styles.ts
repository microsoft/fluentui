import { IPaginationStyles, IPaginationStyleProps, PaginationFormat } from './Pagination.types';
import { getGlobalClassNames, IStyle } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-Pagination-container',
  pageNumber: 'ms-Pagination-pageNumber'
};

export function getStyles(props: IPaginationStyleProps): IPaginationStyles {
  const { theme, format } = props;
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
      PaginationFormat.buttons === format && {
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }
    ],
    previousNextPage: [
      {
        color: palette.themePrimary
      }
    ],
    previousNextPageDisabled: [
      {
        cursor: 'default',
        backgroundColor: 'transparent'
      }
    ],
    pageNumber: [
      classNames.pageNumber,
      buttonStyles,
      {
        verticalAlign: 'middle',
        minWidth: '32px',
        minHeight: '32px',
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
    visibleItemLabel: [
      {
        color: palette.neutralSecondary
      }
    ],
    comboBox: {
      maxWidth: '70px',
      display: 'inline-block',
      verticalAlign: 'middle'
    }
  };
}
