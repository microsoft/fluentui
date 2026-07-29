'use client';

import { useARIAButtonProps } from '@fluentui/react-aria';
import { clsx } from 'clsx';
import * as React from 'react';

import { useAttachmentBaseStyles, useAttachmentStyles } from './Attachment.styles';

/**
 * Public identity class for Attachment.
 *
 * @deprecated for styling. The only supported way to style this component's internals is the
 * `className` prop on the element you own. This constant is retained as the component's
 * public identity class — the Tailwind named-group marker (DECISIONS.md D15.1) — usable as a
 * selector and as a `group-*` variant target. The BEM static `fui-Attachment` it used to hold
 * was removed with every other static (DECISIONS.md D16.1), and the two sub-slot constants
 * that sat beside it (`attachmentProgressContainerClassName`, `attachmentProgressBarClassName`)
 * were deleted outright rather than repointed: D16 leaves no public class-name handle on
 * component internals, and a deleted export is a compile error at the exact line that would
 * otherwise have silently stopped matching.
 *
 * The `/` is legal in a class TOKEN but not in a class SELECTOR, so `'.' + attachmentClassName`
 * is an invalid selector. Use `fuiSelector(attachmentClassName)` from
 * `@fluentui/react-utilities` at every selector site (DECISIONS.md D16.5).
 */
export const attachmentClassName = 'group/fui-attachment';

export interface AttachmentProps extends React.HTMLAttributes<HTMLElement> {
  actionable?: boolean;
  disabled?: boolean;
  progress?: string | number;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const Attachment = React.forwardRef<HTMLDivElement, AttachmentProps>((props, ref) => {
  const { actionable, className, children, disabled, onClick, progress, onKeyDown, onKeyUp, ...rest } = props;
  const attachmentBaseClass = useAttachmentBaseStyles();
  const classes = useAttachmentStyles();

  const buttonProps = useARIAButtonProps('div', {
    disabled,
    onClick,
    onKeyDown: onKeyDown as React.KeyboardEventHandler<HTMLLIElement & HTMLDivElement>,
    onKeyUp: onKeyUp as React.KeyboardEventHandler<HTMLLIElement & HTMLDivElement>,
  });

  // Unconditional module class FIRST, then the named group marker, then the conditional
  // module classes, with the consumer className last (DECISIONS.md D16.2). The marker must
  // never be `classList[0]` — nwsapi's `:scope` polyfill throws on it under jsdom (D15.1) —
  // and `attachmentBaseClass` is the token that guarantees it, since clsx never drops an
  // unconditional argument. Cascade priority is decided by the `@layer fui.*` order in
  // Attachment.module.css, not by the order of these arguments.
  const rootClasses = clsx(attachmentBaseClass, 'group/fui-attachment', actionable && classes.actionable, className);

  return (
    <div
      ref={ref}
      className={rootClasses}
      {...(actionable && {
        'data-is-focusable': true,
        ...buttonProps,
      })}
      {...rest}
    >
      {children}
      {/*
        The progress elements carried `fui-Attachment__progress-container` /
        `fui-Attachment__progress` as their first/second class. Both statics are gone with no
        replacement (D16.1): they are internals, so they get no marker, and the exported
        constants that held them were deleted. The runtime `width` below is a plain React
        inline style with no Griffel involvement and is untouched (specials-triage §3 A6).
      */}
      {!isNaN(Number(progress)) && (
        <div className={classes.progressContainer}>
          <div className={classes.progressBar} style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
});

Attachment.displayName = 'Attachment';
