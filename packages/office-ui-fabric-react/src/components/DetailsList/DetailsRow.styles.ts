import { IDetailsRowStyleProps, IDetailsRowStyles, ICellStyleProps } from './DetailsRow.types';
import { AnimationClassNames, FontSizes, HighContrastSelector, IStyle, getFocusStyle, getGlobalClassNames } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-DetailsRow',
  compact: 'ms-DetailsList--Compact',
  cell: 'ms-DetailsRow-cell',
  cellCheck: 'ms-DetailsRow-cellCheck',
  cellMeasurer: 'ms-DetailsRow-cellMeasurer',
  listCellFirstChild: 'ms-List-cell:first-child',
  isFocusable: "[data-is-focusable='true']",
  isContentUnselectable: 'is-contentUnselectable',
  isSelected: 'is-selected',
  isCheckVisible: 'is-check-visible',
  fields: 'ms-DetailsRow-fields'
};

export const DEFAULT_CELL_STYLE_PROPS: ICellStyleProps = {
  cellLeftPadding: 12,
  cellRightPadding: 8,
  cellExtraRightPadding: 24
};

// Constant values
let values = {
  rowHeight: 42,
  compactRowHeight: 32,
  rowVerticalPadding: 11,
  compactRowVerticalPadding: 6,
  rowShimmerLineHeight: 7,
  rowShimmerIconPlaceholderHeight: 16,
  rowShimmerVerticalBorder: 0,
  compactRowShimmerVerticalBorder: 0
};

// Computed Values
values = {
  ...values,
  ...{
    rowShimmerVerticalBorder: (values.rowHeight - values.rowShimmerLineHeight) / 2,
    compactRowShimmerVerticalBorder: (values.compactRowHeight - values.rowShimmerLineHeight) / 2
  }
};

export const getStyles = (props: IDetailsRowStyleProps): IDetailsRowStyles => {
  const {
    theme,
    isSelected,
    canSelect,
    droppingClassName,
    anySelected,
    isCheckVisible,
    checkboxCellClassName,
    compact,
    className,
    cellStyleProps = DEFAULT_CELL_STYLE_PROPS
  } = props;

  const {
    neutralPrimary,
    white,
    neutralSecondary,
    neutralLighter,
    neutralLight,
    neutralDark,
    neutralQuaternaryAlt,
    black,
    themePrimary
  } = theme.palette;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const colors = {
    // Default
    defaultHeaderTextColor: neutralPrimary,
    defaultMetaTextColor: neutralSecondary,
    defaultBackgroundColor: white,

    // Hover
    hoverTextColor: neutralPrimary,
    hoverColorBackground: neutralLighter,

    // Selected
    selectedTextColor: neutralDark,
    selectedMetaTextColor: neutralPrimary,
    selectedBackgroundColor: neutralLight,

    // Selected Hover
    selectedHoverTextColor: black,
    selectedHoverMetaTextColor: neutralDark,
    selectedHoverBackgroundColor: neutralQuaternaryAlt,

    // Focus
    focusHeaderTextColor: black,
    focusBackgroundColor: neutralQuaternaryAlt,
    focusMetaTextColor: neutralDark
  };

  const shimmerRightBorderStyle = `${cellStyleProps.cellRightPadding * 4}px solid ${colors.defaultBackgroundColor}`;
  const shimmerLeftBorderStyle = `${cellStyleProps.cellLeftPadding}px solid ${colors.defaultBackgroundColor}`;
  const selectedStyles: IStyle = [
    getFocusStyle(theme, -1, undefined, undefined, themePrimary, white),
    classNames.isSelected,
    {
      color: colors.selectedMetaTextColor,
      background: colors.selectedBackgroundColor,
      borderBottom: `1px solid ${white}`,
      selectors: {
        '&:before': {
          position: 'absolute',
          display: 'block',
          top: -1,
          height: 1,
          bottom: 0,
          left: 0,
          right: 0,
          content: '',
          borderTop: `1px solid ${white}`
        },

        // Selected State hover
        '&:hover': {
          background: colors.selectedHoverBackgroundColor,
          selectors: {
            // Selected State hover meta cell
            $cell: {
              color: colors.selectedHoverMetaTextColor,

              selectors: {
                [HighContrastSelector]: {
                  color: 'HighlightText',
                  selectors: {
                    '> a': {
                      color: 'HighlightText'
                    }
                  }
                },

                // Selected State hover Header cell
                '&.$isRowHeader': {
                  color: colors.selectedHoverTextColor,
                  selectors: {
                    [HighContrastSelector]: {
                      color: 'HighlightText'
                    }
                  }
                }
              }
            }
          }
        },

        // Focus state
        '&:focus': {
          background: colors.focusBackgroundColor,

          selectors: {
            // Selected State hover meta cell
            $cell: {
              color: colors.focusMetaTextColor,
              [HighContrastSelector]: {
                color: 'HighlightText',
                selectors: {
                  '> a': {
                    color: 'HighlightText'
                  }
                }
              },

              // Row header cell
              '&.$isRowHeader': {
                color: colors.focusHeaderTextColor,
                selectors: {
                  [HighContrastSelector]: {
                    color: 'HighlightText'
                  }
                }
              }
            }
          }
        }
      }
    }
  ];

  const cannotSelectStyles: IStyle = [
    classNames.isContentUnselectable,
    {
      userSelect: 'none',
      cursor: 'default'
    }
  ];

  const rootCompactStyles: IStyle = {
    minHeight: values.compactRowHeight,
    border: 0
  };

  const cellCompactStyles: IStyle = {
    minHeight: values.compactRowHeight,
    paddingTop: values.compactRowVerticalPadding,
    paddingBottom: values.compactRowVerticalPadding,
    paddingLeft: `${cellStyleProps.cellLeftPadding}px`,
    selectors: {
      // Masking the running shimmer background with borders
      [`&$shimmer`]: {
        padding: 0,
        borderLeft: shimmerLeftBorderStyle,
        borderRight: shimmerRightBorderStyle,
        borderTop: `${values.compactRowShimmerVerticalBorder}px solid ${colors.defaultBackgroundColor}`,
        borderBottom: `${values.compactRowShimmerVerticalBorder}px solid ${colors.defaultBackgroundColor}`
      },

      // Masking the running shimmer background with borders when it's an Icon placeholder
      [`&$shimmerIconPlaceholder`]: {
        borderRight: `${cellStyleProps.cellRightPadding}px solid ${colors.defaultBackgroundColor}`,
        borderBottom: `${(values.compactRowHeight - values.rowShimmerIconPlaceholderHeight) / 2}px solid ${colors.defaultBackgroundColor}`,
        borderTop: `${(values.compactRowHeight - values.rowShimmerIconPlaceholderHeight) / 2}px solid ${colors.defaultBackgroundColor}`
      }
    }
  };

  const defaultCellStyles: IStyle = [
    getFocusStyle(theme, -1),
    classNames.cell,
    {
      display: 'inline-block',
      position: 'relative',
      boxSizing: 'border-box',
      minHeight: values.rowHeight,
      verticalAlign: 'top',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      paddingTop: values.rowVerticalPadding,
      paddingBottom: values.rowVerticalPadding,
      paddingLeft: `${cellStyleProps.cellLeftPadding}px`,
      selectors: {
        '& > button': {
          maxWidth: '100%'
        },

        [classNames.isFocusable!]: getFocusStyle(theme, -1, undefined, undefined, neutralSecondary, white),

        '&$shimmer': {
          padding: 0,
          borderLeft: shimmerLeftBorderStyle,
          borderRight: shimmerRightBorderStyle,
          borderTop: `${values.rowShimmerVerticalBorder}px solid ${colors.defaultBackgroundColor}`,
          borderBottom: `${values.rowShimmerVerticalBorder}px solid ${colors.defaultBackgroundColor}`
        },

        '&$shimmerIconPlaceholder': {
          borderRight: `${cellStyleProps.cellRightPadding}px solid ${colors.defaultBackgroundColor}`,
          borderBottom: `${(values.rowHeight - values.rowShimmerIconPlaceholderHeight) / 2}px solid ${colors.defaultBackgroundColor}`,
          borderTop: `${(values.rowHeight - values.rowShimmerIconPlaceholderHeight) / 2}px solid ${colors.defaultBackgroundColor}`
        }
      }
    },

    isSelected && {
      selectors: {
        '&.$isRowHeader': {
          color: colors.selectedTextColor,
          selectors: {
            [HighContrastSelector]: {
              color: 'HighlightText'
            }
          }
        },

        [HighContrastSelector]: {
          background: 'Highlight',
          color: 'HighlightText',
          '-ms-high-contrast-adjust': 'none',
          selectors: {
            a: {
              color: 'HighlightText'
            }
          }
        }
      }
    },

    compact && cellCompactStyles
  ];

  return {
    root: [
      classNames.root,
      AnimationClassNames.fadeIn400,
      droppingClassName,
      theme.fonts.small,
      isCheckVisible && classNames.isCheckVisible,
      getFocusStyle(theme, 0, undefined, undefined, isSelected ? neutralSecondary : themePrimary, white),
      {
        borderBottom: `1px solid ${neutralLighter}`,
        background: colors.defaultBackgroundColor,
        color: colors.defaultMetaTextColor,
        display: 'inline-flex', // This ensures that the row always tries to consume is minimum width and does not compress.
        minWidth: '100%',
        minHeight: values.rowHeight,
        whiteSpace: 'nowrap',
        padding: 0,
        boxSizing: 'border-box',
        verticalAlign: 'top',
        textAlign: 'left',
        selectors: {
          [`${classNames.listCellFirstChild} &:before`]: {
            display: 'none'
          },

          '&:hover': {
            background: colors.hoverColorBackground
          },

          '&:hover $check': {
            opacity: 1
          }
        }
      },
      isSelected && selectedStyles,
      !canSelect && cannotSelectStyles,
      compact && rootCompactStyles,
      className
    ],
    cellUnpadded: [
      {
        paddingRight: `${cellStyleProps.cellRightPadding}px`
      }
    ],
    cellPadded: [
      {
        paddingRight: `${cellStyleProps.cellExtraRightPadding + cellStyleProps.cellRightPadding}px`,
        selectors: {
          '&.$checkCell': {
            paddingRight: 0
          }
        }
      }
    ],

    cell: defaultCellStyles,

    cellMeasurer: [
      classNames.cellMeasurer,
      {
        overflow: 'visible',
        whiteSpace: 'nowrap'
      }
    ],
    checkCell: [
      defaultCellStyles,
      classNames.cellCheck,
      checkboxCellClassName,
      {
        padding: 0,
        // Ensure that the check cell covers the top border of the cell.
        // This ensures the click target does not leave a spot which would
        // cause other items to be deselected.
        paddingTop: 1,
        marginTop: -1,
        flexShrink: 0
      }
    ],
    checkCover: [
      {
        position: 'absolute',
        top: -1,
        left: 0,
        bottom: 0,
        right: 0,
        display: 'none'
      },

      anySelected && {
        display: 'block'
      }
    ],
    fields: [
      classNames.fields,
      {
        display: 'flex',
        alignItems: 'stretch'
      }
    ],
    isRowHeader: [
      {
        color: colors.defaultHeaderTextColor,
        fontSize: FontSizes.medium
      }
    ],
    isMultiline: [
      defaultCellStyles,
      {
        whiteSpace: 'normal',
        wordBreak: 'break-word',
        textOverflow: 'clip'
      }
    ],
    shimmer: [],
    shimmerIconPlaceholder: [],
    shimmerLeftBorder: [
      {
        // 40px to take into account the checkbox of items if present.
        borderLeft: `40px solid ${colors.defaultBackgroundColor}`
      }
    ],
    shimmerBottomBorder: [
      {
        // 1px to take into account the border-bottom when items replace shimmer lines and in default state.
        borderBottom: `1px solid ${colors.defaultBackgroundColor}`
      }
    ],
    check: []
  };
};
