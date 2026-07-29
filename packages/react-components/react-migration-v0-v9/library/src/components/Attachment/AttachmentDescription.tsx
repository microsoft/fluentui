'use client';

import { clsx } from 'clsx';
import * as React from 'react';
import { useAttachmentDescriptionStyles } from './AttachmentDescription.styles';

export interface AttachmentDescriptionProps extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * Public identity class for AttachmentDescription.
 *
 * @deprecated for styling — see `attachmentClassName` in ./Attachment.tsx for the full
 * rationale. Retained as the component's public identity class, the Tailwind named-group
 * marker (DECISIONS.md D15.1); the BEM static `fui-AttachmentDescription` it used to hold was removed
 * with every other static (D16.1). Use `fuiSelector(attachmentDescriptionClassName)` from
 * `@fluentui/react-utilities` at selector sites (D16.5).
 */
export const attachmentDescriptionClassName = 'group/fui-attachment-description';

export const AttachmentDescription: React.FC<AttachmentDescriptionProps> = React.forwardRef<
  HTMLSpanElement,
  AttachmentDescriptionProps
>((props, ref) => {
  const { className, children, ...rest } = props;
  const classes = useAttachmentDescriptionStyles();

  return (
    <span ref={ref} className={clsx(classes.root, 'group/fui-attachment-description', className)} {...rest}>
      {children}
    </span>
  );
});

AttachmentDescription.displayName = 'AttachmentDescription';
