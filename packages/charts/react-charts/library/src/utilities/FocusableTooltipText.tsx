/* eslint-disable no-restricted-globals */
import * as React from 'react';
import { useCallback, useState, useEffect, useRef } from 'react';
import { Tooltip } from '@fluentui/react-tooltip';
import type { JSXElement } from '@fluentui/react-utilities';
import { hasOverflow } from './overflow-utils';
import { getAccessibleDataObject } from './index';
import { AccessibilityProps } from '../types/index';
import { Async } from './async-utils';

interface IFocusableTooltipTextProps {
  className?: string;
  content:
    | string
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    | JSXElement
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    | JSXElement[];
  accessibilityData?: AccessibilityProps;
}

export const FocusableTooltipText: React.FunctionComponent<IFocusableTooltipTextProps> = React.forwardRef<
  HTMLDivElement,
  IFocusableTooltipTextProps
>((props, forwardedRef) => {
  const [textOverflow, setTextOverflow] = useState(false);
  const tooltipChild = useRef<HTMLSpanElement>(null);
  const async = useRef(new Async()).current;
  const resizeObserver = useRef<ResizeObserver>();

  const getTargetElement = useCallback((): HTMLElement | undefined => {
    if (!tooltipChild.current || !tooltipChild.current.parentElement) {
      return undefined;
    }
    return tooltipChild.current.parentElement;
  }, [tooltipChild]);

  const checkTextOverflow = useCallback(() => {
    const overflowElement = getTargetElement();
    const isTextOverflow = !!overflowElement && hasOverflow(overflowElement);
    if (isTextOverflow !== textOverflow) {
      setTextOverflow(isTextOverflow);
    }
  }, [getTargetElement, textOverflow, setTextOverflow]);

  useEffect(() => {
    checkTextOverflow();
  }, [checkTextOverflow]);

  useEffect(() => {
    // setup part executed only when the component mounts/updates
    const overflowElement = getTargetElement();
    if (window.ResizeObserver && overflowElement) {
      resizeObserver.current = new window.ResizeObserver(async.debounce(checkTextOverflow, 500));
      resizeObserver.current.observe(overflowElement);
    }
    // cleanup part executed only when the component unmounts
    return () => {
      resizeObserver.current?.disconnect();
      async.dispose();
    };
  }, [async, checkTextOverflow, getTargetElement]);

  return (
    <div className={props.className}>
      <Tooltip content={props.content} relationship="description">
        <span {...getAccessibleDataObject(props.accessibilityData)} ref={tooltipChild} data-is-focusable={textOverflow}>
          {props.content}
        </span>
      </Tooltip>
    </div>
  );
});
