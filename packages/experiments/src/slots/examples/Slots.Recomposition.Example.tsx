/** @jsx withSlots */
import * as React from 'react';
import { Button, IButtonComponent, IButtonProps, IButtonStyles, IButtonTokens } from '@uifabric/experiments';
import { withSlots } from '@uifabric/foundation';
// Temporary import file to experiment with next version of foundation.
import { composed } from '@uifabric/foundation/lib/next/composed';
import { buttonProperties, getNativeProps } from '@uifabric/utilities';
import { Spinner, Stack, IStackProps } from 'office-ui-fabric-react';

const stackProps: IStackProps = { tokens: { childrenGap: 16 }, padding: 8, maxWidth: 400 };

const SpinnerButton: React.StatelessComponent<IButtonProps> = composed<IButtonProps, IButtonTokens, IButtonStyles>(Button, {
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

const IconAtEndButton: React.StatelessComponent<IButtonProps> = composed(Button, {
  view: IconAtEndButtonView
});

const SpinnerAtEndButton: React.StatelessComponent<IButtonProps> = composed<IButtonProps, IButtonTokens, IButtonStyles>(IconAtEndButton, {
  slots: { icon: Spinner }
});

// tslint:disable:jsx-no-lambda
// tslint:disable:jsx-key
export class SlotsRecompositionExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack>
        <Stack {...stackProps}>
          {/* TODO: Can we change the typing of the slots on recomposition? */}
          <SpinnerButton content="Recomposed button with Spinner as its icon" icon="Upload" />
          <IconAtEndButton content="Recomposed button with icon at the end" icon="Upload" />
          <SpinnerAtEndButton content="Recomposed button with Spinner as its icon at the end" icon="Upload" />
        </Stack>
      </Stack>
    );
  }
}
