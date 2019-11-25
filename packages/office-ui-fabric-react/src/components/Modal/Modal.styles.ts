import { IModalStyleProps, IModalStyles } from './Modal.types';
import { AnimationVariables, getGlobalClassNames, ZIndexes } from '../../Styling';

export const animationDuration = AnimationVariables.durationValue2;

const globalClassNames = {
  root: 'ms-Modal',
  main: 'ms-Dialog-main',
  scrollableContent: 'ms-Modal-scrollableContent',
  isOpen: 'is-open',
  layer: 'ms-Modal-Layer'
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
    topOffsetFixed,
    isModeless,
    layerClassName,
    isDefaultDragHandle
  } = props;
  const { palette, effects, fonts } = theme;

  const classNames = getGlobalClassNames(globalClassNames, theme);

  return {
    root: [
      classNames.root,
      fonts.medium,
      {
        backgroundColor: 'transparent',
        position: isModeless ? 'absolute' : 'fixed',
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
        boxShadow: effects.elevation64,
        borderRadius: effects.roundedCorner2,
        backgroundColor: palette.white,
        boxSizing: 'border-box',
        position: 'relative',
        textAlign: 'left',
        outline: '3px solid transparent',
        maxHeight: 'calc(100% - 32px)',
        maxWidth: 'calc(100% - 32px)',
        minHeight: '176px',
        minWidth: '288px',
        overflowY: 'auto',
        zIndex: isModeless ? ZIndexes.Layer : undefined
      },
      topOffsetFixed &&
        hasBeenOpened && {
          top: modalRectangleTop
        },
      isDefaultDragHandle && {
        cursor: 'move'
      },
      containerClassName
    ],
    scrollableContent: [
      classNames.scrollableContent,
      {
        overflowY: 'auto',
        flexGrow: 1,
        maxHeight: '100vh',
        selectors: {
          ['@supports (-webkit-overflow-scrolling: touch)']: {
            maxHeight: window.innerHeight
          }
        }
      },
      scrollableContentClassName
    ],
    layer: isModeless && [
      layerClassName,
      classNames.layer,
      {
        position: 'static',
        width: 'unset',
        height: 'unset'
      }
    ],
    keyboardMoveIconContainer: {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      padding: '3px 0px'
    },
    keyboardMoveIcon: {
      fontSize: fonts.xLargePlus.fontSize,
      width: '24px'
    }
  };
};
