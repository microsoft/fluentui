import * as React from 'react';
import { DelayedRender, classNamesFunction, getNativeProps, htmlElementProperties, css } from '../../Utilities';
import { IconButton } from '../../compat/Button';
import { Icon } from '../../Icon';
import { IMessageBarProps, IMessageBarStyleProps, IMessageBarStyles, MessageBarType } from './MessageBar.types';
import { useId, useBoolean } from '@uifabric/react-hooks';

const getClassNames = classNamesFunction<IMessageBarStyleProps, IMessageBarStyles>();

const COMPONENT_NAME = 'MessageBar';

const ICON_MAP = {
  [MessageBarType.info]: 'Info',
  [MessageBarType.warning]: 'Info',
  [MessageBarType.error]: 'ErrorBadge',
  [MessageBarType.blocked]: 'Blocked2',
  [MessageBarType.severeWarning]: 'Warning',
  [MessageBarType.success]: 'Completed',
};

export const MessageBarBase = React.forwardRef<HTMLDivElement, IMessageBarProps>((props, ref) => {
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
  } = props;

  const nativeProps = getNativeProps<React.HTMLAttributes<HTMLSpanElement>>(props, htmlElementProperties, [
    'className',
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

  const iconProps = { iconName: expandSingleLine ? 'DoubleChevronUp' : 'DoubleChevronDown' };

  const getActionsDiv = React.useCallback((): JSX.Element | null => {
    if (actions) {
      return <div className={classNames.actions}>{actions}</div>;
    }
    return null;
  }, [actions, classNames.actions]);

  const getAnnouncementPriority = React.useCallback((): 'assertive' | 'polite' => {
    switch (messageBarType) {
      case MessageBarType.blocked:
      case MessageBarType.error:
      case MessageBarType.severeWarning:
        return 'assertive';
    }
    return 'polite';
  }, [messageBarType]);

  const getRegionProps = React.useCallback(() => {
    const hasActions = !!actions || !!onDismiss;
    const regionProps = {
      'aria-describedby': labelId,
      role: 'region',
    };
    return hasActions ? regionProps : {};
  }, [actions, onDismiss, labelId]);

  const getDismissDiv = React.useMemo((): JSX.Element | null => {
    if (onDismiss) {
      return (
        <IconButton
          disabled={false}
          className={classNames.dismissal}
          onClick={onDismiss}
          iconProps={dismissIconProps ? dismissIconProps : { iconName: 'Clear' }}
          title={dismissButtonAriaLabel}
          ariaLabel={dismissButtonAriaLabel}
        />
      );
    }
    return null;
  }, [classNames.dismissal, dismissButtonAriaLabel, dismissIconProps, onDismiss]);

  return (
    <div ref={ref} className={classNames.root} {...getRegionProps()}>
      <div className={classNames.content}>
        <div className={classNames.iconContainer} aria-hidden>
          {messageBarIconProps ? (
            <Icon {...messageBarIconProps} className={css(classNames.icon, messageBarIconProps.className)} />
          ) : (
            <Icon iconName={ICON_MAP[messageBarType!]} className={classNames.icon} />
          )}
        </div>
        <div className={classNames.text} id={labelId} role="status" aria-live={getAnnouncementPriority()}>
          <span className={classNames.innerText} {...nativeProps}>
            <DelayedRender>
              <span>{children}</span>
            </DelayedRender>
          </span>
        </div>
        {!isMultiline &&
          (getActionsDiv() ||
            (!actions && truncated && (
              <div className={classNames.expandSingleLine}>
                <IconButton
                  disabled={false}
                  className={classNames.expand}
                  onClick={toggleExpandSingleLine}
                  iconProps={iconProps}
                  ariaLabel={overflowButtonAriaLabel}
                  aria-expanded={expandSingleLine}
                />
              </div>
            )) ||
            (onDismiss && <div className={classNames.dismissSingleLine}>{getDismissDiv}</div>))}
        {isMultiline && getDismissDiv}
      </div>
      {isMultiline && getActionsDiv()}
    </div>
  );
});
MessageBarBase.displayName = COMPONENT_NAME;
