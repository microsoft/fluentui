import * as React from 'react';
import { BaseState } from '../../../utilities/BaseState';
import { ISplitMenuButtonProps, ISplitMenuButtonViewProps } from './SplitMenuButton.types';

export type ISplitMenuButtonState = Pick<
  ISplitMenuButtonViewProps,
  'expanded' | 'onClick' | 'onKeyDown' | 'onMenuDismiss' | 'menuTarget' | 'onSecondaryActionClick'
>;

export class SplitMenuButtonState extends BaseState<ISplitMenuButtonProps, ISplitMenuButtonViewProps, ISplitMenuButtonState> {
  constructor(props: SplitMenuButtonState['props']) {
    super(props, {
      controlledProps: ['expanded']
    });

    this.state = {
      expanded: !!props.defaultExpanded,
      onClick: this._onClick,
      onKeyDown: this._onKeyDown,
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

  private _onKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
    const { disabled, menu } = this.props;
    if (!disabled && menu && (ev.altKey || ev.metaKey) && ev.keyCode === 40) {
      this.setState({
        expanded: !this.state.expanded,
        menuTarget: ev.currentTarget
      });
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
