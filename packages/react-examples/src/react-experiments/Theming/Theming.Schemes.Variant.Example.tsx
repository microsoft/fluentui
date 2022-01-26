import * as React from 'react';

import {
  ChoiceGroup,
  CommandBar,
  ICommandBarItemProps,
  Customizer,
  Dialog,
  DialogFooter,
  DialogType,
  getTheme,
  IStackComponent,
  IStackStylesReturnType,
  IStackTokens,
  ITheme,
  Stack,
  Toggle,
  Text,
} from '@fluentui/react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { getNeutralVariant, getSoftVariant, getStrongVariant } from '@fluentui/scheme-utilities';

import { CollapsibleSectionRecursiveExample } from '@fluentui/react-examples/lib/react-experiments/CollapsibleSection/CollapsibleSection.Recursive.Example';

import { ThemeProvider as DeprecatedThemeProvider } from '@fluentui/foundation-legacy';

// Workaround to prevent errors on usage of ThemeProvider, without disabling all deprecation checks
// eslint-disable-next-line deprecation/deprecation
const ThemeProvider = DeprecatedThemeProvider;

const regionStyles: IStackComponent['styles'] = (props, theme): IStackStylesReturnType => ({
  root: {
    backgroundColor: theme.semanticColors.bodyBackground,
    color: theme.semanticColors.bodyText,
  },
});

const defaultTheme: ITheme = getTheme(true);

const neutralTheme = getNeutralVariant(defaultTheme);
const softTheme = getSoftVariant(defaultTheme);
const strongTheme = getStrongVariant(defaultTheme);

const schemeThemeVariants: ITheme = {
  ...defaultTheme,
  schemes: {
    default: defaultTheme,
    neutral: neutralTheme,
    soft: softTheme,
    strong: strongTheme,
  },
};

export interface IThemingExampleState {
  bodyToggle: boolean;
  sideToggle: boolean;
  topToggle: boolean;
}

export class ThemingSchemesVariantExample extends React.Component<{}, IThemingExampleState> {
  public state: IThemingExampleState = {
    bodyToggle: false,
    sideToggle: false,
    topToggle: false,
  };

  public render(): JSX.Element {
    // eslint-disable-next-line deprecation/deprecation
    return <Customizer settings={{ theme: schemeThemeVariants }}>{this._renderSchemedComponents()}</Customizer>;
  }

  /**
   * Render various components only using scheme names (no Customizers.)
   */
  private _renderSchemedComponents(): JSX.Element {
    const bodyScheme = this.state.bodyToggle ? 'soft' : 'neutral';
    const sideScheme = this.state.sideToggle ? 'neutral' : 'strong';
    const topScheme = this.state.topToggle ? 'strong' : 'soft';
    const bodyCaption = 'Scheme: ' + bodyScheme;
    const sideCaption = 'Scheme: ' + sideScheme;
    const topCaption = 'Scheme: ' + topScheme;

    const stackTokens: IStackTokens = { childrenGap: 10 };

    // TODO: Even though this styles function is the same for all regions, it has to be provided whenever the scheme
    //        is changed to apply the new semanticColors. Is this the best way we can do this?
    return (
      <Stack horizontal tokens={stackTokens}>
        <Stack.Item grow={true} styles={{ root: { width: '33%', maxWidth: '33%' } }}>
          <ThemeProvider scheme={sideScheme}>
            <Stack styles={regionStyles} tokens={stackTokens} padding={5}>
              <Text>{sideCaption}</Text>
              <Toggle offText={sideCaption} onText={sideCaption} onChange={this._toggleSide} />
              <CollapsibleSectionRecursiveExample />
            </Stack>
          </ThemeProvider>
        </Stack.Item>
        <Stack.Item grow={true} styles={{ root: { height: 'auto' } }}>
          <Stack grow={true} verticalFill={true}>
            <ThemeProvider scheme={topScheme}>
              <Stack styles={regionStyles} tokens={stackTokens} padding={5}>
                <Stack horizontal horizontalAlign="space-between">
                  <Text>{topCaption}</Text>
                  <Toggle offText={topCaption} onText={topCaption} onChange={this._toggleTop} />
                </Stack>
                <CommandBar items={items} overflowItems={overflowItems} farItems={farItems} />
              </Stack>
            </ThemeProvider>
            <ThemeProvider scheme={bodyScheme}>
              <Stack styles={regionStyles} verticalFill={true} padding={5}>
                <Stack horizontal horizontalAlign="space-between">
                  <Text>{bodyCaption}</Text>
                  <Toggle offText={bodyCaption} onText={bodyCaption} onChange={this._toggleBody} />
                </Stack>
                <ThemeProvider scheme="default">
                  <Stack.Item>
                    <DialogExample buttonText="Default Theme" />
                  </Stack.Item>
                </ThemeProvider>
                <ThemeProvider scheme="strong">
                  <Stack.Item>
                    <DialogExample buttonText="Strong Scheme" />
                  </Stack.Item>
                </ThemeProvider>
                <ThemeProvider scheme="soft">
                  <Stack.Item>
                    <DialogExample buttonText="Soft Scheme" />
                  </Stack.Item>
                </ThemeProvider>
                <DialogExample buttonText="Inherited Scheme" />
              </Stack>
            </ThemeProvider>
          </Stack>
        </Stack.Item>
      </Stack>
    );
  }

  private _toggleBody = () => {
    this.setState((state: IThemingExampleState) => this.setState({ bodyToggle: !state.bodyToggle }));
  };

  private _toggleSide = () => {
    this.setState((state: IThemingExampleState) => this.setState({ sideToggle: !state.sideToggle }));
  };

  private _toggleTop = () => {
    this.setState((state: IThemingExampleState) => this.setState({ topToggle: !state.topToggle }));
  };
}

// eslint-disable-next-line deprecation/deprecation
const onCommandClick = (ev: any, item?: ICommandBarItemProps) => console.log(item && (item.text || item.name));
const items: ICommandBarItemProps[] = [
  {
    key: 'newItem',
    name: 'New',
    iconProps: { iconName: 'Add' },
    ariaLabel: 'New. Use left and right arrow keys to navigate',
    subMenuProps: {
      items: [
        { key: 'emailMessage', name: 'Email message', iconProps: { iconName: 'Mail' } },
        { key: 'calendarEvent', name: 'Calendar event', iconProps: { iconName: 'Calendar' } },
      ],
    },
  },
  {
    key: 'upload',
    name: 'Upload',
    iconProps: { iconName: 'Upload' },
    href: 'https://developer.microsoft.com/en-us/fluentui',
    target: '_blank',
  },
  { key: 'share', name: 'Share', iconProps: { iconName: 'Share' }, onClick: onCommandClick },
  { key: 'download', name: 'Download', iconProps: { iconName: 'Download' }, onClick: onCommandClick },
];

const overflowItems: ICommandBarItemProps[] = [
  { key: 'move', name: 'Move to...', iconProps: { iconName: 'MoveToFolder' } },
  { key: 'copy', name: 'Copy to...', iconProps: { iconName: 'Copy' } },
  { key: 'rename', name: 'Rename...', iconProps: { iconName: 'Edit' } },
];

const farItems: ICommandBarItemProps[] = [
  { key: 'sort', name: 'Sort', ariaLabel: 'Sort', iconProps: { iconName: 'SortLines' }, onClick: onCommandClick },
  {
    key: 'tile',
    name: 'Grid view',
    ariaLabel: 'Grid view',
    iconProps: { iconName: 'Tiles' },
    iconOnly: true,
    onClick: onCommandClick,
  },
  {
    key: 'info',
    name: 'Info',
    ariaLabel: 'Info',
    iconProps: { iconName: 'Info' },
    iconOnly: true,
    onClick: onCommandClick,
  },
];

interface IDialogExampleProps {
  buttonText: string;
}

interface IDialogExampleState {
  hideDialog: boolean;
}

class DialogExample extends React.Component<IDialogExampleProps, IDialogExampleState> {
  public state: IDialogExampleState = {
    hideDialog: true,
  };

  public render(): JSX.Element {
    return (
      <div>
        <br />
        <DefaultButton
          secondaryText="Opens the Sample Dialog"
          onClick={this._showDialog}
          text={this.props.buttonText}
        />
        <Dialog
          hidden={this.state.hideDialog}
          onDismiss={this._closeDialog}
          dialogContentProps={{
            type: DialogType.largeHeader,
            title: 'All emails together',
            subText:
              'Your Inbox has changed. No longer does it include favorites, ' +
              'it is a singular destination for your emails.',
          }}
          modalProps={{
            isBlocking: false,
            styles: { main: { maxWidth: 450 } },
          }}
        >
          <ChoiceGroup
            defaultSelectedKey="B"
            options={[
              { key: 'A', text: 'Option A' },
              { key: 'B', text: 'Option B' },
              { key: 'C', text: 'Option C', disabled: true },
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

  private _showDialog = (): void => this.setState({ hideDialog: false });
  private _closeDialog = (): void => this.setState({ hideDialog: true });
}
