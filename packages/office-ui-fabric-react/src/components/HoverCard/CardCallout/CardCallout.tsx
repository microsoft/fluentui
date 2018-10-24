import * as React from 'react';

import { divProperties, getNativeProps } from '../../../Utilities';
import { Callout } from '../../../Callout';
import { DirectionalHint } from '../../../common/DirectionalHint';
import { FocusTrapZone } from '../../../FocusTrapZone';
import { IBaseCardProps } from '../BaseCard.types';

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

  return (
    <Callout
      {...getNativeProps(props, divProperties)}
      className={className}
      target={targetElement}
      isBeakVisible={false}
      directionalHint={directionalHint}
      directionalHintFixed={directionalHintFixed}
      finalHeight={finalHeight}
      minPagePadding={24}
      onDismiss={onLeave}
      gapSpace={gapSpace}
    >
      {trapFocus ? (
        <FocusTrapZone forceFocusInsideTrap={false} isClickableOutsideFocusTrap={true} disableFirstFocus={!firstFocus}>
          {content}
        </FocusTrapZone>
      ) : (
        content
      )}
    </Callout>
  );
};
