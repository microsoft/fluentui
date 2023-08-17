import * as React from 'react';

import { divProperties, getNativeProps } from '../../../Utilities';
import { DirectionalHint } from '../../../common/DirectionalHint';
import { Callout, FocusTrapCallout } from '../../../Callout';
import type { IBaseCardProps } from '../BaseCard.types';
import type { ICalloutProps } from '../../../Callout';

export interface ICardCalloutProps extends IBaseCardProps<{}, {}, {}> {
  finalHeight?: number;
  content?: JSX.Element;
}

export const CardCallout = (props: ICardCalloutProps) => {
  const {
    gapSpace = 0,
    directionalHint = DirectionalHint.bottomLeftEdge,
    directionalHintFixed,
    targetElement,
    firstFocus,
    trapFocus,
    onLeave,
    className,
    finalHeight,
    content,
    calloutProps,
  } = props;

  const mergedCalloutProps: ICalloutProps = {
    ...getNativeProps(props, divProperties),
    className,
    target: targetElement,
    isBeakVisible: false,
    directionalHint,
    directionalHintFixed,
    finalHeight,
    minPagePadding: 24,
    onDismiss: onLeave,
    gapSpace,
    ...calloutProps,
  };

  return (
    <>
      {trapFocus ? (
        <FocusTrapCallout
          {...mergedCalloutProps}
          focusTrapProps={{
            forceFocusInsideTrap: false,
            isClickableOutsideFocusTrap: true,
            disableFirstFocus: !firstFocus,
          }}
        >
          {content}
        </FocusTrapCallout>
      ) : (
        <Callout {...mergedCalloutProps}>{content}</Callout>
      )}
    </>
  );
};
