'use client';

import { clsx } from 'clsx';
import * as React from 'react';

import { useSegmentStyles } from './Segment.styles';

/**
 * Public identity class for Segment.
 *
 * @deprecated for styling — see `attachmentClassName` in ../Attachment/Attachment.tsx for the
 * full rationale. Retained as the component's public identity class, the Tailwind named-group
 * marker (DECISIONS.md D15.1); the BEM static `fui-Segment` it used to hold was removed with
 * every other static (D16.1). Use `fuiSelector(segmentClassName)` from
 * `@fluentui/react-utilities` at selector sites (D16.5).
 */
export const segmentClassName = 'group/fui-segment';

export const Segment = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>((props, ref) => {
  const { children, className, ...rest } = props;
  const classes = useSegmentStyles();

  // Unconditional module class FIRST, marker second, consumer className last (DECISIONS.md
  // D16.2). The marker must never be `classList[0]` — nwsapi's `:scope` polyfill throws on
  // it under jsdom (D15.1).
  const segmentClasses = clsx(classes.segment, 'group/fui-segment', className);

  return (
    <div ref={ref} className={segmentClasses} {...rest}>
      {children}
    </div>
  );
});

Segment.displayName = 'Segment';
