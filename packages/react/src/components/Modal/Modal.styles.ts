import { AnimationVariables, getGlobalClassNames, ZIndexes } from '../../Styling';
import type { IModalStyleProps, IModalStyles } from './Modal.types';

export const animationDuration = AnimationVariables.durationValue2;

const globalClassNames = {
  root: 'ms-Modal',
  main: 'ms-Dialog-main',
  scrollableContent: 'ms-Modal-scrollableContent',
  isOpen: 'is-open',
  layer: 'ms-Modal-Layer',
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
    isDefaultDragHandle,
    windowInnerHeight,
  } = props;
  const { palette, effects, fonts } = theme;

  const classNames = getGlobalClassNames(globalClassNames, theme);

  return {
    root: [
      classNames.root,
      fonts.medium,
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
        transition: `opacity ${animationDuration}`,
      },
      topOffsetFixed &&
        typeof modalRectangleTop === 'number' &&
        hasBeenOpened && {
          alignItems: 'flex-start',
        },
      isOpen && classNames.isOpen,
      isVisible && {
        opacity: 1,
      },
      isVisible &&
        !isModeless && {
          pointerEvents: 'auto',
        },

      className,
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
        zIndex: isModeless ? ZIndexes.Layer : undefined,
      },
      isModeless && {
        pointerEvents: 'auto',
      },
      topOffsetFixed &&
        typeof modalRectangleTop === 'number' &&
        hasBeenOpened && {
          top: modalRectangleTop,
        },
      isDefaultDragHandle && {
        cursor: 'move',
      },
      containerClassName,
    ],
    scrollableContent: [
      classNames.scrollableContent,
      {
        overflowY: 'auto',
        flexGrow: 1,
        maxHeight: '100vh',
        selectors: {
          ['@supports (-webkit-overflow-scrolling: touch)']: {
            maxHeight: windowInnerHeight,
          },
        },
      },
      scrollableContentClassName,
    ],
    layer: isModeless && [layerClassName, classNames.layer, { pointerEvents: 'none' }],
    keyboardMoveIconContainer: {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      padding: '3px 0px',
    },
    keyboardMoveIcon: {
      // eslint-disable-next-line deprecation/deprecation
      fontSize: fonts.xLargePlus.fontSize,
      width: '24px',
    },
  };
};
