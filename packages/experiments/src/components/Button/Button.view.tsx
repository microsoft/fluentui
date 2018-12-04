/** @jsx SlotModule.createElementWrapper */
import { IButtonComponent, IButtonSlots, IButtonViewProps, IconDefaultProp } from './Button.types';
import { Text as FabricText, ITextProps } from '../../Text';
import { HorizontalStack } from '../../Stack';
import { ContextualMenu, Icon as FabricIcon, IIconProps } from 'office-ui-fabric-react';
import { getNativeProps, buttonProperties } from '../../Utilities';

import { createFactory, IFactoryComponent, getSlots } from '../../utilities/createSlot';

import * as SlotModule from '../../utilities/createSlot';

//////////////////////////////////////////////////////////////////////////////////////////////////////
// TODO: we will have to make create functions for any component we want to use in shorthand slots
const Icon: IFactoryComponent<IIconProps> = props => <FabricIcon {...props} />;
Icon.create = createFactory(Icon, { defaultProp: IconDefaultProp });

const Text: IFactoryComponent<ITextProps> = props => <FabricText {...props} />;
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

  // TODO: data-type and id are for testing, remove. (add to tests, though!)
  //    * data-type and id should be overridden by user props, right? add tests
  //    * in what cases do we ever NOT want user props to override? (see why stardust has overrideProps)
  // TODO: deal with classNames vs. slot styles props
  // TODO: do menu element as slot too. also menuIcon?

  // TODO: way to do keyof / valueof / typeof React.ReactType on IButtonSlotsTypes?
  // TODO: this should be tied with IButtonSlotsTypes somehow
  // TODO: need to add menu as slot which will expose typing issue with getSlots.
  //        getSlots needs to return factory created components, not just the type passed in
  //        For menu, { menu } => { menu: React.ComponentType }
  // TODO: if prop is used in slots definition, what happens when prop is undefined? should there be
  //        undefined / optional slots? should undefined / optional be allowed as an input in?
  //        this seems bad if Slots[slot] can be undefined and could cause render fail
  // TODO: make sure prop type safety still works!
  // TODO: createComponent's types add 'classNames' to props type, which is not currently easily exposed.
  //        Eventually classNames will come out of createComponent entirely and this will change. Just use 'typeof props' for now.
  // TODO: remove explicit type declaration if possible.
  const Slots = getSlots<typeof props, IButtonSlots>(props, {
    root: _deriveRootType(props),
    stack: HorizontalStack,
    icon: Icon,
    content: Text,
    menu: ContextualMenu, // TODO: should map to 'menu' prop?
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
        <Slots.icon iconName="share" data-type="icon" id="icon-id" />
        <Slots.content data-content="text" data-id="content-id" />

        <Slots.test1 data-type="testSlot" data-id="testSlot-id">
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
      </Slots.stack>
      {expanded && Menu && <Slots.menu target={menuTarget} onDismiss={onMenuDismiss} items={[]} />}
    </Slots.root>
  );
};

function _deriveRootType(props: IButtonViewProps): keyof JSX.IntrinsicElements {
  return !!props.href ? 'a' : 'button';
}
