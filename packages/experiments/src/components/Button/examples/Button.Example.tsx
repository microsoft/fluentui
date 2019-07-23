import * as React from 'react';
import { Button } from '@uifabric/experiments';
import { Icon, CommandBar, Stack, Text } from 'office-ui-fabric-react';

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
  }
};

const alertClicked = (): void => {
  alert('Clicked');
};

const ButtonStack = (props: { children: JSX.Element[] | JSX.Element }) => (
  <Stack horizontal disableShrink tokens={tokens.buttonStack}>
    {props.children}
  </Stack>
);

// tslint:disable:jsx-no-lambda
export class ButtonExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack tokens={tokens.sectionStack}>
        <Stack tokens={tokens.headingStack}>
          <Stack tokens={tokens.buttonStack}>
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
              <Button content="Button as an anchor: Go to Bing" href="http://bing.com" target="_blank" title="Let us bing!" />
              <Button primary content="Button as an anchor: Go to Bing" href="http://bing.com" target="_blank" title="Let us bing!" />
            </ButtonStack>
            <ButtonStack>
              <Button icon="Upload" content="Button with string icon" />
              <Button icon={{ iconName: 'Share' }} content="Button with iconProps" />
              <Button content="Button with icon render function" slots={{ icon: { render: () => <Icon iconName="Download" /> } }} />
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
        </Stack>
      </Stack>
    );
  }
}
