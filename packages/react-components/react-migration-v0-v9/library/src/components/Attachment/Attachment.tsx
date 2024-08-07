import { mergeClasses } from '@fluentui/react-components';
import { useARIAButtonProps } from '@fluentui/react-aria';
import * as React from 'react';

import { useAttachmentBaseStyles, useAttachmentStyles } from './Attachment.styles';

export const attachmentClassName = 'fui-Attachment';
export const attachmentProgressContainerClassName = `${attachmentClassName}__progress-container`;
export const attachmentProgressBarClassName = `${attachmentClassName}__progress`;

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

  return (
    <div
      ref={ref}
      className={mergeClasses(attachmentClassName, attachmentBaseClass, actionable && classes.actionable, className)}
      {...(actionable && {
        'data-is-focusable': true,
        ...buttonProps,
      })}
      {...rest}
    >
      {children}
      {!isNaN(Number(progress)) && (
        <div className={mergeClasses(attachmentProgressContainerClassName, classes.progressContainer)}>
          <div
            className={mergeClasses(classes.progressBar, attachmentProgressBarClassName)}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
});

Attachment.displayName = 'Attachment';
