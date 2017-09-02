/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import {
  TeachingDialog
} from '../index';

import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { IImageProps } from 'office-ui-fabric-react/lib/Image';
import { ITeachingDialogViewProps } from '../TeachingDialogView.Props';
import { baseProductionCdnUrl, TestImages } from '../../../common/TestImages';

export interface ITeachingDialogBasicExampleState {
  isTeachingDialogVisible?: boolean;
}

export class TeachingDialogBasicExample extends React.Component<any, ITeachingDialogBasicExampleState> {

  private _menuButtonElement: HTMLSpanElement | null;
  private x: boolean;
  public constructor() {
    super();
    this._onDismiss = this._onDismiss.bind(this);
    this.x = false;
    this.state = {
      isTeachingDialogVisible: false,
    };
  }

  public render() {
    let imageProps: IImageProps = { src: 'odsp-media/images/spfirstrun/Activity.gif' } as IImageProps;
    let viewProps: ITeachingDialogViewProps[] =
      [{
        headline: 'Welcome',
        leftButtonText: 'Discard',
        rightButtonText: 'Next',
        onLeftButton: this._onDismiss,
        isLeftButtonLight: true,
        title: 'Lorem ipsum',
        textContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, nulla, ipsum? Molestiae quis aliquam magni harum non?',
        image: TestImages.teachingDialog,
      } as ITeachingDialogViewProps,
      {
        leftButtonText: 'Previous',
        rightButtonText: 'Done',
        onRightButton: this._onDismiss,
        title: 'Lorem ipsum 2',
        textContent: 'Lorem ipsum 2 dolor sit amet, consectetur adipisicing elit. Facere, nulla, ipsum? Molestiae quis aliquam magni harum non?',
        image: TestImages.teachingDialog,
      } as ITeachingDialogViewProps];

    return (
      <div className='ms-TeachingDialogExample'>
        <span className='ms-TeachingDialogBasicExample-buttonArea' ref={ (menuButton) => this._menuButtonElement = menuButton }>
          <DefaultButton onClick={ this._onDismiss } >
            { this.state.isTeachingDialogVisible ? 'Hide TeachingDialog' : 'Show TeachingDialog' }
          </DefaultButton>
        </span>
        { this.state.isTeachingDialogVisible ? (
          <div>
            <TeachingDialog viewProps={ viewProps } onXButton={ this._onDismiss } />
          </div>
        ) : (null) }
      </div>
    );
  }

  private _onDismiss(ev: any) {
    this.setState({
      isTeachingDialogVisible: !this.state.isTeachingDialogVisible
    });
  }
}