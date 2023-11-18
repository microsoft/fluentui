import * as React from 'react';
import { IconButton } from '../../../../Button';
import { css, getId, initializeComponentRef } from '../../../../Utilities';
import { Persona, PersonaSize } from '../../../../Persona';
import * as stylesImport from './ExtendedSelectedItem.scss';
import type { ISelectedPeopleItemProps } from '../SelectedPeopleList';

const styles: any = stylesImport;

export interface IPeoplePickerItemState {
  contextualMenuVisible: boolean;
}

export class ExtendedSelectedItem extends React.Component<ISelectedPeopleItemProps, IPeoplePickerItemState> {
  protected persona = React.createRef<HTMLDivElement>();

  constructor(props: ISelectedPeopleItemProps) {
    super(props);

    initializeComponentRef(this);
    this.state = { contextualMenuVisible: false };
  }

  public render(): JSX.Element {
    const { item, onExpandItem, onRemoveItem, removeButtonAriaLabel, index, selected } = this.props;
    const itemId = getId();
    return (
      <div
        ref={this.persona}
        className={css(
          'ms-PickerPersona-container',
          styles.personaContainer,
          { ['is-selected ' + styles.personaContainerIsSelected]: selected },
          { ['is-invalid ' + styles.validationError]: !item.isValid },
        )}
        data-is-focusable={true}
        data-is-sub-focuszone={true}
        data-selection-index={index}
        role={'listitem'}
        aria-labelledby={'selectedItemPersona-' + itemId}
      >
        <div hidden={!item.canExpand || onExpandItem === undefined}>
          <IconButton
            onClick={this._onClickIconButton(onExpandItem)}
            iconProps={{ iconName: 'Add', style: { fontSize: '14px' } }}
            className={css('ms-PickerItem-removeButton', styles.expandButton, styles.actionButton)}
            ariaLabel={removeButtonAriaLabel}
          />
        </div>
        <div className={css(styles.personaWrapper)}>
          <div className={css('ms-PickerItem-content', styles.itemContent)} id={'selectedItemPersona-' + itemId}>
            <Persona
              {...item}
              onRenderCoin={this.props.renderPersonaCoin}
              onRenderPrimaryText={this.props.renderPrimaryText}
              size={PersonaSize.size32}
            />
          </div>
          <IconButton
            onClick={this._onClickIconButton(onRemoveItem)}
            iconProps={{ iconName: 'Cancel', style: { fontSize: '14px' } }}
            className={css('ms-PickerItem-removeButton', styles.removeButton, styles.actionButton)}
            ariaLabel={removeButtonAriaLabel}
          />
        </div>
      </div>
    );
  }

  private _onClickIconButton(
    action: (() => void) | undefined,
  ): (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void {
    return (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>): void => {
      ev.stopPropagation();
      ev.preventDefault();
      if (action) {
        action();
      }
    };
  }
}
