import * as React from 'react';

import { divProperties, getNativeProps } from '../../../Utilities';
import { Callout } from '../../../Callout';
import { DirectionalHint } from '../../../common/DirectionalHint';
import { IBaseCardProps } from '../BaseCard.types';
import { FocusTrapCallout, ICalloutProps } from '../../../Callout';

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
    content
  } = props;

  const calloutProps: ICalloutProps = {
    ...getNativeProps(props, divProperties),
    className: className,
    target: targetElement,
    isBeakVisible: false,
    directionalHint: directionalHint,
    directionalHintFixed: directionalHintFixed,
    finalHeight: finalHeight,
    minPagePadding: 24,
    onDismiss: onLeave,
    gapSpace: gapSpace
  };

  return (
    <React.Fragment>
      {trapFocus ? (
        <FocusTrapCallout
          {...calloutProps}
          focusTrapProps={{
            forceFocusInsideTrap: false,
            isClickableOutsideFocusTrap: true,
            disableFirstFocus: !firstFocus
          }}
        >
          {content}
        </FocusTrapCallout>
      ) : (
        <Callout {...calloutProps}>{content}</Callout>
      )}
    </React.Fragment>
  );
};
