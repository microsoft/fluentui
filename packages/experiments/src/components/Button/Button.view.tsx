/** @jsx SlotModule.CreateElementWrapper */
import * as React from 'react';
import { IButtonComponent, IButtonViewProps } from './Button.types';
import { Text as FabricText } from '../../Text';
import { HorizontalStack } from '../../Stack';
import { Icon as FabricIcon } from 'office-ui-fabric-react';
import { getNativeProps, buttonProperties } from '../../Utilities';

import { createFactory, getSlots } from '../../utilities/createSlot';

import * as SlotModule from '../../utilities/createSlot';

//////////////////////////////////////////////////////////////////////////////////////////////////////
// TODO: we will have to make create functions for any component we want to use in shorthand slots
const Icon = props => <FabricIcon {...props} />;

// Icon.logMessages = true;
Icon.create = createFactory(Icon, { defaultProp: 'iconName' });

const Text = props => <FabricText {...props} />;

// Text.logMessages = true;
Text.create = createFactory(Text);
//////////////////////////////////////////////////////////////////////////////////////////////////////

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

  // return (
  //   <div>
  //     <ButtonTest
  //       text={{ 'data-foo': 'bar', children: 'hi' }}
  //     />
  //     <ButtonTest
  //       icon='share'
  //       text={{ 'data-foo': 'bar', children: 'hi' }}
  //     />
  //     <ButtonTest
  //       icon={{ iconName: 'share' }}
  //       text={{ 'data-foo': 'bar', children: 'hi' }}
  //     />
  //   </div>
  // );

  // TODO: data-type and id are for testing, remove. (add to tests, though!)
  //    * data-type and id should be overridden by user props, right?
  //    * in what cases do we ever NOT want user props to override? (see why stardust has overrideProps)
  // TODO: deal with classNames vs. slot styles props
  // TODO: do menu element as slot too. also menuIcon?

  const Slots = getSlots(props, {
    root: _deriveRootType(props),
    icon: Icon,
    content: Text,
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
      <HorizontalStack className={classNames.stack} as="span" gap={8} verticalAlign="center" horizontalAlign="center">
        <Slots.icon data-type="button" id="asdf" />
        <Slots.content data-type="text" id="text-id" />

        <Slots.test1 data-type="testSlot" id="testSlot-id">
          {enableTestChildren && <p>Factory Slot Child 1</p>}
          {enableTestChildren && <p>Factory Slot Child 2</p>}
        </Slots.test1>
        <Slots.test2 data-type="testSlot" id="testSlot-id">
          {enableTestChildren && <p>React Element Slot Child 1</p>}
          {enableTestChildren && <p>React Element Slot Child 2</p>}
        </Slots.test2>

        {children}
        {Menu && (
          <HorizontalStack.Item>
            <Icon className={classNames.menuIcon} iconName="ChevronDown" />
          </HorizontalStack.Item>
        )}
      </HorizontalStack>
      {expanded && Menu && <Menu target={menuTarget} onDismiss={onMenuDismiss} />}
    </Slots.root>
  );
};

function _deriveRootType(props: IButtonViewProps): React.ReactType {
  return !!props.href ? 'a' : 'button';
}
