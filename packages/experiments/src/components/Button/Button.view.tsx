/** @jsx SlotModule.CreateElementWrapper */
import * as React from 'react';
import { IButtonComponent, IButtonViewProps } from './Button.types';
import { Text as FabricText } from '../../Text';
import { HorizontalStack } from '../../Stack';
import { Icon as FabricIcon } from 'office-ui-fabric-react';
import { getNativeProps, buttonProperties } from '../../Utilities';

import { createFactory, Slot } from '../../utilities/createSlot';

import * as SlotModule from '../../utilities/createSlot';
// const SlotModule = require('../../utilities/createSlot');

//////////////////////////////////////////////////////////////////////////////////////////////////////
// TODO: we will have to make create functions for any component we want to use in shorthand slots
const Icon = props => <FabricIcon {...props} />;

Icon.create = createFactory(Icon, { defaultProp: 'iconName' });

const Text = props => <FabricText {...props} />;

Text.create = createFactory(Text);
//////////////////////////////////////////////////////////////////////////////////////////////////////

export const ButtonView: IButtonComponent['view'] = props => {
  const {
    classNames,
    as: RootType = _deriveRootType(props),
    menu: Menu,
    children,
    text: TextSlot,
    icon: IconSlot,
    expanded,
    disabled,
    onMenuDismiss,
    menuTarget,
    stack,
    ...rest
  } = props;

  const buttonProps = getNativeProps(rest, buttonProperties);

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
  // TODO: do root element as slot too

  // TODO: do this!
  // TODO: consider how user props and component props (particularly styles and style variables) will be mixed before..
  //          can it be abstracted away by createComponent? something else?
  // return (
  //   <SlotTemplate props={props}>
  //     <Slot name='root' as='button' data-foo='asdf' onClick={...}>
  //       <div>
  //         <Slot name='icon' as={Icon} />
  //         <Slot name='content' as={span} />
  //         <Slot name='menuIcon' as={Icon} />
  //       </div>
  //     </Slot>
  //   </SlotTemplate>
  // );

  return (
    <RootType
      type="button" // stack doesn't take in native button props
      role="button"
      {...buttonProps}
      aria-disabled={disabled}
      className={classNames.root}
    >
      <HorizontalStack className={classNames.stack} as="span" gap={8} verticalAlign="center" horizontalAlign="center" {...stack}>
        <Slot as={Icon} className={classNames.icon} userProps={IconSlot} data-type="button" id="asdf" />
        {/* <Slot as={Text} className={classNames.text} userProps={TextSlot} data-type="text" id='text-id' /> */}
        {TextSlot && typeof TextSlot === 'string' && <Text className={classNames.text}>{TextSlot}</Text>}
        {TextSlot && typeof TextSlot === 'object' && <Text className={classNames.text} {...TextSlot} />}
        {children}
        {Menu && (
          <HorizontalStack.Item>
            <Icon className={classNames.menuIcon} iconName="ChevronDown" />
          </HorizontalStack.Item>
        )}
      </HorizontalStack>
      {expanded && Menu && <Menu target={menuTarget} onDismiss={onMenuDismiss} />}
    </RootType>
  );

  // return (
  //   <RootType
  //     type="button" // stack doesn't take in native button props
  //     role="button"
  //     {...buttonProps}
  //     aria-disabled={disabled}
  //     className={classNames.root}
  //   >
  //     <HorizontalStack className={classNames.stack} as="span" gap={8} verticalAlign="center" horizontalAlign="center" {...stack}>
  //       {IconSlot && typeof IconSlot === 'string' && <Icon className={classNames.icon} iconName={IconSlot} />}
  //       {IconSlot &&
  //         typeof IconSlot === 'object' &&
  //         (React.isValidElement(IconSlot) ? (
  //           IconSlot
  //         ) : (
  //             <Icon
  //               className={classNames.icon}
  //               {
  //               ...IconSlot as IIconProps
  //               }
  //             />
  //           ))}
  //       {TextSlot && typeof TextSlot === 'string' && <Text className={classNames.text}>{TextSlot}</Text>}
  //       {TextSlot && typeof TextSlot === 'object' && <Text className={classNames.text} {...TextSlot} />}
  //       {children}
  //       {Menu && (
  //         <HorizontalStack.Item>
  //           <Icon className={classNames.menuIcon} iconName="ChevronDown" />
  //         </HorizontalStack.Item>
  //       )}
  //     </HorizontalStack>
  //     {expanded && Menu && <Menu target={menuTarget} onDismiss={onMenuDismiss} />}
  //   </RootType>
  // );
};

function _deriveRootType(props: IButtonViewProps): React.ReactType {
  return !!props.href ? 'a' : 'button';
}
