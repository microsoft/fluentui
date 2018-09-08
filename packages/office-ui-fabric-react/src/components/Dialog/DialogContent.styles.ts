import { IDialogContentStyleProps, IDialogContentStyles } from './DialogContent.types';
import { FontWeights, getGlobalClassNames } from '../../Styling';

const GlobalClassNames = {
  contentLgHeader: 'ms-Dialog-lgHeader',
  close: 'ms-Dialog--close',
  subText: 'ms-Dialog-subText',
  header: 'ms-Dialog-header',
  headerLg: 'ms-Dialog--lgHeader',
  button: 'ms-Dialog-button ms-Dialog-button--close',
  inner: 'ms-Dialog-inner',
  content: 'ms-Dialog-content',
  title: 'ms-Dialog-title'
};

export const getStyles = (props: IDialogContentStyleProps): IDialogContentStyles => {
  const { className, theme, isLargeHeader, isClose, hidden, isMultiline } = props;

  const { palette, fonts } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    content: [
      isLargeHeader && classNames.contentLgHeader,
      isClose && classNames.close,
      {
        flexGrow: 1,
        overflowY: 'auto' // required for IE11
      },
      className
    ],

    subText: [
      classNames.subText,
      isLargeHeader ? fonts.medium : fonts.small,
      {
        margin: '0 0 20px 0',
        paddingTop: '8px',
        color: palette.neutralPrimary,
        lineHeight: '1.5',
        wordWrap: 'break-word',
        fontWeight: FontWeights.semilight
      }
    ],

    header: [
      classNames.header,
      {
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box'
      },
      isLargeHeader && [
        classNames.headerLg,
        {
          backgroundColor: palette.themePrimary
        }
      ],
      isClose && classNames.close
    ],

    button: [
      classNames.button,
      hidden && {
        selectors: {
          '.ms-Icon.ms-Icon--Cancel': {
            color: palette.neutralSecondary,
            fontSize: '16px'
          }
        }
      }
    ],

    inner: [
      classNames.inner,
      {
        padding: isMultiline ? '0 20px 20px' : '0 28px 20px'
      }
    ],

    innerContent: [
      classNames.content,
      {
        position: 'relative',
        width: '100%',

        selectors: {
          '.ms-Button.ms-Button--compount': {
            marginBottom: '20px',

            selectors: {
              '&:last-child': {
                marginBottom: '0'
              }
            }
          }
        }
      },
      className
    ],

    title: [
      classNames.title,
      {
        color: palette.neutralPrimary,
        margin: '0',
        padding: '20px 36px 20px 28px'
      },
      fonts.xLarge,
      isLargeHeader && [
        {
          color: palette.white,
          marginBottom: '8px',
          padding: '26px 28px 28px'
        },
        fonts.xxLarge
      ],
      isMultiline && fonts.xxLarge
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
            flex: '0 0 auto'
          }
        }
      }
    ]
  };
};
