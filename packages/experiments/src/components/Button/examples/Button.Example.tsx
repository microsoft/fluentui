import * as React from 'react';
import { Button, IButtonProps } from '../index';
import { Icon, CommandBar, Stack, Text } from 'office-ui-fabric-react';

const menuItems = [{ key: 'a', name: 'Item a' }, { key: 'b', name: 'Item b' }];
const buttonMenu: IButtonProps['menu'] = render => render((MenuType, props) => <MenuType {...props} items={menuItems} />);

const sectionGap = 32;
const headingGap = 16;
const buttonGap = 12;

const alertClicked = (): void => {
  alert('Clicked');
};

const ButtonStack = (props: { children: JSX.Element[] | JSX.Element }) => (
  <Stack horizontal disableShrink gap={buttonGap}>
    {props.children}
  </Stack>
);

// tslint:disable:jsx-no-lambda
export class ButtonExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack gap={sectionGap}>
        <Stack gap={headingGap} padding={8}>
          <div>
            <Stack gap={buttonGap}>
              <ButtonStack>
                <Button content="Default button" onClick={alertClicked} />
                <Button disabled content="Disabled default button" onClick={alertClicked} />
                <Button primary content="Primary button" onClick={alertClicked} />
                <Button primary disabled content="Disabled primary button" onClick={alertClicked} />
              </ButtonStack>
              <ButtonStack>
                <Button split icon="Add" content="Default split button" menu={buttonMenu} onClick={alertClicked} />
                <Button split disabled icon="Add" content="Disabled split button" menu={buttonMenu} onClick={alertClicked} />
                <Button split primary icon="Add" content="Primary split button" menu={buttonMenu} onClick={alertClicked} />
                <Button
                  split
                  disabled
                  primary
                  icon="Add"
                  content="Disabled primary split button"
                  menu={buttonMenu}
                  onClick={alertClicked}
                />
              </ButtonStack>
              <ButtonStack>
                <Button
                  split
                  primaryActionDisabled
                  icon="Add"
                  content="First action disabled split button"
                  menu={buttonMenu}
                  onClick={alertClicked}
                />
                <Button
                  split
                  primaryActionDisabled
                  primary
                  icon="Add"
                  content="First action disabled primary split button"
                  menu={buttonMenu}
                  onClick={alertClicked}
                />
              </ButtonStack>
              <ButtonStack>
                <Button icon="PeopleAdd" circular />
                <Button icon="Phone" circular disabled />
                <Button icon="FontSize" circular primary />
                <Button icon="Attach" circular primary disabled />
              </ButtonStack>
              <ButtonStack>
                <Button icon="Upload" content="Button with string icon" />
                <Button icon={{ iconName: 'Share' }} content="Button with iconProps" />
                <Button icon={() => <Icon iconName="Download" />} content="Button with icon render function" />
              </ButtonStack>
              <ButtonStack>
                <Button>
                  <Icon iconName="Upload" />
                  <Text>With custom text/icon</Text>
                </Button>
                <Button primary>
                  <Text>With custom text/icon right aligned</Text>
                  <Icon iconName="Upload" />
                </Button>
              </ButtonStack>
              <ButtonStack>
                <Button content="Menu button" menu={buttonMenu} />
                <Button primary content="Menu primary button" menu={buttonMenu} />
                <Button disabled content="Menu disabled button" menu={buttonMenu} />
                <Button expanded content="Menu expanded button" />
                <Button expanded primary content="Menu expanded primary button" />
              </ButtonStack>
              <ButtonStack>
                <Button icon="Share" menu={buttonMenu}>
                  <Stack padding="8px 0" as="span" horizontalAlign="start">
                    <Text>I am a compound multiline button.</Text>
                    <Text variant="small">I can have a caption.</Text>
                  </Stack>
                </Button>
                <Button disabled content="Menu disabled button" />
                <Button expanded content="Menu expanded button" />
              </ButtonStack>
              <CommandBar items={[{ key: '0', text: 'Button 1', iconProps: { iconName: 'Upload' } }]} />
            </Stack>
          </div>
        </Stack>
      </Stack>
    );
  }
}
