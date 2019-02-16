import { IDetailsColumnStyleProps, IDetailsColumnStyles } from './DetailsColumn.types';
import { getFocusStyle, getGlobalClassNames, hiddenContentStyle, IStyle } from '../../Styling';
import { DEFAULT_CELL_STYLE_PROPS } from './DetailsRow.styles';
import { getCellStyles } from './DetailsHeader.styles';

const GlobalClassNames = {
  isActionable: 'is-actionable',
  cellIsCheck: 'ms-DetailsHeader-cellIsCheck',
  collapseButton: 'ms-DetailsHeader-collapseButton',
  isCollapsed: 'is-collapsed',
  isAllSelected: 'is-allSelected',
  isSelectAllHidden: 'is-selectAllHidden',
  isResizingColumn: 'is-resizingColumn',
  isEmpty: 'is-empty',
  isIconVisible: 'is-icon-visible',
  cellSizer: 'ms-DetailsHeader-cellSizer',
  isResizing: 'is-resizing',
  dropHintCircleStyle: 'ms-DetailsHeader-dropHintCircleStyle',
  dropHintLineStyle: 'ms-DetailsHeader-dropHintLineStyle',
  cellTitle: 'ms-DetailsHeader-cellTitle',
  cellName: 'ms-DetailsHeader-cellName',
  filterChevron: 'ms-DetailsHeader-filterChevron',
  gripperBarVerticalStyle: 'ms-DetailsColumn-gripperBar'
};

export const getStyles = (props: IDetailsColumnStyleProps): IDetailsColumnStyles => {
  const {
    theme,
    headerClassName,
    iconClassName,
    isActionable,
    isEmpty,
    isIconVisible,
    isPadded,
    isIconOnly,
    cellStyleProps = DEFAULT_CELL_STYLE_PROPS,
    transitionDurationDrag,
    transitionDurationDrop
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

  const nearIconStyle: IStyle = {
    color: colors.iconForegroundColor,
    opacity: 1,
    paddingLeft: 8
  };

  const borderWhileDragging: IStyle = [
    {
      outline: `1px solid ${palette.themePrimary}`
    }
  ];

  const borderAfterDragOrDrop: IStyle = [
    {
      outlineColor: 'transparent'
    }
  ];

  return {
    root: [
      getCellStyles(props),
      theme.fonts.small,
      isActionable && [
        classNames.isActionable,
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
      isEmpty && [
        classNames.isEmpty,
        {
          textOverflow: 'clip'
        }
      ],
      isIconVisible && classNames.isIconVisible,
      isPadded && {
        paddingRight: cellStyleProps.cellExtraRightPadding + cellStyleProps.cellRightPadding
      },
      {
        selectors: {
          ':hover i[data-icon-name="GripperBarVertical"]': {
            display: 'block'
          }
        }
      },
      headerClassName
    ],

    gripperBarVerticalStyle: [
      {
        display: 'none',
        position: 'absolute',
        textAlign: 'left',
        color: palette.neutralTertiary,
        left: 1
      }
    ],

    nearIcon: nearIconStyle,

    sortIcon: [
      nearIconStyle,
      {
        paddingLeft: 4,
        position: 'relative',
        top: 1
      }
    ],

    iconClassName: [
      {
        color: colors.iconForegroundColor,
        opacity: 1
      },
      iconClassName
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
        padding: `0 ${cellStyleProps.cellRightPadding}px 0 ${cellStyleProps.cellLeftPadding}px`,
        ...(isIconOnly
          ? {
              alignContent: 'flex-end',
              maxHeight: '100%',
              flexWrap: 'wrap-reverse'
            }
          : {})
      }
    ],

    cellName: [
      classNames.cellName,
      {
        flex: '0 1 auto',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      },
      isIconOnly && {
        selectors: {
          $nearIcon: {
            paddingLeft: 0
          }
        }
      }
    ],

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

    accessibleLabel: [hiddenContentStyle],

    borderWhileDragging: borderWhileDragging,

    noBorderWhileDragging: [borderAfterDragOrDrop, { transition: `outline ${transitionDurationDrag}ms ease` }],

    borderAfterDropping: [borderWhileDragging],

    noBorderAfterDropping: [borderAfterDragOrDrop, { transition: `outline  ${transitionDurationDrop}ms ease` }]
  };
};
