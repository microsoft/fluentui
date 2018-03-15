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
  forceResolve,
  searchMore,
}

export interface ISuggestionsState {
  selectedActionType: SuggestionActionType;
}

export class SuggestionsItem<T> extends BaseComponent<ISuggestionItemProps<T>, {}> {
  public render() {
    const {
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

  protected _forceResolveButton: IButton;
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
    const {
      forceResolveText,
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

    const noResults = () => {
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
    const footerTitle = (suggestions.length >= (resultsMaximumNumber as number)) ? resultsFooterFull : resultsFooter;
    const hasNoSuggestions = (!suggestions || !suggestions.length) && !isLoading;
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
        { forceResolveText && this._shouldShowForceResolve() && (
          <CommandButton
            componentRef={ this._resolveRef('_forceResolveButton') }
            className={ css(
              'ms-forceResolve-button',
              styles.actionButton,
              {
                ['is-selected ' + styles.buttonSelected]:
                this.state.selectedActionType === SuggestionActionType.forceResolve
              }) }
            onClick={ this._forceResolve }
          >
            { forceResolveText }
          </CommandButton>
        ) }
        { isLoading && (
          <Spinner
            className={ css('ms-Suggestions-spinner', styles.suggestionsSpinner) }
            label={ loadingText }
          />) }
        { hasNoSuggestions ?
          (onRenderNoResultFound ? onRenderNoResultFound(undefined, noResults) : noResults()) :
          this._renderSuggestions()
        }
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

  /**
   * Returns true if the event was handled, false otherwise
   */
  @autobind
  public tryHandleKeyDown(keyCode: number, currentSuggestionIndex: number): boolean {
    let isEventHandled = false;
    let newSelectedActionType = null;
    const currentSelectedAction = this.state.selectedActionType;
    const suggestionLength = this.props.suggestions.length;
    if (keyCode === KeyCodes.down) {
      switch (currentSelectedAction) {
        case SuggestionActionType.forceResolve:
          if (suggestionLength > 0) {
            this._refocusOnSuggestions(keyCode);
            newSelectedActionType = SuggestionActionType.none;
          } else if (this._searchForMoreButton) {
            newSelectedActionType = SuggestionActionType.searchMore;
          } else {
            newSelectedActionType = SuggestionActionType.forceResolve;
          }
          break;
        case SuggestionActionType.searchMore:
          if (this._forceResolveButton) {
            newSelectedActionType = SuggestionActionType.forceResolve;
          } else if (suggestionLength > 0) {
            this._refocusOnSuggestions(keyCode);
            newSelectedActionType = SuggestionActionType.none;
          } else {
            newSelectedActionType = SuggestionActionType.searchMore;
          }
          break;
        case SuggestionActionType.none:
          if (currentSuggestionIndex === -1 && this._forceResolveButton) {
            newSelectedActionType = SuggestionActionType.forceResolve;
          }
          break;
      }
    } else if (keyCode === KeyCodes.up) {
      switch (currentSelectedAction) {
        case SuggestionActionType.forceResolve:
          if (this._searchForMoreButton) {
            newSelectedActionType = SuggestionActionType.searchMore;
          } else if (suggestionLength > 0) {
            this._refocusOnSuggestions(keyCode);
            newSelectedActionType = SuggestionActionType.none;
          }
          break;
        case SuggestionActionType.searchMore:
          if (suggestionLength > 0) {
            this._refocusOnSuggestions(keyCode);
            newSelectedActionType = SuggestionActionType.none;
          } else if (this._forceResolveButton) {
            newSelectedActionType = SuggestionActionType.forceResolve;
          }
          break;
        case SuggestionActionType.none:
          if (currentSuggestionIndex === -1 && this._searchForMoreButton) {
            newSelectedActionType = SuggestionActionType.searchMore;
          }
          break;
      }
    }

    if (newSelectedActionType !== null) {
      this.setState({ selectedActionType: newSelectedActionType });
      isEventHandled = true;
    }

    return isEventHandled;
  }

  public hasSuggestedAction(): boolean {
    return this._searchForMoreButton !== undefined || this._forceResolveButton !== undefined;
  }

  public hasSuggestedActionSelected(): boolean {
    return (this.state.selectedActionType !== SuggestionActionType.none);
  }

  public executeSelectedAction(): void {
    switch (this.state.selectedActionType) {
      case SuggestionActionType.forceResolve:
        this._forceResolve();
        break;
      case SuggestionActionType.searchMore:
        this._getMoreResults();
        break;
    }
  }

  public focusAboveSuggestions(): void {
    if (this._forceResolveButton) {
      this.setState({ selectedActionType: SuggestionActionType.forceResolve });
    } else if (this._searchForMoreButton) {
      this.setState({ selectedActionType: SuggestionActionType.searchMore });
    }
  }

  public focusBelowSuggestions(): void {
    if (this._searchForMoreButton) {
      this.setState({ selectedActionType: SuggestionActionType.searchMore });
    } else if (this._forceResolveButton) {
      this.setState({ selectedActionType: SuggestionActionType.forceResolve });
    }
  }

  public focusSearchForMoreButton() {
    if (this._searchForMoreButton) {
      this._searchForMoreButton.focus();
    }
  }

  // TODO get the element to scroll into view properly regardless of direction.
  public scrollSelected() {
    if (this._selectedElement && this._selectedElement.scrollIntoView !== undefined) {
      this._selectedElement.scrollIntoView(false);
    }
  }

  private _renderSuggestions(): JSX.Element {
    const {
      onRenderSuggestion,
      suggestionsItemClassName,
      resultsMaximumNumber,
      showRemoveButtons,
      suggestionsContainerAriaLabel } = this.props;
    let { suggestions } = this.props;
    const TypedSuggestionsItem = this.SuggestionsItemOfProperType;

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
  private _forceResolve() {
    if (this.props.createGenericItem) {
      this.props.createGenericItem();
    }
  }

  @autobind
  private _shouldShowForceResolve() {
    return this.props.showForceResolve ? this.props.showForceResolve() : false;
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
      const onSuggestionRemove = this.props.onSuggestionRemove!;
      onSuggestionRemove(ev, item, index);
      ev.stopPropagation();
    };
  }
}