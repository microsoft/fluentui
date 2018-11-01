import * as React from 'react';
import { IToggleProps, IToggleViewProps } from './Toggle.types';
import { BaseState } from '../../utilities/BaseState';

// Internal state will most likely include a subset of your ViewProps. This template just equates them to start with.
export type IToggleState = Pick<IToggleViewProps, 'checked' | 'onChange' | 'componentRef' | 'onClick'>;

export class ToggleState extends BaseState<IToggleProps, IToggleViewProps, IToggleState> {
  private _componentRef = React.createRef<HTMLElement>();

  constructor(props: ToggleState['props']) {
    super(props);

    this.state = {
      checked: !!props.defaultChecked,
      onChange: this._noop,
      componentRef: this._componentRef,
      onClick: this._onClick
    };
  }

  private _onClick = (ev: React.MouseEvent<HTMLElement>) => {
    const { disabled, checked: checkedProp, onChange } = this.props;
    const { checked } = this.state;

    if (!disabled) {
      // Only update the state if the user hasn't provided it.
      if (checkedProp === undefined) {
        this.setState({
          checked: !checked
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
