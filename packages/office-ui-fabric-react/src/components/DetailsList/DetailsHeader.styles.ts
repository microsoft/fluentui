import { IDetailsHeaderStyleProps, IDetailsHeaderStyles } from './DetailsHeader.types';
import {
  getFocusStyle,
  focusClear,
  FontClassNames,
  IStyle,
  getGlobalClassNames,
  HighContrastSelector,
  hiddenContentStyle,
  keyframes
} from '../../Styling';
import { IsFocusVisibleClassName } from '../../Utilities';

const GlobalClassNames = {
  tooltipHost: 'ms-TooltipHost',
  root: 'ms-DetailsHeader',
  cell: 'ms-DetailsHeader-cell',
  cellIsCheck: 'ms-DetailsHeader-cellIsCheck',
  collapseButton: 'ms-DetailsHeader-collapseButton',
  isCollapsed: 'is-collapsed',
  isAllSelected: 'is-allSelected',
  isSelectAllHidden: 'is-selectAllHidden',
  isResizingColumn: 'is-resizingColumn',
  cellSizer: 'ms-DetailsHeader-cellSizer',
  isResizing: 'is-resizing',
  dropHintCircleStyle: 'ms-DetailsHeader-dropHintCircleStyle',
  dropHintLineStyle: 'ms-DetailsHeader-dropHintLineStyle',
  cellTitle: 'ms-DetailsHeader-cellTitle',
  cellName: 'ms-DetailsHeader-cellName',
  filterChevron: 'ms-DetailsHeader-filterChevron'
};

const values = {
  rowHeight: 32,
  cellPadding: 8,
  isPaddedMargin: 24
};

export const getStyles = (props: IDetailsHeaderStyleProps): IDetailsHeaderStyles => {
  const { theme, className, isSelectAllHidden, isAllSelected, isResizingColumn, isSizing, isAllCollapsed } = props;
  const { semanticColors, palette } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const colors = {
    iconForegroundColor: semanticColors.bodySubtext,
    headerForegroundColor: semanticColors.bodyText,
    headerBackgroundColor: semanticColors.bodyBackground,
    dropdownChevronForegroundColor: palette.neutralTertiary,
    resizerColor: palette.neutralTertiaryAlt
  };

  const cellSizerFadeInStyles: IStyle = {
    opacity: 1,
    transition: 'opacity 0.3s linear'
  };

  const fadeOut: string = keyframes({
    from: {
      borderColor: palette.themePrimary
    },
    to: {
      borderColor: palette.white
    }
  });

  const fadeOutAnimation = {
    animationName: fadeOut,
    animationDuration: '0.2s',
    animationDirection: 'forwards'
  };

  const slowFadeOutAnimation = {
    animationName: fadeOut,
    animationDuration: '1.5s',
    animationDirection: 'forwards'
  };

  const cellStyles: IStyle = [
    classNames.cell,
    getFocusStyle(theme),
    FontClassNames.small,
    {
      color: colors.headerForegroundColor,
      position: 'relative',
      display: 'inline-block;',
      boxSizing: 'border-box',
      padding: `0 ${values.cellPadding}px`,
      border: 'none',
      lineHeight: 'inherit',
      margin: '0',
      height: values.rowHeight,
      verticalAlign: 'top',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      textAlign: 'left'
    }
  ];

  return {
    root: [
      classNames.root,
      {
        display: 'inline-block',
        background: colors.headerBackgroundColor,
        position: 'relative',
        minWidth: '100%',
        verticalAlign: 'top',
        height: values.rowHeight,
        lineHeight: values.rowHeight,
        whiteSpace: 'nowrap',
        boxSizing: 'content-box',
        paddingBottom: '1px',
        borderBottom: `1px solid ${semanticColors.bodyDivider}`,
        cursor: 'default',
        userSelect: 'none',
        selectors: {
          '&:hover $check': {
            opacity: 1
          },
          [`${classNames.tooltipHost} $checkTooltip`]: {
            display: 'block'
          }
        }
      },
      isAllSelected && classNames.isAllSelected,
      isSelectAllHidden && {
        selectors: {
          $cell$cellIsCheck: {
            visibility: 'hidden'
          }
        }
      },
      isResizingColumn && classNames.isResizingColumn,
      className
    ],

    check: [
      {
        height: 32
      },
      {
        selectors: {
          [`.${IsFocusVisibleClassName} &:focus`]: {
            opacity: 1
          }
        }
      }
    ],

    cellWrapperPadded: [
      {
        paddingRight: values.isPaddedMargin + values.cellPadding
      }
    ],

    cellIsCheck: [
      cellStyles,
      classNames.cellIsCheck,
      {
        position: 'relative',
        padding: 0,
        margin: 0,
        display: 'inline-flex',
        alignItems: 'center'
      },
      isAllSelected && {
        opacity: 1
      }
    ],

    cellIsActionable: [
      {
        selectors: {
          ':hover': {
            color: semanticColors.bodyText,
            background: semanticColors.listHeaderBackgroundHovered
          },
          ':active': {
            background: semanticColors.listHeaderBackgroundPressed
          }
        }
      }
    ],
    cellIsEmpty: [
      {
        textOverflow: 'clip'
      }
    ],

    cell: cellStyles,

    gripperBarVerticalStyle: [
      {
        display: 'none',
        position: 'absolute',
        textAlign: 'left',
        color: palette.neutralTertiary,
        left: 1,
        selectors: {
          ':hover': {
            display: 'block'
          }
        }
      }
    ],

    cellSizer: [
      classNames.cellSizer,
      focusClear(),
      {
        display: 'inline-block',
        position: 'relative',
        cursor: 'ew-resize',
        bottom: 0,
        top: 0,
        overflow: 'hidden',
        height: 'inherit',
        background: 'transparent',
        zIndex: 1,
        width: 16,
        selectors: {
          ':after': {
            content: '""',
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: 1,
            background: colors.resizerColor,
            opacity: 0,
            left: '50%'
          },
          ':focus:after': cellSizerFadeInStyles,
          ':hover:after': cellSizerFadeInStyles,
          '&$cellIsResizing:after': [
            cellSizerFadeInStyles,
            {
              boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.4)'
            }
          ]
        }
      }
    ],

    cellIsResizing: [classNames.isResizing],

    cellSizerStart: [
      {
        margin: '0 -8px'
      }
    ],

    cellSizerEnd: [
      {
        margin: 0,
        marginLeft: -16
      }
    ],

    collapseButton: [
      classNames.collapseButton,
      {
        textAlign: 'center',
        transform: 'rotate(-180deg)',
        transformOrigin: '50% 50%',
        transition: 'transform 0.1s linear',
        width: 20,
        outline: 0,
        paddingRight: 0
      },
      isAllCollapsed && {
        transform: 'rotate(0deg)'
      },
      isAllCollapsed && classNames.isCollapsed
    ],

    iconOnlyHeader: [
      {
        selectors: {
          $nearIcon: {
            paddingLeft: 0
          }
        }
      }
    ],

    nearIcon: [
      {
        color: colors.iconForegroundColor,
        opacity: 1,
        paddingLeft: 8
      }
    ],

    sortIcon: [
      {
        paddingLeft: 4,
        position: 'relative',
        top: 1
      }
    ],

    filterChevron: [
      classNames.filterChevron,
      {
        color: colors.dropdownChevronForegroundColor,
        paddingLeft: 4,
        verticalAlign: 'middle'
      }
    ],

    cellTitle: [
      classNames.cellTitle,
      getFocusStyle(theme),
      {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        boxSizing: 'border-box',
        overflow: 'hidden',
        padding: '0 8px 0 12px'
      }
    ],

    cellName: [
      classNames.cellName,
      {
        flex: '0 1 auto',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    ],

    checkTooltip: [],

    cellTooltip: [
      {
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      }
    ],

    sizingOverlay: [
      isSizing && {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        cursor: 'ew-resize',
        background: 'rgba(255, 255, 255, 0)',
        selectors: {
          [HighContrastSelector]: {
            background: 'transparent',
            '-ms-high-contrast-adjust': 'none'
          }
        }
      }
    ],

    accessibleLabel: [hiddenContentStyle],

    borderWhileDragging: [
      {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: palette.themePrimary
      },
      fadeOutAnimation
    ],

    dropHintCircleStyle: [
      classNames.dropHintCircleStyle,
      {
        display: 'inline-block',
        visibility: 'hidden',
        position: 'absolute',
        bottom: 0,
        height: 9,
        width: 9,
        borderRadius: '50%',
        marginLeft: -5,
        top: 34,
        overflow: 'visible',
        zIndex: 10,
        border: `1px solid ${palette.themePrimary}`,
        background: palette.white
      }
    ],

    dropHintLineStyle: [
      classNames.dropHintLineStyle,
      {
        display: 'inline-block',
        visibility: 'hidden',
        position: 'absolute',
        bottom: 0,
        top: -3,
        overflow: 'hidden',
        height: 37,
        width: 1,
        background: palette.themePrimary,
        zIndex: 10
      }
    ],

    dropHintStyle: [
      {
        display: 'inline-block',
        position: 'absolute'
      }
    ],

    borderAfterDropping: [
      {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: palette.themePrimary,
        left: -1,
        lineHeight: 31
      },
      slowFadeOutAnimation
    ]
  };
};
