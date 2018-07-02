import { IDetailsRowStyleProps, IDetailsRowStyles, IDetailsRowProps } from './DetailsRow.types';
import { getGlobalClassNames } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-DetailsRow',
  compact: 'ms-DetailsList--Compact',
  firstCell: 'ms-List-cell:first-child',
  listCellFirstChild: 'ms-List-cell:first-child',
  isFocusable: "data-is-focusable='true'"
};

let values = {
  rowHeight: 42,
  compactRowHeight: 32,
  rowVerticalPadding: 11,
  rowHorizontalPadding: 8,
  compactRowVerticalPadding: 6,
  isPaddedMargin: 24,
  rowShimmerLineHeight: 7,
  rowShimmerIconPlaceholderHeight: 16,
  rowShimmerHorizontalBorder: 0,
  rowShimmerVerticalBorder: 0,
  compactRowShimmerVerticalBorder: 0
};

values = {
  ...values,
  ...{
    rowShimmerHorizontalBorder: values.rowHorizontalPadding,
    rowShimmerVerticalBorder: (values.rowHeight - values.rowShimmerLineHeight) / 2,
    compactRowShimmerVerticalBorder: (values.compactRowHeight - values.rowShimmerLineHeight) / 2
  }
};

export { IDetailsRowProps };

export const getStyles = (props: IDetailsRowStyleProps): IDetailsRowStyles => {
  const { theme, isSelected, canSelect } = props;
  const {
    neutralPrimary,
    neutralSecondaryAlt,
    white,
    neutralSecondary,
    neutralLighter,
    neutralLight,
    neutralDark,
    neutralQuaternaryAlt,
    black
  } = theme.palette;
  const { compactRowHeight, compactRowVerticalPadding, rowHorizontalPadding } = values;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);
  const colors = {
    // Default
    defaultHeaderTextColor: neutralPrimary,
    defaultMetaTextColor: neutralSecondaryAlt,
    defaultBackgroundColor: white,

    // Hover
    hoverTextColor: neutralPrimary,
    hoverMetaTextColor: neutralSecondary,
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

  return {
    root: [
      classNames.root,
      {
        // @include focus-border(0, $ms-color-neutralSecondary);
        borderBottom: `1px solid ${neutralLighter}`,
        background: colors.defaultBackgroundColor,
        color: colors.defaultMetaTextColor,
        display: 'flex',
        minWidth: '100%',
        minHeight: values.rowHeight,
        whiteSpace: 'nowrap',
        padding: 0,
        boxSizing: 'border-box',
        // @include ms-text-align(left);
        verticalAlign: 'top',

        ...(isSelected
          ? {
              // @include focus-border(0, $ms-color-themePrimary);
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
                        /*@include high-contrast {
                          color: HighlightText;
                          > a {
                            color: HighlightText;
                          }
                        }*/

                        // Selected State hover Header cell
                        '&.$isRowHeader': {
                          color: colors.selectedHoverTextColor

                          /*@include high-contrast {
                            color: HighlightText;
                          }*/
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

                      /*                      @include high-contrast {
                        color: HighlightText;
                        > a {
                          color: HighlightText;
                        }
                      }*/

                      // Row header cell
                      '&.$isRowHeader': {
                        color: colors.focusHeaderTextColor

                        /*@include high-contrast {
                          color: HighlightText;
                        }*/
                      }
                    }
                  }
                }
              }
            }
          : undefined),

        ...(canSelect
          ? {
              userSelect: 'none',
              cursor: 'default'
            }
          : undefined),

        selectors: {
          [`${classNames.compact} &`]: {
            minHeight: compactRowHeight,
            padding: `${compactRowVerticalPadding} ${rowHorizontalPadding} ${compactRowVerticalPadding} 12px`,
            selectors: {
              $cell: {
                minHeight: compactRowHeight,
                padding: `${compactRowVerticalPadding} ${rowHorizontalPadding} ${compactRowVerticalPadding} 12px`,
                selectors: {
                  // Masking the running shimmer background with borders
                  [`&.$shimmer`]: {
                    padding: '0 0',
                    /* TODO
                    @include border-left($rowShimmerHorizontalBorder, solid, $detailsList-item-default-background-color);
                    @include border-right(($rowShimmerHorizontalBorder * 4), solid, $detailsList-item-default-background-color);
                    */
                    borderTop: `${values.compactRowShimmerVerticalBorder} solid ${colors.defaultBackgroundColor}`,
                    borderBottom: `${values.compactRowShimmerVerticalBorder} solid ${colors.defaultBackgroundColor}`
                  },

                  // Masking the running shimmer background with borders when it's an Icon placeholder
                  [`&.$shimmerIconPlaceholder`]: {
                    // @include border-right($rowShimmerHorizontalBorder, solid, $detailsList-item-default-background-color);
                    borderBottom: `${(values.compactRowHeight - values.rowShimmerIconPlaceholderHeight) / 2} solid ${
                      colors.defaultBackgroundColor
                    }`,
                    borderTop: `${(values.compactRowHeight - values.rowShimmerIconPlaceholderHeight) / 2} solid ${
                      colors.defaultBackgroundColor
                    }`
                  }
                }
              },

              $check: {
                padding: values.rowHorizontalPadding
              }
            }
          },

          [`${classNames.listCellFirstChild} &:before`]: {
            display: 'none'
          },

          '&:hover': {
            background: colors.hoverColorBackground,
            color: colors.hoverMetaTextColor
          }
        }
      }
    ],
    cell: [
      {
        // @include focus-border();

        display: 'inline-block',
        position: 'relative',
        boxSizing: 'border-box',
        padding: `${values.rowVerticalPadding} ${values.rowHorizontalPadding} ${values.rowVerticalPadding} 12px`,
        minHeight: values.rowHeight,
        verticalAlign: 'top',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',

        selectors: {
          '&.$checkCell': {
            padding: 0,
            // Ensure that the check cell covers the top border of the cell.
            // This ensures the click target does not leave a spot which would
            // cause other items to be deselected.
            paddingTop: 1,
            marginTop: -1,
            flexShrink: 0
          },

          '& > button': {
            maxWidth: '100%'
          },

          '&.$isRowHeader': {
            color: colors.defaultHeaderTextColor,
            // TODO: font size
            fontSize: '$ms-font-size-m;'
          },

          [classNames.isFocusable!]: {
            // @include focus-border(0, $ms-color-neutralSecondary);
          },

          '&.$shimmer': {
            padding: '0 0',
            // @include border-left($rowShimmerHorizontalBorder, solid, $detailsList-item-default-background-color);
            // @include border-right(($rowShimmerHorizontalBorder * 4), solid, $detailsList-item-default-background-color);
            borderTop: `${values.rowShimmerVerticalBorder} solid ${colors.defaultBackgroundColor}`,
            borderBottom: `${values.rowShimmerVerticalBorder} solid ${colors.defaultBackgroundColor}`
          },

          '&.$shimmerIconPlaceholder': {
            // @include border-right($rowShimmerHorizontalBorder, solid, $detailsList-item-default-background-color);
            borderBottom: `${(values.rowHeight - values.rowShimmerIconPlaceholderHeight) / 2} solid ${
              colors.defaultBackgroundColor
            }`,
            borderTop: `${(values.rowHeight - values.rowShimmerIconPlaceholderHeight) / 2} solid ${
              colors.defaultBackgroundColor
            }`
          }
        }
      },

      isSelected && {
        selectors: {
          '&.$isRowHeader': {
            color: colors.selectedTextColor

            /*
            @include high-contrast {
              color: HighlightText;
            }
            */
          }
          /*
          @include high-contrast {
            background: Highlight;
            color: HighlightText;
            -ms-high-contrast-adjust: none;
            a {
              color: HighlightText;
            }
          }
          */
        }
      }
    ],
    checkCell: [],
    cellMeasurer: [
      {
        selectors: {
          '$cell &': {
            overflow: 'visible',
            whiteSpace: 'nowrap'
          }
        }
      }
    ],
    check: [],
    checkCover: [
      {
        position: 'absolute',
        top: -1,
        left: 0,
        bottom: 0,
        right: 0,
        display: 'none',

        selectors: {
          '$anySelected &': {
            display: 'block'
          }
        }
      }
    ],
    fields: [
      {
        display: 'flex',
        alignItems: 'stretch'
      }
    ],
    isRowHeader: [],
    isMultiline: [
      {
        whiteSpace: 'normal',
        wordBreak: 'break-word',
        textOverflow: 'clip'
      }
    ],
    isPadded: [
      {
        // @include ms-padding-right($isPaddedMargin + $rowHorizontalPadding);
        selectors: {
          '&.$checkCell': {
            // @include ms-padding-right(0);
          }
        }
      }
    ],
    anySelected: [],
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
    ]
  };
};
