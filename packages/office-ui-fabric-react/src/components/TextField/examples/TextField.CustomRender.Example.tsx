import * as React from 'react';
import { TextField, ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Callout } from 'office-ui-fabric-react/lib/Callout';

export class TextFieldCustomRenderExample extends React.Component<any, any> {

  private _menuButtonElement: HTMLElement;
  public constructor() {
    super();

    this.state = {
      isCalloutVisible: false
    };
  }

  public render() {
    return (
      <div>
        <TextField onRenderLabel={ this._onRenderLabel }
        />
      </div>
    );
  }

  @autobind
  private _onRenderLabel(props: ITextFieldProps): JSX.Element {

    let { isCalloutVisible } = this.state;
    return (
      <div className='ms-CustomRenderExample' style={ { display: "flex", alignItems: "center" } }>
        <span>TextField with custom label render</span>
        <span className='ms-CustomRenderExamle-labelArea' ref={ (menuButton) => this._menuButtonElement = menuButton! }>
          <IconButton
            iconProps={ { iconName: 'Info' } }
            title='Info'
            ariaLabel='Info'
            onClick={ this._onClick }
          />
        </span>
        { isCalloutVisible && (
          <Callout
            className='ms-CalloutExample-callout'
            ariaLabelledBy={ 'callout-label-1' }
            ariaDescribedBy={ 'callout-description-1' }
            role={ 'alertdialog' }
            gapSpace={ 0 }
            targetElement={ this._menuButtonElement }
            onDismiss={ this._onDismiss }
            setInitialFocus={ true }
          >
            <text> In additon to the labeltext, this label includes an iconbutton which pops out this information </text>
          </Callout>
        ) }
      </div>
    )

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
