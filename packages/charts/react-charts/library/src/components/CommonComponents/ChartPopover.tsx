import * as React from 'react';
import { Popover, PopoverSurface } from '@fluentui/react-popover';
import type { PositioningVirtualElement } from '@fluentui/react-positioning';
import { useId } from '@fluentui/react-utilities';
import { usePopoverStyles_unstable } from './useChartPopoverStyles.styles';
import { ChartPopoverProps } from './ChartPopover.types';
import { ChartHoverCard } from '../ChartHoverCard/ChartHoverCard';

/* This component is a wrapper over Popover component which implements the logic for rendering popovers for any chart
combining the logic for Callout and ChartHoverCard in v8 charts. */
export const ChartPopover: React.FunctionComponent<ChartPopoverProps> = React.forwardRef<
  HTMLDivElement,
  ChartPopoverProps
>((props, forwardedRef) => {
  const virtualElement: PositioningVirtualElement = {
    getBoundingClientRect: () => ({
      top: props.clickPosition!.y,
      left: props.clickPosition!.x,
      right: props.clickPosition!.x,
      bottom: props.clickPosition!.y,
      x: props.clickPosition!.x,
      y: props.clickPosition!.y,
      width: 0,
      height: 0,
    }),
  };
  const classes = usePopoverStyles_unstable(props);

  return (
    <div id={useId('callout')} ref={forwardedRef} className={classes.calloutContainer}>
      <Popover
        positioning={{ target: virtualElement, autoSize: 'always', offset: 20, coverTarget: false }}
        open={props.isPopoverOpen}
        inline
      >
        <PopoverSurface>
          {props.customizedCallout ? (
            // Given custom callout, then it will render
            props.customizedCallout
          ) : (
            <ChartHoverCard
              xCalloutValue={props.xCalloutValue}
              legend={props.legend}
              yCalloutValue={props.yCalloutValue}
              YValue={props.YValue}
              XValue={props.XValue}
              color={props.color}
              culture={props.culture}
              isCalloutForStack={props.isCalloutForStack}
              xAxisCalloutAccessibilityData={props.xAxisCalloutAccessibilityData}
              hoverXValue={props.hoverXValue}
              YValueHover={props.YValueHover}
              descriptionMessage={props.descriptionMessage}
              ratio={props.ratio}
              isCartesian={props.isCartesian}
            />
          )}
        </PopoverSurface>
      </Popover>
    </div>
  );
});
ChartPopover.displayName = 'ChartPopover';
