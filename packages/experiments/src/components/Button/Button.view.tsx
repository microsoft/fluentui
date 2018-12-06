/** @jsx SlotModule.createElementWrapper */
import { IButtonComponent, IButtonSlots, IButtonViewProps } from './Button.types';
import { HorizontalStack } from '../../Stack';
import { ContextualMenu } from 'office-ui-fabric-react';
import { getNativeProps, buttonProperties } from '../../Utilities';
import { Icon, Text } from '../../utilities/FactoryComponents';
import { getSlots } from '../../utilities/Slots';

// TODO: can this just be an import of createElementWrapper?
import * as SlotModule from '../../utilities/Slots';

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
  //        data-type and id should be overridden by user props
  // TODO: createComponent's types add 'classNames' to props type, which is not currently easily exposed.
  //        Eventually classNames will come out of createComponent entirely and this will change. Just use 'typeof props' for now.
  // TODO: make sure Button examples have not regressed against master
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

// TODO: test with split button approach

// { split && (
// <Slot as='span' userProps={splitContainer}>
//   <Slot as={Divider} userProps={divider} />
//   <Slot as={Icon} userProps={menuChevron} />
// </Slot>
// )}

// export class ButtonTest extends React.Component {
//   public render() {
//     const { root, icon, text, splitContainer, divider, menuChevron, split } = this.props;

//     // return (
//     //   createSlot('button', { 'data-type': 'button', id: 'asdf' }, root, [
//     //     createSlot(Icon, { size: 123, key: 0 }, icon),
//     //     createSlot('span', { key: 1 }, text)
//     //   ])
//     // );

//     // TODO: possible to do this without React hierarchy?
//     return (
//       <Slot as='button' userProps={root} data-type='button' id='asdf'>
//         <Slot as={Icon} iconName='upload' userProps={icon} data-type='icon' />
//         <Slot as='span' userProps={text} data-type='span' />
//       </Slot>
//     );
//   }
// }

function _deriveRootType(props: IButtonViewProps): keyof JSX.IntrinsicElements {
  return !!props.href ? 'a' : 'button';
}
