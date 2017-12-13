import * as React from 'react';
import {
  BaseComponent,
  autobind,
  getId,
  KeyCodes,
  customizable
} from '../../../Utilities';
import { ButtonBase } from './Button.base';
import { IButtonBaseProps } from './Button.base.types';
import { DirectionalHint } from '../../../Callout';
import { ContextualMenu, IContextualMenuProps } from '../../../ContextualMenu';
import { IMenuButtonBaseProps } from './MenuButton.base.types';

export interface IMenuButtonBaseState {
  menuIsOpen: boolean;
}
@customizable('MenuButtonBase', ['theme'])
export class MenuButtonBase extends BaseComponent<IMenuButtonBaseProps, IMenuButtonBaseState> {

  private _labelId: string;

  constructor(props: IMenuButtonBaseProps) {
    super(props);
    this._labelId = getId();

    this.state = {
      menuIsOpen: false
    };
  }

  public render(): JSX.Element {
    const {
      getStyles,
      menuProps,
      labelId = this._labelId
    } = this.props;
    return (
      <ButtonBase
        onClick={ this._onMenuClick }
        onKeyDown={ this._onMenuKeyDown }
        labelId={ this._labelId }
        expanded={ this.state.menuIsOpen }
        aria-expanded={ this.state.menuIsOpen }
        {...this.props as IButtonBaseProps}
        getStyles={ getStyles }
        aria-haspopup={ !!menuProps }
        data-target-id={ !!menuProps && labelId }
        onRenderSuffix={ this._onRenderSuffix }
      />
    );
  }

  public dismissMenu(): void {
    this.setState({ menuIsOpen: false });
  }

  @autobind
  private _onRenderSuffix(): JSX.Element | null {
    const {
      menuProps,
      onRenderMenu = this._onRenderMenu
    } = this.props;

    if (this.state.menuIsOpen && this.props.menuProps) {
      return (
        onRenderMenu(menuProps, this._onRenderMenu)
      );
    } else {
      return null;
    }
  }

  @autobind
  private _onRenderMenu(menuProps: IContextualMenuProps): JSX.Element {
    const {
      onDismiss = this._toggleMenu,
      target = `[data-target-id='${this._labelId}']`
    } = menuProps;

    return (
      <ContextualMenu
        id={ this._labelId + '-menu' }
        directionalHint={ DirectionalHint.bottomLeftEdge }
        {...menuProps}
        className={ 'ms-BaseButton-menuhost ' + menuProps.className }
        target={ target }
        labelElementId={ this._labelId }
        onDismiss={ onDismiss }
      />
    );
  }

  @autobind
  private _toggleMenu(): void {
    this.setState((prevState: IMenuButtonBaseState) => {
      return { menuIsOpen: !prevState.menuIsOpen };
    });
  }

  @autobind
  private _onMenuKeyDown(ev: React.KeyboardEvent<HTMLAnchorElement>) {
    if (ev.which === KeyCodes.down) {
      let { onMenuClick } = this.props;
      onMenuClick && onMenuClick(ev, this);
      !ev.defaultPrevented && this._toggleMenu();
      ev.preventDefault();
      ev.stopPropagation();
    }
  }

  @autobind
  private _onMenuClick(ev: React.MouseEvent<HTMLAnchorElement>) {
    let { onMenuClick } = this.props;
    onMenuClick && onMenuClick(ev, this);
    !ev.defaultPrevented && this._toggleMenu();
    ev.preventDefault();
    ev.stopPropagation();
  }
}