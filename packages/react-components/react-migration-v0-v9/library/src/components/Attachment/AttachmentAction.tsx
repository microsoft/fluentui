'use client';

import type { ButtonProps } from '@fluentui/react-components';
import { Button } from '@fluentui/react-components';
import { clsx } from 'clsx';
import * as React from 'react';
import { useAttachmentActionStyles } from './AttachmentAction.styles';

export type AttachmentActionProps = ButtonProps;

/**
 * Public identity class for AttachmentAction.
 *
 * @deprecated for styling — see `attachmentClassName` in ./Attachment.tsx for the full
 * rationale. Retained as the component's public identity class, the Tailwind named-group
 * marker (DECISIONS.md D15.1); the BEM static `fui-AttachmentAction` it used to hold was
 * removed with every other static (D16.1). Use `fuiSelector(attachmentActionClassName)` from
 * `@fluentui/react-utilities` at selector sites (D16.5).
 */
export const attachmentActionClassName = 'group/fui-attachment-action';

export const AttachmentAction = React.forwardRef<HTMLButtonElement, AttachmentActionProps>((props, ref) => {
  const { className, disabled, disabledFocusable, children, onClick, onKeyUp, onKeyDown, ...rest } = props;
  const classes = useAttachmentActionStyles();

  const handleClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement & HTMLAnchorElement>>(
    e => {
      e.stopPropagation();
      e.preventDefault();
      onClick?.(e);
    },
    [onClick],
  );

  const handleKeyUp = React.useCallback<React.KeyboardEventHandler<HTMLAnchorElement & HTMLButtonElement>>(
    e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.stopPropagation();
      }
      onKeyUp?.(e);
    },
    [onKeyUp],
  );

  const handleKeyDown = React.useCallback<React.KeyboardEventHandler<HTMLButtonElement & HTMLAnchorElement>>(
    e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.stopPropagation();
      }
      onKeyDown?.(e);
    },
    [onKeyDown],
  );

  // Unconditional module class first, marker second, consumer className last (DECISIONS.md
  // D16.2). This string reaches the DOM as react-button's CONSUMER className —
  // `useButtonStyles_unstable` composes it last inside
  // `clsx(styles.root, 'group/fui-button', …, state.root.className)` — so the rendered
  // element leads with Button's own hashed class and carries two markers, `group/fui-button`
  // and this one. Both are wanted: a descendant can address either identity (D16.3). The
  // declarations sit at `fui.components.l2` because they land on an element another
  // component's hook owns (D2 amendment 2).
  const rootClasses = clsx(
    classes.root,
    'group/fui-attachment-action',
    (disabled || disabledFocusable) && classes.disabled,
    className,
  );

  return (
    <Button
      ref={ref}
      className={rootClasses}
      appearance="transparent"
      disabled={disabled}
      disabledFocusable={disabledFocusable}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      {...rest}
    >
      {children}
    </Button>
  );
});

AttachmentAction.displayName = 'AttachmentAction';
