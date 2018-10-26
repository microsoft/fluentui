import { IContextualMenuStyleProps, IContextualMenuStyles } from './ContextualMenu.types';
import { getGlobalClassNames, FontWeights } from '../../Styling';
import { CONTEXTUAL_MENU_ITEM_HEIGHT } from './ContextualMenu.cnstyles';

const GlobalClassNames = {
  root: 'ms-ContextualMenu',
  container: 'ms-ContextualMenu-container',
  list: 'ms-ContextualMenu-list',
  header: 'ms-ContextualMenu-header',
  title: 'ms-ContextualMenu-title',
  isopen: 'is-open'
};

export const getStyles = (props: IContextualMenuStyleProps): IContextualMenuStyles => {
  const { className, theme } = props;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const { palette, fonts, semanticColors } = theme;

  return {
    root: [
      theme.fonts.medium,
      classNames.root,
      classNames.isopen,
      {
        backgroundColor: semanticColors.bodyBackground,
        minWidth: '180px'
      },
      className
    ],
    container: [
      classNames.container,
      {
        selectors: {
          ':focus': { outline: 0 }
        }
      }
    ],
    list: [
      classNames.list,
      classNames.isopen,
      {
        listStyleType: 'none',
        margin: '0',
        padding: '0'
      }
    ],
    header: [
      classNames.header,
      fonts.small,
      {
        fontWeight: FontWeights.semibold,
        color: semanticColors.menuHeader,
        background: 'none',
        backgroundColor: 'transparent',
        border: 'none',
        height: CONTEXTUAL_MENU_ITEM_HEIGHT,
        lineHeight: CONTEXTUAL_MENU_ITEM_HEIGHT,
        cursor: 'default',
        padding: '0px 6px',
        userSelect: 'none',
        textAlign: 'left'
      }
    ],
    title: [
      classNames.title,
      {
        fontSize: '16px',
        paddingRight: '14px',
        paddingLeft: '14px',
        paddingBottom: '5px',
        paddingTop: '5px',
        backgroundColor: palette.neutralLight
      }
    ],
    subComponentStyles: {
      callout: {
        root: {
          border: 'none',
          borderRadius: 2,
          boxShadow: '0 3.2px 7.2px 0 rgba(0, 0, 0, 0.132), 0 0.6px 1.8px 0 rgba(0, 0, 0, 0.108)',
          selectors: {
            ['.ms-Callout-main']: { borderRadius: 2 }
          }
        }
      }
    }
  };
};
