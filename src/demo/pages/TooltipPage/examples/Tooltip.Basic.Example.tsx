/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from '../../../../common/BaseComponent';


import {
  Tooltip,
  Button
} from '../../../../index';

export interface ITooltipBasicExampleState {
  stateBeenSet?: boolean;
}

export class TooltipBasicExample extends BaseComponent<any, ITooltipBasicExampleState> {

  private _menuButtonElement: HTMLElement;
  public constructor() {
    super();

    this.state = {
      stateBeenSet: false
    }
  }

  public componentDidMount() {
    this.setState({
      stateBeenSet: true
    });
  }

  public render() {
    return (
      <div className='ms-TooltipExample'>
        <div className='ms-TooltipBasicExample-buttonArea' ref={ this._resolveRef('_menuButtonElement') }>
          <Button >{ 'Show Tooltip' }</Button>
        </div>
          <div>
          { this.state.stateBeenSet && (
            <Tooltip
              tooltipContent= 'Files > Pictures > Colors Folder > Blue'
              targetElement={ this._menuButtonElement }
            >
            </Tooltip>
          ) }
          </div>
      </div>
    );
  }
}


