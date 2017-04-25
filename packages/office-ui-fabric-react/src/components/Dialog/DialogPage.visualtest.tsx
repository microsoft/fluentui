import * as React from 'react';
import { Dialog } from './Dialog';
import { DialogType } from './Dialog.Props';
import { DialogFooter } from './DialogFooter';
import { PrimaryButton } from '../Button/PrimaryButton/PrimaryButton';
import { DefaultButton } from '../Button/DefaultButton/DefaultButton';

export class DialogVPage extends React.Component<any, any> {

  public render() {
    return (
      <div>
        done
        <div><label> Default Button:   </label>
          <DefaultButton id='DefaultButton' text='Default Button' /></div>
      </div>
    );
  }

}
