import * as React from 'react';
import { BaseState } from '../../utilities/BaseState';
import { IButtonProps, IButtonViewProps } from './Button.types';

export type IButtonState = Pick<IButtonViewProps, 'buttonRef'>;

export class ButtonState extends BaseState<IButtonProps, IButtonViewProps, IButtonState> {
  private _buttonRef = React.createRef<HTMLButtonElement>();

  constructor(props: ButtonState['props']) {
    super(props);

    this.state = {
      buttonRef: this._buttonRef
    };
  }

  public focus(): void {
    if (this._buttonRef.current) {
      this._buttonRef.current.focus();
    }
  }
}
