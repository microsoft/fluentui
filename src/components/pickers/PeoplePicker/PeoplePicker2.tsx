import * as React from 'react';
import { BasePicker, IBasePickerProps, IPickerItemProps } from '../BasePicker';
import { Persona, PersonaSize, IPersonaProps, PersonaPresence } from '../../Persona';
import { PeopleSuggestions } from './PeopleSuggestions';
import { TagItem } from '../TagPicker/TagItem';
import { FocusZone } from '../../FocusZone';
import { Callout } from '../../Callout';
import { ISelection, Selection, SelectionZone } from '../../../utilities/selection/index';
import { css } from '../../../utilities/css';
import { ContextualMenu, IContextualMenuItem, DirectionalHint } from '../../ContextualMenu';
import { Button, ButtonType } from '../../Button';
import './PeoplePicker2.scss';

export enum PeoplePickerType {
  /**
   * Standard People Picker.
   */
  normal,
  /**
   * MemberList layout. The selected people show up below the search box.
   */
  list
}

export interface IPeoplePickerProps extends React.Props<any> {
  onResolveSuggestions?: (text?: string, selectedItems?: IPersonaProps[]) => IPersonaProps[];
  onRenderSuggestion?: (props: IPersonaProps, index: number) => JSX.Element;
  peoplePickerType?: PeoplePickerType;
}

export interface IPeoplePickerItemProps extends IPickerItemProps {
  item: IPersonaProps;
}


/**
 * A dumb component that renders items for the PeoplePicker search dropdown.
 */
export const PeoplePickerSearchItemDefault: (persona: IPersonaProps, index: number) => JSX.Element = (personaProps: IPersonaProps, index: number) => {
  return (
    <div role='button' className='ms-PeoplePicker-personaContent'>
      <Persona
        { ...personaProps }
        presence={ personaProps.presence ? personaProps.presence : PersonaPresence.online }
        size={ PersonaSize.small }
        />
    </div>
  );
};

export const PeoplePickerSelectedItemDefault: (props: IPeoplePickerItemProps) => JSX.Element = (peoplePickerItemProps: IPeoplePickerItemProps) => {
  let { item,
    onRemoveItem,
    index
  } = peoplePickerItemProps;
  return (
    <div className='ms-PickerPersona-Container'>
      <Persona
        { ...item }
        presence = { item.presence ? item.presence : PersonaPresence.online }
        className='ms-base-peoplepicker'
        />
      <button className='ms-base-peoplepicker' onClick={ () => { if (onRemoveItem) { onRemoveItem(); } } }>
        <i className='ms-Icon ms-Icon--x'></i>
      </button>
    </div>
  );
};

export class BasePeoplePicker extends BasePicker<IBasePickerProps> {
  render() {
    let { value } = this.state;

    return (
      <div ref='root' className='ms-BasePicker' onKeyDown={ this._onKeyDown }>
        <SelectionZone selection={ this._selection }>
          <div className='ms-BasePicker-text'>
            <input ref='input'
              onFocus={ this._onInputFocus }
              onChange={ this._onInputChange }
              value={ value }
              className='ms-BasePicker-input'
              />
          </div>
        </SelectionZone>
        { this.renderSuggestions() }
        <FocusZone ref='focusZone'>
          { this.renderItems() }
        </FocusZone>
      </div>
    );
  }

  protected _onBackSpace(ev: React.KeyboardEvent) {
    let { value, suggestionAvailable } = this.state;
    if (ev.target === this.refs.input) {
      if (value && suggestionAvailable && value === suggestionAvailable.text && this.refs.input.selectionStart !== this.refs.input.selectionEnd) {
        this.setState({
          value: value.substring(0, this.refs.input.selectionStart)
        });
      }
    }
  }
}

export class PeoplePicker extends React.Component<IPeoplePickerProps, {contextualMenuVisible?: boolean, contextualMenuTarget?: HTMLElement;}> {
  static defaultProps = {
    peoplePickerType: PeoplePickerType.normal
  }

    private contextualMenuItems: IContextualMenuItem[] = [
    {
      key: 'newItem',
      icon: 'circlePlus',
      name: 'New'
    },
    {
      key: 'upload',
      icon: 'upload',
      name: 'Upload'
    },
    {
      key: 'divider_1',
      name: '-',
    },
    {
      key: 'rename',
      name: 'Rename'
    },
    {
      key: 'properties',
      name: 'Properties'
    },
    {
      key: 'disabled',
      name: 'Disabled item',
      isDisabled: true,
    },
  ];
  constructor() {
    super();
    this._renderResult = this._renderResult.bind(this);
    this.state = {
      contextualMenuVisible: false,
      contextualMenuTarget: null
    }
  }

  render() {
    let { onResolveSuggestions, onRenderSuggestion, peoplePickerType } = this.props;
    let pickerProps: IBasePickerProps = {
      onRenderItem: this._renderResult,
      onRenderSuggestions: (props) =>
        <PeopleSuggestions { ...props }
          onResolveSuggestions={ onResolveSuggestions }
          onRenderSuggestion={ (persona: IPersonaProps, index: number) => onRenderSuggestion ?
            onRenderSuggestion(persona, index) :
            PeoplePickerSearchItemDefault(persona, index) } />
    }
    if (peoplePickerType === PeoplePickerType.normal) {
      return (<BasePeoplePicker { ...pickerProps }/>);
    } else {
      return <BasePicker { ...pickerProps }/>
    }
  }

  private _renderResult(peoplePickerItemProps: IPeoplePickerItemProps): JSX.Element {
    let {
      item,
      index,
      onRemoveItem
    } = peoplePickerItemProps;

    return (
      <div className='ms-result-content'>
        <Persona
          { ...item }
          presence={ item.presence ? item.presence : PersonaPresence.online }
          className='ms-result-item'
          />
        <Button
          icon={'ellipsis'}
          buttonType={ButtonType.icon} onClick={this.onContextualMenu.bind(this) }
          className='ms-result-item'
          />
        <Button
          icon={'x'}
          buttonType={ButtonType.icon}
          onClick={ onRemoveItem }
          className='ms-result-item'
          />
        { this.state.contextualMenuVisible ? (
          <ContextualMenu
            items={ this.contextualMenuItems }
            shouldFocusOnMount={ true }
            targetElement={ this.state.contextualMenuTarget }
            onDismiss={ this._onCloseContextualMenu.bind(this) }
            directionalHint={DirectionalHint.bottomAutoEdge}/>)
          : null }
      </div>
    );
  }

  private onContextualMenu(ev?: any) {
    let targetElement: HTMLElement = ev.target as HTMLElement;
    this.setState({ contextualMenuVisible: true, contextualMenuTarget: targetElement });
  }

  private _onCloseContextualMenu(ev: Event) {
    this.setState({ contextualMenuVisible: false, contextualMenuTarget: null });
  }
}
