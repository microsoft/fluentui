import { IDialogStyleProps, IDialogStyles } from './Dialog.types';
import {
  IStyle,
  ITheme,
  FontWeights,
  ScreenWidthMinMedium,
} from '../../Styling';

export const getStyles = (
  props: IDialogStyleProps
): IDialogStyles => {
  const {
    className,
    containerClassName,
    contentClassName,
    theme,
    hidden,
    isLargeHeader,
    isMultiline,
    isRight,
  } = props;

  const { palette, semanticColors, fonts } = theme;
  const dialogDefaultMinWidth = '288px';
  const dialogDefaultMaxWidth = '340px';
  const dialogLgHeaderBackgroundColor = palette.themePrimary;

  return ({
    root: [
      'ms-Dialog',
      className,
    ],
    main: [
      {
        width: dialogDefaultMinWidth,

        selectors: {
          [`@media (min-width: ${ScreenWidthMinMedium}px)`]: {
            width: 'auto',
            maxWidth: dialogDefaultMaxWidth,
            minWidth: dialogDefaultMinWidth,
          }
        }
      },
      !hidden && { display: 'flex' },
      containerClassName,
    ],

    button: [
      hidden && {
        selectors: {
          '.ms-Icon.ms-Icon--Cancel': {
            color: palette.neutralSecondary,
            fontSize: '16px',
          }
        }
      }
    ],

    inner: [
      {
        padding: isMultiline ? '0 20px 20px' : '0 28px 20px',
      }
    ],

    header: [
      {
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box',
      },
      isLargeHeader && {
        backgroundColor: dialogLgHeaderBackgroundColor
      }
    ],

    title: [
      {
        color: palette.neutralPrimary,
        margin: '0',
        padding: '20px 36px 20px 28px',
      },
      isLargeHeader && [
        {
          color: palette.white,
          marginBottom: '8px',
          padding: '26px 28px 28px',
        },
        fonts.xxLarge
      ],
      isMultiline ? fonts.xxLarge : fonts.xLarge,
    ],

    topButton: [
      {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        position: 'absolute',
        top: '0',
        right: '0',
        padding: '12px 12px 0 0',

        selectors: {
          '> *': {
            flex: '0 0 auto',
          }
        }
      }
    ],

    content: [
      {
        position: 'relative',
        width: '100%',

        selectors: {
          '.ms-Button.ms-Button--compount': {
            marginBottom: '20px',

            selectors: {
              '&:last-child': {
                marginBottom: '0',
              }
            }
          }
        }
      }
    ],

    subText: [
      {
        margin: '0 0 20px 0',
        paddingTop: '8px',
        color: palette.neutralPrimary,
        lineHeight: '1.5',
        wordWrap: 'break-word',
        fontWeight: FontWeights.semilight,
      },
      isLargeHeader ? fonts.medium : fonts.small,
    ],

    actions: [
      {
        position: 'relative',
        width: '100%',
        minHeight: '24px',
        lineHeight: '24px',
        margin: '20px 0 0',
        fontSize: '0',

        selectors: {
          '.ms-Button': {
            lineHeight: 'normal',
          }
        }
      }
    ],

    actionsRight: [
      {
        textAlign: 'right',
        marginRight: '-4px',
      }
    ],

    action: [
      isRight && {
        margin: '0 4px',
      }
    ]

    // Insert className styles
  });
};
