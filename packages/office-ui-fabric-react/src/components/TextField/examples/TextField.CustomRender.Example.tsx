import * as React from 'react';
import { TextField, ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Callout } from 'office-ui-fabric-react/lib/Callout';

export class TextFieldCustomRenderExample extends React.Component<any, any> {

  private _iconButtonElement: HTMLElement;

  public constructor() {
    super();

    this.state = {
      isCalloutVisible: false
    };
  }

  public render() {
    return (
      <div>
        <TextField onRenderLabel={ this._onRenderLabel } />
      </div>
    );
  }

  @autobind
  private _onRenderLabel(props: ITextFieldProps): JSX.Element {

    let { isCalloutVisible } = this.state;
    return (
      <div className='ms-CustomRenderExample' style={ { display: 'flex', alignItems: 'center' } }>
        <span>TextField with custom label render</span>
        <span className='ms-CustomRenderExample-labelIconArea' ref={ (menuButton) => this._iconButtonElement = menuButton! }>
          <IconButton
            iconProps={ { iconName: 'Info' } }
            title='Info'
            ariaLabel='Info'
            onClick={ this._onClick }
          />
        </span>
        { isCalloutVisible && (
          <Callout
            className='ms-CustomRenderExample-callout'
            targetElement={ this._iconButtonElement }
            onDismiss={ this._onDismiss }
          >
            <text> In additon to the label itself, this label includes an iconbutton which pops out more information in a callout</text>
          </Callout>
        ) }
      </div>
    );

  }

  @autobind
  private _onClick(): void {
    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible
    });
  }

  @autobind
  private _onDismiss() {
    this.setState({
      isCalloutVisible: false
    });
  }
}
