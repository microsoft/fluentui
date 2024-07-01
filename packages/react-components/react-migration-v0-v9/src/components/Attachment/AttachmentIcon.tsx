import { mergeClasses } from '@fluentui/react-components';
import * as React from 'react';
import { useAttachmentIconStyles } from './AttachmentIcon.styles';

export interface AttachmentIconProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const attachmentIconClassName = 'fui-AttachmentIcon';

export const AttachmentIcon: React.FC<AttachmentIconProps> = React.forwardRef<HTMLSpanElement, AttachmentIconProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;
    const classes = useAttachmentIconStyles();

    return (
      <span ref={ref} className={mergeClasses(attachmentIconClassName, classes.root, className)} {...rest}>
        {children}
      </span>
    );
  },
);

AttachmentIcon.displayName = 'AttachmentIcon';
