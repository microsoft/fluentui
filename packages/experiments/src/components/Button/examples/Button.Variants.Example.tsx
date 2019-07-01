import * as React from 'react';
import { ActionButton, CommandBarButton, CompoundButton, DefaultButton, IconButton, MessageBarButton, PrimaryButton } from '../index';
import { Actionable } from '../Actionable/Actionable';
import { MenuButton } from '../MenuButton/MenuButton';
import { SplitButton } from '../SplitButton/SplitButton';
import { ISplitButtonProps } from '../SplitButton/SplitButton.types';
import { Stack, Text } from 'office-ui-fabric-react';

const tokens = {
  sectionStack: {
    childrenGap: 32
  },
  buttonStack: {
    childrenGap: 12
  }
};

const ButtonStack = (props: { children: JSX.Element[] | JSX.Element }) => (
  <Stack horizontal disableShrink tokens={tokens.buttonStack}>
    {props.children}
  </Stack>
);

// tslint:disable:jsx-no-lambda
export class ButtonVariantsExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const menuProps: ISplitButtonProps['menu'] = {
      items: [
        {
          key: 'a',
          name: 'Item a'
        },
        {
          key: 'b',
          name: 'Item b'
        }
      ]
    };

    return (
      <Stack tokens={tokens.sectionStack}>
        <Stack tokens={tokens.buttonStack}>
          <ButtonStack>
            <Actionable content="Actionable" />
            <Actionable disabled content="Disabled Actionable" />
          </ButtonStack>
          <ButtonStack>
            <DefaultButton text="Default button" />
            <DefaultButton text="Default button" icon="Upload" />
            <DefaultButton disabled text="Disabled default button" />
            <PrimaryButton text="Primary button" />
            <PrimaryButton disabled text="Disabled primary button" />
          </ButtonStack>
          <ButtonStack>
            <ActionButton text="Action button" />
            <ActionButton disabled text="Disabled action button" />
          </ButtonStack>
          <ButtonStack>
            <CommandBarButton text="Command bar button" />
            <CommandBarButton disabled text="Disabled command bar button" />
          </ButtonStack>
          <ButtonStack>
            <CompoundButton text="Compound button" secondaryText="Enabled" />
            <CompoundButton primary text="Compound button" secondaryText="Primary Enabled" />
            <CompoundButton disabled text="Compound button" secondaryText="Disabled" />
            <CompoundButton primary disabled text="Compound button" secondaryText="Primary Disabled" />
          </ButtonStack>
          <ButtonStack>
            <Stack horizontal verticalAlign="center">
              <Text>Icon Button:</Text>
              <IconButton iconProps={{ iconName: 'Emoji2' }} />
              <IconButton disabled iconProps={{ iconName: 'Emoji2' }} />
            </Stack>
          </ButtonStack>
          <ButtonStack>
            <MessageBarButton primary text="Primary" />
            <MessageBarButton text="Default" />
            <MessageBarButton primary disabled text="P Disabled" />
            <MessageBarButton disabled text="Disabled" />
          </ButtonStack>
          <ButtonStack>
            <MenuButton content="Button" menu={menuProps} />
            <MenuButton primary content="Button" menu={menuProps} />
            <MenuButton disabled content="Button" menu={menuProps} />
          </ButtonStack>
          <ButtonStack>
            <SplitButton content="Button" menu={menuProps} />
            <SplitButton disabled content="Button" menu={menuProps} />
            <SplitButton primary content="Button" menu={menuProps} />
            <SplitButton disabled primary icon="Add" content="Button" menu={menuProps} />
            <SplitButton primaryActionDisabled content="Button" menu={menuProps} />
            <SplitButton primaryActionDisabled primary content="Button" menu={menuProps} />
          </ButtonStack>
        </Stack>
      </Stack>
    );
  }
}
