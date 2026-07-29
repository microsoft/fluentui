'use client';

import { clsx } from 'clsx';
import * as React from 'react';
import { useAttachmentIconStyles } from './AttachmentIcon.styles';

export interface AttachmentIconProps extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * Public identity class for AttachmentIcon.
 *
 * @deprecated for styling — see `attachmentClassName` in ./Attachment.tsx for the full
 * rationale. Retained as the component's public identity class, the Tailwind named-group
 * marker (DECISIONS.md D15.1); the BEM static `fui-AttachmentIcon` it used to hold was removed
 * with every other static (D16.1). Use `fuiSelector(attachmentIconClassName)` from
 * `@fluentui/react-utilities` at selector sites (D16.5).
 */
export const attachmentIconClassName = 'group/fui-attachment-icon';

export const AttachmentIcon: React.FC<AttachmentIconProps> = React.forwardRef<HTMLSpanElement, AttachmentIconProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;
    const classes = useAttachmentIconStyles();

    return (
      <span ref={ref} className={clsx(classes.root, 'group/fui-attachment-icon', className)} {...rest}>
        {children}
      </span>
    );
  },
);

AttachmentIcon.displayName = 'AttachmentIcon';
