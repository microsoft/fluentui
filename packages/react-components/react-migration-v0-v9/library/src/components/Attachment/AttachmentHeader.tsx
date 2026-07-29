'use client';

import { clsx } from 'clsx';
import * as React from 'react';
import { useAttachmentHeaderStyles } from './AttachmentHeader.styles';

export interface AttachmentHeaderProps extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * Public identity class for AttachmentHeader.
 *
 * @deprecated for styling — see `attachmentClassName` in ./Attachment.tsx for the full
 * rationale. Retained as the component's public identity class, the Tailwind named-group
 * marker (DECISIONS.md D15.1); the BEM static `fui-AttachmentHeader` it used to hold was removed
 * with every other static (D16.1). Use `fuiSelector(attachmentHeaderClassName)` from
 * `@fluentui/react-utilities` at selector sites (D16.5).
 */
export const attachmentHeaderClassName = 'group/fui-attachment-header';

export const AttachmentHeader: React.FC<AttachmentHeaderProps> = React.forwardRef<
  HTMLSpanElement,
  AttachmentHeaderProps
>((props, ref) => {
  const { className, children, ...rest } = props;
  const classes = useAttachmentHeaderStyles();

  return (
    <span ref={ref} className={clsx(classes.root, 'group/fui-attachment-header', className)} {...rest}>
      {children}
    </span>
  );
});

AttachmentHeader.displayName = 'AttachmentHeader';
