import { mergeClasses } from '@fluentui/react-components';
import * as React from 'react';
import { useAttachmentHeaderStyles } from './AttachmentHeader.styles';

export interface AttachmentHeaderProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const attachmentHeaderClassName = 'fui-AttachmentHeader';

export const AttachmentHeader: React.FC<AttachmentHeaderProps> = React.forwardRef<
  HTMLSpanElement,
  AttachmentHeaderProps
>((props, ref) => {
  const { className, children, ...rest } = props;
  const classes = useAttachmentHeaderStyles();

  return (
    <span ref={ref} className={mergeClasses(attachmentHeaderClassName, classes.root, className)} {...rest}>
      {children}
    </span>
  );
});

AttachmentHeader.displayName = 'AttachmentHeader';
