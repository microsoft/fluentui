import * as React from 'react';
import { Button, IButtonProps } from '../index';
import { Stack, Text } from '@uifabric/experiments';
import { Icon, CommandBar } from 'office-ui-fabric-react';

const menuItems = [{ key: 'a', name: 'Item a' }, { key: 'b', name: 'Item b' }];
const buttonMenu: IButtonProps['menu'] = render => render((MenuType, props) => <MenuType {...props} items={menuItems} />);

const sectionGap = 32;
const headingGap = 16;
const buttonGap = 12;

const ButtonStack = (props: { children: JSX.Element[] | JSX.Element }) => (
  <Stack horizontal preventShrink gap={buttonGap}>
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
                <Button content="Default button" />
                <Button disabled content="Disabled default button" />
                <Button primary content="Primary button" />
                <Button disabled primary content="Primary disabled button" />
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
