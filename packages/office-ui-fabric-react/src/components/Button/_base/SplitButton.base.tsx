import * as React from 'react';
import {
  BaseComponent,
  customizable,
  autobind,
  getId
} from '../../../Utilities';
import { VerticalDivider } from '../../../Divider';
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
      primaryDisabled,
      disabled
    } = this.props;

    const isSplit = !!this.props.menuProps && !!this.props.onClick && this.props.split;

    if (isSplit) {
      return (
        <ButtonBase
          { ...this.props }
          labelId={ this._labelId }
          menuIconProps={ undefined }
          onRenderMenuIcon={ undefined }
          aria-haspopup={ true }
          aria-disabled={ primaryDisabled || disabled }
          disabled={ primaryDisabled || disabled }
          onRenderSuffix={ this._onRenderSplitSuffix }
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

  public focus(): void {
    if (this._buttonElement) {
      this._buttonElement.focus();
    }
  }

  public dismissMenu(): void {
    // this.setState({ menuOpen: false });
  }

  @autobind
  private _onRenderSplitSuffix(): JSX.Element {

    const {
      menuIconProps,
      onMenuClick,
      onRenderMenuIcon,
      onRenderMenu,
      disabled,
      dividerAs: SplitDivider = VerticalDivider,
      getSplitStyles = this.props.getStyles, // default to getStyles if split is not supplied
      primary
    } = this.props;

    const menuButtonProps: IMenuButtonBaseProps = {
      menuIconProps: menuIconProps || { iconName: 'ChevronDown' },
      menuProps: {
        items: [], // assure that items won't be empty
        ...this.props.menuProps,
        target: `[data-target-id='${this._labelId}']`
      },
      getStyles: getSplitStyles,
      primary,
      onMenuClick,
      onRenderMenuIcon,
      onRenderMenu,
      disabled,
    };

    return (
      <span style={ { display: 'flex' } }>
        {/* move these styles into component when converted to getStyles */ }
        <span style={ { margin: '4px -.5px', position: 'relative', zIndex: 1 } }><SplitDivider /> </span>
        <MenuButtonBase {...menuButtonProps} />
      </span>
    );
  }
}