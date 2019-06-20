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
  const { className, theme, isLargeHeader, isClose, hidden, isMultiline, draggableHeaderClassName } = props;

  const { palette, fonts, effects } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    content: [
      isLargeHeader && classNames.contentLgHeader,
      isClose && classNames.close,
      {
        flexGrow: 1,
        overflowY: 'hidden' // required for allowScrollOnElement
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
        fontWeight: FontWeights.regular
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
      isClose && classNames.close,
      draggableHeaderClassName && [
        draggableHeaderClassName,
        {
          cursor: 'move'
        }
      ]
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
        padding: '0 24px 24px'
      }
    ],

    innerContent: [
      classNames.content,
      {
        position: 'relative',
        width: '100%'
      }
    ],

    title: [
      classNames.title,
      fonts.xLarge,
      {
        color: palette.neutralPrimary,
        margin: '0',
        padding: '16px 46px 24px 24px',
        fontSize: 20, // TODO: after updating the type ramp this needs reevaluated
        fontWeight: FontWeights.semibold,
        lineHeight: 'normal'
      },
      isLargeHeader && [
        fonts.xxLarge,
        {
          color: palette.white,
          marginBottom: '8px',
          padding: '22px 24px',
          fontWeight: FontWeights.semibold
        }
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
        padding: '14px 14px 0 0',

        selectors: {
          '> *': {
            flex: '0 0 auto'
          },
          '.ms-Dialog-button': {
            color: palette.neutralSecondary
          },
          '.ms-Dialog-button:hover': {
            color: palette.neutralDark,
            borderRadius: effects.roundedCorner2
          }
        }
      }
    ]
  };
};
