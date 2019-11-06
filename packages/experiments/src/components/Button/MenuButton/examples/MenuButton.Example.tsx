import * as React from 'react';
import { MenuButton, IMenuButtonProps } from '@uifabric/experiments';
import { Stack, Text } from 'office-ui-fabric-react';

const menuProps: IMenuButtonProps['menu'] = {
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

const tokens = {
  sectionStack: {
    childrenGap: 32
  },
  headingStack: {
    childrenGap: 16,
    padding: 8
  },
  buttonStack: {
    childrenGap: 12
  },
  multilineButtonStack: {
    padding: '8px 0px'
  }
};

const ButtonStack = (props: { children: JSX.Element[] | JSX.Element }) => (
  <Stack horizontal disableShrink tokens={tokens.buttonStack}>
    {props.children}
  </Stack>
);

// tslint:disable:jsx-no-lambda
export class MenuButtonExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack tokens={tokens.sectionStack}>
        <Stack tokens={tokens.headingStack}>
          <div>
            <Stack tokens={tokens.buttonStack}>
              <ButtonStack>
                <MenuButton content="Menu button" menu={menuProps} />
                <MenuButton primary content="Menu primary button" menu={menuProps} />
                <MenuButton disabled content="Menu disabled button" menu={menuProps} />
              </ButtonStack>
              <ButtonStack>
                <MenuButton icon="Share" menu={menuProps}>
                  <Stack as="span" horizontalAlign="start" tokens={tokens.multilineButtonStack}>
                    <Text>I am a compound multiline button.</Text>
                    <Text variant="small">I can have a caption.</Text>
                  </Stack>
                </MenuButton>
              </ButtonStack>
            </Stack>
          </div>
        </Stack>
      </Stack>
    );
  }
}
