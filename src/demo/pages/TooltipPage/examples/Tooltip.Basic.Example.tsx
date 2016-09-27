/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import {
  Tooltip,
  Button,
  ButtonType,
  IButtonProps
} from '../../../../index';

export interface ITooltipBasicExampleState {
  isTooltipVisible?: boolean;
}

export class TooltipBasicExample extends React.Component<any, ITooltipBasicExampleState> {
  private _menuButtonElement: HTMLElement;

  public constructor() {
    super();

    this._onDismiss = this._onDismiss.bind(this);

    this.state = {
      isTooltipVisible: false,
    };
  }

  public render() {
    let { isTooltipVisible } = this.state;
    let examplePrimaryButton: IButtonProps = {
      buttonType: ButtonType.primary,
      children: 'Try it out'
    };
    let exampleSecondaryButtonProps: IButtonProps = {
      children: 'May be later',
      onClick: this._onDismiss
    };

    return (
      <div className='ms-TooltipExample'>
        <span className='ms-TooltipBasicExample-buttonArea' ref={ (menuButton) => this._menuButtonElement = menuButton }>
          <Button onClick={ this._onDismiss } >{ isTooltipVisible ? 'Hide Tooltip' : 'Show Tooltip' }</Button>
        </span>
        { isTooltipVisible ? (
          <div>
            <Tooltip
              targetElement={ this._menuButtonElement }
              onDismiss={ this._onDismiss }
            >
              Files > Pictures > Colors Folder > Blue
            </Tooltip>
          </div>
        ) : (null) }
      </div>
    );
  }

  private _onDismiss(ev: any) {
    this.setState({
      isTooltipVisible: !this.state.isTooltipVisible
    });
  }
}
