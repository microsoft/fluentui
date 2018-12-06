/** @jsx createElementWrapper */
import { IButtonComponent, IButtonSlots, IButtonViewProps } from './Button.types';
import { HorizontalStack } from '../../Stack';
import { ContextualMenu } from 'office-ui-fabric-react';
import { getNativeProps, buttonProperties } from '../../Utilities';
import { Icon, Text } from '../../utilities/FactoryComponents';
import { createElementWrapper, getSlots } from '../../utilities/Slots';

export const ButtonView: IButtonComponent['view'] = props => {
  const {
    classNames,
    menu: Menu,
    children,
    content,
    icon,
    expanded,
    disabled,
    onMenuDismiss,
    menuTarget,
    enableTestChildren,
    ...rest
  } = props;

  // TODO: 'href' is anchor property... consider getNativeProps by root type
  const buttonProps = { ...getNativeProps(rest, buttonProperties), href: props.href };

  const Slots = getSlots<typeof props, IButtonSlots>(props, {
    root: _deriveRootType(props),
    stack: HorizontalStack,
    icon: Icon,
    content: Text,
    menu: ContextualMenu,
    menuIcon: Icon,
    test1: Text, // createFactory test
    test2: 'span' // non-createFactory test
  });

  return (
    <Slots.root
      type="button" // stack doesn't take in native button props
      role="button"
      {...buttonProps}
      aria-disabled={disabled}
    >
      <Slots.stack as="span" gap={8} verticalAlign="center" horizontalAlign="center">
        <Slots.icon />
        <Slots.content />

        <Slots.test1>
          {enableTestChildren && <p>Factory Slot Child 1</p>}
          {enableTestChildren && <p>Factory Slot Child 2</p>}
        </Slots.test1>
        <Slots.test2>
          {enableTestChildren && <p>React Element Slot Child 1</p>}
          {enableTestChildren && <p>React Element Slot Child 2</p>}
        </Slots.test2>

        {children}
        {Menu && (
          <HorizontalStack.Item>
            <Slots.menuIcon iconName="ChevronDown" />
          </HorizontalStack.Item>
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
