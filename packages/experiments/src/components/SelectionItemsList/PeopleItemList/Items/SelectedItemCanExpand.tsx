/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { BaseComponent, autobind, css, getId } from '../../../../Utilities';
import { Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { ValidationState } from 'office-ui-fabric-react/lib/pickers';
import { IExtendedPersonaProps, IPeopleSelectionItemProps } from '../PeopleItemList';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { ContextualMenu, DirectionalHint, IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import * as stylesImport from './SelectedItemCanExpand.scss';
// tslint:disable-next-line:no-any
const styles: any = stylesImport;

export interface IPeoplePickerItemState {
  contextualMenuVisible: boolean;
}

export class SelectedItemCanExpand extends BaseComponent<IPeopleSelectionItemProps, IPeoplePickerItemState> {
  protected persona: HTMLElement;

  private menuItems: IContextualMenuItem[];

  constructor(props: IPeopleSelectionItemProps) {
    super(props);
    this.state = { contextualMenuVisible: false };
    let { onCopyItem, onRemoveItem, copyMenuItemText, removeMenuItemText } = this.props;
    this.menuItems = [
      {
        key: 'Copy',
        name: copyMenuItemText ? copyMenuItemText : 'Copy',
        onClick: () => {
          if (onCopyItem) {
            onCopyItem(this.props.item as IExtendedPersonaProps);
          }
        },
      },
      {
        key: 'Remove',
        name: removeMenuItemText ? removeMenuItemText : 'Remove',
        onClick: this.onClickIconButton(onRemoveItem),
      },
    ];
  }

  public render(): JSX.Element {
    let {
      item,
      onExpandItem,
      onRemoveItem,
      removeButtonAriaLabel,
      index,
      selected
    } = this.props;
    const itemId = getId();
    return (
      <div
        ref={ this._resolveRef('persona') }
        className={ css(
          'ms-PickerPersona-container',
          styles.personaContainer,
          { ['is-selected ' + styles.personaContainerIsSelected]: selected },
          { ['is-invalid ' + styles.validationError]: item.ValidationState === ValidationState.warning }
        ) }
        data-is-focusable={ true }
        data-is-sub-focuszone={ true }
        data-selection-index={ index }
        role={ 'listitem' }
        aria-labelledby={ 'selectedItemPersona-' + itemId }
        onContextMenu={ this._onClick }
      >
        <div hidden={ !item.canExpand }>
          <IconButton
            onClick={ this.onClickIconButton(onExpandItem) }
            iconProps={ { iconName: 'Add', style: { fontSize: '12px' } } }
            className={ css('ms-PickerItem-removeButton', styles.expandButton, styles.actionButton) }
            ariaLabel={ removeButtonAriaLabel }
          />
        </div>
        <div className={ css(styles.personaWrapper, { [styles.canExpand]: item.canExpand }) }>
          <div
            className={ css('ms-PickerItem-content', styles.itemContent) }
            id={ 'selectedItemPersona-' + itemId }
          >
            <Persona
              { ...item }
              presence={ item.presence !== undefined ? item.presence : PersonaPresence.none }
              size={ PersonaSize.size28 }
            />
          </div>
          <IconButton
            onClick={ this.onClickIconButton(onRemoveItem) }
            iconProps={ { iconName: 'Cancel', style: { fontSize: '12px' } } }
            className={ css('ms-PickerItem-removeButton', styles.removeButton, styles.actionButton) }
            ariaLabel={ removeButtonAriaLabel }
          />
        </div >
        { this.state.contextualMenuVisible ? (
          <ContextualMenu
            items={ this.menuItems }
            shouldFocusOnMount={ true }
            target={ this.persona }
            onDismiss={ this._onCloseContextualMenu }
            directionalHint={ DirectionalHint.bottomAutoEdge }
          />)
          : null
        }
      </div >);
  }

  private onClickIconButton = (action: (() => void) | undefined): () => void => {
    return (): void => {
      if (action) {
        action();
      }
    };
  }

  @autobind
  private _onClick(ev: React.MouseEvent<HTMLElement>): void {
    ev.preventDefault();
    this.setState({ contextualMenuVisible: true });
  }

  @autobind
  private _onCloseContextualMenu(ev: Event): void {
    this.setState({ contextualMenuVisible: false });
  }
}