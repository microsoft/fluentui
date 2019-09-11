import * as React from 'react';
import { SplitButton, ISplitButtonProps } from '@uifabric/experiments';
import { Stack } from 'office-ui-fabric-react';

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
export class SplitButtonExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack tokens={tokens.sectionStack}>
        <Stack tokens={tokens.headingStack}>
          <div>
            <Stack tokens={tokens.buttonStack}>
              <ButtonStack>
                <SplitButton icon="Add" content="Default split button" menu={menuProps} onClick={alertClicked} />
                <SplitButton disabled icon="Add" content="Disabled split button" menu={menuProps} onClick={alertClicked} />
                <SplitButton primary icon="Add" content="Primary split button" menu={menuProps} onClick={alertClicked} />
                <SplitButton disabled primary icon="Add" content="Disabled primary split button" menu={menuProps} onClick={alertClicked} />
              </ButtonStack>
              <ButtonStack>
                <SplitButton
                  primaryActionDisabled
                  icon="Add"
                  content="First action disabled split button"
                  menu={menuProps}
                  onClick={alertClicked}
                />
                <SplitButton
                  primaryActionDisabled
                  primary
                  icon="Add"
                  content="First action disabled primary split button"
                  menu={menuProps}
                  onClick={alertClicked}
                />
              </ButtonStack>
            </Stack>
          </div>
        </Stack>
      </Stack>
    );
  }
}
