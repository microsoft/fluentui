import { AnimationVariables, FontWeights, getFocusStyle, getGlobalClassNames, keyframes } from '../../Styling';
import { memoizeFunction } from '../../Utilities';
import type { ITeachingBubbleStyleProps, ITeachingBubbleStyles } from './TeachingBubble.types';
import type { ICalloutContentStyleProps } from '../../Callout';
import type { GlobalClassNames, IStyle } from '../../Styling';

const globalClassNames = {
  root: 'ms-TeachingBubble',
  body: 'ms-TeachingBubble-body',
  bodyContent: 'ms-TeachingBubble-bodycontent',
  closeButton: 'ms-TeachingBubble-closebutton',
  content: 'ms-TeachingBubble-content',
  footer: 'ms-TeachingBubble-footer',
  header: 'ms-TeachingBubble-header',
  headerIsCondensed: 'ms-TeachingBubble-header--condensed',
  headerIsSmall: 'ms-TeachingBubble-header--small',
  headerIsLarge: 'ms-TeachingBubble-header--large',
  headline: 'ms-TeachingBubble-headline',
  image: 'ms-TeachingBubble-image',
  primaryButton: 'ms-TeachingBubble-primaryButton',
  secondaryButton: 'ms-TeachingBubble-secondaryButton',
  subText: 'ms-TeachingBubble-subText',

  // TODO: Button global class name usage should be converted to a styles function once
  //        Button supports JS styling, which means these button names can be removed.
  button: 'ms-Button',
  buttonLabel: 'ms-Button-label',
};

const opacityFadeIn = memoizeFunction(() =>
  keyframes({
    '0%': {
      opacity: 0,
      animationTimingFunction: AnimationVariables.easeFunction1,
      transform: 'scale3d(.90,.90,.90)',
    },
    '100%': {
      opacity: 1,
      transform: 'scale3d(1,1,1)',
    },
  }),
);

const rootStyle = (isWide?: boolean, calloutProps?: ICalloutContentStyleProps): IStyle[] => {
  const { calloutWidth, calloutMaxWidth } = calloutProps || {};

  return [
    {
      display: 'block',
      maxWidth: 364,
      border: 0,
      outline: 'transparent',
      width: calloutWidth || 'calc(100% + 1px)',
      animationName: `${opacityFadeIn()}`,
      animationDuration: '300ms',
      animationTimingFunction: 'linear',
      animationFillMode: 'both',
    },
    isWide && {
      maxWidth: calloutMaxWidth || 456,
    },
  ];
};

const headerStyle = (
  classNames: Partial<GlobalClassNames<typeof globalClassNames>>,
  hasCondensedHeadline?: boolean,
  hasSmallHeadline?: boolean,
): IStyle[] => {
  if (hasCondensedHeadline) {
    return [
      classNames.headerIsCondensed,
      {
        marginBottom: 14,
      },
    ];
  }

  return [
    hasSmallHeadline && classNames.headerIsSmall,
    !hasSmallHeadline && classNames.headerIsLarge,
    {
      selectors: {
        ':not(:last-child)': {
          marginBottom: 14,
        },
      },
    },
  ];
};

export const getStyles = (props: ITeachingBubbleStyleProps): ITeachingBubbleStyles => {
  const {
    hasCondensedHeadline,
    hasSmallHeadline,
    hasCloseButton,
    hasHeadline,
    isWide,
    primaryButtonClassName,
    secondaryButtonClassName,
    theme,
    calloutProps = { className: undefined, theme },
  } = props;
  const hasLargeHeadline: boolean = !hasCondensedHeadline && !hasSmallHeadline;
  const { palette, semanticColors, fonts } = theme;
  const classNames = getGlobalClassNames(globalClassNames, theme);
  const hideDefaultFocusRing = getFocusStyle(theme, {
    outlineColor: 'transparent',
    borderColor: 'transparent',
  });
  return {
    root: [classNames.root, fonts.medium, calloutProps.className],
    body: [
      classNames.body,
      hasCloseButton && !hasHeadline && { marginRight: 24 },
      {
        selectors: {
          ':not(:last-child)': {
            marginBottom: 20,
          },
        },
      },
    ],
    bodyContent: [
      classNames.bodyContent,
      {
        padding: '20px 24px 20px 24px',
      },
    ],
    closeButton: [
      classNames.closeButton,
      {
        position: 'absolute',
        right: 0,
        top: 0,
        margin: '15px 15px 0 0',
        borderRadius: 0,
        color: palette.white,
        fontSize: fonts.small.fontSize,
        selectors: {
          ':hover': {
            background: palette.themeDarkAlt,
            color: palette.white,
          },
          ':active': {
            background: palette.themeDark,
            color: palette.white,
          },
          ':focus': {
            border: `1px solid ${semanticColors.variantBorder}`,
          },
        },
      },
    ],
    content: [
      classNames.content,
      ...rootStyle(isWide),
      isWide && {
        display: 'flex',
      },
    ],
    footer: [
      classNames.footer,
      {
        display: 'flex',
        flex: 'auto',
        alignItems: 'center',
        color: palette.white,
        selectors: {
          // TODO: global class name usage should be converted to a styles function once Button supports JS styling
          [`.${classNames.button}:not(:first-child)`]: {
            marginLeft: 10,
          },
        },
      },
    ],
    header: [
      classNames.header,
      ...headerStyle(classNames, hasCondensedHeadline, hasSmallHeadline),
      hasCloseButton && { marginRight: 24 },
      (hasCondensedHeadline || hasSmallHeadline) && [
        fonts.medium,
        {
          fontWeight: FontWeights.semibold,
        },
      ],
    ],
    headline: [
      classNames.headline,
      {
        margin: 0,
        color: palette.white,
        fontWeight: FontWeights.semibold,
        overflowWrap: 'break-word',
      },
      hasLargeHeadline && [
        {
          fontSize: fonts.xLarge.fontSize,
        },
      ],
    ],
    imageContent: [
      classNames.header,
      classNames.image,
      isWide && {
        display: 'flex',
        alignItems: 'center',
        maxWidth: 154,
      },
    ],
    primaryButton: [
      classNames.primaryButton,
      primaryButtonClassName,
      hideDefaultFocusRing,
      {
        backgroundColor: palette.white,
        borderColor: palette.white,
        color: palette.themePrimary,
        whiteSpace: 'nowrap',
        selectors: {
          // TODO: global class name usage should be converted to a styles function once Button supports JS styling
          [`.${classNames.buttonLabel}`]: fonts.medium,
          ':hover': {
            backgroundColor: palette.themeLighter,
            borderColor: palette.themeLighter,
            color: palette.themeDark,
          },
          ':focus': {
            backgroundColor: palette.themeLighter,
            border: `1px solid ${palette.black}`,
            color: palette.themeDark,
            outline: `1px solid ${palette.white}`,
            outlineOffset: '-2px',
          },
          ':active': {
            backgroundColor: palette.white,
            borderColor: palette.white,
            color: palette.themePrimary,
          },
        },
      },
    ],
    secondaryButton: [
      classNames.secondaryButton,
      secondaryButtonClassName,
      hideDefaultFocusRing,
      {
        backgroundColor: palette.themePrimary,
        borderColor: palette.white,
        whiteSpace: 'nowrap',
        selectors: {
          // TODO: global class name usage should be converted to a styles function once Button supports JS styling
          [`.${classNames.buttonLabel}`]: [
            fonts.medium,
            {
              color: palette.white,
            },
          ],
          ':hover': {
            backgroundColor: palette.themeDarkAlt,
            borderColor: palette.white,
          },
          ':focus': {
            backgroundColor: palette.themeDark,
            border: `1px solid ${palette.black}`,
            outline: `1px solid ${palette.white}`,
            outlineOffset: '-2px',
          },
          ':active': {
            backgroundColor: palette.themePrimary,
            borderColor: palette.white,
          },
        },
      },
    ],
    subText: [
      classNames.subText,
      {
        margin: 0,
        fontSize: fonts.medium.fontSize,
        color: palette.white,
        fontWeight: FontWeights.regular,
      },
    ],
    subComponentStyles: {
      callout: {
        root: [...rootStyle(isWide, calloutProps), fonts.medium],
        beak: [
          {
            background: palette.themePrimary,
          },
        ],
        calloutMain: [
          {
            background: palette.themePrimary,
          },
        ],
      },
    },
  };
};
