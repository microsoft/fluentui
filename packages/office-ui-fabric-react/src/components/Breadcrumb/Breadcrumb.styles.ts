import { IStyle, ITheme } from '../../Styling';
import * as stylesImport from './Breadcrumb.scss';

const styles: any = stylesImport;

export interface IBreadcrumbStyleProps {
  className?: string;
  theme?: ITheme;
}
export interface IBreadcrumbStyles {
  root: IStyle;
  list: IStyle;
  listItem: IStyle;
  chevron: IStyle;
  overflow: IStyle;
  overflowButton: IStyle;
  itemLink: IStyle;
  item: IStyle;
}

export const getStyles = (props: IBreadcrumbStyleProps): IBreadcrumbStyles => {
  const { className } = props;

  return {
    root: [
      'ms-Breadcrumb',
      {
        margin: '23px 0 1px'
      },
      className
    ],

    list: [
      'ms-Breadcrumb-list',
      {
        whiteSpace: 'nowrap',
        padding: 0,
        margin: 0,
        display: 'flex',
        alignItems: 'stretch'
      }
    ],

    listItem: [
      'ms-Breadcrumb-listItem',
      {
        listStyleType: 'none',
        margin: '0',
        padding: '0',
        display: 'flex',
        position: 'relative',
        alignItems: 'center'
      },
      styles.listItem
    ],

    chevron: [
      'ms-Breadcrumb-chevron',
      styles.chevron
    ],

    overflow: [
      'ms-Breadcrumb-overflow',
      {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
      },
      styles.overflow
    ],

    overflowButton: [
      'ms-Breadcrumb-overflowButton',
      styles.overflowButton
    ],

    itemLink: [
      'ms-Breadcrumb-itemLink',
      styles.itemLink
    ],

    item: [
      'ms-Breadcrumb-item',
      {
        selectors: {
          ':hover': {
            cursor: 'default'
          }
        }
      },
      styles.item
    ]
  };
};
