import * as React from 'react';
import { BaseComponent, KeyCodes } from '../../Utilities';
import {
  ContextualMenu,
  ContextualMenuItemType,
  IContextualMenuItem
} from '../../ContextualMenu';
import { DirectionalHint } from '../../common/DirectionalHint';
import { Icon } from '../../Icon';
import { IDocumentTitleBarProps } from './DocumentTitleBar.Props';
import './DocumentTitleBar.scss';

const documentTitleButtonClassName = 'ms-DocumentTitleBar-button';

export interface IDocumentTitleBarState {
  isContextualMenuVisible: boolean;
  isRenaming: boolean;
}

export class DocumentTitleBar extends BaseComponent<IDocumentTitleBarProps, IDocumentTitleBarState> {
  private _renameTextField: HTMLInputElement;

  constructor(props: IDocumentTitleBarProps) {
    super(props);

    this._onClickTitleButton = this._onClickTitleButton.bind(this);
    this._onDismissContextualMenu = this._onDismissContextualMenu.bind(this);
    this._onClickRenameMenuItem = this._onClickRenameMenuItem.bind(this);
    this._onClickSavedLocationMenuItem = this._onClickSavedLocationMenuItem.bind(this);
    this._onClickVersionsMenuItem = this._onClickVersionsMenuItem.bind(this);
    this._onBlurTitleTextField = this._onBlurTitleTextField.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);

    this.state = {
      isContextualMenuVisible: false,
      isRenaming: false,
    };
  }

  public render() {
    const { className, hasVersions, filePath } = this.props;
    return (
      <div className={ className !== undefined ? className : null } style={ { display: 'inline-block' } }>
        { this.state.isRenaming ? this._renderEditableTextField() : this._renderClickableButton() }
        { this.state.isContextualMenuVisible &&
          <ContextualMenu
            shouldFocusOnMount={ true }
            onDismiss={ this._onDismissContextualMenu }
            isBeakVisible={ true }
            directionalHint={ DirectionalHint.bottomCenter }
            target={ '.' + documentTitleButtonClassName }
            items={
              [
                {
                  key: 'Rename',
                  name: 'Rename',
                  iconProps: {
                    iconName: 'Rename'
                  },
                  onClick: this._onClickRenameMenuItem,
                },
                {
                  key: 'Saved',
                  name: 'Saved',
                  itemType: ContextualMenuItemType.Header
                },
                {
                  key: 'SavedLocation',
                  name: filePath,
                  iconProps: {
                    iconName: 'OneDrive'
                  },
                  onClick: this._onClickSavedLocationMenuItem,
                },
                ...(hasVersions && this._getVersionsMenuItems())
              ]
            } />
        }
      </div>
    );
  }

  private _onDismissContextualMenu() {
    this.setState({
      isContextualMenuVisible: !this.state.isContextualMenuVisible
    });
  }

  private _onClickTitleButton() {
    this.setState({
      isContextualMenuVisible: !this.state.isContextualMenuVisible
    });
  }

  private _onKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (this.state.isRenaming) {
      switch (event.which) {
        case KeyCodes.enter:
          if (this.props.onRenameDocument !== undefined) {
            this.props.onRenameDocument(this._renameTextField.value);
          }
          this.setState({ isRenaming: false });
          break;
        case KeyCodes.escape:
          this.setState({ isRenaming: false });
          break;
      }
    }
  }

  private _onClickRenameMenuItem() {
    this.setState({
      isRenaming: true
    }, () => this._renameTextField.select());
  }

  private _onClickSavedLocationMenuItem(event: React.MouseEvent<HTMLElement>) {
    if (this.props.onClickSavedLocationMenuItem !== undefined) {
      this.props.onClickSavedLocationMenuItem(event);
    }
  }

  private _onClickVersionsMenuItem(event: React.MouseEvent<HTMLElement>) {
    if (this.props.onClickVersionsMenuItem !== undefined) {
      this.props.onClickVersionsMenuItem(event);
    }
  }

  private _onBlurTitleTextField(event: React.FocusEvent<HTMLInputElement>) {
    if (this.props.onRenameDocument !== undefined) {
      this.props.onRenameDocument((event.target as HTMLInputElement).value);
    }
    this.setState({ isRenaming: false });
  }

  private _renderClickableButton(): React.ReactNode {
    const { title, statusText } = this.props;
    return (
      <button
        className={ documentTitleButtonClassName + (this.state.isContextualMenuVisible ? ' isHighlighted' : '') }
        onClick={ this._onClickTitleButton }>
        { title }
        { statusText !== undefined && statusText.length > 0 && <span className={ 'statusText' }> — { this.props.statusText }</span> }
        <Icon iconName={ 'ChevronDown' } />
      </button>
    );
  }

  private _renderEditableTextField(): React.ReactNode {
    return (
      <div className={ 'ms-DocumentTitleBar-renameDiv' }>
        <input
          className={ 'textField' }
          defaultValue={ this.props.title }
          onBlur={ this._onBlurTitleTextField }
          onKeyDown={ this._onKeyDown }
          ref={ (textField) => this._renameTextField = textField } />
      </div>
    );
  }

  private _getVersionsMenuItems(): IContextualMenuItem[] {
    return [
      {
        key: '-',
        name: '-'
      },
      {
        key: 'Versions',
        name: 'Versions',
        iconProps: {
          iconName: 'History'
        },
        onClick: this._onClickVersionsMenuItem
      }
    ];
  }
}

export default DocumentTitleBar;
