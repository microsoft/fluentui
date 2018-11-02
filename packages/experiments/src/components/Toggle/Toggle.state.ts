import * as React from 'react';
import { IToggleProps, IToggleViewProps } from './Toggle.types';
import { BaseState } from '../../utilities/BaseState';

export type IToggleState = Pick<IToggleViewProps, 'checked' | 'onChange' | 'onClick' | 'text'>;

export class ToggleState extends BaseState<IToggleProps, IToggleViewProps, IToggleState> {
  constructor(props: ToggleState['props']) {
    super(props);

    this.state = {
      checked: !!props.defaultChecked,
      text: !!props.defaultChecked ? props.onText : props.offText,
      onChange: this._noop,
      onClick: this._onClick
    };
  }

  private _onClick = (ev: React.MouseEvent<HTMLElement>) => {
    const { checked: checkedProp, onText, offText, disabled, onChange } = this.props;
    const { checked } = this.state;

    if (!disabled) {
      // Only update the state if the user hasn't provided it.
      if (checkedProp === undefined) {
        this.setState({
          checked: !checked,
          text: checked ? offText : onText
        });
      }

      if (onChange) {
        onChange(ev, !checked);
      }
    }
  };

  private _noop(): void {
    /* no-op */
  }
}
