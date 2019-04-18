import * as React from 'react';
import { BaseState } from '../../../utilities/BaseState';
import { IMenuButtonProps, IMenuButtonViewProps } from './MenuButton.types';

export type IMenuButtonState = Pick<
  IMenuButtonViewProps,
  'expanded' | 'onClick' | 'onKeyDown' | 'buttonRef' | 'onMenuDismiss' | 'menuTarget'
>;

export class MenuButtonState extends BaseState<IMenuButtonProps, IMenuButtonViewProps, IMenuButtonState> {
  private _buttonRef = React.createRef<HTMLButtonElement>();

  constructor(props: MenuButtonState['props']) {
    super(props, {
      controlledProps: ['expanded']
    });

    this.state = {
      expanded: !!props.defaultExpanded,
      onClick: this._onClick,
      onKeyDown: this._onKeyDown,
      buttonRef: this._buttonRef,
      onMenuDismiss: this._onMenuDismiss,
      menuTarget: undefined
    };
  }

  public focus(): void {
    if (this._buttonRef.current) {
      this._buttonRef.current.focus();
    }
  }

  private _onMenuDismiss = () => {
    this.setState({
      expanded: false
    });
  };

  private _onClick = (ev: React.MouseEvent<HTMLElement>) => {
    const { disabled, onClick } = this.props;

    if (!disabled) {
      if (onClick) {
        onClick(ev);

        if (ev.defaultPrevented) {
          return;
        }
      }

      this.setState({
        expanded: !this.state.expanded,
        menuTarget: ev.currentTarget
      });
    }
  };

  private _onKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
    const { disabled } = this.props;
    if (!disabled && (ev.altKey || ev.metaKey) && ev.keyCode === 40) {
      this.setState({
        expanded: !this.state.expanded,
        menuTarget: ev.currentTarget
      });
    }
  };
}
