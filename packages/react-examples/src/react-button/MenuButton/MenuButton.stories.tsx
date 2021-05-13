import * as React from 'react';
import { ContextualMenu } from '@fluentui/react';
import { MenuButton } from '@fluentui/react-button';
import { useBoolean } from '@fluentui/react-utilities';
import { buttonBaseProps } from '../Button/Button.stories';
import { Playground, PlaygroundProps, PropDefinition } from '../Playground';

const menuProps = {
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

export const MenuButtonPlayground = () => {
  const [expanded, { setTrue: setTrueExpanded, setFalse: setFalseExpanded, toggle: toggleExpanded }] = useBoolean(
    false,
  );

  const setExpanded = React.useCallback(
    (expandedValue: boolean) => {
      console.log(expandedValue);
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

  const menuButtonProps: PlaygroundProps['sections'] = [
    { sectionName: 'Button props', propList: buttonBaseProps.filter(value => value.propName !== 'iconPosition') },
    { sectionName: 'MenuButton props', propList: menuButtonBaseProps },
  ];

  const onClick = React.useCallback(() => {
    toggleExpanded();
  }, [toggleExpanded]);

  const onMenuDismiss = React.useCallback(() => {
    setTimeout(setFalseExpanded, 100);
  }, [setFalseExpanded]);

  return (
    <Playground sections={menuButtonProps}>
      <MenuButton menu={<ContextualMenu {...menuProps} />} onClick={onClick} onMenuDismiss={onMenuDismiss} />
    </Playground>
  );
};
