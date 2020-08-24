import * as React from 'react';
import { DelayedRender, classNamesFunction, getNativeProps, htmlElementProperties, css } from '../../Utilities';
import { IconButton } from '../../compat/Button';
import { Icon } from '../../Icon';
import { IMessageBarProps, IMessageBarStyleProps, IMessageBarStyles, MessageBarType } from './MessageBar.types';
import { useId, useBoolean } from '@uifabric/react-hooks';

const getClassNames = classNamesFunction<IMessageBarStyleProps, IMessageBarStyles>();

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

  const getDismissSingleLine = React.useMemo((): JSX.Element | null => {
    if (onDismiss) {
      return <div className={classNames.dismissSingleLine}>{getDismissDiv}</div>;
    }
    return null;
  }, [classNames.dismissSingleLine, getDismissDiv, onDismiss]);

  const getExpandSingleLine = React.useMemo((): JSX.Element | null => {
    if (!actions && truncated) {
      return (
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
      );
    }
    return null;
  }, [
    actions,
    classNames.expand,
    classNames.expandSingleLine,
    expandSingleLine,
    iconProps,
    overflowButtonAriaLabel,
    toggleExpandSingleLine,
    truncated,
  ]);

  const getIconSpan = React.useMemo((): JSX.Element => {
    return (
      <div className={classNames.iconContainer} aria-hidden>
        {messageBarIconProps ? (
          <Icon {...messageBarIconProps} className={css(classNames.icon, messageBarIconProps.className)} />
        ) : (
          <Icon iconName={ICON_MAP[messageBarType!]} className={classNames.icon} />
        )}
      </div>
    );
  }, [classNames.icon, classNames.iconContainer, messageBarIconProps, messageBarType]);

  const renderInnerText = React.useMemo((): JSX.Element => {
    return (
      <div className={classNames.text} id={labelId} role="status" aria-live={getAnnouncementPriority()}>
        <span className={classNames.innerText} {...nativeProps}>
          <DelayedRender>
            <span>{children}</span>
          </DelayedRender>
        </span>
      </div>
    );
  }, [children, classNames.innerText, classNames.text, getAnnouncementPriority, labelId, nativeProps]);

  const getRegionProps = React.useCallback(() => {
    const hasActions = !!getActionsDiv() || !!getDismissDiv;
    const regionProps = {
      'aria-describedby': labelId,
      role: 'region',
    };
    return hasActions ? regionProps : {};
  }, [getActionsDiv, getDismissDiv, labelId]);

  const renderMultiLine = React.useMemo((): React.ReactElement<React.HTMLAttributes<HTMLAreaElement>> => {
    return (
      <div ref={ref} className={classNames.root} {...getRegionProps()}>
        <div className={classNames.content}>
          {getIconSpan}
          {renderInnerText}
          {getDismissDiv}
        </div>
        {getActionsDiv()}
      </div>
    );
  }, [
    classNames.content,
    classNames.root,
    getActionsDiv,
    getDismissDiv,
    getIconSpan,
    getRegionProps,
    ref,
    renderInnerText,
  ]);

  const renderSingleLine = React.useMemo((): React.ReactElement<React.HTMLAttributes<HTMLAreaElement>> => {
    return (
      <div ref={ref} className={classNames.root} {...getRegionProps()}>
        <div className={classNames.content}>
          {getIconSpan}
          {renderInnerText}
          {getExpandSingleLine}
          {getActionsDiv}
          {getDismissSingleLine}
        </div>
      </div>
    );
  }, [
    classNames.content,
    classNames.root,
    getActionsDiv,
    getDismissSingleLine,
    getExpandSingleLine,
    getIconSpan,
    getRegionProps,
    ref,
    renderInnerText,
  ]);

  return isMultiline ? renderMultiLine : renderSingleLine;
});
