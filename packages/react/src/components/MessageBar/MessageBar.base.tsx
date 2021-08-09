import * as React from 'react';
import { DelayedRender, classNamesFunction, getNativeProps, htmlElementProperties, css } from '../../Utilities';
import { IconButton } from '../../Button';
import { Icon } from '../../Icon';
import { IMessageBarProps, IMessageBarStyleProps, IMessageBarStyles, MessageBarType } from './MessageBar.types';
import { useId, useBoolean } from '@fluentui/react-hooks';

const ICON_MAP = {
  [MessageBarType.info]: 'Info',
  [MessageBarType.warning]: 'Info',
  [MessageBarType.error]: 'ErrorBadge',
  [MessageBarType.blocked]: 'Blocked2',
  [MessageBarType.severeWarning]: 'Warning',
  [MessageBarType.success]: 'Completed',
};

const COMPONENT_NAME = 'MessageBar';

const getClassNames = classNamesFunction<IMessageBarStyleProps, IMessageBarStyles>();

const getAnnouncementPriority = (messageBarType: MessageBarType): 'assertive' | 'polite' => {
  switch (messageBarType) {
    case MessageBarType.blocked:
    case MessageBarType.error:
    case MessageBarType.severeWarning:
      return 'assertive';
  }
  return 'polite';
};

const getRole = (messageBarType: MessageBarType): 'alert' | 'status' => {
  switch (messageBarType) {
    case MessageBarType.blocked:
    case MessageBarType.error:
    case MessageBarType.severeWarning:
      return 'alert';
  }
  return 'status';
};

export const MessageBarBase: React.FunctionComponent<IMessageBarProps> = React.forwardRef<
  HTMLDivElement,
  IMessageBarProps
>((props, ref) => {
  const [expandSingleLine, { toggle: toggleExpandSingleLine }] = useBoolean(false);
  const labelId = useId('MessageBar');

  const {
    actions,
    className,
    children,
    overflowButtonAriaLabel,
    dismissIconProps,
    styles,
    theme,
    messageBarType = MessageBarType.info,
    onDismiss = undefined,
    isMultiline = true,
    truncated,
    dismissButtonAriaLabel,
    messageBarIconProps,
    role,
    delayedRender = true,
  } = props;

  const nativeProps = getNativeProps<React.HTMLAttributes<HTMLSpanElement>>(props, htmlElementProperties, [
    'className',
    'role',
  ]);

  const classNames: { [key in keyof IMessageBarStyles]: string } = getClassNames(styles, {
    theme: theme!,
    messageBarType: messageBarType || MessageBarType.info,
    onDismiss: onDismiss !== undefined,
    actions: actions !== undefined,
    truncated: truncated,
    isMultiline: isMultiline,
    expandSingleLine: expandSingleLine,
    className,
  });

  const expandIconProps = { iconName: expandSingleLine ? 'DoubleChevronUp' : 'DoubleChevronDown' };
  const regionProps = actions || onDismiss ? { 'aria-describedby': labelId, role: 'region' } : {};
  const actionsDiv = actions ? <div className={classNames.actions}>{actions}</div> : null;

  const dismissButton = onDismiss ? (
    <IconButton
      disabled={false}
      className={classNames.dismissal}
      onClick={onDismiss}
      iconProps={dismissIconProps ? dismissIconProps : { iconName: 'Clear' }}
      title={dismissButtonAriaLabel}
      ariaLabel={dismissButtonAriaLabel}
    />
  ) : null;

  return (
    <div ref={ref} className={classNames.root} {...regionProps}>
      <div className={classNames.content}>
        <div className={classNames.iconContainer} aria-hidden>
          {messageBarIconProps ? (
            <Icon {...messageBarIconProps} className={css(classNames.icon, messageBarIconProps.className)} />
          ) : (
            <Icon iconName={ICON_MAP[messageBarType!]} className={classNames.icon} />
          )}
        </div>
        <div
          className={classNames.text}
          id={labelId}
          role={role || getRole(messageBarType)}
          aria-live={getAnnouncementPriority(messageBarType)}
        >
          <span className={classNames.innerText} {...nativeProps}>
            {delayedRender ? (
              <DelayedRender>
                <span>{children}</span>
              </DelayedRender>
            ) : (
              // this span is probably not necessary, but preserving it for now in case anyone
              // has styling that expects it to be present
              <span>{children}</span>
            )}
          </span>
        </div>
        {
          /* singleline expand/collapse button */ !isMultiline && !actionsDiv && truncated && (
            <div className={classNames.expandSingleLine}>
              <IconButton
                disabled={false}
                className={classNames.expand}
                onClick={toggleExpandSingleLine}
                iconProps={expandIconProps}
                ariaLabel={overflowButtonAriaLabel}
                aria-expanded={expandSingleLine}
              />
            </div>
          )
        }
        {/* singleline actions */ !isMultiline && actionsDiv}
        {
          /* singleline dismiss */ !isMultiline && dismissButton && (
            <div className={classNames.dismissSingleLine}>{dismissButton}</div>
          )
        }
        {/* multiline dismiss */ isMultiline && dismissButton}
      </div>
      {/* multiline actions */ isMultiline && actionsDiv}
    </div>
  );
});
MessageBarBase.displayName = COMPONENT_NAME;
