import * as React from 'react';
import { Button, MenuButton, IMenuButtonProps, SplitButton } from '@uifabric/experiments';
import { Stack, IStackTokens } from 'office-ui-fabric-react';
import { buildKeytipConfigMap, IKeytipConfig, IKeytipConfigMap } from 'office-ui-fabric-react/lib/utilities/keytips/index';

const btnExecute = (el: HTMLElement) => {
  el.click();
};

// Setup keytips
const keytipConfig: IKeytipConfig = {
  keytips: [
    {
      id: 'Button',
      content: '1A',
      optionalProps: {
        onExecute: btnExecute
      }
    },
    {
      id: 'MenuButton',
      content: '1B',
      optionalProps: {
        onExecute: btnExecute
      },
      children: [
        {
          id: 'MenuItem1',
          content: 'E'
        },
        {
          id: 'MenuItem2',
          content: '8'
        }
      ]
    },
    {
      id: 'MenuButton2',
      content: '1C',
      optionalProps: {
        onExecute: btnExecute
      },
      children: [
        {
          id: 'MenuItem1',
          content: 'E'
        },
        {
          id: 'MenuItem2',
          content: '8'
        }
      ]
    },
    {
      id: 'SplitButton',
      content: '2',
      optionalProps: {
        onExecute: btnExecute
      }
    }
  ]
};
const keytipMap: IKeytipConfigMap = buildKeytipConfigMap(keytipConfig);

const alertClicked = (): void => {
  alert('Clicked');
};

const menuProps: IMenuButtonProps['menu'] = {
  items: [
    {
      key: 'a',
      text: 'Item a',
      keytipProps: keytipMap.MenuItem1
    },
    {
      key: 'b',
      text: 'Item b',
      keytipProps: keytipMap.MenuItem2
    }
  ],
  shouldFocusOnContainer: true,
  shouldFocusOnMount: true
};

// tslint:disable:jsx-no-lambda
export class ButtonKeytipsExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const stackTokens: IStackTokens = { childrenGap: 12 };

    return (
      <Stack horizontal disableShrink tokens={stackTokens}>
        <Button content="Button with keytip" onClick={alertClicked} keytipProps={keytipMap.Button} />
        <Button content="Button without keytip" onClick={alertClicked} />
        <MenuButton content="Menu Button with keytip" keytipProps={keytipMap.MenuButton} menu={menuProps} />
        <SplitButton content="Split Button with keytip" keytipProps={keytipMap.SplitButton} menu={menuProps} />
      </Stack>
    );
  }
}
