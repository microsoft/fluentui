import * as React from 'react';
import {
  BaseComponent,
  customizable,
  autobind,
  getId
} from '../../../Utilities';
import { VerticalDivider } from 'office-ui-fabric-react/lib/Divider';
import { ButtonBase } from './Button.base';
import { IButtonBaseProps } from './Button.base.types';
import { MenuButtonBase } from './MenuButton.base';
import { IMenuButtonBaseProps } from './MenuButton.base.types';
import {
  ISplitButton,
  ISplitButtonBaseProps,
} from './SplitButton.base.types';


@customizable('SplitButtonBase', ['theme'])
export class SplitButtonBase extends BaseComponent<ISplitButtonBaseProps, {}> implements ISplitButton {

  public static defaultProps = {
    split: false
  };

  private _buttonElement: HTMLElement;
  private _labelId: string;


  constructor(props: ISplitButtonBaseProps) {
    super(props);
    this._labelId = getId();
  }

  public render(): JSX.Element {

    const {
      primaryDisabled
    } = this.props;


    const buttonProps = {
      'aria-disabled': primaryDisabled,
      'aria-haspopup': true,
      'data-target-id': this._labelId,
      componentRef: this._resolveRef('_buttonElement')
    };

    const primaryProps: IButtonBaseProps = {
      ...this.props as IButtonBaseProps,
      labelId: this._labelId,
      menuIconProps: undefined,
      onRenderMenuIcon: undefined
    };

    const isSplit = !!this.props.menuProps && !!this.props.onClick && this.props.split;

    if (isSplit) {
      return (
        <ButtonBase
          { ...primaryProps }
          { ...buttonProps } // merge these two together
          disabled={ primaryDisabled }
          onRenderSuffix={ this._onRenderSuffix }
        />
      );
    } else if (this.props.menuProps) {
      return (
        <MenuButtonBase
          {...this.props as IMenuButtonBaseProps}
          menuIconProps={ this.props.menuIconProps || { iconName: 'ChevronDown' } }
        />
      );
    } else {
      return (
        <ButtonBase {...this.props as IButtonBaseProps } />
      );
    }
  }

  @autobind
  private _onRenderSuffix(): JSX.Element {

    const menuButtonProps: IMenuButtonBaseProps = {
      menuIconProps: this.props.menuIconProps || { iconName: 'ChevronDown' },
      menuProps: {
        items: [], // assure that items won't be empty
        ...this.props.menuProps,
        target: `[data-target-id='${this._labelId}']`
      },
      onMenuClick: this.props.onMenuClick,
      onRenderMenuIcon: this.props.onRenderMenuIcon,
      onRenderMenu: this.props.onRenderMenu,
      disabled: this.props.disabled,
    };

    return (
      <span style={ { display: 'flex' } }>
        <VerticalDivider />
        <MenuButtonBase {...menuButtonProps} />
      </span>
    )
  }

  public focus(): void {
    if (this._buttonElement) {
      this._buttonElement.focus();
    }
  }

  public dismissMenu(): void {
    // this.setState({ menuOpen: false });
  }

}