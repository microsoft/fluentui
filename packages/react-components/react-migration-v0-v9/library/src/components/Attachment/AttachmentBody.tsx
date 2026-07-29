'use client';

import { clsx } from 'clsx';
import * as React from 'react';
import { useAttachmentBodyStyles } from './AttachmentBody.styles';

export interface AttachmentBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Public identity class for AttachmentBody.
 *
 * @deprecated for styling — see `attachmentClassName` in ./Attachment.tsx for the full
 * rationale. Retained as the component's public identity class, the Tailwind named-group
 * marker (DECISIONS.md D15.1); the BEM static `fui-AttachmentBody` it used to hold was removed
 * with every other static (D16.1). Use `fuiSelector(attachmentBodyClassName)` from
 * `@fluentui/react-utilities` at selector sites (D16.5).
 */
export const attachmentBodyClassName = 'group/fui-attachment-body';

export const AttachmentBody: React.FC<AttachmentBodyProps> = React.forwardRef<HTMLDivElement, AttachmentBodyProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;
    const classes = useAttachmentBodyStyles();

    return (
      <div ref={ref} className={clsx(classes.root, 'group/fui-attachment-body', className)} {...rest}>
        {children}
      </div>
    );
  },
);

AttachmentBody.displayName = 'AttachmentBody';
