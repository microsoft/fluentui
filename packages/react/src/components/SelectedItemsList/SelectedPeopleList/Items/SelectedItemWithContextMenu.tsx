import * as React from 'react';
import { initializeComponentRef } from '../../../../Utilities';
import { ContextualMenu, DirectionalHint } from '../../../../ContextualMenu';
import type { IBaseProps } from '../../../../Utilities';
import type { IExtendedPersonaProps } from '../SelectedPeopleList';
import type { IContextualMenuItem } from '../../../../ContextualMenu';

import type { JSXElement } from '@fluentui/utilities';

export interface IPeoplePickerItemState {
  contextualMenuVisible: boolean;
}

export interface ISelectedItemWithContextMenuProps extends IBaseProps {
  renderedItem: JSXElement;
  beginEditing?: (item: IExtendedPersonaProps) => void;
  menuItems: IContextualMenuItem[];
  item: IExtendedPersonaProps;
}

export class SelectedItemWithContextMenu extends React.Component<
  ISelectedItemWithContextMenuProps,
  IPeoplePickerItemState
> {
  protected itemElement: React.RefObject<HTMLDivElement | null> = React.createRef<HTMLDivElement>();

  constructor(props: ISelectedItemWithContextMenuProps) {
    super(props);

    initializeComponentRef(this);
    this.state = { contextualMenuVisible: false };
  }

  public render(): JSXElement {
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
