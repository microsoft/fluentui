import * as React from 'react';
import { TextField, ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { getId, IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getTheme, FontWeights } from 'office-ui-fabric-react/lib/Styling';

export interface ITextFieldCustomRenderExampleState {
  isCalloutVisible: boolean;
}

const stackTokens: IStackTokens = {
  childrenGap: 20,
  maxWidth: 300
};

export class TextFieldCustomRenderExample extends React.Component<{}, ITextFieldCustomRenderExampleState> {
  public state: ITextFieldCustomRenderExampleState = { isCalloutVisible: false };

  private _descriptionId: string = getId('description');
  private _iconButtonId: string = getId('iconButton');
  private _labelId: string = getId('label');

  public render(): JSX.Element {
    return (
      <Stack tokens={stackTokens}>
        <TextField
          aria-labelledby={this._labelId}
          label="Custom label rendering"
          onRenderLabel={this._onRenderLabel}
          description="Click the (i) icon!"
        />

        <TextField
          aria-labelledby={this._labelId}
          label="Wrapping default label renderer"
          onRenderLabel={this._onWrapDefaultLabelRenderer}
        />

        <TextField
          label="Custom description rendering"
          description="A colorful description!"
          onRenderDescription={this._onRenderDescription}
        />
      </Stack>
    );
  }

  private _onRenderDescription = (props: ITextFieldProps): JSX.Element => {
    const theme = getTheme();
    return (
      <Text variant="small" styles={{ root: { color: theme.palette.green, fontWeight: FontWeights.bold } }}>
        {props.description}
      </Text>
    );
  };

  private _onRenderLabel = (props: ITextFieldProps): JSX.Element => {
    return (
      <>
        <Stack horizontal verticalAlign="center">
          <span id={this._labelId}>{props.label}</span>
          <IconButton
            id={this._iconButtonId}
            iconProps={{ iconName: 'Info' }}
            title="Info"
            ariaLabel="Info"
            onClick={this._onIconClick}
            styles={{ root: { marginBottom: -3 } }}
          />
        </Stack>
        {this.state.isCalloutVisible && (
          <Callout
            target={'#' + this._iconButtonId}
            setInitialFocus={true}
            onDismiss={this._onDismiss}
            ariaDescribedBy={this._descriptionId}
            role="alertdialog"
          >
            <Stack tokens={stackTokens} horizontalAlign="start" styles={{ root: { padding: 20 } }}>
              <span id={this._descriptionId}>The custom label includes an IconButton that displays this Callout on click.</span>
              <DefaultButton onClick={this._onDismiss}>Close</DefaultButton>
            </Stack>
          </Callout>
        )}
      </>
    );
  };

  private _onWrapDefaultLabelRenderer = (props: ITextFieldProps, defaultRender: IRenderFunction<ITextFieldProps>): JSX.Element => {
    return (
      <>
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 6 }}>
          <span>{defaultRender(props)}</span>
          <Icon id={this._iconButtonId} iconName="Globe" title="Globe" ariaLabel="Globe" styles={{ root: { marginBottom: -3 } }} />
        </Stack>
      </>
    );
  };

  private _onIconClick = (): void => {
    this.setState({ isCalloutVisible: !this.state.isCalloutVisible });
  };

  private _onDismiss = (): void => {
    this.setState({ isCalloutVisible: false });
  };
}
