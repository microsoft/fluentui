import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import './Dialog.Basic.Example.scss';

export class DialogBasicExample extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      hideDialog: true
    };
  }

  public render() {
    return (
      <div>
        <DefaultButton
          description='Opens the Sample Dialog'
          onClick={ this._showDialog.bind(this) }
          text='Open Dialog'
        />
        <label id='myLabelId' className='screenReaderOnly'>My sample Label</label>
        <label id='mySubTextId' className='screenReaderOnly'>My Sample description</label>

        <Dialog
          hidden={ this.state.hideDialog }
          onDismiss={ this._closeDialog.bind(this) }
          dialogContentProps={ {
            type: DialogType.normal,
            title: 'All emails together',
            subText: 'Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.'
          } }
          modalProps={ {
            titleAriaId: 'myLabelId',
            subtitleAriaId: 'mySubTextId',
            isBlocking: false,
            containerClassName: 'ms-dialogMainOverride'
          } }
        >
          <ChoiceGroup
            options={ [
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
            ] }
            onChange={ this._onChoiceChanged }
          />
          { null /** You can also include null values as the result of conditionals */ }
          <DialogFooter>
            <PrimaryButton onClick={ this._closeDialog.bind(this) } text='Save' />
            <DefaultButton onClick={ this._closeDialog.bind(this) } text='Cancel' />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }

  private _showDialog() {
    this.setState({ hideDialog: false });
  }

  private _closeDialog() {
    this.setState({ hideDialog: true });
  }

  private _onChoiceChanged() {
    console.log('Choice option change');
  }
}
