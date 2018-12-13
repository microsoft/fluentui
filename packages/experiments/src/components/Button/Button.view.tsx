/** @jsx createElementWrapper */
import { IButtonComponent, IButtonSlots, IButtonViewProps } from './Button.types';
import { Stack } from '../../Stack';
import { ContextualMenu } from 'office-ui-fabric-react';
import { getNativeProps, buttonProperties } from '../../Utilities';
import { Icon, Text } from '../../utilities/factoryComponents';
import { createElementWrapper, getSlots } from '../../utilities/slots';

export const ButtonView: IButtonComponent['view'] = props => {
  const { classNames, menu: Menu, children, content, icon, expanded, disabled, onMenuDismiss, menuTarget, ...rest } = props;

  // TODO: 'href' is anchor property... consider getNativeProps by root type
  const buttonProps = { ...getNativeProps(rest, buttonProperties), href: props.href };

  const Slots = getSlots<typeof props, IButtonSlots>(props, {
    root: _deriveRootType(props),
    stack: Stack,
    icon: Icon,
    content: Text,
    menu: ContextualMenu,
    menuIcon: Icon
  });

  return (
    <Slots.root
      type="button" // stack doesn't take in native button props
      role="button"
      {...buttonProps}
      aria-disabled={disabled}
    >
      <Slots.stack horizontal as="span" gap={8} verticalAlign="center" horizontalAlign="center">
        {icon && <Slots.icon />}
        {content && <Slots.content />}
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
// { split && (
// <Slot as='span' userProps={splitContainer}>
//   <Slot as={Divider} userProps={divider} />
//   <Slot as={Icon} userProps={menuChevron} />
// </Slot>
// )}

function _deriveRootType(props: IButtonViewProps): keyof JSX.IntrinsicElements {
  return !!props.href ? 'a' : 'button';
}
