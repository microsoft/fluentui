import { ITeachingBubbleStyleProps, ITeachingBubbleStyles } from './TeachingBubble.types';
import {
  AnimationVariables,
  DefaultFontStyles,
  FontSizes,
  FontWeights,
  getGlobalClassNames,
  GlobalClassNames,
  IStyle,
  keyframes
} from '../../Styling';

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
  buttonLabel: 'ms-Button-label'
};

const bounceAnimation: string = keyframes({
  '0%': { transform: 'matrix3d(0.5, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '1.7%': { transform: 'matrix3d(0.658, 0, 0, 0, 0, 0.703, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '2.35%': { transform: 'matrix3d(0.725, 0, 0, 0, 0, 0.8, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '3.4%': { transform: 'matrix3d(0.83, 0, 0, 0, 0, 0.946, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '4.7%': { transform: 'matrix3d(0.942, 0, 0, 0, 0, 1.084, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '5.11%': { transform: 'matrix3d(0.971, 0, 0, 0, 0, 1.113, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '6.81%': { transform: 'matrix3d(1.062, 0, 0, 0, 0, 1.166, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '7.06%': { transform: 'matrix3d(1.07, 0, 0, 0, 0, 1.165, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '8.76%': { transform: 'matrix3d(1.104, 0, 0, 0, 0, 1.12, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '9.36%': { transform: 'matrix3d(1.106, 0, 0, 0, 0, 1.094, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '10.66%': { transform: 'matrix3d(1.098, 0, 0, 0, 0, 1.035, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '12.16%': { transform: 'matrix3d(1.075, 0, 0, 0, 0, 0.98, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '12.61%': { transform: 'matrix3d(1.067, 0, 0, 0, 0, 0.969, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '14.51%': { transform: 'matrix3d(1.031, 0, 0, 0, 0, 0.948, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '14.96%': { transform: 'matrix3d(1.024, 0, 0, 0, 0, 0.949, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '17.77%': { transform: 'matrix3d(0.99, 0, 0, 0, 0, 0.981, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '18.37%': { transform: 'matrix3d(0.986, 0, 0, 0, 0, 0.989, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '20.52%': { transform: 'matrix3d(0.98, 0, 0, 0, 0, 1.011, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '22.22%': { transform: 'matrix3d(0.983, 0, 0, 0, 0, 1.016, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '26.08%': { transform: 'matrix3d(0.996, 0, 0, 0, 0, 1.003, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '29.93%': { transform: 'matrix3d(1.003, 0, 0, 0, 0, 0.995, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '31.63%': { transform: 'matrix3d(1.004, 0, 0, 0, 0, 0.996, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '37.64%': { transform: 'matrix3d(1.001, 0, 0, 0, 0, 1.002, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '42.74%': { transform: 'matrix3d(0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '45.35%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '49.9%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '50%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '52.15%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '54.3%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '56.46%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '58.61%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '64.16%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '69.72%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '80.83%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '91.99%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '100%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' }
});

const opacityFadeIn: string = keyframes({
  '0%': {
    opacity: 0,
    animationTimingFunction: AnimationVariables.easeFunction2
  },
  '26.26%': { opacity: 1 },
  '100%': { opacity: 1 }
});

const rootStyle = (isWide?: boolean): IStyle[] => {
  return [
    {
      display: 'block',
      maxWidth: 364,
      border: 0,
      outline: 'transparent',
      boxShadow: 'none !important',
      width: 'calc(100% + 1px)',
      animationName: `${bounceAnimation}, ${opacityFadeIn}`,
      animationDuration: '2000ms',
      animationTimingFunction: 'linear',
      animationFillMode: 'both'
    },
    isWide && {
      maxWidth: '456px'
    }
  ];
};

const headerStyle = (
  classNames: Partial<GlobalClassNames<typeof globalClassNames>>,
  hasCondensedHeadline?: boolean,
  hasSmallHeadline?: boolean
): IStyle[] => {
  if (hasCondensedHeadline) {
    return [classNames.headerIsCondensed];
  }

  if (hasSmallHeadline) {
    return [
      classNames.headerIsSmall,
      {
        selectors: {
          ':not(:last-child)': {
            marginBottom: '14px'
          }
        }
      }
    ];
  }

  // Large headline is default
  return [
    classNames.headerIsLarge,
    {
      selectors: {
        ':not(:last-child)': {
          marginBottom: '14px'
        }
      }
    }
  ];
};

export const getStyles = (props: ITeachingBubbleStyleProps): ITeachingBubbleStyles => {
  const {
    calloutClassName,
    hasCondensedHeadline,
    hasSmallHeadline,
    isWide,
    primaryButtonClassName,
    secondaryButtonClassName,
    theme
  } = props;
  const hasLargeHeadline: boolean = !hasCondensedHeadline && !hasSmallHeadline;
  const { palette } = theme;
  const classNames = getGlobalClassNames(globalClassNames, theme);

  return {
    root: [classNames.root, theme.fonts.medium, calloutClassName],
    body: [
      classNames.body,
      {
        selectors: {
          ':not(:last-child)': {
            marginBottom: '20px'
          }
        }
      }
    ],
    bodyContent: [
      classNames.bodyContent,
      {
        padding: '20px'
      },
      isWide && {
        maxWidth: '302px'
      }
    ],
    closeButton: [
      classNames.closeButton,
      {
        position: 'absolute',
        right: 0,
        top: 0,
        color: palette.white,
        fontSize: FontSizes.small,
        selectors: {
          ':hover': {
            background: 'transparent'
          }
        }
      }
    ],
    content: [
      classNames.content,
      ...rootStyle(isWide),
      isWide && {
        display: 'flex'
      }
    ],
    footer: [
      classNames.footer,
      {
        display: 'flex',
        selectors: {
          // TODO: global class name usage should be converted to a button styles function once Button supports JS styling
          [`.${classNames.button}:not(:first-child)`]: {
            marginLeft: '20px'
          }
        }
      }
    ],
    header: [
      classNames.header,
      ...headerStyle(classNames, hasCondensedHeadline, hasSmallHeadline),
      (hasCondensedHeadline || hasSmallHeadline) && [
        DefaultFontStyles.medium,
        {
          marginRight: '10px',
          fontWeight: FontWeights.semibold
        }
      ]
    ],
    headline: [
      classNames.headline,
      {
        margin: 0,
        color: palette.white
      },
      hasLargeHeadline && [
        DefaultFontStyles.xxLarge,
        {
          fontWeight: FontWeights.light
        }
      ]
    ],
    imageContent: [
      classNames.header,
      classNames.image,
      isWide && {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '20px',
        maxWidth: '154px'
      }
    ],
    primaryButton: [
      classNames.primaryButton,
      primaryButtonClassName,
      {
        backgroundColor: palette.white,
        borderColor: palette.white,
        whiteSpace: 'nowrap',
        selectors: {
          // TODO: global class name usage should be converted to a button styles function once Button supports JS styling
          [`.${classNames.buttonLabel}`]: [
            DefaultFontStyles.medium,
            {
              color: palette.themePrimary
            }
          ],
          ':hover': {
            backgroundColor: palette.themeLighter,
            borderColor: palette.themeLighter
          },
          ':focus': {
            backgroundColor: palette.themeLighter,
            borderColor: palette.white
          },
          ':active': {
            backgroundColor: palette.white,
            borderColor: palette.white
          }
        }
      }
    ],
    secondaryButton: [
      classNames.secondaryButton,
      secondaryButtonClassName,
      {
        backgroundColor: palette.themePrimary,
        borderColor: palette.white,
        whiteSpace: 'nowrap',
        selectors: {
          // TODO: global class name usage should be converted to a button styles function once Button supports JS styling
          [`.${classNames.buttonLabel}`]: [
            DefaultFontStyles.medium,
            {
              color: palette.white
            }
          ],
          '&:hover, &:focus': {
            backgroundColor: palette.themeDarkAlt,
            borderColor: palette.white
          },
          ':active': {
            backgroundColor: palette.themePrimary,
            borderColor: palette.white
          }
        }
      }
    ],
    subText: [
      classNames.subText,
      {
        margin: 0,
        fontSize: FontSizes.medium,
        color: palette.white,
        fontWeight: FontWeights.semilight
      }
    ],
    subComponentStyles: {
      callout: {
        root: [...rootStyle(isWide), theme.fonts.medium],
        beak: [
          {
            background: palette.themePrimary
          }
        ],
        calloutMain: [
          {
            background: palette.themePrimary
          }
        ]
      }
    }
  };
};
