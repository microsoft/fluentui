import * as React from 'react';
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';
// @ts-ignore
import { SplitButton, SplitButtonProps } from './SplitButton';
import { buttonBaseProps } from './buttonBaseProps.stories';
import { Playground } from './Playground.stories';
import { PlaygroundProps, PropDefinition } from './Playground.types.stories';

interface ExampleProps {
  primaryActionDisabled?: boolean;
}

const ExampleSplitButton = (props: SplitButtonProps & ExampleProps): JSX.Element => {
  const { primaryActionDisabled, ...rest } = props;

  return (
    <Menu positioning="below-end">
      <MenuTrigger>
        {triggerProps => (
          <SplitButton
            button={{ disabled: primaryActionDisabled || rest.disabled }}
            menuButton={triggerProps}
            {...rest}
          />
        )}
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>Item a</MenuItem>
          <MenuItem>Item b</MenuItem>
        </MenuList>
      </MenuPopover>
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

export default {
  title: 'Components/SplitButton',
  component: SplitButton,
};
