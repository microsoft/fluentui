import * as React from 'react';
import { BaseState } from '../../../utilities/BaseState';
import { ISplitButtonProps, ISplitButtonViewProps } from './SplitButton.types';

export type ISplitButtonState = Pick<ISplitButtonViewProps, 'buttonRef'>;

export class SplitButtonState extends BaseState<ISplitButtonProps, ISplitButtonViewProps, ISplitButtonState> {
  private _buttonRef = React.createRef<HTMLButtonElement>();

  constructor(props: SplitButtonState['props']) {
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
