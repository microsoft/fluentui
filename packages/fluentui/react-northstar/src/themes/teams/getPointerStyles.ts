import { ICSSInJSStyle } from '@fluentui/styles';
import Popper from 'popper.js';

import { PopperChildrenProps } from '../../utils/positioner';

const rtlMapping = {
  left: 'right',
  right: 'left',
};

const getPointerStyles = (
  pointerOffset: string,
  pointerGap: string,
  pointerMargin: string,
  rtl: boolean,
  popperPlacement?: PopperChildrenProps['placement'],
  isSvg?: boolean,
) => {
  const placementValue = (popperPlacement || '').split('-', 1).pop();
  const placement = (rtl && rtlMapping[placementValue]) || placementValue;

  const rootStyles: Record<Popper.Position, ICSSInJSStyle> = {
    top: {
      marginBottom: pointerMargin,
    },
    right: {
      marginLeft: pointerMargin,
    },
    bottom: {
      marginTop: pointerMargin,
    },
    left: {
      marginRight: pointerMargin,
    },
  };
  const pointerStyles: Record<Popper.Position, ICSSInJSStyle> = {
    top: {
      bottom: `-${pointerOffset}`,
      marginLeft: pointerGap,
      marginRight: pointerGap,
      transform: isSvg ? `rotate(${rtl ? 90 : -90}deg)` : 'rotate(45deg)',
    },
    right: {
      left: `-${pointerOffset}`,
      marginBottom: pointerGap,
      marginTop: pointerGap,
      transform: isSvg ? `rotate(${rtl ? 180 : 0}deg)` : 'rotate(135deg)',
    },
    bottom: {
      top: `-${pointerOffset}`,
      marginLeft: pointerGap,
      marginRight: pointerGap,
      transform: isSvg ? `rotate(${rtl ? -90 : 90}deg)` : 'rotate(-135deg)',
    },
    left: {
      right: `-${pointerOffset}`,
      marginBottom: pointerGap,
      marginTop: pointerGap,
      transform: isSvg ? `rotate(${rtl ? 0 : 180}deg)` : 'rotate(-45deg)',
    },
  };

  return {
    root: rootStyles[placement],
    pointer: pointerStyles[placement],
  };
};

export default getPointerStyles;
