import * as React from 'react';
import { IButtonProps, IButtonViewProps } from './Button.types';
import { BaseState } from '../../utilities/BaseState';

export type IButtonState = Pick<IButtonViewProps, 'expanded' | 'onClick' | 'onMenuDismiss' | 'menuTarget'>;

export class ButtonState extends BaseState<IButtonProps, IButtonViewProps, IButtonState> {
  constructor(props: ButtonState['props']) {
    super(props, {
      controlledProps: ['expanded']
    });

    this.state = {
      expanded: !!props.defaultExpanded,
      onClick: this._onClick,
      onMenuDismiss: this._onMenuDismiss,
      menuTarget: undefined
    };
  }

  private _onMenuDismiss = () => {
    this.setState({
      expanded: false
    });
  };

  private _onClick = (ev: React.MouseEvent<HTMLElement>) => {
    const { disabled, menu, onClick } = this.props;

    if (!disabled) {
      if (onClick) {
        onClick(ev);

        if (ev.defaultPrevented) {
          return;
        }
      }

      if (menu) {
        this.setState({
          expanded: !this.state.expanded,
          menuTarget: ev.currentTarget
        });
      }
    }
  };
}
