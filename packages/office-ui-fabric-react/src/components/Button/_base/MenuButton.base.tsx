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
      menuProps,
      children,
      labelId = this._labelId
    } = this.props;
    return (
      <ButtonBase
        onClick={ this._onMenuClick }
        onKeyDown={ this._onMenuKeyDown }
        labelId={ labelId }
        expanded={ this.state.menuIsOpen }
        aria-expanded={ this.state.menuIsOpen }
        {...this.props as IButtonBaseProps}
        aria-haspopup={ !!menuProps }
        onRenderSuffix={ menuProps!.doNotLayer ? this._onRenderMenuContainer : undefined }
      >
        { children }
        { !menuProps!.doNotLayer && this._onRenderMenuContainer() }
      </ButtonBase>
    );
  }

  public dismissMenu(): void {
    this.setState({ menuIsOpen: false });
  }

  @autobind
  private _onRenderMenuContainer(): JSX.Element | null {
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
    const { labelId = this._labelId } = this.props;
    const {
      onDismiss = this._dismissMenu,
      target = `[data-target-id='${labelId}']`
    } = menuProps;

    return (
      <ContextualMenu
        id={ labelId + '-menu' }
        directionalHint={ DirectionalHint.bottomLeftEdge }
        {...menuProps}
        className={ 'ms-BaseButton-menuhost ' + menuProps.className }
        target={ target }
        labelElementId={ labelId }
        onDismiss={ onDismiss }
      />
    );
  }

  @autobind
  private _dismissMenu(): void {
    this.setState(() => {
      return { menuIsOpen: false };
    });
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