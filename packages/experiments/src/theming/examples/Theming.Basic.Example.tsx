import * as React from 'react';

import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { ITheme } from 'office-ui-fabric-react/lib/Styling';
import { Customizer } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { farItems, items, overflowItems } from 'office-ui-fabric-react/lib/components/CommandBar/examples/data';

import { HorizontalStack, VerticalStack, IStackProps, IStackStyles } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
import { CollapsibleSectionRecursiveExample } from
  '@uifabric/experiments/lib/components/CollapsibleSection/examples/CollapsibleSection.Recursive.Example';
import { IThemedProps } from '../../Foundation';
import {
  defaultTheme,
  invertedPrimaryTheme,
  invertedDefaultTheme,
  neutralTheme,
  schemeTheme,
  softTheme,
  strongTheme
} from './Themes';

interface IDialogExampleProps {
  buttonText: string;
  customizerTheme?: ITheme;
}

interface IDialogExampleState {
  hideDialog: boolean;
}

class DialogExample extends React.Component<IDialogExampleProps, IDialogExampleState> {
  constructor(props: IDialogExampleProps) {
    super(props);

    this.state = {
      hideDialog: true
    };
  }

  protected _renderCustomizerDialog(buttonText: string, theme?: ITheme): JSX.Element {
    return theme ? (
      <Customizer settings={{ theme }}>{this._renderDialog(buttonText)}</Customizer>
    ) : (
      this._renderDialog(buttonText)
    );
  }

  protected _renderDialog(buttonText: string): JSX.Element {
    return (
      <div>
        <br />
        <DefaultButton secondaryText="Opens the Sample Dialog" onClick={this._showDialog} text={buttonText} />
        <Dialog
          hidden={this.state.hideDialog}
          onDismiss={this._closeDialog}
          dialogContentProps={{
            type: DialogType.largeHeader,
            title: 'All emails together',
            subText:
              'Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.'
          }}
          modalProps={{
            isBlocking: false,
            containerClassName: 'ms-dialogMainOverride'
          }}
        >
          <ChoiceGroup
            options={[
              {
                key: 'A',
                text: 'Option A'
              },
              {
                key: 'B',
                text: 'Option B',
                checked: true
              },
              {
                key: 'C',
                text: 'Option C',
                disabled: true
              }
            ]}
          />
          <DialogFooter>
            <PrimaryButton onClick={this._closeDialog} text="Save" />
            <DefaultButton onClick={this._closeDialog} text="Cancel" />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }

  private _showDialog = (): void => {
    this.setState({ hideDialog: false });
  };

  private _closeDialog = (): void => {
    this.setState({ hideDialog: true });
  };
}

// Temporarily have to use these mini wrapper classes until https://github.com/OfficeDev/office-ui-fabric-react/issues/6029 is resolved
class ThemedDialog extends DialogExample {
  public render(): JSX.Element | null {
    return this._renderCustomizerDialog(this.props.buttonText, this.props.customizerTheme);
  }
}

// TODO: requiring users to type this way is frictiony. find a way to reduces props typing
export const stackStyles = (props: IThemedProps<IStackProps>): IStackStyles => {
  return {
    root: {
      backgroundColor: props.theme.semanticColors.bodyBackground
    }
  };
};

export class ThemingBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <h2>Multiple Customizers</h2>
        {this._renderCustomizedComponents(defaultTheme, invertedPrimaryTheme, invertedDefaultTheme, neutralTheme)}
        <h2>Multiple Customizers (Variants package)</h2>
        {this._renderCustomizedComponents(defaultTheme, softTheme, strongTheme, neutralTheme)}
        <h2>Multiple Customizers (Variants package)</h2>
        {this._renderCustomizedComponents(defaultTheme, strongTheme, softTheme, neutralTheme)}
        <h2>One Customizer with Schemes</h2>
        <Customizer settings={{ theme: schemeTheme }}>{this._renderSchemedComponents()}</Customizer>
      </div>
    );
  }

  /**
   * Render various components using multiple Customizers.
   */
  private _renderCustomizedComponents(
    theme: ITheme,
    sideMenuTheme: ITheme,
    topMenuTheme: ITheme,
    bodyTheme: ITheme
  ): JSX.Element {
    return (
      <HorizontalStack gap={10} styles={stackStyles}>
        <Customizer settings={{ theme: sideMenuTheme }}>
          <HorizontalStack.Item grow={1}>{this._renderSideMenu()}</HorizontalStack.Item>
        </Customizer>
        <HorizontalStack.Item grow={3}>
          <VerticalStack gap={10} styles={stackStyles}>
            <Customizer settings={{ theme: topMenuTheme }}>{this._renderTopMenu()}</Customizer>
            <Customizer settings={{ theme: bodyTheme }}>
              <VerticalStack styles={stackStyles}>
                <Text>Body Content</Text>
                <ThemedDialog buttonText="Default Theme" customizerTheme={theme} />
                <ThemedDialog buttonText="Side Menu Theme" customizerTheme={sideMenuTheme} />
                <ThemedDialog buttonText="Top Menu Theme" customizerTheme={topMenuTheme} />
                <ThemedDialog buttonText="Implicit Body Theme" />
              </VerticalStack>
            </Customizer>
          </VerticalStack>
        </HorizontalStack.Item>
      </HorizontalStack>
    );
  }

  /**
   * Render various components only using scheme names (no Customizers.)
   */
  private _renderSchemedComponents(): JSX.Element {
    return (
      <HorizontalStack gap={10} styles={stackStyles}>
        <HorizontalStack.Item grow={1}>{this._renderSideMenu()}</HorizontalStack.Item>
        <HorizontalStack.Item grow={3}>
          <VerticalStack styles={stackStyles}>
            <Text>Body Content</Text>
            <ThemedDialog buttonText="Default Theme" />
            <ThemedDialog buttonText="Side Menu Theme" />
            <ThemedDialog buttonText="Top Menu Theme" />
            <ThemedDialog buttonText="Implicit Body Theme" />
          </VerticalStack>
        </HorizontalStack.Item>
      </HorizontalStack>
    );
  }

  private _renderSideMenu(): JSX.Element {
    return (
      <VerticalStack maxWidth="25%" styles={stackStyles}>
        <Text>Side Menu</Text>
        <CollapsibleSectionRecursiveExample />
      </VerticalStack>
    );
  }

  private _renderTopMenu(): JSX.Element {
    return (
      <VerticalStack styles={stackStyles}>
        <Text>Top Menu</Text>
        <CommandBar items={items} overflowItems={overflowItems} farItems={farItems} />
      </VerticalStack>
    );
  }
}
