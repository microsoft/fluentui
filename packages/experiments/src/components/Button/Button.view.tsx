/** @jsx withSlots */
import { ContextualMenu, DirectionalHint } from 'office-ui-fabric-react';
import { withSlots, getSlots } from '../../Foundation';
import { Stack } from '../../Stack';
import { Text } from '../../Text';
import { getNativeProps, buttonProperties } from '../../Utilities';
import { Icon } from '../../utilities/factoryComponents';

import { IButtonComponent, IButtonProps, IButtonSlots, IButtonViewProps } from './Button.types';

export const ButtonView: IButtonComponent['view'] = props => {
  const { menu: Menu, children, content, icon, expanded, disabled, onMenuDismiss, menuTarget, split, onSplitClick, ...rest } = props;

  // TODO: 'href' is anchor property... consider getNativeProps by root type
  const buttonProps = { ...getNativeProps(rest, buttonProperties) };

  const Slots = getSlots<IButtonProps, IButtonSlots>(props, {
    root: _deriveRootType(props),
    stack: Stack,
    icon: Icon,
    content: Text,
    menu: ContextualMenu,
    menuIcon: Icon,

    splitRoot: Stack,
    splitMenuButton: 'button',
    splitStack: Stack,
    splitDivider: 'span'
  });

  if (split) {
    return (
      <Slots.splitRoot horizontal>
        <Slots.root
          type="button" // stack doesn't take in native button props
          role="button"
          onClick={onSplitClick}
          aria-disabled={disabled}
        >
          <Slots.stack horizontal as="span" gap={8} verticalAlign="center" horizontalAlign="center" verticalFill>
            <Slots.icon />
            <Slots.content />
            {children}
            <Stack.Item>
              <Slots.splitDivider />
            </Stack.Item>
          </Slots.stack>
        </Slots.root>

        <Slots.splitMenuButton type="button" role="button" {...buttonProps} aria-disabled={disabled}>
          <Slots.splitStack horizontal as="span" gap={8} verticalAlign="center" horizontalAlign="center" verticalFill>
            <Stack.Item>
              <Slots.menuIcon iconName="ChevronDown" />
            </Stack.Item>
          </Slots.splitStack>
          {expanded && (
            <Slots.menu target={menuTarget} onDismiss={onMenuDismiss} items={[]} directionalHint={DirectionalHint.bottomRightEdge} />
          )}
        </Slots.splitMenuButton>
      </Slots.splitRoot>
    );
  }

  return (
    <Slots.root
      type="button" // stack doesn't take in native button props
      role="button"
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

// TODO: test with split button approach.
//        should split button be another component?
//        can Button's slots be manipulated to create an HOC split button?
// {split && (
// <Slot as='span' userProps={splitContainer}>
//   <Slot as={Divider} userProps={divider} />
//   <Slot as={Icon} userProps={menuChevron} />
// </Slot>
// )}

function _deriveRootType(props: IButtonViewProps): keyof JSX.IntrinsicElements {
  return !!props.href ? 'a' : 'button';
}
