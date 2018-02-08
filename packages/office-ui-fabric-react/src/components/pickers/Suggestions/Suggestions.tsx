import * as React from 'react';
import {
  BaseComponent,
  css,
  autobind,
  KeyCodes
} from '../../../Utilities';
import { CommandButton, IconButton, IButton } from '../../../Button';
import { Spinner } from '../../../Spinner';
import { ISuggestionItemProps, ISuggestionsProps } from './Suggestions.types';
import * as stylesImport from './Suggestions.scss';
const styles: any = stylesImport;

export enum SuggestionActionType {
  none,
  useInputText,
  searchMore,
}

export interface ISuggestionsState {
  selectedActionType: SuggestionActionType;
}

export class SuggestionsItem<T> extends BaseComponent<ISuggestionItemProps<T>, {}> {
  public render() {
    let {
      suggestionModel,
      RenderSuggestion,
      onClick,
      className,
      onRemoveItem
    } = this.props;
    return (
      <div
        className={ css(
          'ms-Suggestions-item',
          styles.suggestionsItem,
          {
            ['is-suggested ' + styles.suggestionsItemIsSuggested]: suggestionModel.selected
          },
          className
        ) }
      >
        <CommandButton
          onClick={ onClick }
          className={ css('ms-Suggestions-itemButton', styles.itemButton) }
        >
          { RenderSuggestion(suggestionModel.item, this.props) }
        </CommandButton>
        { this.props.showRemoveButton ? (
          <IconButton
            iconProps={ { iconName: 'Cancel', style: { fontSize: '12px' } } }
            title='Remove'
            ariaLabel='Remove'
            onClick={ onRemoveItem }
            className={ css('ms-Suggestions-closeButton', styles.closeButton) }
          />) : (null)
        }
      </div>
    );
  }
}

export class Suggestions<T> extends BaseComponent<ISuggestionsProps<T>, ISuggestionsState> {

  protected _useInputButton: IButton;
  protected _searchForMoreButton: IButton;
  protected _selectedElement: HTMLDivElement;
  private SuggestionsItemOfProperType = SuggestionsItem as new (props: ISuggestionItemProps<T>) => SuggestionsItem<T>;

  constructor(suggestionsProps: ISuggestionsProps<T>) {
    super(suggestionsProps);
    this.state = {
      selectedActionType: SuggestionActionType.none,
    };
  }

  public componentDidUpdate() {
    this.scrollSelected();
  }

  public render() {
    let {
      useInputText,
      createGenericItem,
      isTextValid,
      mostRecentlyUsedHeaderText,
      searchForMoreText,
      className,
      moreSuggestionsAvailable,
      noResultsFoundText,
      suggestions,
      isLoading,
      isSearching,
      loadingText,
      onRenderNoResultFound,
      searchingText,
      isMostRecentlyUsedVisible,
      resultsMaximumNumber,
      resultsFooterFull,
      resultsFooter,
      suggestionsAvailableAlertText,
      suggestionsHeaderText,
    } = this.props;

    let noResults = () => {
      return noResultsFoundText ?
        (
          <div role='alert' className={ css('ms-Suggestions-none', styles.suggestionsNone) }>
            { noResultsFoundText }
          </div>
        ) : null;
    };
    // MostRecently Used text should supercede the header text if it's there and available.
    let headerText: string | undefined = suggestionsHeaderText;
    if (isMostRecentlyUsedVisible && mostRecentlyUsedHeaderText) {
      headerText = mostRecentlyUsedHeaderText;
    }
    let footerTitle = (suggestions.length >= (resultsMaximumNumber as number)) ? resultsFooterFull : resultsFooter;
    let hasNoSuggestions = (!suggestions || !suggestions.length) && !isLoading;
    return (
      <div
        className={ css(
          'ms-Suggestions',
          className ? className : '',
          styles.root) }
      >
        { headerText ?
          (<div className={ css('ms-Suggestions-title', styles.suggestionsTitle) }>
            { headerText }
          </div>) : (null) }
        { isLoading && (
          <Spinner
            className={ css('ms-Suggestions-spinner', styles.suggestionsSpinner) }
            label={ loadingText }
          />) }
        { hasNoSuggestions ?
          (onRenderNoResultFound ? onRenderNoResultFound(undefined, noResults) : noResults()) :
          this._renderSuggestions()
        }
        { useInputText && !moreSuggestionsAvailable && hasNoSuggestions && this._isTextValid() && (
          <CommandButton
            componentRef={ this._resolveRef('_useInputButton') }
            className={ css(
              'ms-SearchMore-button',
              styles.actionButton,
              {
                ['is-selected ' + styles.buttonSelected]:
                this.state.selectedActionType === SuggestionActionType.useInputText
              }) }
            onClick={ this._useInput }
          >
            { useInputText }
          </CommandButton>
        ) }
        { searchForMoreText && moreSuggestionsAvailable && (
          <CommandButton
            componentRef={ this._resolveRef('_searchForMoreButton') }
            className={ css('ms-SearchMore-button',
              styles.actionButton,
              {
                ['is-selected ' + styles.buttonSelected]:
                this.state.selectedActionType === SuggestionActionType.searchMore
              }) }
            iconProps={ { iconName: 'Search' } }
            onClick={ this._getMoreResults }
          >
            { searchForMoreText }
          </CommandButton>
        ) }
        { isSearching ?
          (<Spinner
            className={ css('ms-Suggestions-spinner', styles.suggestionsSpinner) }
            label={ searchingText }
          />) : (null)
        }
        {
          !moreSuggestionsAvailable && !isMostRecentlyUsedVisible && !isSearching ?
            (<div className={ css('ms-Suggestions-title', styles.suggestionsTitle) }>
              { footerTitle && footerTitle(this.props) }
            </div>) : (null)
        }
        { (!isLoading && !isSearching && suggestions && suggestions.length > 0 && suggestionsAvailableAlertText) ?
          (<span
            role='alert'
            className={ css('ms-Suggestions-suggestionsAvailable', styles.suggestionsAvailable) }
          >
            { suggestionsAvailableAlertText }
          </span>) : (null)
        }
      </div>
    );
  }

  @autobind
  public tryHandleKeyDown(keyCode: number): boolean {
    let isEventHandled = false;
    let newSelectedActionType = null;
    let currentSelectedAction = this.state.selectedActionType;
    if (currentSelectedAction !== SuggestionActionType.none) {
      if (keyCode === KeyCodes.down) {
        switch (currentSelectedAction) {
          case SuggestionActionType.useInputText:
            if (this._searchForMoreButton) {
              newSelectedActionType = SuggestionActionType.searchMore;
            } else {
              this._refocusOnSuggestions(keyCode);
              newSelectedActionType = SuggestionActionType.none;
            }
            break;
          case SuggestionActionType.searchMore:
            this._refocusOnSuggestions(keyCode);
            newSelectedActionType = SuggestionActionType.none;
            break;
        }
      } else if (keyCode === KeyCodes.up) {
        switch (currentSelectedAction) {
          case SuggestionActionType.useInputText:
            this._refocusOnSuggestions(keyCode);
            newSelectedActionType = SuggestionActionType.none;
            break;
          case SuggestionActionType.searchMore:
            if (this._useInputButton) {
              newSelectedActionType = SuggestionActionType.useInputText;
            } else {
              this._refocusOnSuggestions(keyCode);
              newSelectedActionType = SuggestionActionType.none;
            }
            break;
        }
      }

      if (newSelectedActionType !== null) {
        this.setState({ selectedActionType: newSelectedActionType });
        isEventHandled = true;
      }
    }

    return isEventHandled;
  }

  public hasSuggestedAction(): boolean {
    return this._searchForMoreButton !== null || this._useInputButton !== null;
  }

  public hasSuggestedActionSelected(): boolean {
    return (this.state.selectedActionType !== SuggestionActionType.none);
  }

  public executeSelectedAction(): void {
    switch (this.state.selectedActionType) {
      case SuggestionActionType.useInputText:
        this._useInput();
        break;
      case SuggestionActionType.searchMore:
        this._getMoreResults();
        break;
    }
  }

  public focusAboveSuggestions(): void {
    let newSelectedActionType = null;
    if (this._searchForMoreButton) {
      this.setState({ selectedActionType: SuggestionActionType.searchMore });
    } else if (this._useInputButton) {
      this.setState({ selectedActionType: SuggestionActionType.useInputText });
    }
  }

  public focusBelowSuggestions(): void {
    if (this._useInputButton) {
      this.setState({ selectedActionType: SuggestionActionType.useInputText });
    } else if (this._searchForMoreButton) {
      this.setState({ selectedActionType: SuggestionActionType.searchMore });
    }
  }

  public focusSearchForMoreButton() {
    if (this._searchForMoreButton) {
      this._searchForMoreButton.focus();
    }
  }

  // TODO get the element to scroll into view properly regardless of direction.
  public scrollSelected() {
    if (this._selectedElement) {
      this._selectedElement.scrollIntoView(false);
    }
  }

  private _renderSuggestions(): JSX.Element {
    let {
      suggestions,
      onRenderSuggestion,
      suggestionsItemClassName,
      resultsMaximumNumber,
      showRemoveButtons,
      suggestionsContainerAriaLabel } = this.props;
    let TypedSuggestionsItem = this.SuggestionsItemOfProperType;

    if (resultsMaximumNumber) {
      suggestions = suggestions.slice(0, resultsMaximumNumber);
    }

    return (
      <div
        className={ css('ms-Suggestions-container', styles.suggestionsContainer) }
        id='suggestion-list'
        role='list'
        aria-label={ suggestionsContainerAriaLabel }
      >
        { suggestions.map((suggestion, index) =>
          <div
            ref={ this._resolveRef(suggestion.selected ? '_selectedElement' : '') }
            // tslint:disable-next-line:no-string-literal
            key={ (suggestion.item as any)['key'] ? (suggestion.item as any)['key'] : index }
            id={ 'sug-' + index }
            role='listitem'
            aria-label={ suggestion.ariaLabel }
          >
            <TypedSuggestionsItem
              id={ 'sug-item' + index }
              suggestionModel={ suggestion }
              RenderSuggestion={ onRenderSuggestion as any }
              onClick={ this._onClickTypedSuggestionsItem(suggestion.item, index) }
              className={ suggestionsItemClassName }
              showRemoveButton={ showRemoveButtons }
              onRemoveItem={ this._onRemoveTypedSuggestionsItem(suggestion.item, index) }
            />
          </div>) }
      </div>);
  }

  @autobind
  private _getMoreResults() {
    if (this.props.onGetMoreResults) {
      this.props.onGetMoreResults();
    }
  }

  @autobind
  private _useInput() {
    if (this.props.createGenericItem) {
      this.props.createGenericItem();
    }
  }

  @autobind
  private _isTextValid() {
    return this.props.isTextValid ? this.props.isTextValid() : false;
  }

  @autobind
  private _onClickTypedSuggestionsItem(item: T, index: number): (ev: React.MouseEvent<HTMLElement>) => void {
    return (ev: React.MouseEvent<HTMLElement>): void => {
      this.props.onSuggestionClick(ev, item, index);
    };
  }

  @autobind
  private _refocusOnSuggestions(keyCode: number): void {
    if (typeof this.props.refocusSuggestions === 'function') {
      this.props.refocusSuggestions(keyCode);
    }
  }

  @autobind
  private _onRemoveTypedSuggestionsItem(item: T, index: number): (ev: React.MouseEvent<HTMLElement>) => void {
    return (ev: React.MouseEvent<HTMLElement>): void => {
      let onSuggestionRemove = this.props.onSuggestionRemove!;
      onSuggestionRemove(ev, item, index);
      ev.stopPropagation();
    };
  }
}