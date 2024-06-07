import {
  AnimationVariables,
  getGlobalClassNames,
  HighContrastSelector,
  normalize,
  FontWeights,
  getHighContrastNoAdjustStyle,
} from '@fluentui/style-utilities';
import { IsFocusVisibleClassName } from '@fluentui/utilities';
import type { IPivotStyleProps, IPivotStyles } from './Pivot.types';
import type { IStyle } from '@fluentui/style-utilities';

const globalClassNames = {
  count: 'ms-Pivot-count',
  icon: 'ms-Pivot-icon',
  linkIsSelected: 'is-selected',
  link: 'ms-Pivot-link',
  linkContent: 'ms-Pivot-linkContent',
  root: 'ms-Pivot',
  rootIsLarge: 'ms-Pivot--large',
  rootIsTabs: 'ms-Pivot--tabs',
  text: 'ms-Pivot-text',
  linkInMenu: 'ms-Pivot-linkInMenu',
  overflowMenuButton: 'ms-Pivot-overflowMenuButton',
};

const getLinkStyles = (
  props: IPivotStyleProps,
  classNames: { [key: string]: string },
  isLinkInOverflowMenu: boolean = false,
): IStyle[] => {
  const { linkSize, linkFormat } = props;
  const { semanticColors, fonts } = props.theme;
  const rootIsLarge = linkSize === 'large';
  const rootIsTabs = linkFormat === 'tabs';

  return [
    fonts.medium,
    {
      color: semanticColors.actionLink,
      padding: '0 8px',
      position: 'relative',
      backgroundColor: 'transparent',
      border: 0,
      borderRadius: 0,
      selectors: {
        ':hover': {
          backgroundColor: semanticColors.buttonBackgroundHovered,
          color: semanticColors.buttonTextHovered,
          cursor: 'pointer',
        },
        ':active': {
          backgroundColor: semanticColors.buttonBackgroundPressed,
          color: semanticColors.buttonTextHovered,
        },
        ':focus': {
          outline: 'none',
        },
      },
    },
    !isLinkInOverflowMenu && [
      {
        display: 'inline-block',
        lineHeight: 44,
        height: 44,
        marginRight: 8,
        textAlign: 'center',
        selectors: {
          [`.${IsFocusVisibleClassName} &:focus, :host(.${IsFocusVisibleClassName}) &:focus`]: {
            outline: `1px solid ${semanticColors.focusBorder}`,
          },

          [`.${IsFocusVisibleClassName} &:focus:after, :host(.${IsFocusVisibleClassName}) &:focus:after`]: {
            content: 'attr(data-content)',
            position: 'relative',
            border: 0,
          },
          ':before': {
            backgroundColor: 'transparent',
            bottom: 0,
            content: '""',
            height: 2,
            left: 8,
            position: 'absolute',
            right: 8,
            transition: `left ${AnimationVariables.durationValue2} ${AnimationVariables.easeFunction2},
                        right ${AnimationVariables.durationValue2} ${AnimationVariables.easeFunction2}`,
          },
          ':after': {
            color: 'transparent',
            content: 'attr(data-content)',
            display: 'block',
            fontWeight: FontWeights.bold,
            height: 1,
            overflow: 'hidden',
            visibility: 'hidden',
          },
        },
      },
      rootIsLarge && {
        fontSize: fonts.large.fontSize,
      },
      rootIsTabs && [
        {
          marginRight: 0,
          height: 44,
          lineHeight: 44,
          backgroundColor: semanticColors.buttonBackground,
          padding: '0 10px',
          verticalAlign: 'top',

          selectors: {
            ':focus': {
              outlineOffset: '-2px',
            },
            [`.${IsFocusVisibleClassName} &:focus::before, :host(.${IsFocusVisibleClassName}) &:focus::before`]: {
              height: 'auto',
              background: 'transparent',
              transition: 'none',
            },
            '&:hover, &:focus': {
              color: semanticColors.buttonTextCheckedHovered,
            },
            '&:active, &:hover': {
              color: semanticColors.primaryButtonText,
              backgroundColor: semanticColors.primaryButtonBackground,
            },
            [`&.${classNames.linkIsSelected}`]: {
              backgroundColor: semanticColors.primaryButtonBackground,
              color: semanticColors.primaryButtonText,
              fontWeight: FontWeights.regular,
              selectors: {
                ':before': {
                  backgroundColor: 'transparent',
                  transition: 'none',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  content: '""',
                  height: 0,
                },
                ':hover': {
                  backgroundColor: semanticColors.primaryButtonBackgroundHovered,
                  color: semanticColors.primaryButtonText,
                },
                ':active': {
                  backgroundColor: semanticColors.primaryButtonBackgroundPressed,
                  color: semanticColors.primaryButtonText,
                },
                [HighContrastSelector]: {
                  fontWeight: FontWeights.semibold,
                  color: 'HighlightText',
                  background: 'Highlight',
                  ...getHighContrastNoAdjustStyle(),
                },
              },
            },
            // eslint-disable-next-line @fluentui/max-len
            [`.${IsFocusVisibleClassName} &.${classNames.linkIsSelected}:focus, :host(.${IsFocusVisibleClassName}) &.${classNames.linkIsSelected}:focus`]:
              {
                outlineColor: semanticColors.primaryButtonText,
              },
          },
        },
      ],
    ],
  ];
};

export const getStyles = (props: IPivotStyleProps): IPivotStyles => {
  const { className, linkSize, linkFormat, theme } = props;
  const { semanticColors, fonts } = theme;

  const classNames = getGlobalClassNames(globalClassNames, theme);

  const rootIsLarge = linkSize === 'large';
  const rootIsTabs = linkFormat === 'tabs';

  return {
    root: [
      classNames.root,
      fonts.medium,
      normalize,
      {
        position: 'relative',
        color: semanticColors.link,
        whiteSpace: 'nowrap',
      },
      rootIsLarge && classNames.rootIsLarge,
      rootIsTabs && classNames.rootIsTabs,
      className,
    ],
    itemContainer: {
      selectors: {
        '&[hidden]': {
          display: 'none',
        },
      },
    },
    link: [
      classNames.link,
      ...getLinkStyles(props, classNames),
      {
        [`&[data-is-overflowing='true']`]: {
          display: 'none',
        },
      },
    ],
    overflowMenuButton: [
      classNames.overflowMenuButton,
      {
        visibility: 'hidden',
        position: 'absolute',
        right: 0,
        [`.${classNames.link}[data-is-overflowing='true'] ~ &`]: {
          visibility: 'visible',
          position: 'relative',
        },
      },
    ],
    linkInMenu: [
      classNames.linkInMenu,
      ...getLinkStyles(props, classNames, true),
      {
        textAlign: 'left',
        width: '100%',
        height: 36,
        lineHeight: 36,
      },
    ],
    linkIsSelected: [
      classNames.link,
      classNames.linkIsSelected,
      {
        fontWeight: FontWeights.semibold,
        selectors: {
          ':before': {
            backgroundColor: semanticColors.inputBackgroundChecked,
            selectors: {
              [HighContrastSelector]: {
                backgroundColor: 'Highlight',
              },
            },
          },
          ':hover::before': {
            left: 0,
            right: 0,
          },
          [HighContrastSelector]: {
            color: 'Highlight',
          },
        },
      },
    ],
    linkContent: [
      classNames.linkContent,
      {
        flex: '0 1 100%',
        selectors: {
          '& > * ': {
            marginLeft: 4,
          },
          '& > *:first-child': {
            marginLeft: 0,
          },
        },
      },
    ],
    text: [
      classNames.text,
      {
        display: 'inline-block',
        verticalAlign: 'top',
      },
    ],
    count: [
      classNames.count,
      {
        display: 'inline-block',
        verticalAlign: 'top',
      },
    ],
    icon: classNames.icon,
  };
};
