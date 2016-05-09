import { DirectionalHint } from '../components/Callout/index';
import { getRTL } from '../utilities/rtl';

const BUFFER_ZONE = 5;
const BEAK_PADDING = 5;

const SLIDE_ANIMATIONS = {
  up: 'slideUpIn20',
  down: 'slideDownIn20',
  left: 'slideLeftIn20',
  right: 'slideRightIn20'
};

export interface IPositionProps {
  targetElement?: HTMLElement;
  directionalHint?: DirectionalHint;
  gapSpace?: number;
  beakWidth?: number;
}

enum CalloutType {
  vertical,
  horizontal
}

enum HorizontalAlignmentHint {
  auto,
  left,
  center,
  right
}

enum VerticalAlignmentHint {
  top,
  center,
  bottom
}

interface ICalloutSizeWindowSizeInfo {
  hostRect: IRect;
  targetRect: IRect;
  calloutRect: IRect;
  windowSize: any;
  gapSpace: number;
  beakWidth: number;
}

interface IRect {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

interface IParsedDirectionalHint {
  calloutType: CalloutType;
  horizontalAlignmentHint: HorizontalAlignmentHint;
  verticalAlignmentHint: VerticalAlignmentHint;
}

export interface IPositionInfo {
  calloutPosition: any;
  beakPosition: any;
  directionalClassName: string;
}

export function getRelativePositions(props: IPositionProps, hostElement: HTMLElement, calloutElement: HTMLElement) {
  let { targetElement, directionalHint, gapSpace, beakWidth } = props;
  let windowSize: { width: number, height: number } = { width: window.innerWidth, height: window.innerHeight };
  let directionalClassName: string;
  let parsedDirectionalHint: IParsedDirectionalHint = _getDirectionalHint(directionalHint);
  let { calloutType, horizontalAlignmentHint, verticalAlignmentHint } = parsedDirectionalHint;

  let calloutPosition = {
    top: 0,
    left: 0,
  };

  let beakPosition = {
    display: 'block',
    left: 0,
    top: - (beakWidth / 2),
  };

  let positionInfo: IPositionInfo = {
    calloutPosition: calloutPosition,
    beakPosition: beakPosition,
    directionalClassName: directionalClassName
  };

  if (hostElement && targetElement && calloutElement) {
    let hostRect = hostElement.getBoundingClientRect();
    let targetRect = _getActualTargetRectSize(targetElement, hostRect);
    let calloutRect = calloutElement.getBoundingClientRect();
    let actualHorizontalDirection: HorizontalAlignmentHint;
    let actualVerticalDirection: VerticalAlignmentHint;

    let calloutSizeWindowSizeInfo: ICalloutSizeWindowSizeInfo = { hostRect, targetRect, calloutRect, windowSize, gapSpace, beakWidth };

    // Check if it is necessary to switch callout type based on the callout size and window size.
    calloutType = _switchCalloutType(parsedDirectionalHint, calloutSizeWindowSizeInfo);

    // Callout render type: vertical
    if (calloutType === CalloutType.vertical) {
      // Set actualHorizontalDirection based on window space and callout size
      actualHorizontalDirection = _getActualHorizontalDirectionforVerticalCallout(horizontalAlignmentHint, calloutSizeWindowSizeInfo);

      // Set the actualVerticalDirection based on the window space
      actualVerticalDirection = _getActualVerticalDirectionforVerticalCallout(verticalAlignmentHint, calloutSizeWindowSizeInfo);

      // Calculate position based on actualHorizontalDirection and actualVerticalDirection
      positionInfo = _calculatePositionsforVerticalCallout(actualVerticalDirection, actualHorizontalDirection, calloutSizeWindowSizeInfo, positionInfo);

      // Callout render type: horizontal
    } else if (calloutType === CalloutType.horizontal) {
      // Set actualHorizontalDirection based on window space
      actualHorizontalDirection = _getActualHorizontalDirectionforHorizontalCallout(horizontalAlignmentHint, calloutSizeWindowSizeInfo);

      // Set the actualVerticalDirection based on the window space
      actualVerticalDirection = _getActualVerticalDirectionforHorizontalCallout(verticalAlignmentHint, calloutSizeWindowSizeInfo);

      // Calculate position based on actualHorizontalDirection and actualVerticalDirection
      positionInfo = _calculatePositionsforHorizontalCallout(actualVerticalDirection, actualHorizontalDirection, calloutSizeWindowSizeInfo, positionInfo);
    }
  }

  return positionInfo;
}

// Get the three parameter directional hint, which include callout type, horizontal alignment hint and verticalAlignmentHint
function _getDirectionalHint(directionalHint: DirectionalHint) {

  let parsedDirectionalHint: IParsedDirectionalHint = {
    calloutType: null,
    horizontalAlignmentHint: null,
    verticalAlignmentHint: null
  };
  let { calloutType, horizontalAlignmentHint, verticalAlignmentHint } = parsedDirectionalHint;

  // Get the callout type, vertical means the callout will be display on the top or bottom of host. While horizontal means
  // the callout will be display on the left or right edge of host.
  if (directionalHint === DirectionalHint.topCenter || directionalHint === DirectionalHint.topLeftEdge ||
    directionalHint === DirectionalHint.topRightEdge || directionalHint === DirectionalHint.bottomCenter ||
    directionalHint === DirectionalHint.bottomLeftEdge || directionalHint === DirectionalHint.bottomRightEdge ||
    directionalHint === DirectionalHint.topAutoEdge || directionalHint === DirectionalHint.bottomAutoEdge) {
    calloutType = CalloutType.vertical;
  } else {
    calloutType = CalloutType.horizontal;
  }

  // Get the horizontalAlignmentHint, for horizontal callout, it will only be either left or right; for vertical callout, center and auto is also an option.
  // auto means taht if the target is in the left half of host, the callout will be align to left edge, if the target is in the right half of host, the callout will be
  // align to right edge.
  if (directionalHint === DirectionalHint.bottomLeftEdge || directionalHint === DirectionalHint.leftBottomEdge ||
    directionalHint === DirectionalHint.leftCenter || directionalHint === DirectionalHint.leftTopEdge ||
    directionalHint === DirectionalHint.topLeftEdge) {
    horizontalAlignmentHint = getRTL() ? HorizontalAlignmentHint.right : HorizontalAlignmentHint.left;
  } else if (calloutType === CalloutType.vertical && (directionalHint === DirectionalHint.topCenter ||
    directionalHint === DirectionalHint.bottomCenter)) {
    horizontalAlignmentHint = HorizontalAlignmentHint.center;
  } else if (calloutType === CalloutType.vertical && (directionalHint === DirectionalHint.topAutoEdge ||
    directionalHint === DirectionalHint.bottomAutoEdge)) {
    horizontalAlignmentHint = HorizontalAlignmentHint.auto;
  } else {
    horizontalAlignmentHint = getRTL() ? HorizontalAlignmentHint.left : HorizontalAlignmentHint.right;
  }

  // Get the verticalAlignmentHint, for vertical callout, it will only be either top or buttom; for horizontal callout, center is also an option.
  if (directionalHint === DirectionalHint.leftTopEdge || directionalHint === DirectionalHint.rightTopEdge ||
    directionalHint === DirectionalHint.topCenter || directionalHint === DirectionalHint.topLeftEdge ||
    directionalHint === DirectionalHint.topRightEdge || directionalHint === DirectionalHint.topAutoEdge) {
    verticalAlignmentHint = VerticalAlignmentHint.top;
  } else if (calloutType === CalloutType.horizontal && (directionalHint === DirectionalHint.leftCenter ||
    directionalHint === DirectionalHint.rightCenter)) {
    verticalAlignmentHint = VerticalAlignmentHint.center;
  } else {
    verticalAlignmentHint = VerticalAlignmentHint.bottom;
  }

  parsedDirectionalHint = { calloutType, horizontalAlignmentHint, verticalAlignmentHint };

  return parsedDirectionalHint;
}

// Check if it is necessary to switch callout type based on the callout size and window size. For horizontal callout, if no
// enough space on both left and right, then the callout type will be switch to vertical. For vertical callout, if no
// enough space on both top and bottom, then the callout type will be switch to horizontal.
function _switchCalloutType(parsedDirectionalHint: IParsedDirectionalHint, calloutSizeWindowSizeInfo: ICalloutSizeWindowSizeInfo) {
  let { calloutType } = parsedDirectionalHint;
  let { targetRect, calloutRect, windowSize, gapSpace } = calloutSizeWindowSizeInfo;

  if (calloutType === CalloutType.horizontal) {
    let hasEnoughSpaceLeft = targetRect.left > (calloutRect.width + BUFFER_ZONE);
    let hasEnoughSpaceRight = (windowSize.width - targetRect.right) > (calloutRect.width + BUFFER_ZONE);
    if (!hasEnoughSpaceLeft && !hasEnoughSpaceRight) {
      calloutType = CalloutType.vertical;
    }
  } else {
    let hasEnoughSpaceTop = targetRect.top > (calloutRect.height + BUFFER_ZONE + gapSpace);
    let hasEnoughSpaceBottom = (windowSize.height - targetRect.bottom) > (calloutRect.height + BUFFER_ZONE + gapSpace);
    if (!hasEnoughSpaceTop && !hasEnoughSpaceBottom) {
      calloutType = CalloutType.horizontal;
    }
  }

  return  calloutType;
}

// Get actualHorizontalDirection for vertical callout based on window space and callout size
function _getActualHorizontalDirectionforVerticalCallout(horizontalAlignmentHint: HorizontalAlignmentHint, calloutSizeWindowSizeInfo: ICalloutSizeWindowSizeInfo) {
  let { hostRect, targetRect, calloutRect, windowSize, beakWidth } = calloutSizeWindowSizeInfo;
  let actualHorizontalDirection: HorizontalAlignmentHint;
  let isBeakWidthOverEdge = beakWidth > (targetRect.width / 2);

  if (horizontalAlignmentHint === HorizontalAlignmentHint.left) {
    let hasEnoughSpace = (windowSize.width - targetRect.left) > (calloutRect.width + BUFFER_ZONE);

    if (hasEnoughSpace && !isBeakWidthOverEdge) {
      actualHorizontalDirection = HorizontalAlignmentHint.left;
    } else if (!isBeakWidthOverEdge) {
      actualHorizontalDirection = HorizontalAlignmentHint.right;
    } else {
      actualHorizontalDirection = HorizontalAlignmentHint.center;
    }
  } else if (horizontalAlignmentHint === HorizontalAlignmentHint.center) {
    let hasEnoughSpaceLeft = targetRect.left > ((calloutRect.width / 2) - (targetRect.width / 2) + BUFFER_ZONE);
    let hasEnoughSpaceRight = (windowSize.width - targetRect.right) > ((calloutRect.width / 2) - (targetRect.width / 2) + BUFFER_ZONE);

    if (hasEnoughSpaceLeft && hasEnoughSpaceRight) {
      actualHorizontalDirection = HorizontalAlignmentHint.center;
    } else if (!hasEnoughSpaceLeft) {
      actualHorizontalDirection = HorizontalAlignmentHint.left;
    } else {
      actualHorizontalDirection = HorizontalAlignmentHint.right;
    }
  } else if (horizontalAlignmentHint === HorizontalAlignmentHint.right) {
    let hasEnoughSpace = targetRect.right > (calloutRect.width + BUFFER_ZONE);

    if (hasEnoughSpace && !isBeakWidthOverEdge) {
      actualHorizontalDirection = HorizontalAlignmentHint.right;
    } else if (!isBeakWidthOverEdge) {
      actualHorizontalDirection = HorizontalAlignmentHint.left;
    } else {
      actualHorizontalDirection = HorizontalAlignmentHint.center;
    }
  } else if (horizontalAlignmentHint === HorizontalAlignmentHint.auto) {
    let isLeftAligned = (targetRect.left - hostRect.left + (targetRect.width / 2)) < (hostRect.width / 2);
    if (isLeftAligned && !isBeakWidthOverEdge) {
      actualHorizontalDirection = HorizontalAlignmentHint.left;
    } else if (!isBeakWidthOverEdge) {
      actualHorizontalDirection = HorizontalAlignmentHint.right;
    } else {
      actualHorizontalDirection = HorizontalAlignmentHint.center;
    }
  }

  return actualHorizontalDirection;
}

// Get actualVerticalDirection for vertical callout based on window space and callout size
function _getActualVerticalDirectionforVerticalCallout(verticalAlignmentHint: VerticalAlignmentHint, calloutSizeWindowSizeInfo: ICalloutSizeWindowSizeInfo) {
  let { targetRect, calloutRect, windowSize, gapSpace } = calloutSizeWindowSizeInfo;
  let actualVerticalDirection: VerticalAlignmentHint;

  if (verticalAlignmentHint === VerticalAlignmentHint.bottom || verticalAlignmentHint === VerticalAlignmentHint.center) {
    let hasEnoughSpace = (windowSize.height - targetRect.bottom) > (calloutRect.height + gapSpace + BUFFER_ZONE);

    if (hasEnoughSpace) {
      actualVerticalDirection = VerticalAlignmentHint.bottom;
    } else {
      actualVerticalDirection = VerticalAlignmentHint.top;
    }
  } else if (verticalAlignmentHint === VerticalAlignmentHint.top) {
    let hasEnoughSpace = targetRect.top > (calloutRect.height + gapSpace + BUFFER_ZONE);

    if (hasEnoughSpace) {
      actualVerticalDirection = VerticalAlignmentHint.top;
    } else {
      actualVerticalDirection = VerticalAlignmentHint.bottom;
    }
  }

  return actualVerticalDirection;
}

// Calculate positions based on actualHorizontalDirection and actualVerticalDirection for vertical callout
function _calculatePositionsforVerticalCallout(
  actualVerticalDirection: VerticalAlignmentHint,
  actualHorizontalDirection: HorizontalAlignmentHint,
  calloutSizeWindowSizeInfo: ICalloutSizeWindowSizeInfo,
  positionInfo: IPositionInfo
) {
  let { hostRect, targetRect, calloutRect, gapSpace, beakWidth } = calloutSizeWindowSizeInfo;
  let { calloutPosition, beakPosition, directionalClassName } = positionInfo;

  // Calculate the horizontal position based on actualHorizontalDirection
  if (actualHorizontalDirection === HorizontalAlignmentHint.left) {
    calloutPosition.left = targetRect.left - hostRect.left;
    beakPosition.left = Math.max(
      BEAK_PADDING,
      Math.min(
        calloutRect.width - BEAK_PADDING - beakWidth,
        (targetRect.width / 2) - (beakWidth / 2)
      ));
  } else if (actualHorizontalDirection === HorizontalAlignmentHint.center) {
    let targetCenter = targetRect.left - hostRect.left + (targetRect.width / 2);
    calloutPosition.left = targetCenter - calloutRect.width / 2;
    beakPosition.left = (calloutRect.width / 2) - (beakWidth / 2);
  } else {
    calloutPosition.left = targetRect.right - hostRect.left - calloutRect.width;
    beakPosition.left = Math.max(
      BEAK_PADDING,
      Math.min(
        calloutRect.width - BEAK_PADDING - beakWidth,
        calloutRect.width - (targetRect.width / 2) - (beakWidth / 2)
      ));
  }

  // Calculate the vertical position based on actualVerticalDirection
  if (actualVerticalDirection === VerticalAlignmentHint.top) {
    calloutPosition.top = targetRect.top - hostRect.top - gapSpace - calloutRect.height;
    beakPosition.top = calloutRect.height - beakWidth / 2;
    directionalClassName = SLIDE_ANIMATIONS.up;
  } else {
    calloutPosition.top = targetRect.bottom - hostRect.top + gapSpace;
    // Beak vertical position is in default position
    directionalClassName = SLIDE_ANIMATIONS.down;
  }

  positionInfo = { calloutPosition, beakPosition, directionalClassName };

  return positionInfo;
}

// Get actualHorizontalDirection for horizontal callout based on window space and callout size
function _getActualHorizontalDirectionforHorizontalCallout(horizontalAlignmentHint: HorizontalAlignmentHint, calloutSizeWindowSizeInfo: ICalloutSizeWindowSizeInfo) {
  let { targetRect, calloutRect, windowSize, gapSpace } = calloutSizeWindowSizeInfo;
  let actualHorizontalDirection: HorizontalAlignmentHint;

  if (horizontalAlignmentHint === HorizontalAlignmentHint.right || horizontalAlignmentHint === HorizontalAlignmentHint.center) {
    let hasEnoughSpace = (windowSize.width - targetRect.right) > (calloutRect.width + gapSpace + BUFFER_ZONE);

    if (hasEnoughSpace) {
      actualHorizontalDirection = HorizontalAlignmentHint.right;
    } else {
      actualHorizontalDirection = HorizontalAlignmentHint.left;
    }
  } else if (horizontalAlignmentHint === HorizontalAlignmentHint.left) {
    let hasEnoughSpace = targetRect.left > calloutRect.width + gapSpace + BUFFER_ZONE;

    if (hasEnoughSpace) {
      actualHorizontalDirection = HorizontalAlignmentHint.left;
    } else {
      actualHorizontalDirection = HorizontalAlignmentHint.right;
    }
  }

  return actualHorizontalDirection;
}

// Get actualVerticalDirection for horizontal callout based on window space and callout size
function _getActualVerticalDirectionforHorizontalCallout(verticalAlignmentHint: VerticalAlignmentHint, calloutSizeWindowSizeInfo: ICalloutSizeWindowSizeInfo) {
  let { targetRect, calloutRect, windowSize, beakWidth } = calloutSizeWindowSizeInfo;
  let actualVerticalDirection: VerticalAlignmentHint;
  let isBeakWidthOverEdge = beakWidth > (targetRect.height / 2);

  if (verticalAlignmentHint === VerticalAlignmentHint.top) {
    let hasEnoughSpace = targetRect.bottom > (calloutRect.height + BUFFER_ZONE);

    if (hasEnoughSpace && !isBeakWidthOverEdge) {
      actualVerticalDirection = VerticalAlignmentHint.top;
    } else if (!isBeakWidthOverEdge) {
      actualVerticalDirection = VerticalAlignmentHint.bottom;
    } else {
      actualVerticalDirection = VerticalAlignmentHint.center;
    }
  } else if (verticalAlignmentHint === VerticalAlignmentHint.center) {
    let hasEnoughSpaceTop = (targetRect.top + targetRect.height / 2) > (calloutRect.height / 2 + BUFFER_ZONE);
    let hasEnoughSpaceBottom = (windowSize.height - targetRect.top - targetRect.height / 2) > (calloutRect.height / 2 + BUFFER_ZONE);

    if (hasEnoughSpaceTop && hasEnoughSpaceBottom) {
      actualVerticalDirection = VerticalAlignmentHint.center;
    } else if (!hasEnoughSpaceTop) {
      actualVerticalDirection = VerticalAlignmentHint.bottom;
    } else {
      actualVerticalDirection = VerticalAlignmentHint.top;
    }
  } else if (verticalAlignmentHint === VerticalAlignmentHint.bottom) {
    let hasEnoughSpace = (windowSize.height - targetRect.top) > (calloutRect.height + BUFFER_ZONE);

    if (hasEnoughSpace && !isBeakWidthOverEdge) {
      actualVerticalDirection = VerticalAlignmentHint.bottom;
    } else if (!isBeakWidthOverEdge) {
      actualVerticalDirection = VerticalAlignmentHint.top;
    } else {
      actualVerticalDirection = VerticalAlignmentHint.center;
    }
  }

  return actualVerticalDirection;
}

// Calculate positions based on actualHorizontalDirection and actualVerticalDirection for horizontal callout
function _calculatePositionsforHorizontalCallout(
  actualVerticalDirection: VerticalAlignmentHint,
  actualHorizontalDirection: HorizontalAlignmentHint,
  calloutSizeWindowSizeInfo: ICalloutSizeWindowSizeInfo,
  positionInfo: IPositionInfo
) {
  let { hostRect, targetRect, calloutRect, gapSpace, beakWidth } = calloutSizeWindowSizeInfo;
  let { calloutPosition, beakPosition, directionalClassName } = positionInfo;

  // Calculate horizontal position based on actualHorizontalDirection
  if (actualHorizontalDirection === HorizontalAlignmentHint.left) {
    calloutPosition.left = targetRect.left - hostRect.left - gapSpace - calloutRect.width;
    beakPosition.left = calloutRect.width - (beakWidth / 2);
    directionalClassName = SLIDE_ANIMATIONS.left;
  } else {
    calloutPosition.left = targetRect.right - hostRect.left + gapSpace;
    beakPosition.left = - (beakWidth / 2);
    directionalClassName = SLIDE_ANIMATIONS.right;
  }

  // Calculate vertical position based on actualVerticalDirection
  if (actualVerticalDirection === VerticalAlignmentHint.top) {
    calloutPosition.top = targetRect.bottom - hostRect.top - calloutRect.height;
    beakPosition.top = calloutRect.height - (targetRect.height / 2) - (beakWidth / 2);
  } else if (actualVerticalDirection === VerticalAlignmentHint.center) {
    calloutPosition.top = targetRect.bottom - hostRect.top + (calloutRect.height / 2 - targetRect.height / 2) - calloutRect.height;
    beakPosition.top = (calloutRect.height / 2) - (beakWidth / 2);
  } else {
    calloutPosition.top = targetRect.top - hostRect.top;
    beakPosition.top = (targetRect.height / 2) - (beakWidth / 2);
  }

  positionInfo = { calloutPosition, beakPosition, directionalClassName };

  return positionInfo;
}

/** Gets the size of the target rectangle within the limits of the boundingRectangle */
  function _getActualTargetRectSize(target: HTMLElement, boundingRectangle: IRect): IRect {
  let currentTarget = target.getBoundingClientRect();
  let actualTarget: IRect = {
    width: currentTarget.width,
    right: currentTarget.right,
    left: currentTarget.left,
    height: currentTarget.height,
    bottom: currentTarget.bottom,
    top: currentTarget.top
  };

  if (actualTarget.left < boundingRectangle.left) {
    actualTarget.left = boundingRectangle.left;
  }

  if (actualTarget.right > boundingRectangle.right) {
    actualTarget.right = boundingRectangle.right;
  }

  actualTarget.width = (actualTarget.right - actualTarget.left);

  return actualTarget;
}