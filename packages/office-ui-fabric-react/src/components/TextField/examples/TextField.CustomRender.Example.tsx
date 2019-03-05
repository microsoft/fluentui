import * as React from 'react';
import { TextField, ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { getId } from 'office-ui-fabric-react/lib/Utilities';
import './TextField.Examples.scss';

export class TextFieldCustomRenderExample extends React.Component<
  {},
  {
    isCalloutVisible: boolean;
  }
> {
  private _iconButtonElement: HTMLElement;
  private _descriptionId: string = getId('description');

  constructor(props: {}) {
    super(props);

    this.state = {
      isCalloutVisible: false
    };
  }

  public render(): JSX.Element {
    return (
      <div className="docs-TextFieldExample">
        <TextField onRenderLabel={this._onRenderLabel} />
      </div>
    );
  }

  private _onRenderLabel = (props: ITextFieldProps): JSX.Element => {
    const { isCalloutVisible } = this.state;
    return (
      <div className="ms-CustomRenderExample" style={{ display: 'flex', alignItems: 'center' }}>
        <span>TextField with custom label render</span>
        <span className="ms-CustomRenderExample-labelIconArea" ref={menuButton => (this._iconButtonElement = menuButton!)}>
          <IconButton iconProps={{ iconName: 'Info' }} title="Info" ariaLabel="Info" onClick={this._onClick} />
        </span>
        {isCalloutVisible && (
          <Callout
            className="ms-CustomRenderExample-callout"
            target={this._iconButtonElement}
            setInitialFocus={true}
            onDismiss={this._onDismiss}
            ariaDescribedBy={this._descriptionId}
          >
            <div className="ms-CustomRenderExample-callout-description" id={this._descriptionId}>
              In additon to the label itself, this label includes an iconbutton which pops out more information in a callout
            </div>
            <div className="ms-CustomRenderExample-callout-actions">
              <DefaultButton onClick={this._onDismiss}>Close</DefaultButton>
            </div>
          </Callout>
        )}
      </div>
    );
  };

  private _onClick = (): void => {
    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible
    });
  };

  private _onDismiss = (): void => {
    this.setState({
      isCalloutVisible: false
    });
  };
}
