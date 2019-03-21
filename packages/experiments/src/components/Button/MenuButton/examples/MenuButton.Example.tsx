import * as React from 'react';
import { MenuButton, IMenuButtonProps } from '@uifabric/experiments';
import { Stack, Text } from 'office-ui-fabric-react';

const menuItems = [{ key: 'a', name: 'Item a' }, { key: 'b', name: 'Item b' }];
const buttonMenu: IMenuButtonProps['menu'] = render => render((MenuType, props) => <MenuType {...props} items={menuItems} />);

const sectionGap = 32;
const headingGap = 16;
const buttonGap = 12;

const ButtonStack = (props: { children: JSX.Element[] | JSX.Element }) => (
  <Stack horizontal disableShrink gap={buttonGap}>
    {props.children}
  </Stack>
);

// tslint:disable:jsx-no-lambda
export class MenuButtonExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack gap={sectionGap}>
        <Stack gap={headingGap} padding={8}>
          <div>
            <Stack gap={buttonGap}>
              <ButtonStack>
                <MenuButton content="Menu button" menu={buttonMenu} />
                <MenuButton primary content="Menu primary button" menu={buttonMenu} />
                <MenuButton disabled content="Menu disabled button" menu={buttonMenu} />
              </ButtonStack>
              <ButtonStack>
                <MenuButton icon="Share" menu={buttonMenu}>
                  <Stack padding="8px 0" as="span" horizontalAlign="start">
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
