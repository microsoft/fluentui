import * as React from 'react';
import { ToggleButton, ToggleButtonProps } from '@fluentui/react-button';
import { useBoolean } from '@fluentui/react-utilities';
import { buttonBaseProps } from '../Button/Button.stories';
import { Playground } from '../Playground';
import { PlaygroundProps, PropDefinition } from '../Playground.types';

export const ToggleButtonPlayground = () => {
  const [checked, { setTrue: setTrueChecked, setFalse: setFalseChecked, toggle: toggleChecked }] = useBoolean(false);

  const setChecked = React.useCallback(
    (checkedValue: boolean) => {
      checkedValue ? setTrueChecked() : setFalseChecked();
    },
    [setTrueChecked, setFalseChecked],
  );

  const toggleButtonBaseProps: PropDefinition<ToggleButtonProps>[] = React.useMemo(
    () => [
      {
        propName: 'checked',
        propType: 'boolean',
        defaultValue: checked,
        setDefaultValue: setChecked,
        dependsOnProps: ['~disabled'],
      },
    ],
    [checked, setChecked],
  );

  const toggleButtonProps: PlaygroundProps<ToggleButtonProps>['sections'] = [
    { sectionName: 'Button props', propList: buttonBaseProps },
    { sectionName: 'ToggleButton props', propList: toggleButtonBaseProps },
  ];

  const onClick = React.useCallback(() => {
    toggleChecked();
  }, [toggleChecked]);

  return (
    <Playground sections={toggleButtonProps}>
      <ToggleButton onClick={onClick} />
    </Playground>
  );
};
