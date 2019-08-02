import * as React from 'react';
import { Icon, Stack, Text } from 'office-ui-fabric-react';
import { Button } from 'office-ui-fabric-react/lib/components/Button/next/Button';

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

export class ButtonExample extends React.Component {
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
              <Button icon="PeopleAdd" circular ariaLabel="Default circular button" />
              <Button icon="Phone" circular disabled ariaLabel="Disabled default circular button" />
              <Button icon="FontSize" circular primary ariaLabel="Primary circular button" />
              <Button icon="Attach" circular primary disabled ariaLabel="Disabled primary circular button" />
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
          </Stack>
        </Stack>
      </Stack>
    );
  }
}
