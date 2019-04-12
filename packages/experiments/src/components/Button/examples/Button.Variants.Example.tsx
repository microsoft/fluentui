import * as React from 'react';
import { ActionButton, BaseButton, CompoundButton, DefaultButton, PrimaryButton } from '../index';
import { Stack } from 'office-ui-fabric-react';

const tokens = {
  sectionStack: {
    childrenGap: 32
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
export class ButtonVariantsExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack tokens={tokens.sectionStack}>
        <Stack tokens={tokens.buttonStack}>
          <ButtonStack>
            <DefaultButton text="Default button" onClick={alertClicked} />
            <DefaultButton disabled text="Disabled default button" onClick={alertClicked} />
            <PrimaryButton text="Primary button" onClick={alertClicked} />
            <PrimaryButton disabled text="Disabled primary button" onClick={alertClicked} />
          </ButtonStack>
          <ButtonStack>
            <BaseButton text="Base Button" onClick={alertClicked} />
            <BaseButton disabled text="Disabled Base Button" onClick={alertClicked} />
          </ButtonStack>
          <ButtonStack>
            <ActionButton text="Action button" onClick={alertClicked} />
            <ActionButton disabled text="Disabled action button" onClick={alertClicked} />
          </ButtonStack>
          <ButtonStack>
            <CompoundButton text="Compound button" secondaryText="Enabled" onClick={alertClicked} />
            <CompoundButton primary text="Compound button" secondaryText="Primary Enabled" onClick={alertClicked} />
            <CompoundButton disabled text="Compound button" secondaryText="Disabled" onClick={alertClicked} />
            <CompoundButton primary disabled text="Compound button" secondaryText="Primary Disabled" onClick={alertClicked} />
          </ButtonStack>
        </Stack>
      </Stack>
    );
  }
}
