import * as React from 'react';
import { Button } from '../index';
import { Icon, CommandBar, Stack, Text } from 'office-ui-fabric-react';

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
              <CommandBar items={[{ key: '0', text: 'Button 1', iconProps: { iconName: 'Upload' } }]} />
            </Stack>
          </div>
        </Stack>
      </Stack>
    );
  }
}
