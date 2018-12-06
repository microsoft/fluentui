import * as React from 'react';
import { Button, IButtonComponent, Text, VerticalStack } from '@uifabric/experiments';
import { Customizer } from 'office-ui-fabric-react';
import { stackProps } from './SlotExampleUtils';

const ButtonTheme = {
  scopedSettings: {
    Icon: {
      styles: {
        root: {
          fontSize: 24,
          color: 'purple'
        }
      }
    },
    HorizontalStack: {
      styles: {
        root: {
          background: 'lightblue'
        }
      }
    },
    Text: {
      styles: {
        root: {
          color: 'purple'
        }
      }
    }
  }
};

const getButtonStyles: IButtonComponent['styles'] = {
  icon: ButtonTheme.scopedSettings.Icon.styles.root,
  stack: ButtonTheme.scopedSettings.HorizontalStack.styles.root,
  content: ButtonTheme.scopedSettings.Text.styles.root
};

// tslint:disable:jsx-no-lambda
// tslint:disable:jsx-key
export class SlotsStyledExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <VerticalStack>
        <VerticalStack {...stackProps}>
          <Button icon={{ iconName: 'share', styles: ButtonTheme.scopedSettings.Icon.styles }} content="Icon as IIconProps with styles" />
          <Button icon="share" content={{ children: 'Text as ITextProps with styles', styles: ButtonTheme.scopedSettings.Text.styles }} />
          <Button icon={{ iconName: 'share', styles: { root: { color: 'red' } } }} styles={getButtonStyles} content="Button styles prop" />
          <Customizer {...ButtonTheme}>
            <Button icon={{ iconName: 'share' }} content="Button scopedSettings" />
          </Customizer>
        </VerticalStack>

        <VerticalStack {...stackProps}>
          <Button content="Component Slot children: " enableTestChildren={true} />
          <Button
            content="User Slot children:"
            test1={{ children: ['User Child 1,', ' Child 2'] }}
            test2={{ children: ['User Child 1,', ' Child 2'] }}
          />
          <Button
            content={{
              children: ['User and Component Slot children:', <br />, "User's Children should ", <br />, "replace Component's Children"]
            }}
            test1={{ children: ['User Child 1,', ' Child 2'] }}
            test2={{ children: ['User Child 1,', ' Child 2'] }}
            enableTestChildren={true}
          />
          <Button
            content="User Slot function with children:"
            test1={() => <Text>Function Child</Text>}
            test2={() => <Text>Function Child</Text>}
            enableTestChildren={true}
          />
          <Button
            content="User Slot JSX Element with children:"
            test1={<Text>JSX Child</Text>}
            test2={<Text>JSX Child</Text>}
            enableTestChildren={true}
          />
        </VerticalStack>
      </VerticalStack>
    );
  }
}
