import * as React from 'react';
import { SplitButton, SplitButtonProps } from '@fluentui/react-button';
import { Menu, MenuItem, MenuList, MenuTrigger } from '@fluentui/react-menu';
import { buttonBaseProps } from '../Button/Button.stories';
import { Playground } from '../Playground';
import { PlaygroundProps, PropDefinition } from '../Playground.types';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface ExampleProps {
  primaryActionDisabled?: boolean;
}

const ExampleSplitButton = (props: SplitButtonProps & ExampleProps): JSX.Element => {
  const { primaryActionDisabled, ...rest } = props;

  return (
    <Menu>
      <MenuTrigger>
        <SplitButton button={{ disabled: primaryActionDisabled || rest.disabled }} {...rest} />
      </MenuTrigger>

      <MenuList>
        <MenuItem>Item a</MenuItem>
        <MenuItem>Item b</MenuItem>
      </MenuList>
    </Menu>
  );
};

export const SplitButtonPlayground = () => {
  const exampleProps: PropDefinition<SplitButtonProps & ExampleProps>[] = React.useMemo(
    () => [{ propName: 'primaryActionDisabled', propType: 'boolean', dependsOnProps: ['~disabled'] }],
    [],
  );

  const splitButtonProps: PlaygroundProps<SplitButtonProps>['sections'] = [
    { sectionName: 'Button props', propList: buttonBaseProps },
    { sectionName: 'Example props', propList: exampleProps },
  ];

  return (
    <Playground sections={splitButtonProps}>
      <ExampleSplitButton />
    </Playground>
  );
};
