import {
  IDialogContentStyleProps,
  IDialogContentStyles,
  DialogType
} from './DialogContent.types';
import {
  IStyle,
  ITheme,
  FontWeights,
} from '../../Styling';

export const getStyles = (
  props: IDialogContentStyleProps
): IDialogContentStyles => {
  const {
    className,
    theme,
    type,
    hidden,
    isMultiline,
  } = props;

  const { palette, fonts } = theme;
  const dialogLgHeaderBackgroundColor = palette.themePrimary;

  return ({
    content: [
      type === DialogType.largeHeader && [
        'ms-Dialog-lgHeader',
        {}
      ],
      type === DialogType.close && [
        'ms-Dialog--close',
        {}
      ],
      className
    ],

    subText: [
      'ms-Dialog-subText',
      {
        margin: '0 0 20px 0',
        paddingTop: '8px',
        color: palette.neutralPrimary,
        lineHeight: '1.5',
        wordWrap: 'break-word',
        fontWeight: FontWeights.semilight,
      },
      type === DialogType.largeHeader ? fonts.medium : fonts.small,
    ],

    header: [
      'ms-Dialog-header',
      {
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box',
      },
      type === DialogType.largeHeader && [
        'ms-Dialog--lgHeader',
        {
          backgroundColor: dialogLgHeaderBackgroundColor,
        }
      ],
      type === DialogType.close && [
        'ms-Dialog--close',
      ]
    ],

    button: [
      'ms-Dialog-button',
      'ms-Dialog-button--close',
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
      'ms-Dialog-inner',
      {
        padding: isMultiline ? '0 20px 20px' : '0 28px 20px',
      }
    ],

    innerContent: [
      'ms-Dialog-content',
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
      },
      className
    ],

    title: [
      'ms-Dialog-title',
      {
        color: palette.neutralPrimary,
        margin: '0',
        padding: '20px 36px 20px 28px',
      },
      fonts.xLarge,
      type === DialogType.largeHeader && [
        {
          color: palette.white,
          marginBottom: '8px',
          padding: '26px 28px 28px',
        },
        fonts.xxLarge
      ],
      isMultiline && fonts.xxLarge,
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
  });
};
