import { Button, ButtonProps, mergeClasses } from '@fluentui/react-components';
import * as React from 'react';
import { useAttachmentActionStyles } from './AttachmentAction.styles';

export type AttachmentActionProps = ButtonProps;

export const attachmentActionClassName = 'fui-AttachmentAction';

export const AttachmentAction = React.forwardRef<HTMLButtonElement, AttachmentActionProps>((props, ref) => {
  const { className, disabled, disabledFocusable, children, onClick, onKeyUp, onKeyDown, ...rest } = props;
  const classes = useAttachmentActionStyles();

  const handleClick = React.useCallback(
    e => {
      e.stopPropagation();
      e.preventDefault();
      onClick?.(e);
    },
    [onClick],
  );

  const handleKeyUp = React.useCallback(
    e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.stopPropagation();
      }
      onKeyUp?.(e);
    },
    [onKeyUp],
  );

  const handleKeyDown = React.useCallback(
    e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.stopPropagation();
      }
      onKeyDown?.(e);
    },
    [onKeyDown],
  );

  return (
    <Button
      ref={ref}
      className={mergeClasses(
        attachmentActionClassName,
        classes.root,
        (disabled || disabledFocusable) && classes.disabled,
        className,
      )}
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
