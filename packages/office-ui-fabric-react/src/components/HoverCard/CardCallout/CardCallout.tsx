import * as React from 'react';

import { divProperties, getNativeProps } from '../../../Utilities';
import { DirectionalHint } from '../../../common/DirectionalHint';
import { IBaseCardProps } from '../BaseCard.types';
import { Callout, FocusTrapCallout, ICalloutProps } from '../../../Callout';

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
    className: className,
    target: targetElement,
    isBeakVisible: false,
    directionalHint: directionalHint,
    directionalHintFixed: directionalHintFixed,
    finalHeight: finalHeight,
    minPagePadding: 24,
    onDismiss: onLeave,
    gapSpace: gapSpace,
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
