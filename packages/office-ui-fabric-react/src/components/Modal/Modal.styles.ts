import { IModalStyleProps, IModalStyles } from './Modal.types';
import { IOverlayStyles } from '../../Overlay';
import { AnimationVariables, getGlobalClassNames, HighContrastSelector } from '../../Styling';

export const animationDuration = AnimationVariables.durationValue2;

export const getOverlayStyles: IOverlayStyles = {
  root: {
    selectors: {
      [HighContrastSelector]: {
        opacity: 0
      }
    }
  }
};

const globalClassNames = {
  root: 'ms-Modal',
  main: 'ms-Dialog-main',
  scrollableContent: 'ms-Modal-scrollableContent',
  isOpen: 'is-open'
};

export const getStyles = (props: IModalStyleProps): IModalStyles => {
  const {
    className,
    containerClassName,
    scrollableContentClassName,
    isOpen,
    isVisible,
    hasBeenOpened,
    modalRectangleTop,
    theme,
    topOffsetFixed
  } = props;
  const { palette } = theme;

  const classNames = getGlobalClassNames(globalClassNames, theme);

  return {
    root: [
      classNames.root,
      theme.fonts.medium,
      {
        backgroundColor: 'transparent',
        position: 'fixed',
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0,
        pointerEvents: 'none',
        transition: `opacity ${animationDuration}`
      },
      topOffsetFixed &&
        hasBeenOpened && {
          alignItems: 'flex-start'
        },
      isOpen && classNames.isOpen,
      isVisible && {
        opacity: 1,
        pointerEvents: 'auto'
      },
      className
    ],
    main: [
      classNames.main,
      {
        boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.4)',
        backgroundColor: palette.white,
        boxSizing: 'border-box',
        position: 'relative',
        textAlign: 'left',
        outline: '3px solid tranparent',
        maxHeight: '100%',
        overflowY: 'auto'
      },
      topOffsetFixed &&
        hasBeenOpened && {
          top: modalRectangleTop
        },
      containerClassName
    ],
    scrollableContent: [
      classNames.scrollableContent,
      {
        overflowY: 'auto',
        flexGrow: 1
      },
      scrollableContentClassName
    ]
  };
};
