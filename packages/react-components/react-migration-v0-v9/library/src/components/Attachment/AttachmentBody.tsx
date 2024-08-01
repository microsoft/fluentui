import { mergeClasses } from '@fluentui/react-components';
import * as React from 'react';
import { useAttachmentBodyStyles } from './AttachmentBody.styles';

export interface AttachmentBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const attachmentBodyClassName = 'fui-AttachmentBody';

export const AttachmentBody: React.FC<AttachmentBodyProps> = React.forwardRef<HTMLDivElement, AttachmentBodyProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;
    const classes = useAttachmentBodyStyles();

    return (
      <div ref={ref} className={mergeClasses(attachmentBodyClassName, classes.root, className)} {...rest}>
        {children}
      </div>
    );
  },
);

AttachmentBody.displayName = 'AttachmentBody';
