import * as React from 'react';
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';
// @ts-ignore
import { SplitButton, SplitButtonProps } from './SplitButton';
import { buttonBaseProps } from './buttonBaseProps.stories';
import { Playground as PlaygroundWrapper } from './Playground.stories';
import { PlaygroundProps, PropDefinition } from './Playground.types.stories';

type ExampleProps = {
  primaryActionDisabled?: boolean;
};

const exampleProps: PropDefinition<SplitButtonProps & ExampleProps>[] = [
  { propName: 'primaryActionDisabled', propType: 'boolean', dependsOnProps: ['~disabled', '~disabledFocusable'] },
];

const ExampleSplitButton = (props: SplitButtonProps & ExampleProps): JSX.Element => {
  const { primaryActionDisabled, ...rest } = props;

  return (
    <Menu positioning="below-end">
      <MenuTrigger>
        {triggerProps => (
          <SplitButton
            menuButton={triggerProps}
            primaryActionButton={{ disabled: primaryActionDisabled || rest.disabled }}
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

export const Playground = () => {
  const splitButtonProps: PlaygroundProps<SplitButtonProps & ExampleProps>['sections'] = [
    { sectionName: 'Button props', propList: buttonBaseProps },
    { sectionName: 'Example props', propList: exampleProps },
  ];

  return (
    <PlaygroundWrapper sections={splitButtonProps}>
      <ExampleSplitButton />
    </PlaygroundWrapper>
  );
};

export default {
  title: 'Components/SplitButton',
  component: SplitButton,
};
