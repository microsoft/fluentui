import * as React from 'react';
import { useBoolean } from '@fluentui/react-utilities';
import { ToggleButton } from './ToggleButton';
import { Playground as PlaygroundWrapper } from './Playground.stories';
import { buttonBaseProps } from './buttonBaseProps.stories';
import type { ToggleButtonProps } from './ToggleButton';
import type { PlaygroundProps, PropDefinition } from './Playground.types.stories';

export const Playground = () => {
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
    <PlaygroundWrapper sections={toggleButtonProps}>
      <ToggleButton onClick={onClick} />
    </PlaygroundWrapper>
  );
};

export default {
  title: 'Components/ToggleButton',
  component: ToggleButton,
};
