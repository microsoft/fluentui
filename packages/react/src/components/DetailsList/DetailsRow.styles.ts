import {
  AnimationClassNames,
  AnimationStyles,
  HighContrastSelector,
  getFocusStyle,
  getGlobalClassNames,
  FontWeights,
  getHighContrastNoAdjustStyle,
} from '../../Styling';
import { IsFocusVisibleClassName } from '../../Utilities';
import { GlobalClassNames as LinkGlobalClassNames } from '../../components/Link/Link.styles';
import type { IDetailsRowStyleProps, IDetailsRowStyles, ICellStyleProps } from './DetailsRow.types';
import type { IStyle } from '../../Styling';

export const DetailsRowGlobalClassNames = {
  root: 'ms-DetailsRow',
  // TODO: in Fabric 7.0 lowercase the 'Compact' for consistency across other components.
  compact: 'ms-DetailsList--Compact',
  cell: 'ms-DetailsRow-cell',
  cellAnimation: 'ms-DetailsRow-cellAnimation',
  cellCheck: 'ms-DetailsRow-cellCheck',
  check: 'ms-DetailsRow-check',
  cellMeasurer: 'ms-DetailsRow-cellMeasurer',
  listCellFirstChild: 'ms-List-cell:first-child',
  isContentUnselectable: 'is-contentUnselectable',
  isSelected: 'is-selected',
  isCheckVisible: 'is-check-visible',
  isRowHeader: 'is-row-header',
  fields: 'ms-DetailsRow-fields',
};
const IsFocusableSelector = "[data-is-focusable='true']";

export const DEFAULT_CELL_STYLE_PROPS: ICellStyleProps = {
  cellLeftPadding: 12,
  cellRightPadding: 8,
  cellExtraRightPadding: 24,
};

// Source of default row heights to share.
export const DEFAULT_ROW_HEIGHTS = {
  rowHeight: 42,
  compactRowHeight: 32,
};

// Constant values
const values = {
  ...DEFAULT_ROW_HEIGHTS,
  rowVerticalPadding: 11,
  compactRowVerticalPadding: 6,
};

export const getDetailsRowStyles = (props: IDetailsRowStyleProps): IDetailsRowStyles => {
  const {
    theme,
    isSelected,
    canSelect,
    droppingClassName,
    isCheckVisible,
    checkboxCellClassName,
    compact,
    className,
    cellStyleProps = DEFAULT_CELL_STYLE_PROPS,
    enableUpdateAnimations,
    disabled,
  } = props;

  const { palette, fonts } = theme;
  const { neutralPrimary, white, neutralSecondary, neutralLighter, neutralLight, neutralDark, neutralQuaternaryAlt } =
    palette;
  const { focusBorder, linkHovered: focusedLinkColor } = theme.semanticColors;

  const classNames = getGlobalClassNames(DetailsRowGlobalClassNames, theme);

  const colors = {
    // Default
    defaultHeaderText: neutralPrimary,
    defaultMetaText: neutralSecondary,
    defaultBackground: white,

    // Default Hover
    defaultHoverHeaderText: neutralDark,
    defaultHoverMetaText: neutralPrimary,
    defaultHoverBackground: neutralLighter,

    // Selected
    selectedHeaderText: neutralDark,
    selectedMetaText: neutralPrimary,
    selectedBackground: neutralLight,

    // Selected Hover
    selectedHoverHeaderText: neutralDark,
    selectedHoverMetaText: neutralPrimary,
    selectedHoverBackground: neutralQuaternaryAlt,

    // Focus
    focusHeaderText: neutralDark,
    focusMetaText: neutralPrimary,
    focusBackground: neutralLight,
    focusHoverBackground: neutralQuaternaryAlt,
  };

  const rowHighContrastFocus = {
    top: 2,
    right: 2,
    bottom: 2,
    left: 2,
  };

  // Selected row styles
  const selectedStyles: IStyle = [
    getFocusStyle(theme, {
      inset: -1,
      borderColor: focusBorder,
      outlineColor: white,
      highContrastStyle: rowHighContrastFocus,
      pointerEvents: 'none',
    }),
    classNames.isSelected,
    {
      color: colors.selectedMetaText,
      background: colors.selectedBackground,
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
          borderTop: `1px solid ${white}`,
        },

        [`.${classNames.cell} > .${LinkGlobalClassNames.root}`]: {
          color: focusedLinkColor,
          selectors: {
            [HighContrastSelector]: {
              color: 'HighlightText',
            },
          },
        },

        // Selected State hover
        '&:hover': {
          background: colors.selectedHoverBackground,
          color: colors.selectedHoverMetaText,
          selectors: {
            // Selected State hover meta cell
            [HighContrastSelector]: {
              background: 'Highlight',
              selectors: {
                [`.${classNames.cell}`]: {
                  color: 'HighlightText',
                },
                [`.${classNames.cell} > .${LinkGlobalClassNames.root}`]: {
                  forcedColorAdjust: 'none',
                  color: 'HighlightText',
                },
              },
            },

            // Selected State hover Header cell
            [`.${classNames.isRowHeader}`]: {
              color: colors.selectedHoverHeaderText,
              selectors: {
                [HighContrastSelector]: {
                  color: 'HighlightText',
                },
              },
            },
          },
        },

        // Focus state
        '&:focus': {
          background: colors.focusBackground,
          selectors: {
            // Selected State hover meta cell
            [`.${classNames.cell}`]: {
              color: colors.focusMetaText,
              selectors: {
                [HighContrastSelector]: {
                  color: 'HighlightText',
                  selectors: {
                    '> a': {
                      color: 'HighlightText',
                    },
                  },
                },
              },
            },

            // Row header cell
            [`.${classNames.isRowHeader}`]: {
              color: colors.focusHeaderText,
              selectors: {
                [HighContrastSelector]: {
                  color: 'HighlightText',
                },
              },
            },

            // Ensure high-contrast mode overrides default focus background
            [HighContrastSelector]: {
              background: 'Highlight',
            },
          },
        },

        [HighContrastSelector]: {
          background: 'Highlight',
          color: 'HighlightText',
          ...getHighContrastNoAdjustStyle(),
          selectors: {
            a: {
              color: 'HighlightText',
            },
          },
        },

        // Focus and hover state
        '&:focus:hover': {
          background: colors.focusHoverBackground,
        },
      },
    },
  ];

  const cannotSelectStyles: IStyle = [
    classNames.isContentUnselectable,
    {
      userSelect: 'none',
      cursor: 'default',
    },
  ];

  const rootCompactStyles: IStyle = {
    minHeight: values.compactRowHeight,
    border: 0,
  };

  const cellCompactStyles: IStyle = {
    minHeight: values.compactRowHeight,
    paddingTop: values.compactRowVerticalPadding,
    paddingBottom: values.compactRowVerticalPadding,
    paddingLeft: `${cellStyleProps.cellLeftPadding}px`,
  };

  const defaultCellStyles: IStyle = [
    getFocusStyle(theme, { inset: -1 }),
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
          maxWidth: '100%',
        },

        [IsFocusableSelector]: getFocusStyle(theme, { inset: -1, borderColor: neutralSecondary, outlineColor: white }),
      },
    },

    isSelected && {
      selectors: {
        [HighContrastSelector]: {
          background: 'Highlight',
          color: 'HighlightText',
          ...getHighContrastNoAdjustStyle(),
        },
      },
    },

    compact && cellCompactStyles,
    disabled && { opacity: 0.5 },
  ];

  return {
    root: [
      classNames.root,
      AnimationClassNames.fadeIn400,
      droppingClassName,
      theme.fonts.small,
      isCheckVisible && classNames.isCheckVisible,
      getFocusStyle(theme, { borderColor: focusBorder, outlineColor: white }),
      {
        borderBottom: `1px solid ${neutralLighter}`,
        background: colors.defaultBackground,
        color: colors.defaultMetaText,
        // This ensures that the row always tries to consume is minimum width and does not compress.
        display: 'inline-flex',
        minWidth: '100%',
        minHeight: values.rowHeight,
        whiteSpace: 'nowrap',
        padding: 0,
        boxSizing: 'border-box',
        verticalAlign: 'top',
        textAlign: 'left',
        selectors: {
          [`.${classNames.listCellFirstChild} &:before`]: {
            display: 'none',
          },

          '&:hover': {
            background: colors.defaultHoverBackground,
            color: colors.defaultHoverMetaText,
            selectors: {
              [`.${classNames.isRowHeader}`]: {
                color: colors.defaultHoverHeaderText,
              },

              [`.${classNames.cell} > .${LinkGlobalClassNames.root}`]: {
                color: focusedLinkColor,
              },
            },
          },

          [`&:hover .${classNames.check}`]: {
            opacity: 1,
          },

          // eslint-disable-next-line @fluentui/max-len
          [`.${IsFocusVisibleClassName} &:focus .${classNames.check}, :host(.${IsFocusVisibleClassName}) &:focus .${classNames.check}`]:
            {
              opacity: 1,
            },

          '.ms-GroupSpacer': {
            flexShrink: 0,
            flexGrow: 0,
          },
        },
      },
      isSelected && selectedStyles,
      !canSelect && cannotSelectStyles,
      compact && rootCompactStyles,
      className,
    ],

    cellUnpadded: {
      paddingRight: `${cellStyleProps.cellRightPadding}px`,
    },

    cellPadded: {
      paddingRight: `${cellStyleProps.cellExtraRightPadding + cellStyleProps.cellRightPadding}px`,
      selectors: {
        [`&.${classNames.cellCheck}`]: {
          paddingRight: 0,
        },
      },
    },

    cell: defaultCellStyles,
    cellAnimation: enableUpdateAnimations && AnimationStyles.slideLeftIn40,
    cellMeasurer: [
      classNames.cellMeasurer,
      {
        overflow: 'visible',
        whiteSpace: 'nowrap',
      },
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
        flexShrink: 0,
      },
    ],
    fields: [
      classNames.fields,
      {
        display: 'flex',
        alignItems: 'stretch',
      },
    ],
    isRowHeader: [
      classNames.isRowHeader,
      {
        color: colors.defaultHeaderText,
        fontSize: fonts.medium.fontSize,
      },
      isSelected && {
        color: colors.selectedHeaderText,
        fontWeight: FontWeights.semibold,
        selectors: {
          [HighContrastSelector]: {
            color: 'HighlightText',
          },
        },
      },
    ],
    isMultiline: [
      defaultCellStyles,
      {
        whiteSpace: 'normal',
        wordBreak: 'break-word',
        textOverflow: 'clip',
      },
    ],
    check: [classNames.check],
  };
};
