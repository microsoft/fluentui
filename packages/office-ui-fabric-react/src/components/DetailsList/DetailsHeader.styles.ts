import { IDetailsHeaderStyleProps, IDetailsHeaderStyles } from './DetailsHeader.types';
import { getFocusStyle, focusClear, IStyle, getGlobalClassNames, HighContrastSelector, hiddenContentStyle, ITheme } from '../../Styling';
import { IsFocusVisibleClassName } from '../../Utilities';
import { DEFAULT_CELL_STYLE_PROPS } from './DetailsRow.styles';
import { ICellStyleProps } from './DetailsRow.types';

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
  dropHintCaretStyle: 'ms-DetailsHeader-dropHintCaretStyle',
  dropHintLineStyle: 'ms-DetailsHeader-dropHintLineStyle',
  cellTitle: 'ms-DetailsHeader-cellTitle',
  cellName: 'ms-DetailsHeader-cellName',
  filterChevron: 'ms-DetailsHeader-filterChevron',
  gripperBarVertical: 'ms-DetailsColumn-gripperBarVertical'
};

const values = {
  rowHeight: 32
};

export const getCellStyles = (props: { theme: ITheme; cellStyleProps?: ICellStyleProps }): IStyle => {
  const { theme, cellStyleProps = DEFAULT_CELL_STYLE_PROPS } = props;
  const { semanticColors } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return [
    classNames.cell,
    getFocusStyle(theme),
    {
      color: semanticColors.bodyText,
      position: 'relative',
      display: 'inline-block',
      boxSizing: 'border-box',
      padding: `0 ${cellStyleProps.cellRightPadding}px 0 ${cellStyleProps.cellLeftPadding}px`,
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
};

export const getStyles = (props: IDetailsHeaderStyleProps): IDetailsHeaderStyles => {
  const {
    theme,
    className,
    isSelectAllHidden,
    isAllSelected,
    isResizingColumn,
    isSizing,
    isAllCollapsed,
    cellStyleProps = DEFAULT_CELL_STYLE_PROPS
  } = props;

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

  const cellStyles = getCellStyles(props);

  return {
    root: [
      classNames.root,
      theme.fonts.small,
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
        paddingRight: cellStyleProps.cellExtraRightPadding + cellStyleProps.cellRightPadding
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

    cellIsGroupExpander: [
      cellStyles,
      {
        paddingLeft: '8px',
        paddingRight: '8px',
        width: '36px'
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

    checkTooltip: [],

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

    dropHintCaretStyle: [
      classNames.dropHintCaretStyle,
      {
        display: 'inline-block',
        visibility: 'hidden',
        position: 'absolute',
        top: 22,
        left: -7.5,
        fontSize: 16,
        color: palette.themePrimary,
        overflow: 'visible',
        zIndex: 10
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
    ]
  };
};
