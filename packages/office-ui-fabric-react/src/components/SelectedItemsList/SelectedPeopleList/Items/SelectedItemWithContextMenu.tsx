/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { BaseComponent, IBaseProps } from '../../../../Utilities';
import { IExtendedPersonaProps } from '../SelectedPeopleList';
import { ContextualMenu, DirectionalHint, IContextualMenuItem } from '../../../../ContextualMenu';

export interface IPeoplePickerItemState {
  contextualMenuVisible: boolean;
}

export interface ISelectedItemWithContextMenuProps extends IBaseProps {
  renderedItem: JSX.Element;
  beginEditing?: (item: IExtendedPersonaProps) => void;
  menuItems: IContextualMenuItem[];
  item: IExtendedPersonaProps;
}

export class SelectedItemWithContextMenu extends BaseComponent<ISelectedItemWithContextMenuProps, IPeoplePickerItemState> {
  protected itemElement: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();

  constructor(props: ISelectedItemWithContextMenuProps) {
    super(props);
    this.state = { contextualMenuVisible: false };
  }

  public render(): JSX.Element {
    return (
      <div ref={this.itemElement} onContextMenu={this._onClick}>
        {this.props.renderedItem}
        {this.state.contextualMenuVisible ? (
          <ContextualMenu
            items={this.props.menuItems}
            shouldFocusOnMount={true}
            target={this.itemElement.current}
            onDismiss={this._onCloseContextualMenu}
            directionalHint={DirectionalHint.bottomLeftEdge}
          />
        ) : null}
      </div>
    );
  }

  private _onClick = (ev: React.MouseEvent<HTMLElement>): void => {
    ev.preventDefault();
    if (this.props.beginEditing && !this.props.item.isValid) {
      this.props.beginEditing(this.props.item);
    } else {
      this.setState({ contextualMenuVisible: true });
    }
  };

  private _onCloseContextualMenu = (ev: React.MouseEvent | React.KeyboardEvent): void => {
    this.setState({ contextualMenuVisible: false });
  };
}
