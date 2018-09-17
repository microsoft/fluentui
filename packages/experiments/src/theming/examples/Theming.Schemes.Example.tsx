import * as React from 'react';

import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IScheme } from 'office-ui-fabric-react/lib/Styling';
import { Customizer } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { farItems, items, overflowItems } from 'office-ui-fabric-react/lib/components/CommandBar/examples/data';

import { HorizontalStack, VerticalStack, IStackProps, IStackStyles } from '@uifabric/experiments/lib/Stack';
import { Text } from '@uifabric/experiments/lib/Text';
// tslint:disable:max-line-length
import { CollapsibleSectionRecursiveExample } from '@uifabric/experiments/lib/components/CollapsibleSection/examples/CollapsibleSection.Recursive.Example';
import { IThemedProps } from '../../Foundation';
import { schemeThemeCustom, schemeThemeVariants, defaultTheme } from './Themes';

interface IDialogExampleProps {
  buttonText: string;
  scheme?: IScheme;
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

  protected _renderSchemedDialog(buttonText: string, scheme?: IScheme): JSX.Element {
    return scheme ? (
      <VerticalStack.Item scheme={scheme}>{this._renderDialog(buttonText)}</VerticalStack.Item>
    ) : (
      this._renderDialog(buttonText)
    );
  }

  protected _renderDialog(buttonText: string): JSX.Element {
    return (
      <div>
        <br />
        <DefaultButton onClick={this._showDialog} text={buttonText} />
        <Dialog
          hidden={this.state.hideDialog}
          onDismiss={this._closeDialog}
          dialogContentProps={{
            type: DialogType.largeHeader,
            title: 'All emails together',
            subText: 'Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.'
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
    return this._renderSchemedDialog(this.props.buttonText, this.props.scheme);
  }
}

// TODO: requiring users to type this way is frictiony. find a way to reduce props typing
export const stackStyles = (props: IThemedProps<IStackProps>): IStackStyles => {
  return {
    root: {
      backgroundColor: props.theme.semanticColors.bodyBackground
    }
  };
};

export class ThemingExample extends React.Component<{}, {}> {
  /**
   * Render various components only using scheme names (no Customizers.)
   */
  protected _renderSchemedComponents(): JSX.Element {
    const topScheme = 'soft';
    const sideScheme = 'strong';
    const bodyScheme = 'neutral';

    // TODO: add test cases with theme prop
    return (
      <HorizontalStack gap={10} styles={stackStyles}>
        <HorizontalStack.Item grow={1}>{this._renderSideMenu(sideScheme)}</HorizontalStack.Item>
        <HorizontalStack.Item grow={3}>
          <VerticalStack styles={stackStyles}>
            {this._renderTopMenu(topScheme)}
            <VerticalStack gap={10} scheme={bodyScheme} styles={stackStyles}>
              <Text>Body Content</Text>
              <Checkbox label="Default Theme (Scoped)" />
              <Toggle offText="Current Scheme" onText="Current Scheme" />
              <ThemedDialog buttonText="Default Theme" scheme="default" />
              <ThemedDialog buttonText="Side Menu Theme" scheme={sideScheme} />
              <ThemedDialog buttonText="Top Menu Theme" scheme={topScheme} />
              <ThemedDialog buttonText="Implicit Body Theme" />
            </VerticalStack>
          </VerticalStack>
        </HorizontalStack.Item>
      </HorizontalStack>
    );
  }

  protected _renderSideMenu(scheme: IScheme): JSX.Element {
    return (
      <VerticalStack gap={10} scheme={scheme} maxWidth="25%" styles={stackStyles}>
        <Text>Side Menu</Text>
        <Checkbox label="Default Theme (Scoped)" />
        <Toggle offText="Current Scheme" onText="Current Scheme" />
        <CollapsibleSectionRecursiveExample />
      </VerticalStack>
    );
  }

  protected _renderTopMenu(scheme: IScheme): JSX.Element {
    return (
      <VerticalStack gap={10} scheme={scheme} styles={stackStyles}>
        <Text>Top Menu</Text>
        <Checkbox label="Default Theme (Scoped)" />
        <Toggle offText="Current Scheme" onText="Current Scheme" />
        <CommandBar items={items} overflowItems={overflowItems} farItems={farItems} />
      </VerticalStack>
    );
  }
}

export class ThemingSchemesVariantExample extends ThemingExample {
  public render(): JSX.Element {
    return (
      <Customizer settings={{ theme: schemeThemeVariants }} scopedSettings={{ Checkbox: { theme: defaultTheme } }}>
        {this._renderSchemedComponents()}
      </Customizer>
    );
  }
}

export class ThemingSchemesCustomExample extends ThemingExample {
  public render(): JSX.Element {
    return (
      <Customizer settings={{ theme: schemeThemeCustom }} scopedSettings={{ Checkbox: { theme: defaultTheme } }}>
        {this._renderSchemedComponents()}
      </Customizer>
    );
  }
}

export class ThemingSchemesDefaultExample extends ThemingExample {
  public render(): JSX.Element {
    return (
      <div>
        <h3>TODO: This will not work until variants are created in default theme.</h3>
        {this._renderSchemedComponents()}
      </div>
    );
  }
}
