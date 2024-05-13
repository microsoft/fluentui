import {
  getFocusStyle,
  focusClear,
  getGlobalClassNames,
  HighContrastSelector,
  hiddenContentStyle,
  getHighContrastNoAdjustStyle,
} from '../../Styling';
import { getRTL, IsFocusVisibleClassName } from '../../Utilities';
import { DEFAULT_CELL_STYLE_PROPS } from './DetailsRow.styles';
// For every group level there is a GroupSpacer added. Importing this const to have the source value in one place.
import { SPACER_WIDTH as GROUP_EXPANDER_WIDTH } from '../GroupedList/GroupSpacer';
import type { IDetailsHeaderStyleProps, IDetailsHeaderStyles } from './DetailsHeader.types';
import type { IStyle, ITheme } from '../../Styling';
import type { ICellStyleProps } from './DetailsRow.types';

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
  gripperBarVertical: 'ms-DetailsColumn-gripperBarVertical',
  checkTooltip: 'ms-DetailsHeader-checkTooltip',
  check: 'ms-DetailsHeader-check',
};

export const HEADER_HEIGHT = 42;

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
      lineHeight: 'inherit',
      margin: '0',
      height: HEADER_HEIGHT,
      verticalAlign: 'top',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      textAlign: 'left',
    },
  ];
};

export const getDetailsHeaderStyles = (props: IDetailsHeaderStyleProps): IDetailsHeaderStyles => {
  const {
    theme,
    className,
    isAllSelected,
    isResizingColumn,
    isSizing,
    isAllCollapsed,
    cellStyleProps = DEFAULT_CELL_STYLE_PROPS,
  } = props;

  const { semanticColors, palette, fonts } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const colors = {
    iconForegroundColor: semanticColors.bodySubtext,
    headerForegroundColor: semanticColors.bodyText,
    headerBackgroundColor: semanticColors.bodyBackground,
    resizerColor: palette.neutralTertiaryAlt,
  };

  const cellSizerFadeInStyles: IStyle = {
    opacity: 1,
    transition: 'opacity 0.3s linear',
  };

  const cellStyles = getCellStyles(props);

  return {
    root: [
      classNames.root,
      fonts.small,
      {
        display: 'inline-block',
        background: colors.headerBackgroundColor,
        position: 'relative',
        minWidth: '100%',
        verticalAlign: 'top',
        height: HEADER_HEIGHT,
        lineHeight: HEADER_HEIGHT,
        whiteSpace: 'nowrap',
        boxSizing: 'content-box',
        paddingBottom: '1px',
        paddingTop: '16px',
        borderBottom: `1px solid ${semanticColors.bodyDivider}`,
        cursor: 'default',
        userSelect: 'none',
        selectors: {
          [`&:hover .${classNames.check}`]: {
            opacity: 1,
          },
          [`& .${classNames.tooltipHost} .${classNames.checkTooltip}`]: {
            display: 'block',
          },
        },
      },
      isAllSelected && classNames.isAllSelected,
      isResizingColumn && classNames.isResizingColumn,
      className,
    ],

    check: [
      classNames.check,
      {
        height: HEADER_HEIGHT,
      },
      {
        selectors: {
          [`.${IsFocusVisibleClassName} &:focus, :host(.${IsFocusVisibleClassName}) &:focus`]: {
            opacity: 1,
          },
        },
      },
    ],

    cellWrapperPadded: {
      paddingRight: cellStyleProps.cellExtraRightPadding + cellStyleProps.cellRightPadding,
    },

    cellIsCheck: [
      cellStyles,
      classNames.cellIsCheck,
      {
        position: 'relative',
        padding: 0,
        margin: 0,
        display: 'inline-flex',
        alignItems: 'center',
        border: 'none',
      },
      isAllSelected && {
        opacity: 1,
      },
    ],

    cellIsGroupExpander: [
      cellStyles,
      {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: fonts.small.fontSize,
        padding: 0,
        border: 'none',
        width: GROUP_EXPANDER_WIDTH, // align with GroupedList's first expandIcon cell width.
        color: palette.neutralSecondary,
        selectors: {
          ':hover': {
            backgroundColor: palette.neutralLighter,
          },
          ':active': {
            backgroundColor: palette.neutralLight,
          },
        },
      },
    ],

    cellIsActionable: {
      selectors: {
        ':hover': {
          color: semanticColors.bodyText,
          background: semanticColors.listHeaderBackgroundHovered,
        },
        ':active': {
          background: semanticColors.listHeaderBackgroundPressed,
        },
      },
    },
    cellIsEmpty: {
      textOverflow: 'clip',
    },

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
            left: '50%',
          },
          ':focus:after': cellSizerFadeInStyles,
          ':hover:after': cellSizerFadeInStyles,
          [`&.${classNames.isResizing}:after`]: [
            cellSizerFadeInStyles,
            {
              boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.4)',
            },
          ],
        },
      },
    ],

    cellIsResizing: classNames.isResizing,

    cellSizerStart: {
      margin: '0 -8px',
    },

    cellSizerEnd: {
      margin: 0,
      marginLeft: -16,
    },

    collapseButton: [
      classNames.collapseButton,
      {
        transformOrigin: '50% 50%',
        transition: 'transform .1s linear',
      },
      isAllCollapsed
        ? [
            classNames.isCollapsed,
            {
              transform: 'rotate(0deg)',
            },
          ]
        : {
            transform: getRTL(theme) ? 'rotate(-90deg)' : 'rotate(90deg)',
          },
    ],

    checkTooltip: classNames.checkTooltip,

    sizingOverlay: isSizing && {
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
          ...getHighContrastNoAdjustStyle(),
        },
      },
    },

    accessibleLabel: hiddenContentStyle,

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
        background: palette.white,
      },
    ],

    dropHintCaretStyle: [
      classNames.dropHintCaretStyle,
      {
        display: 'none',
        position: 'absolute',
        top: -28,
        left: -6.5,
        fontSize: fonts.medium.fontSize,
        color: palette.themePrimary,
        overflow: 'visible',
        zIndex: 10,
      },
    ],

    dropHintLineStyle: [
      classNames.dropHintLineStyle,
      {
        display: 'none',
        position: 'absolute',
        bottom: 0,
        top: 0,
        overflow: 'hidden',
        height: 42,
        width: 1,
        background: palette.themePrimary,
        zIndex: 10,
      },
    ],

    dropHintStyle: {
      display: 'inline-block',
      position: 'absolute',
    },
  };
};
