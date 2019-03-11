/** @jsx withSlots */
import { ContextualMenu, DirectionalHint, Stack, Text } from 'office-ui-fabric-react';
import { withSlots, getSlots, ISlots, IPropsWithChildren } from '../../../Foundation';
import { Icon } from '../../../utilities/factoryComponents';

import { Button } from '../Button';
import { MenuButton } from '../MenuButton/MenuButton';
import {
  ISplitMenuButtonComponent,
  ISplitMenuButtonProps,
  ISplitMenuButtonSlots,
  ISplitMenuButtonViewProps
} from './SplitMenuButton.types';

export const SplitMenuButtonView: ISplitMenuButtonComponent['view'] = props => {
  const { disabled, onClick, expanded, menu: Menu, split, onMenuDismiss, menuTarget, ...rest } = props;

  const Slots = getSlots<ISplitMenuButtonProps, ISplitMenuButtonSlots>(props, {
    root: 'div',
    button: Button,
    menuButton: MenuButton,
    stack: Stack,
    icon: Icon,
    content: Text,
    menu: ContextualMenu,
    menuIcon: Icon,
    primaryActionContainer: Stack,
    secondaryActionContainer: 'span',
    splitDivider: 'span'
  });

  return (
    <Slots.root
      type="button" // stack doesn't take in native button props
      role="button"
      aria-disabled={disabled}
    >
      <Slots.button onClick={split ? undefined : onClick} {...rest} aria-disabled={disabled}>
        {split ? renderSplitButton(props, Slots) : renderSplitMenuButton(props, Slots)}
      </Slots.button>
      {expanded && (
        <Slots.menu target={menuTarget} onDismiss={onMenuDismiss} items={[]} directionalHint={DirectionalHint.bottomRightEdge} />
      )}
    </Slots.root>
  );
};

function renderSplitMenuButton(
  props: IPropsWithChildren<ISplitMenuButtonViewProps>,
  Slots: ISlots<Required<ISplitMenuButtonSlots>>
): JSX.Element {
  const { children, menu: Menu } = props;

  return (
    <Slots.stack horizontal as="span" gap={8} verticalAlign="center" horizontalAlign="center" verticalFill>
      {children}
      {Menu && (
        <Stack.Item>
          <Slots.menuIcon iconName="ChevronDown" />
        </Stack.Item>
      )}
    </Slots.stack>
  );
}

function renderSplitButton(
  props: IPropsWithChildren<ISplitMenuButtonViewProps>,
  Slots: ISlots<Required<ISplitMenuButtonSlots>>
): JSX.Element {
  const { onSecondaryActionClick } = props;

  return (
    <Slots.stack horizontal as="span" gap={8} verticalAlign="stretch" horizontalAlign="center" verticalFill>
      <Slots.splitDivider />

      <Slots.secondaryActionContainer onClick={onSecondaryActionClick}>
        <Slots.menuIcon iconName="ChevronDown" />
      </Slots.secondaryActionContainer>
    </Slots.stack>
  );
}
