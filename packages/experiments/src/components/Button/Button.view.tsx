/** @jsx withSlots */
import { ContextualMenu, Stack, DirectionalHint } from 'office-ui-fabric-react';
import { withSlots, getSlots } from '../../Foundation';
import { Text } from '../../Text';
import { getNativeProps, buttonProperties } from '../../Utilities';
import { Icon } from '../../utilities/factoryComponents';

import { IButtonComponent, IButtonProps, IButtonSlots, IButtonViewProps } from './Button.types';

export const ButtonView: IButtonComponent['view'] = props => {
  const {
    menu: Menu,
    children,
    content,
    icon,
    expanded,
    disabled,
    onMenuDismiss,
    menuTarget,
    split,
    onClick,
    onSecondaryActionClick,
    ...rest
  } = props;

  // TODO: 'href' is anchor property... consider getNativeProps by root type
  const buttonProps = { ...getNativeProps(rest, buttonProperties) };

  const Slots = getSlots<IButtonProps, IButtonSlots>(props, {
    root: _deriveRootType(props),
    stack: Stack,
    icon: Icon,
    content: Text,
    menu: ContextualMenu,
    menuIcon: Icon,

    primaryActionContainer: Stack,
    secondaryActionContainer: 'span',
    splitDivider: 'span'
  });

  if (split) {
    return (
      <Slots.root
        type="button" // stack doesn't take in native button props
        role="button"
        {...buttonProps}
        aria-disabled={disabled}
      >
        <Slots.stack horizontal as="span" gap={8} verticalAlign="stretch" horizontalAlign="center" verticalFill>
          <Slots.primaryActionContainer
            horizontal
            as="span"
            gap={8}
            verticalAlign="center"
            horizontalAlign="center"
            verticalFill
            onClick={onClick}
          >
            <Slots.icon />
            <Slots.content />
            {children}
          </Slots.primaryActionContainer>

          <Slots.splitDivider />

          <Slots.secondaryActionContainer onClick={onSecondaryActionClick}>
            <Slots.menuIcon iconName="ChevronDown" />
            {expanded && Menu && (
              <Slots.menu target={menuTarget} onDismiss={onMenuDismiss} items={[]} directionalHint={DirectionalHint.bottomRightEdge} />
            )}
          </Slots.secondaryActionContainer>
        </Slots.stack>
      </Slots.root>
    );
  }

  return (
    <Slots.root
      type="button" // stack doesn't take in native button props
      role="button"
      onClick={onClick}
      {...buttonProps}
      aria-disabled={disabled}
    >
      <Slots.stack horizontal as="span" gap={8} verticalAlign="center" horizontalAlign="center" verticalFill>
        <Slots.icon />
        <Slots.content />
        {children}
        {Menu && (
          <Stack.Item>
            <Slots.menuIcon iconName="ChevronDown" />
          </Stack.Item>
        )}
      </Slots.stack>
      {expanded && Menu && <Slots.menu target={menuTarget} onDismiss={onMenuDismiss} items={[]} />}
    </Slots.root>
  );
};

function _deriveRootType(props: IButtonViewProps): keyof JSX.IntrinsicElements {
  return !!props.href ? 'a' : 'button';
}
