import * as React from 'react';
import { ContextualMenu, IContextualMenuProps } from '@fluentui/react';
import { MenuButton, MenuButtonProps } from '@fluentui/react-button';
import { Menu, MenuItem, MenuList, MenuProps, MenuTrigger } from '@fluentui/react-menu';
import { useBoolean } from '@fluentui/react-utilities';
import { buttonBaseProps } from '../Button/Button.stories';
import { Playground, PlaygroundProps, PropDefinition } from '../Playground';

const contextualMenuProps: IContextualMenuProps = {
  items: [
    {
      key: 'a',
      name: 'Item a',
    },
    {
      key: 'b',
      name: 'Item b',
    },
  ],
};

const MenuButtonWithConvergedMenu = (props: MenuButtonProps): JSX.Element => {
  const { expanded, onMenuDismiss } = props;

  const onOpenChange: MenuProps['onOpenChange'] = (ev, data) => {
    if (!data.open) {
      onMenuDismiss?.();
    }
  };

  return (
    <Menu open={expanded} onOpenChange={onOpenChange}>
      <MenuTrigger>
        <MenuButton {...props} />
      </MenuTrigger>

      <MenuList>
        <MenuItem>Item a</MenuItem>
        <MenuItem>Item b</MenuItem>
      </MenuList>
    </Menu>
  );
};

const ExampleMenu = (props: MenuButtonProps & { menuType?: string }): JSX.Element => {
  const { menuType, ...rest } = props;
  return menuType === 'ContextualMenu' ? (
    <MenuButton menu={<ContextualMenu {...contextualMenuProps} />} {...rest} />
  ) : (
    <MenuButtonWithConvergedMenu {...rest} />
  );
};

export const MenuButtonPlayground = () => {
  const [expanded, { setTrue: setTrueExpanded, setFalse: setFalseExpanded, toggle: toggleExpanded }] = useBoolean(
    false,
  );

  const setExpanded = React.useCallback(
    (expandedValue: boolean) => {
      expandedValue ? setTrueExpanded() : setFalseExpanded();
    },
    [setTrueExpanded, setFalseExpanded],
  );

  const menuButtonBaseProps: PropDefinition[] = React.useMemo(
    () => [
      {
        propName: 'expanded',
        propType: 'boolean',
        defaultValue: expanded,
        setDefaultValue: setExpanded,
        dependsOnProps: ['~disabled'],
      },
    ],
    [expanded, setExpanded],
  );

  const exampleProps: PropDefinition[] = React.useMemo(
    () => [{ propName: 'menuType', propType: ['ContextualMenu', 'Converged Menu'] }],
    [],
  );

  const menuButtonProps: PlaygroundProps['sections'] = [
    { sectionName: 'Button props', propList: buttonBaseProps.filter(value => value.propName !== 'iconPosition') },
    { sectionName: 'MenuButton props', propList: menuButtonBaseProps },
    { sectionName: 'Example props', propList: exampleProps },
  ];

  const onClick = React.useCallback(() => {
    toggleExpanded();
  }, [toggleExpanded]);

  const onMenuDismiss = React.useCallback(() => {
    setTimeout(setFalseExpanded, 100);
  }, [setFalseExpanded]);

  return (
    <Playground sections={menuButtonProps}>
      <ExampleMenu onClick={onClick} onMenuDismiss={onMenuDismiss} />
    </Playground>
  );
};
