import * as React from 'react';
import { ContextualMenu, IContextualMenuProps } from '@fluentui/react';
import { MenuButtonProps, SplitButton, SplitButtonProps } from '@fluentui/react-button';
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

const SplitButtonWithConvergedMenu = (props: SplitButtonProps): JSX.Element => {
  const { expanded, onMenuDismiss } = props;

  const onOpenChange: MenuProps['onOpenChange'] = (ev, data) => {
    if (!data.open) {
      onMenuDismiss?.();
    }
  };

  return (
    <Menu open={expanded} onOpenChange={onOpenChange}>
      <MenuTrigger>
        <SplitButton {...props} />
      </MenuTrigger>

      <MenuList>
        <MenuItem>Item a</MenuItem>
        <MenuItem>Item b</MenuItem>
      </MenuList>
    </Menu>
  );
};

const ExampleSplitButton = (
  props: MenuButtonProps & { menuType?: string; primaryActionDisabled?: boolean },
): JSX.Element => {
  const { menuType, primaryActionDisabled, ...rest } = props;
  return menuType === 'ContextualMenu' ? (
    <SplitButton
      button={{ disabled: primaryActionDisabled }}
      menu={<ContextualMenu {...contextualMenuProps} />}
      {...rest}
    />
  ) : (
    <SplitButtonWithConvergedMenu button={{ disabled: primaryActionDisabled }} {...rest} />
  );
};

export const SplitButtonPlayground = () => {
  const [expanded, { setTrue: setTrueExpanded, setFalse: setFalseExpanded, toggle: toggleExpanded }] = useBoolean(
    false,
  );

  const setExpanded = React.useCallback(
    (expandedValue: boolean) => {
      expandedValue ? setTrueExpanded() : setFalseExpanded();
    },
    [setTrueExpanded, setFalseExpanded],
  );

  const menuButtonProps: PropDefinition[] = React.useMemo(
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
    () => [
      { propName: 'menuType', propType: ['ContextualMenu', 'Converged Menu'] },
      { propName: 'primaryActionDisabled', propType: 'boolean', dependsOnProps: ['~disabled'] },
    ],
    [],
  );

  const splitButtonProps: PlaygroundProps['sections'] = [
    { sectionName: 'Button props', propList: buttonBaseProps },
    { sectionName: 'MenuButton props', propList: menuButtonProps },
    { sectionName: 'Example props', propList: exampleProps },
  ];

  const onClick = React.useCallback(() => {
    toggleExpanded();
  }, [toggleExpanded]);

  const onMenuDismiss = React.useCallback(() => {
    setTimeout(setFalseExpanded, 100);
  }, [setFalseExpanded]);

  return (
    <Playground sections={splitButtonProps}>
      <ExampleSplitButton onClick={onClick} onMenuDismiss={onMenuDismiss} />
    </Playground>
  );
};
