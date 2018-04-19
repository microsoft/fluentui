import {
  IDialogContentStyleProps,
  IDialogContentStyles,
} from './DialogContent.types';
import {
  FontWeights,
  globalClassNamesWhenEnabled,
} from '../../Styling';

export const getStyles = (
  props: IDialogContentStyleProps
): IDialogContentStyles => {
  const {
    className,
    theme,
    isLargeHeader,
    isClose,
    hidden,
    isMultiline,
  } = props;

  const { palette, fonts } = theme;

  return ({
    content: [
      isLargeHeader && globalClassNamesWhenEnabled(theme, ['ms-Dialog-lgHeader']),
      isClose && globalClassNamesWhenEnabled(theme, ['ms-Dialog--close']),
      {
        flexGrow: 1
      },
      className
    ],

    subText: [
      globalClassNamesWhenEnabled(theme, ['ms-Dialog-subText']),
      isLargeHeader ? fonts.medium : fonts.small,
      {
        margin: '0 0 20px 0',
        paddingTop: '8px',
        color: palette.neutralPrimary,
        lineHeight: '1.5',
        wordWrap: 'break-word',
        fontWeight: FontWeights.semilight,
      },
    ],

    header: [
      globalClassNamesWhenEnabled(theme, ['ms-Dialog-header']),
      {
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box',
      },
      isLargeHeader && [
        globalClassNamesWhenEnabled(theme, ['ms-Dialog--lgHeader']),
        {
          backgroundColor: palette.themePrimary,
        }
      ],
      isClose && globalClassNamesWhenEnabled(theme, ['ms-Dialog--close']),
    ],

    button: [
      globalClassNamesWhenEnabled(theme, ['ms-Dialog-button']),
      globalClassNamesWhenEnabled(theme, ['ms-Dialog-button--close']),
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
      globalClassNamesWhenEnabled(theme, ['ms-Dialog-inner']),
      {
        padding: isMultiline ? '0 20px 20px' : '0 28px 20px',
      }
    ],

    innerContent: [
      globalClassNamesWhenEnabled(theme, ['ms-Dialog-content']),
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
      globalClassNamesWhenEnabled(theme, ['ms-Dialog-title']),
      {
        color: palette.neutralPrimary,
        margin: '0',
        padding: '20px 36px 20px 28px',
      },
      fonts.xLarge,
      isLargeHeader && [
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
