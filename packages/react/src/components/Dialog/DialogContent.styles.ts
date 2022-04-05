import {
  FontWeights,
  getGlobalClassNames,
  IconFontSizes,
  ScreenWidthMinSmall,
  ScreenWidthMaxSmall,
} from '../../Styling';
import type { IDialogContentStyleProps, IDialogContentStyles } from './DialogContent.types';

const GlobalClassNames = {
  contentLgHeader: 'ms-Dialog-lgHeader',
  close: 'ms-Dialog--close',
  subText: 'ms-Dialog-subText',
  header: 'ms-Dialog-header',
  headerLg: 'ms-Dialog--lgHeader',
  button: 'ms-Dialog-button ms-Dialog-button--close',
  inner: 'ms-Dialog-inner',
  content: 'ms-Dialog-content',
  title: 'ms-Dialog-title',
};

export const getStyles = (props: IDialogContentStyleProps): IDialogContentStyles => {
  const { className, theme, isLargeHeader, isClose, hidden, isMultiline, draggableHeaderClassName } = props;

  const { palette, fonts, effects, semanticColors } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    content: [
      isLargeHeader && [
        classNames.contentLgHeader,
        {
          borderTop: `4px solid ${palette.themePrimary}`,
        },
      ],
      isClose && classNames.close,
      {
        flexGrow: 1,
        overflowY: 'hidden', // required for allowScrollOnElement
      },
      className,
    ],

    subText: [
      classNames.subText,
      fonts.medium,
      {
        margin: '0 0 24px 0',
        color: semanticColors.bodySubtext,
        lineHeight: '1.5',
        wordWrap: 'break-word',
        fontWeight: FontWeights.regular,
      },
    ],

    header: [
      classNames.header,
      {
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box',
      },
      isClose && classNames.close,
      draggableHeaderClassName && [
        draggableHeaderClassName,
        {
          cursor: 'move',
        },
      ],
    ],

    button: [
      classNames.button,
      hidden && {
        selectors: {
          '.ms-Icon.ms-Icon--Cancel': {
            color: semanticColors.buttonText,
            fontSize: IconFontSizes.medium,
          },
        },
      },
    ],

    inner: [
      classNames.inner,
      {
        padding: '0 24px 24px',
        selectors: {
          [`@media (min-width: ${ScreenWidthMinSmall}px) and (max-width: ${ScreenWidthMaxSmall}px)`]: {
            padding: '0 16px 16px',
          },
        },
      },
    ],

    innerContent: [
      classNames.content,
      {
        position: 'relative',
        width: '100%',
      },
    ],

    title: [
      classNames.title,
      fonts.xLarge,
      {
        color: semanticColors.bodyText,
        margin: '0',
        minHeight: fonts.xLarge.fontSize,
        padding: '16px 46px 20px 24px',
        lineHeight: 'normal',
        selectors: {
          [`@media (min-width: ${ScreenWidthMinSmall}px) and (max-width: ${ScreenWidthMaxSmall}px)`]: {
            padding: '16px 46px 16px 16px',
          },
        },
      },
      isLargeHeader && {
        color: semanticColors.menuHeader,
      },
      isMultiline && { fontSize: fonts.xxLarge.fontSize },
    ],

    topButton: [
      {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        position: 'absolute',
        top: '0',
        right: '0',
        padding: '15px 15px 0 0',
        selectors: {
          '> *': {
            flex: '0 0 auto',
          },
          '.ms-Dialog-button': {
            color: semanticColors.buttonText,
          },
          '.ms-Dialog-button:hover': {
            color: semanticColors.buttonTextHovered,
            borderRadius: effects.roundedCorner2,
          },
          [`@media (min-width: ${ScreenWidthMinSmall}px) and (max-width: ${ScreenWidthMaxSmall}px)`]: {
            padding: '15px 8px 0 0',
          },
        },
      },
    ],
  };
};
