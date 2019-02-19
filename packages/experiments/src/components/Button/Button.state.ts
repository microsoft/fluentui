import * as React from 'react';
import { IButtonProps, IButtonViewProps } from './Button.types';
import { BaseState } from '../../utilities/BaseState';

export type IButtonState = Pick<IButtonViewProps, 'expanded' | 'onClick' | 'onMenuDismiss' | 'menuTarget' | 'onSecondaryActionClick'>;

export class ButtonState extends BaseState<IButtonProps, IButtonViewProps, IButtonState> {
  constructor(props: ButtonState['props']) {
    super(props, {
      controlledProps: ['expanded']
    });

    this.state = {
      expanded: !!props.defaultExpanded,
      onClick: this._onClick,
      onSecondaryActionClick: this._onSecondaryActionClick,
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
    const { disabled, menu, split, primaryActionDisabled, onClick } = this.props;

    if (!disabled && !primaryActionDisabled) {
      if (onClick) {
        onClick(ev);

        if (ev.defaultPrevented) {
          return;
        }
      }

      if (!split && menu) {
        this.setState({
          expanded: !this.state.expanded,
          menuTarget: ev.currentTarget
        });
      }
    }
  };

  private _onSecondaryActionClick = (ev: React.MouseEvent<HTMLElement>) => {
    const { disabled, menu, split } = this.props;

    if (!disabled && menu && split) {
      this.setState({
        expanded: !this.state.expanded,
        menuTarget: ev.currentTarget
      });
    }
  };
}
