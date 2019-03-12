import * as React from 'react';
import { IToggle, IToggleProps, IToggleViewProps } from './Toggle.types';
import { BaseState } from '../../utilities/BaseState';

export type IToggleState = Pick<IToggleViewProps, 'checked' | 'onChange' | 'onClick' | 'text' | 'toggleButtonRef'>;

export class ToggleState extends BaseState<IToggleProps, IToggleViewProps, IToggleState> implements IToggle {
  private _toggleButtonRef = React.createRef<HTMLButtonElement>();

  constructor(props: ToggleState['props']) {
    super(props, {
      controlledProps: ['checked', 'text'],
      transformViewProps: (newProps: IToggleViewProps) => {
        newProps.text = newProps.checked ? props.onText : props.offText;
        return newProps;
      }
    });

    this.state = {
      checked: !!props.defaultChecked,
      text: !!props.defaultChecked ? props.onText : props.offText,
      onChange: this._noop,
      onClick: this._onClick,
      toggleButtonRef: this._toggleButtonRef
    };
  }

  public focus = () => {
    if (this._toggleButtonRef.current) {
      this._toggleButtonRef.current.focus();
    }
  };

  private _onClick = (ev: React.MouseEvent<HTMLElement>) => {
    const { disabled, onChange } = this.props;
    const { checked } = this.state;

    if (!disabled) {
      // Only update the state if the user hasn't provided it.
      this.setState({ checked: !checked });

      if (onChange) {
        onChange(ev, !checked);
      }
    }
  };

  private _noop(): void {
    /* no-op */
  }
}
