import * as React from 'react';
import { Button, IButtonComponent, IButtonProps, IButtonStyles, IButtonTokens } from '@uifabric/experiments';
// Temporary import file to experiment with next version of foundation.
import { composed } from '@uifabric/foundation/lib/next/composed';
import { buttonProperties, getNativeProps } from '@uifabric/utilities';
import { Spinner } from 'office-ui-fabric-react';

export const SpinnerButton: React.StatelessComponent<IButtonProps> = composed<IButtonProps, IButtonTokens, IButtonStyles>(Button, {
  slots: { icon: Spinner }
});

const IconAtEndButtonView: IButtonComponent['view'] = (props, slots) => {
  const { icon, content, children, disabled, onClick, allowDisabledFocus, ariaLabel, keytipProps, buttonRef, ...rest } = props;

  const buttonProps = getNativeProps<React.HTMLAttributes<HTMLButtonElement>>(rest, buttonProperties);

  const _onClick = (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>) => {
    if (!disabled && onClick) {
      onClick(ev);

      if (ev.defaultPrevented) {
        return;
      }
    }
  };

  return (
    <slots.root
      type="button"
      role="button"
      onClick={_onClick}
      {...buttonProps}
      disabled={disabled && !allowDisabledFocus}
      aria-disabled={disabled}
      tabIndex={!disabled || allowDisabledFocus ? 0 : undefined}
      aria-label={ariaLabel}
      ref={buttonRef}
    >
      {content && <slots.content />}
      {children}
      {icon && <slots.icon />}
    </slots.root>
  );
};

export const IconAtEndButton: React.StatelessComponent<IButtonProps> = composed(Button, {
  view: IconAtEndButtonView
});

export const SpinnerAtEndButton: React.StatelessComponent<IButtonProps> = composed<IButtonProps, IButtonTokens, IButtonStyles>(
  IconAtEndButton,
  {
    slots: { icon: Spinner }
  }
);
