import * as React from 'react';
import {
  Dialog,
  DialogType,
  Button,
  ChoiceGroup
} from '../../../../components/index';

export default class DialogBlockingExample extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      showDialog: false
    };
  }

  public render() {
    return (
      <div>
        <Button description='Opens the Sample Dialog' onClick={ this._showDialog.bind(this) }>Open Dialog</Button>

        { this.state.showDialog === false ? null :
          <Dialog
            type={ DialogType.normal }
            onCloseAction={ this._closeDialog.bind(this) }
            title='All emails together'
            subText='Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.'
            blocking={ true }
            actions= { [
              {
                key: 'Save',
                text: 'Save',
                isPrimary: true,
              },
              {
                key: 'Cancel',
                text: 'Cancel'
              },
            ] }
          >
            // Create any child elements that you want
            <ChoiceGroup
              options={ [
                {
                  key: 'A',
                  text: 'Option A'
                },
                {
                  key: 'B',
                  text: 'Option B',
                  isChecked: true
                },
                {
                  key: 'C',
                  text: 'Option C',
                  isDisabled: true
                }
              ] }
              onChanged={ this._onChoiceChanged }
              />
          </Dialog>
        }
      </div>
    );
  }

  private _showDialog() {
    console.log( 'Opening dialog' );
    this.setState( {showDialog: true } );
  }

  private _closeDialog() {
    console.log( 'Closing dialog' );
    this.setState( {showDialog: false } );
  }

  private _onChoiceChanged() {
    console.log( 'Choice option change' );
  }

}
