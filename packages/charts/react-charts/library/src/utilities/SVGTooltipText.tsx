import * as React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { usePortalMountNode } from '@fluentui/react-shared-contexts';
import { Tooltip } from '@fluentui/react-tooltip';
import { Async } from './async-utils';
import { KeyCodes } from './KeyCodes';
import { useId } from '@fluentui/react-utilities';

export interface SVGTooltipTextProps {
  closeDelay?: number;
  content: string;
  delay?: number;
  tooltipProps?: React.ComponentProps<typeof Tooltip>;
  textProps?: React.SVGAttributes<SVGTextElement>;
  maxWidth?: number;
  maxHeight?: number;
  shouldReceiveFocus?: boolean;
  isTooltipVisibleProp?: boolean;
  wrapContent?: (content: string, id: string, maxWidth: number, maxHeight?: number) => boolean;
  showBackground?: boolean;
  className?: string;
}

export const SVGTooltipText: React.FunctionComponent<SVGTooltipTextProps> = React.forwardRef<
  HTMLDivElement,
  SVGTooltipTextProps
>((props, forwardedRef) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [textWidth, setTextWidth] = useState(0);
  const [textHeight, setTextHeight] = useState(0);

  const tooltipHostRef = useRef<SVGTextElement>(null);
  const async = useRef(new Async()).current;
  const dismissTimerId = useRef<number>();
  const openTimerId = useRef<number>();
  const tooltipHostId = useRef(useId('tooltip-host')).current;
  const ignoreNextFocusEvent = useRef(false);
  const portalMountNode = usePortalMountNode();
  const PADDING = 3;

  const wrapContentCallback = useCallback(() => {
    if (
      props.content &&
      props.wrapContent &&
      props.wrapContent(props.content, tooltipHostId, props.maxWidth ?? 100, props.maxHeight)
      // ToDo - Specify a correct fallback value here
    ) {
      setIsOverflowing(true);
    } else {
      setIsOverflowing(false);
    }
  }, [props, tooltipHostId]);

  const measureText = useCallback((): void => {
    if (tooltipHostRef.current && typeof tooltipHostRef.current.getBBox === 'function') {
      const bbox = tooltipHostRef.current.getBBox();
      setTextWidth(bbox.width);
      setTextHeight(bbox.height);
    }
  }, []);

  useEffect(() => {
    wrapContentCallback();
    return () => {
      async.dispose();
    };
  }, [wrapContentCallback, async]);

  useEffect(() => {
    wrapContentCallback();
  }, [props.maxWidth, props.maxHeight, wrapContentCallback]);

  useEffect(() => {
    if (isTooltipVisible) {
      measureText();
    }
  }, [isTooltipVisible, measureText]);

  useEffect(() => {
    // Recalculate text dimensions when content or dimensions change
    measureText();
  }, [props.content, props.textProps, props.maxWidth, props.maxHeight, measureText]);

  const hideTooltip = useCallback(() => {
    async.clearTimeout(openTimerId.current!);
    async.clearTimeout(dismissTimerId.current!);
    setIsTooltipVisible(false);
  }, [async]);

  const onTooltipMouseEnter = useCallback(
    (ev: React.MouseEvent<SVGElement>) => {
      if (!isOverflowing) {
        return;
      }

      if (ev.target && portalMountNode?.contains(ev.target as HTMLElement)) {
        return;
      }

      async.clearTimeout(dismissTimerId.current!);
      async.clearTimeout(openTimerId.current!);

      if (props.delay !== 0) {
        openTimerId.current = async.setTimeout(() => {
          setIsTooltipVisible(true);
        }, props.delay!);
      } else {
        setIsTooltipVisible(true);
      }
    },
    [isOverflowing, portalMountNode, async, props.delay],
  );

  const onTooltipMouseLeave = useCallback(
    (ev: React.MouseEvent<SVGElement>) => {
      async.clearTimeout(dismissTimerId.current!);
      async.clearTimeout(openTimerId.current!);

      if (props.closeDelay) {
        dismissTimerId.current = async.setTimeout(() => {
          setIsTooltipVisible(false);
        }, props.closeDelay);
      } else {
        setIsTooltipVisible(false);
      }
    },
    [async, props.closeDelay],
  );

  const onTooltipFocus = useCallback(
    (ev: React.FocusEvent<SVGElement>) => {
      if (ignoreNextFocusEvent.current) {
        ignoreNextFocusEvent.current = false;
        return;
      }
      onTooltipMouseEnter(ev as unknown as React.MouseEvent<SVGElement>);
    },
    [onTooltipMouseEnter],
  );

  const onTooltipBlur = useCallback(
    (ev: React.FocusEvent<SVGElement>) => {
      ignoreNextFocusEvent.current = document?.activeElement === ev.target;
      dismissTimerId.current = async.setTimeout(() => {
        setIsTooltipVisible(false);
      }, 0);
    },
    [async],
  );

  const onTooltipKeyDown = useCallback(
    (ev: React.KeyboardEvent<SVGElement>) => {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      if ((ev.which === KeyCodes.escape || ev.ctrlKey) && isTooltipVisible) {
        hideTooltip();
        ev.stopPropagation();
      }
    },
    [isTooltipVisible, hideTooltip],
  );

  const showTooltip =
    (props.isTooltipVisibleProp && isOverflowing && !!props.content) || (isTooltipVisible && !!props.content);

  const rectX = (typeof props.textProps?.x === 'number' ? props.textProps.x : 0) - (textWidth ?? 0) / 2 - PADDING;
  const rectY = (typeof props.textProps?.y === 'number' ? props.textProps.y : 0) - (textHeight ?? 0) / 2 - 2 * PADDING;

  return (
    <>
      {props.showBackground && (
        <rect
          x={rectX}
          y={rectY}
          width={(textWidth ?? 0) + 2 * PADDING}
          height={(textHeight ?? 0) + PADDING}
          transform={props.textProps?.transform}
          className={props.className}
        />
      )}
      <Tooltip
        relationship="description"
        {...props.tooltipProps}
        withArrow
        content={props.content}
        // targetElement={getTargetElement()} ToDo - This assignment is causing build failure. Needs to be fixed.
        visible={showTooltip}
      >
        <text
          {...props.textProps}
          id={tooltipHostId}
          ref={tooltipHostRef}
          onFocusCapture={onTooltipFocus}
          onBlurCapture={onTooltipBlur}
          onMouseEnter={onTooltipMouseEnter}
          onMouseLeave={onTooltipMouseLeave}
          onKeyDown={onTooltipKeyDown}
          data-is-focusable={props.shouldReceiveFocus && isOverflowing}
        >
          {props.content}
        </text>
      </Tooltip>
    </>
  );
});
// eslint-disable-next-line @typescript-eslint/no-deprecated
SVGTooltipText.defaultProps = {
  delay: 0,
  showBackground: false,
};
