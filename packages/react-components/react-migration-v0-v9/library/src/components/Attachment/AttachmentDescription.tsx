import { mergeClasses } from '@fluentui/react-components';
import * as React from 'react';
import { useAttachmentDescriptionStyles } from './AttachmentDescription.styles';

export interface AttachmentDescriptionProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const attachmentDescriptionClassName = 'fui-AttachmentDescription';

export const AttachmentDescription: React.FC<AttachmentDescriptionProps> = React.forwardRef<
  HTMLSpanElement,
  AttachmentDescriptionProps
>((props, ref) => {
  const { className, children, ...rest } = props;
  const classes = useAttachmentDescriptionStyles();

  return (
    <span ref={ref} className={mergeClasses(attachmentDescriptionClassName, classes.root, className)} {...rest}>
      {children}
    </span>
  );
});

AttachmentDescription.displayName = 'AttachmentDescription';
